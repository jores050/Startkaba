import { z } from "zod";
import { genAI } from "@/lib/gemini/client";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getLevelById } from "@/data/levels";
import { tasks } from "@/data/tasks";
import { getMockTaskReflection } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

const schema = z.object({ levelId: z.number().int().min(1).max(8) });

// Tasks du niveau ayant un exercice reflection_template
function reflectionTasksForLevel(levelId: number) {
  return tasks.filter(
    (t) => t.levelId === levelId && t.lesson?.exercises.some((e) => e.type === "reflection_template")
  );
}

function buildAnalysisPrompt(
  levelTitle: string,
  levelId: number,
  reflections: { recapLabel: string; answer: string }[]
): string {
  const reflectionBlock = reflections
    .map((r) => `### ${r.recapLabel}\n${r.answer}`)
    .join("\n\n");

  return `Tu es Kaba, coach entrepreneurial de StartKaba (Afrique de l'Ouest). Analyse ces réponses et donne un retour structuré en 3 paragraphes courts, ton direct et bienveillant, tutoiement.

## Réponses de l'entrepreneur — Niveau ${levelId} : ${levelTitle}

${reflectionBlock}

---

Donne exactement :

1. **Un point fort** — ce qui est déjà clair, solide ou bien pensé dans ces réponses. Cite le contenu réel, sois précis.

2. **Un point à améliorer** — le plus important. Formule une suggestion concrète et actionnable, ancrée dans la réalité UEMOA (Mobile Money, informalité, marché local). Cite ce que l'entrepreneur a écrit pour montrer que tu l'as lu.

3. **Une question pour aller plus loin** — une seule question ouverte, socratique, qui prépare le niveau suivant ou pousse à approfondir.

Format : 3 paragraphes courts (2-3 phrases chacun). Pas de bullet points. Pas de titres. Commence directement par le contenu, sans introduction comme "Voici mon analyse".`;
}

async function mockAnalysis(levelId: number): Promise<string> {
  const level = getLevelById(levelId);
  const reflTaskIds = reflectionTasksForLevel(levelId).map((t) => t.id);
  const hasContent = reflTaskIds.some((id) => getMockTaskReflection("mock", id)?.answer);

  if (!hasContent) {
    return `Tu n'as pas encore complété les réflexions de ce niveau — reviens ici une fois les tâches terminées pour que je puisse t'analyser vraiment.\n\nComme on dit : "Petit à petit, l'oiseau fait son nid." Chaque tâche complétée est une brique de ton projet.`;
  }

  return `Bon travail sur le Niveau ${levelId} — ${level?.title}. Tes réponses montrent que tu as commencé à ancrer ton idée dans une réalité concrète, ce qui est exactement ce qu'on cherche à ce stade.\n\nCe que j'aimerais que tu approfondisses : tes formulations restent encore un peu générales. Le marché d'Afrique de l'Ouest récompense la précision — un client précis, un problème précis, une solution précise. Reprends tes réponses et demande-toi : "Est-ce que je pourrais nommer une vraie personne qui correspond exactement à ce que j'ai écrit ?"\n\nAvant de passer au niveau suivant : qu'est-ce qui te ferait dire, sans hésitation, que ton idée est prête à être testée ? *(Réponse simulée — connecte GEMINI_API_KEY pour l'analyse réelle.)*`;
}

export async function POST(request: Request) {
  try {
    return await handlePost(request);
  } catch (err) {
    console.error("[/api/coach/analyze-level] UNHANDLED:", err);
    return Response.json(
      { error: "Erreur inattendue. Réessaie dans quelques instants." },
      { status: 500 }
    );
  }
}

async function handlePost(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "levelId requis (1-8)" }, { status: 400 });
  }
  const { levelId } = parsed.data;

  const level = getLevelById(levelId);
  if (!level) {
    return Response.json({ error: "Niveau introuvable" }, { status: 404 });
  }

  let user: { id: string } | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (err) {
    console.error("[/api/coach/analyze-level] Supabase auth error:", err);
  }

  // ── Dev mock (pas de session) ──────────────────────────────────────────────
  if (!user) {
    if (isDev) {
      const content = await mockAnalysis(levelId);
      return Response.json({ content, cached: false });
    }
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = user.id;

  // ── Récupère ou génère l'analyse ──────────────────────────────────────────
  const existing = await prisma.levelAnalysis.findUnique({
    where: { userId_levelId: { userId, levelId } },
  }).catch((err) => { console.error("[analyze-level] findUnique error:", err); return null; });

  // Si une analyse existe et que le client ne force pas la régénération
  const forceRegen = request.url.includes("regen=1");
  if (existing && !forceRegen) {
    return Response.json({ content: existing.content, cached: true });
  }

  // Récupère les reflections du niveau
  const reflTaskIds = reflectionTasksForLevel(levelId).map((t) => t.id);
  if (reflTaskIds.length === 0) {
    return Response.json({ error: "Aucune réflexion pour ce niveau" }, { status: 404 });
  }

  const rows = await prisma.taskReflection.findMany({
    where: { userId, taskId: { in: reflTaskIds } },
    orderBy: { createdAt: "desc" },
  }).catch((err) => { console.error("[analyze-level] findMany error:", err); return []; });

  // Déduplique par taskId (garde la plus récente)
  const byTask = new Map<number, string>();
  for (const r of rows) {
    if (!byTask.has(r.taskId)) byTask.set(r.taskId, r.answer);
  }

  const reflections = reflTaskIds
    .map((id) => {
      const task = tasks.find((t) => t.id === id);
      const answer = byTask.get(id);
      if (!task || !answer) return null;
      return { recapLabel: task.recapLabel ?? task.title, answer };
    })
    .filter((r): r is { recapLabel: string; answer: string } => r !== null);

  if (reflections.length === 0) {
    return Response.json({
      content: "Complète d'abord les réflexions de ce niveau pour recevoir l'analyse de Kaba.",
      cached: false,
    });
  }

  // Appel Gemini (non streamé)
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = buildAnalysisPrompt(level.title, levelId, reflections);
    const result = await model.generateContent(prompt);
    const content = result.response.text();

    // Upsert en base
    await prisma.levelAnalysis.upsert({
      where: { userId_levelId: { userId, levelId } },
      create: { userId, levelId, content },
      update: { content },
    });

    return Response.json({ content, cached: false });
  } catch (err) {
    console.error("[/api/coach/analyze-level] Gemini error:", err);
    return Response.json(
      { error: "Kaba est indisponible pour le moment. Réessaie dans quelques instants." },
      { status: 503 }
    );
  }
}
