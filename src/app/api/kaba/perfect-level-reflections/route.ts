import { z } from "zod";
import { genAI } from "@/lib/gemini/client";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getLevelById } from "@/data/levels";
import { tasks } from "@/data/tasks";
import { LEVEL_RECAP_CARDS } from "@/data/level-meta";
import { getMockTaskReflection, updateMockReflection } from "@/lib/dev/mock-progress";
import { checkReflectionQuality } from "@/lib/quality/check-reflection";
import type { KabaCorrection } from "@/lib/kaba/review-types";

const isDev = process.env.NODE_ENV !== "production";

const schema = z.object({ niveau: z.number().int().min(1).max(8) });

// Tâches d'un niveau ayant un reflection_template (ordre du parcours).
function reflectionTasksForLevel(levelId: number) {
  return tasks.filter(
    (t) => t.levelId === levelId && t.lesson?.exercises.some((e) => e.type === "reflection_template")
  );
}

function cardLabel(levelId: number, taskId: number, fallback: string): string {
  const cards = LEVEL_RECAP_CARDS[levelId] ?? [];
  return cards.find((c) => c.taskId === taskId)?.title ?? fallback;
}

interface ReflInput {
  taskId: number;
  label: string;
  text: string;
}

function buildPrompt(niveau: number, reflections: ReflInput[]): string {
  const block = reflections
    .map((r) => `Tâche ${r.taskId} (${r.label}) : "${r.text}"`)
    .join("\n");

  return `Tu es Kaba, coach entrepreneurial StartKaba (Afrique de l'Ouest, tutoiement, honnête mais bienveillant).

L'utilisateur vient de terminer le Niveau ${niveau}. Voici ses réflexions :

${block}

Mission : RÉÉCRIS chaque réflexion pour la rendre meilleure, en CORRIGEANT les défauts classiques :
- Cause racine circulaire ("il manque ma solution") → reformule à partir du vrai vécu du client.
- Persona mélangée (2 profils, fourchettes d'âge ou de revenus trop larges) → resserre sur UNE cible précise.
- Jargon non expliqué (startup, MVP, levée de fonds, scaling, KPI, ROI, B2B...) → mots du quotidien.
- UVP qui décrit la fonctionnalité ("ma plateforme permet de...") → tourne vers le bénéfice client.
- Fautes lourdes, doublons, phrases cassées → corrige.

RÈGLE ABSOLUE : tu gardes l'IDÉE et le PROJET de l'utilisateur. Tu améliores la formulation, tu n'inventes pas un autre projet.
Si une réflexion est déjà bonne, garde-la quasi identique et dis-le dans le commentaire.

Format JSON strict :

{
  "corrections": [
    {
      "taskId": number,
      "texte_corrige": "string — la réflexion réécrite, prête à publier",
      "commentaire": "string — 1 à 2 phrases qui expliquent ce que tu as corrigé et pourquoi",
      "changed": boolean
    }
  ]
}

JSON uniquement, pas de texte autour.`;
}

// Correction heuristique de secours (dev sans clé / échec Gemini) — honnête sur la simulation.
function fallbackCorrection(r: ReflInput): KabaCorrection {
  const flags = checkReflectionQuality(r.text, { exerciseType: "reflection_template" });
  // Nettoyage léger : doublons collés + espaces multiples + trim.
  const cleaned = r.text
    .replace(/\b(\w+)\s+\1\b/gi, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
  const changed = cleaned !== r.text.trim() || flags.length > 0;
  const commentaire = flags.length > 0
    ? `Points à revoir : ${flags.map((f) => f.message).join(" ")} (correction simulée — configure GEMINI_API_KEY pour la réécriture complète de Kaba.)`
    : "Ta formulation est déjà claire — Kaba n'a fait qu'un nettoyage léger.";
  return { taskId: r.taskId, label: r.label, before: r.text, after: cleaned, commentaire, changed };
}

interface GeminiCorrection {
  taskId?: number;
  texte_corrige?: string;
  commentaire?: string;
  changed?: boolean;
}

function parseCorrections(raw: string, inputs: ReflInput[]): KabaCorrection[] | null {
  try {
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim();
    const parsed = JSON.parse(cleaned) as { corrections?: GeminiCorrection[] };
    if (!Array.isArray(parsed.corrections)) return null;
    const byTask = new Map(parsed.corrections.map((c) => [c.taskId, c]));
    return inputs.map((r) => {
      const c = byTask.get(r.taskId);
      const after = typeof c?.texte_corrige === "string" && c.texte_corrige.trim() ? c.texte_corrige.trim() : r.text;
      return {
        taskId: r.taskId,
        label: r.label,
        before: r.text,
        after,
        commentaire: typeof c?.commentaire === "string" ? c.commentaire : "Aucun changement nécessaire.",
        changed: typeof c?.changed === "boolean" ? c.changed : after !== r.text.trim(),
      };
    });
  } catch {
    return null;
  }
}

async function correctWithGemini(niveau: number, inputs: ReflInput[]): Promise<KabaCorrection[]> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });
    const result = await model.generateContent(buildPrompt(niveau, inputs));
    const parsed = parseCorrections(result.response.text(), inputs);
    if (parsed) return parsed;
  } catch (err) {
    console.error("[perfect-level-reflections] Gemini error:", err);
  }
  return inputs.map(fallbackCorrection);
}

export async function POST(request: Request) {
  try {
    return await handlePost(request);
  } catch (err) {
    console.error("[/api/kaba/perfect-level-reflections] UNHANDLED:", err);
    return Response.json({ error: "Erreur inattendue. Réessaie." }, { status: 500 });
  }
}

async function handlePost(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "niveau requis (1-8)" }, { status: 400 });
  }
  const { niveau } = parsed.data;

  if (!getLevelById(niveau)) {
    return Response.json({ error: "Niveau introuvable" }, { status: 404 });
  }

  let user: { id: string } | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error("[perfect-level-reflections] auth error:", err);
  }

  const reflTasks = reflectionTasksForLevel(niveau);

  // ── Dev mock (pas de session) ──────────────────────────────────────────────
  if (!user) {
    if (!isDev) return Response.json({ error: "Non authentifié" }, { status: 401 });

    const inputs: ReflInput[] = reflTasks
      .map((t) => {
        const text = getMockTaskReflection("mock", t.id)?.answer;
        if (!text) return null;
        return { taskId: t.id, label: cardLabel(niveau, t.id, t.recapLabel ?? t.title), text };
      })
      .filter((r): r is ReflInput => r !== null);

    if (inputs.length === 0) {
      return Response.json({ error: "Aucune réflexion à parfaire pour ce niveau." }, { status: 400 });
    }

    const corrections = await correctWithGemini(niveau, inputs);
    for (const c of corrections) {
      if (c.changed && c.after !== c.before) updateMockReflection("mock", c.taskId, c.after);
    }
    return Response.json({ corrections });
  }

  // ── Réel (session) ───────────────────────────────────────────────────────────
  const userId = user.id;
  const reflTaskIds = reflTasks.map((t) => t.id);
  const rows = await prisma.taskReflection
    .findMany({ where: { userId, taskId: { in: reflTaskIds } }, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const byTask = new Map<number, string>();
  for (const r of rows) if (!byTask.has(r.taskId)) byTask.set(r.taskId, r.answer);

  const inputs: ReflInput[] = reflTasks
    .map((t) => {
      const text = byTask.get(t.id);
      if (!text) return null;
      return { taskId: t.id, label: cardLabel(niveau, t.id, t.recapLabel ?? t.title), text };
    })
    .filter((r): r is ReflInput => r !== null);

  if (inputs.length === 0) {
    return Response.json({ error: "Aucune réflexion à parfaire pour ce niveau." }, { status: 400 });
  }

  const corrections = await correctWithGemini(niveau, inputs);

  // Persiste les textes corrigés.
  await Promise.all(
    corrections
      .filter((c) => c.changed && c.after !== c.before)
      .map((c) =>
        prisma.taskReflection
          .updateMany({ where: { userId, taskId: c.taskId }, data: { answer: c.after } })
          .catch((err) => console.error("[perfect-level-reflections] update error:", err))
      )
  );

  return Response.json({ corrections });
}
