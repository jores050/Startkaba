import { z } from "zod";
import { Prisma } from "@prisma/client";
import { genAI } from "@/lib/gemini/client";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getLevelById } from "@/data/levels";
import { tasks } from "@/data/tasks";
import { LEVEL_RECAP_CARDS } from "@/data/level-meta";
import { getMockTaskReflection, getKabaReview, saveKabaReview } from "@/lib/dev/mock-progress";
import { isKabaScore, type KabaReview } from "@/lib/kaba/review-types";

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

function buildPrompt(
  niveau: number,
  reflections: { label: string; text: string; taskId: number }[]
): string {
  const block = reflections
    .map((r) => `Tâche ${r.taskId} (${r.label}) : "${r.text}"`)
    .join("\n");

  return `Tu es Kaba en mode challenger (coach entrepreneurial StartKaba, Afrique de l'Ouest, tutoiement, jamais flatteur par défaut).

L'utilisateur vient de terminer le Niveau ${niveau} de StartKaba.
Voici ses réflexions consolidées :

${block}

Mission : produire une analyse honnête au format JSON strict :

{
  "verdict_global": "string — 1 phrase qui résume si le niveau est solide ou s'il faut ajuster",
  "score": "string — un des 4 : 'excellent', 'solide_avec_ajustements', 'à_retravailler', 'à_recommencer'",
  "forces": ["string — force réelle observée (max 2 phrases)"],
  "ajustements_suggérés": [
    {
      "card": "string — quelle card (ex: 'Ton client idéal')",
      "probleme": "string — quel défaut précis",
      "lecon_citee": "string — quelle leçon de quelle tâche le rappelle",
      "reformulation_possible": "string — une suggestion concrète"
    }
  ],
  "proverbe_takeaway": "string — proverbe africain ou phrase mémorable de takeaway"
}

Règles :
- N'invente pas de forces si tu n'en vois pas réellement (max 3 forces, max 4 ajustements).
- Sois précis dans les citations — cite les mots exacts de l'utilisateur entre guillemets.
- Si une réflexion est manifestement bâclée ou contient des fautes lourdes, dis-le.
- Si une réflexion est excellente, dis-le aussi sans flatterie.
- JSON uniquement, pas de texte autour.`;
}

// Verdict de secours si le parsing échoue ou en dev sans clé API.
function fallbackReview(niveau: number, hasContent: boolean): KabaReview {
  if (!hasContent) {
    return {
      verdict_global: `Tu n'as pas encore rempli les réflexions du Niveau ${niveau} — reviens ici une fois tes tâches terminées.`,
      score: "à_retravailler",
      forces: [],
      ajustements_suggérés: [],
      proverbe_takeaway: "Petit à petit, l'oiseau fait son nid.",
    };
  }
  return {
    verdict_global: `Ton Niveau ${niveau} est posé, mais quelques formulations gagneraient à être plus précises avant publication.`,
    score: "solide_avec_ajustements",
    forces: [
      "Tu as pris le temps de remplir chaque réflexion — c'est la base d'un projet solide.",
    ],
    ajustements_suggérés: [
      {
        card: "Tes réflexions",
        probleme: "Certaines formulations restent générales.",
        lecon_citee: "Le marché ouest-africain récompense la précision (Niveau 1).",
        reformulation_possible: "Reprends chaque réponse et demande-toi : pourrais-je nommer une vraie personne qui correspond exactement ?",
      },
    ],
    proverbe_takeaway: "La précision est la politesse de l'entrepreneur. (Analyse simulée — configure GEMINI_API_KEY pour le vrai Kaba.)",
  };
}

function parseReview(raw: string, niveau: number, hasContent: boolean): KabaReview {
  try {
    // Gemini peut entourer le JSON de ```json ... ```
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim();
    const parsed = JSON.parse(cleaned) as Partial<KabaReview>;
    const score = isKabaScore(parsed.score) ? parsed.score : "solide_avec_ajustements";
    return {
      verdict_global: typeof parsed.verdict_global === "string" ? parsed.verdict_global : fallbackReview(niveau, hasContent).verdict_global,
      score,
      forces: Array.isArray(parsed.forces) ? parsed.forces.filter((f): f is string => typeof f === "string").slice(0, 3) : [],
      ajustements_suggérés: Array.isArray(parsed.ajustements_suggérés)
        ? parsed.ajustements_suggérés
            .filter((a): a is KabaReview["ajustements_suggérés"][number] => Boolean(a) && typeof a === "object")
            .slice(0, 4)
        : [],
      proverbe_takeaway: typeof parsed.proverbe_takeaway === "string" ? parsed.proverbe_takeaway : "",
    };
  } catch {
    return fallbackReview(niveau, hasContent);
  }
}

export async function POST(request: Request) {
  try {
    return await handlePost(request);
  } catch (err) {
    console.error("[/api/kaba/analyze-level-reflections] UNHANDLED:", err);
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
  const forceRegen = request.url.includes("regen=1");

  const level = getLevelById(niveau);
  if (!level) return Response.json({ error: "Niveau introuvable" }, { status: 404 });

  let user: { id: string } | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error("[analyze-level-reflections] auth error:", err);
  }

  const reflTasks = reflectionTasksForLevel(niveau);

  // ── Dev mock (pas de session) ──────────────────────────────────────────────
  if (!user) {
    if (isDev) {
      const cached = getKabaReview("mock", niveau);
      if (cached && !forceRegen) return Response.json({ review: cached, cached: true });

      const hasContent = reflTasks.some((t) => getMockTaskReflection("mock", t.id)?.answer);
      const review = fallbackReview(niveau, hasContent);
      saveKabaReview("mock", niveau, review);
      return Response.json({ review, cached: false });
    }
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = user.id;

  // ── Cache DB ───────────────────────────────────────────────────────────────
  const existing = await prisma.levelKabaReview
    .findUnique({ where: { userId_levelNumber: { userId, levelNumber: niveau } } })
    .catch(() => null);

  if (existing && !forceRegen) {
    return Response.json({
      review: {
        verdict_global: existing.verdictGlobal,
        score: existing.score,
        forces: existing.forces,
        ajustements_suggérés: existing.ajustements,
        proverbe_takeaway: existing.proverbe,
      },
      cached: true,
    });
  }

  // ── Récupère les réflexions ─────────────────────────────────────────────────
  const reflTaskIds = reflTasks.map((t) => t.id);
  const rows = await prisma.taskReflection
    .findMany({ where: { userId, taskId: { in: reflTaskIds } }, orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const byTask = new Map<number, string>();
  for (const r of rows) if (!byTask.has(r.taskId)) byTask.set(r.taskId, r.answer);

  const reflections = reflTasks
    .map((t) => {
      const text = byTask.get(t.id);
      if (!text) return null;
      return { taskId: t.id, label: cardLabel(niveau, t.id, t.recapLabel ?? t.title), text };
    })
    .filter((r): r is { taskId: number; label: string; text: string } => r !== null);

  const hasContent = reflections.length > 0;

  let review: KabaReview;
  if (!hasContent) {
    review = fallbackReview(niveau, false);
  } else {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });
      const result = await model.generateContent(buildPrompt(niveau, reflections));
      review = parseReview(result.response.text(), niveau, hasContent);
    } catch (err) {
      console.error("[analyze-level-reflections] Gemini error:", err);
      review = fallbackReview(niveau, hasContent);
    }
  }

  // ── Upsert en base ───────────────────────────────────────────────────────────
  await prisma.levelKabaReview
    .upsert({
      where: { userId_levelNumber: { userId, levelNumber: niveau } },
      create: {
        userId,
        levelNumber: niveau,
        verdictGlobal: review.verdict_global,
        score: review.score,
        forces: review.forces as unknown as Prisma.InputJsonValue,
        ajustements: review.ajustements_suggérés as unknown as Prisma.InputJsonValue,
        proverbe: review.proverbe_takeaway,
      },
      update: {
        verdictGlobal: review.verdict_global,
        score: review.score,
        forces: review.forces as unknown as Prisma.InputJsonValue,
        ajustements: review.ajustements_suggérés as unknown as Prisma.InputJsonValue,
        proverbe: review.proverbe_takeaway,
      },
    })
    .catch((err) => console.error("[analyze-level-reflections] upsert error:", err));

  return Response.json({ review, cached: false });
}
