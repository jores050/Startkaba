import { z } from "zod";
import { genAI } from "@/lib/gemini/client";
import { buildSystemPrompt } from "@/lib/gemini/build-system-prompt";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getLevelById } from "@/data/levels";
import { computeQuota } from "@/lib/coach/quota";
import { addMockMessage, mockCoachMessages, mockKabaReply } from "@/lib/dev/mock-coach";
import { mockProgress } from "@/lib/dev/mock-progress";
import { mockProfile } from "@/lib/dev/mock-profile";
import type { UserProfile } from "@/types";

const isDev = process.env.NODE_ENV !== "production";

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  levelId: z.number().int().min(1).max(8),
});

function sse(controller: ReadableStreamDefaultController, event: string, data: unknown) {
  controller.enqueue(
    new TextEncoder().encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
  );
}

function sseResponse(stream: ReadableStream) {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

function mockStream(message: string, levelId: number): Response {
  const rows = Array.from(mockProgress.values());
  const userCount = mockCoachMessages.filter((m) => m.role === "USER").length;
  const quota = computeQuota(rows, userCount, mockProfile.subscriptionStatus === "PREMIUM");

  if (!quota.isPremium && quota.remaining <= 0) {
    return Response.json(
      { error: "Quota Kaba épuisé — débloque le niveau suivant ou passe en Premium", quotaRemaining: 0 },
      { status: 429 }
    );
  }

  addMockMessage(levelId, "USER", message);
  const reply = mockKabaReply(message, levelId);
  const words = reply.split(/(?<=\s)/);

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of words) {
        sse(controller, "delta", { text: word });
        await new Promise((r) => setTimeout(r, 18));
      }
      addMockMessage(levelId, "ASSISTANT", reply);
      sse(controller, "done", {
        quotaRemaining: quota.isPremium ? -1 : quota.remaining - 1,
      });
      controller.close();
    },
  });

  return sseResponse(stream);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Format invalide : { message, levelId }" }, { status: 400 });
  }
  const { message, levelId } = parsed.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) return mockStream(message, levelId);
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }
  const userId = user.id;

  let profile: UserProfile | null = null;
  try {
    profile = (await prisma.userProfile.findUnique({
      where: { id: userId },
    })) as UserProfile | null;
  } catch (e) {
    console.error("[/api/coach/chat] erreur profil:", e);
    return Response.json({ error: "Service indisponible" }, { status: 503 });
  }

  if (!profile) {
    return Response.json({ error: "Profil introuvable" }, { status: 404 });
  }

  const level = getLevelById(levelId);
  if (!level) {
    return Response.json({ error: "Niveau introuvable" }, { status: 404 });
  }

  const [rows, userCount] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId },
      select: { taskId: true, levelId: true, status: true, quizScore: true, xpEarned: true, completedAt: true },
    }),
    prisma.coachMessage.count({ where: { userId, role: "USER" } }),
  ]);

  const quota = computeQuota(rows, userCount, profile.subscriptionStatus === "PREMIUM");
  if (!quota.isPremium && quota.remaining <= 0) {
    return Response.json(
      { error: "Quota Kaba épuisé — débloque le niveau suivant ou passe en Premium", quotaRemaining: 0 },
      { status: 429 }
    );
  }

  // Historique glissant : 20 derniers messages du niveau courant
  const history = (
    await prisma.coachMessage.findMany({
      where: { userId, levelId },
      orderBy: { createdAt: "desc" },
      take: 20,
    })
  ).reverse();

  // Reflections déjà écrites — Kaba connaît le projet réel
  const reflectionRows = await prisma.taskReflection.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const { tasks } = await import("@/data/tasks");
  const reflections = reflectionRows
    .map((r) => {
      const task = tasks.find((t) => t.id === r.taskId);
      return task ? { recapLabel: task.recapLabel ?? task.title, answer: r.answer } : null;
    })
    .filter((r): r is { recapLabel: string; answer: string } => r !== null);

  const completedTasksCount = rows.filter(
    (r) => r.levelId === levelId && r.status === "COMPLETED"
  ).length;

  await prisma.coachMessage.create({
    data: { userId, levelId, role: "USER", content: message },
  });

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: buildSystemPrompt({ user: profile, level, completedTasksCount, reflections }),
    });

    const geminiHistory = history.map((m) => ({
      role: m.role === "USER" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessageStream(message);

    const stream = new ReadableStream({
      async start(controller) {
        let full = "";
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              full += text;
              sse(controller, "delta", { text });
            }
          }
          await prisma.coachMessage.create({
            data: { userId, levelId, role: "ASSISTANT", content: full },
          });
          sse(controller, "done", {
            quotaRemaining: quota.isPremium ? -1 : quota.remaining - 1,
          });
        } catch (err) {
          console.error("[/api/coach/chat] Gemini error:", err);
          sse(controller, "error", {
            message: "Kaba est indisponible pour le moment. Réessaie dans quelques minutes.",
          });
        } finally {
          controller.close();
        }
      },
    });

    return sseResponse(stream);
  } catch (err) {
    console.error("[/api/coach/chat] Gemini init error:", err);
    return Response.json(
      { error: "Kaba est indisponible pour le moment" },
      { status: 503 }
    );
  }
}
