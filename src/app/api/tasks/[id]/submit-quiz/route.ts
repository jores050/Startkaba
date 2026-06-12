import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { calculateXp, getCurrentLevel, getTotalXp, QUIZ_PASS_THRESHOLD } from "@/lib/utils/xp";
import { checkAndAwardBadges } from "@/lib/utils/badges";
import { getBadgeById } from "@/data/badges";
import { mockProgress, recordMockQuizResult } from "@/lib/dev/mock-progress";
import { mockProfile } from "@/lib/dev/mock-profile";
import type { Task } from "@/types";

const isDev = process.env.NODE_ENV !== "production";
const RETRY_DELAY_MS = 5 * 60 * 1000; // 5 minutes entre deux tentatives

const submitSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number().int(),
      selectedIndex: z.number().int().min(0),
    })
  ),
});

function computeScore(task: Task, answers: { questionId: number; selectedIndex: number }[]): number {
  if (!task.quiz?.length) return 0;
  const byQuestion = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));
  const correct = task.quiz.filter(
    (q) => byQuestion.get(q.id) === q.correctIndex
  ).length;
  return Math.round((correct / task.quiz.length) * 100);
}

function retryDelayRemaining(lastAttempt: Date | string | null | undefined): number {
  if (!lastAttempt) return 0;
  const elapsed = Date.now() - new Date(lastAttempt).getTime();
  return Math.max(0, RETRY_DELAY_MS - elapsed);
}

interface QuizResponse {
  passed: boolean;
  score: number;
  xpEarned: number;
  badgesUnlocked: { id: number; name: string; icon: string; description: string }[];
}

// POST — soumet les réponses du quiz d'une tâche.
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const task = getTaskById(taskId);
  if (!task) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Réponses invalides — format attendu : { answers: [{ questionId, selectedIndex }] }" },
      { status: 400 }
    );
  }

  const score = computeScore(task, parsed.data.answers);
  const passed = score >= QUIZ_PASS_THRESHOLD;
  const xpEarned = calculateXp(taskId, score);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      try {
        return NextResponse.json(submitMock(taskId, task, passed, score, xpEarned));
      } catch (me) {
        if (me instanceof QuizError) {
          return NextResponse.json({ error: me.message, retryAfterSeconds: me.retryAfterSeconds }, { status: me.status });
        }
        throw me;
      }
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    return NextResponse.json(
      await submitReal(user.id, taskId, task, passed, score, xpEarned)
    );
  } catch (e) {
    if (e instanceof QuizError) {
      return NextResponse.json({ error: e.message, retryAfterSeconds: e.retryAfterSeconds }, { status: e.status });
    }
    console.error("[/api/tasks/[id]/submit-quiz] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

class QuizError extends Error {
  constructor(
    message: string,
    public status: number,
    public retryAfterSeconds?: number
  ) {
    super(message);
  }
}

function submitMock(
  taskId: number,
  task: Task,
  passed: boolean,
  score: number,
  xpEarned: number
): QuizResponse {
  const entry = mockProgress.get(taskId);
  if (!entry || entry.status === "NOT_STARTED") {
    throw new QuizError("Commence d'abord la tâche avant de soumettre le quiz", 400);
  }
  if (entry.status === "COMPLETED") {
    throw new QuizError("Tâche déjà complétée", 400);
  }
  const remaining = retryDelayRemaining(entry.lastAttemptAt);
  if (remaining > 0) {
    throw new QuizError(
      `Attends encore ${Math.ceil(remaining / 1000)}s avant de retenter le quiz`,
      429,
      Math.ceil(remaining / 1000)
    );
  }

  recordMockQuizResult(taskId, task.levelId, passed, score, xpEarned);

  let badgesUnlocked: QuizResponse["badgesUnlocked"] = [];
  if (passed) {
    const rows = Array.from(mockProgress.values());
    mockProfile.totalXp = getTotalXp(rows);
    mockProfile.currentLevelId = getCurrentLevel(rows);
    mockProfile.stats.tasksCompleted = rows.filter(
      (r) => r.status === "COMPLETED"
    ).length;

    const newBadgeIds = checkAndAwardBadges(
      { rows, earnedBadgeIds: mockProfile.badges.map((b) => b.badgeId) },
      "TASK_COMPLETED"
    );
    const now = new Date().toISOString();
    for (const id of newBadgeIds) {
      mockProfile.badges.push({ badgeId: id, earnedAt: now });
    }
    badgesUnlocked = newBadgeIds
      .map(getBadgeById)
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .map((b) => ({ id: b.id, name: b.name, icon: b.icon, description: b.description }));
  }

  return { passed, score, xpEarned, badgesUnlocked };
}

async function submitReal(
  userId: string,
  taskId: number,
  task: Task,
  passed: boolean,
  score: number,
  xpEarned: number
): Promise<QuizResponse> {
  const progress = await prisma.userProgress.findUnique({
    where: { userId_taskId: { userId, taskId } },
  });

  if (!progress || progress.status === "NOT_STARTED") {
    throw new QuizError("Commence d'abord la tâche avant de soumettre le quiz", 400);
  }
  if (progress.status === "COMPLETED") {
    throw new QuizError("Tâche déjà complétée", 400);
  }
  // Délai anti-spam : une tentative échouée laisse quizScore non nul
  // sur une tâche IN_PROGRESS ; updatedAt date cette tentative.
  if (progress.quizScore !== null) {
    const remaining = retryDelayRemaining(progress.updatedAt);
    if (remaining > 0) {
      throw new QuizError(
        `Attends encore ${Math.ceil(remaining / 1000)}s avant de retenter le quiz`,
        429,
        Math.ceil(remaining / 1000)
      );
    }
  }

  await prisma.userProgress.update({
    where: { userId_taskId: { userId, taskId } },
    data: passed
      ? { status: "COMPLETED", quizScore: score, xpEarned, completedAt: new Date() }
      : { quizScore: score },
  });

  let badgesUnlocked: QuizResponse["badgesUnlocked"] = [];
  if (passed) {
    const [rows, earnedBadges] = await Promise.all([
      prisma.userProgress.findMany({
        where: { userId },
        select: { taskId: true, levelId: true, status: true, xpEarned: true },
      }),
      prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true } }),
    ]);

    const newBadgeIds = checkAndAwardBadges(
      { rows, earnedBadgeIds: earnedBadges.map((b) => b.badgeId) },
      "TASK_COMPLETED"
    );

    await prisma.$transaction([
      prisma.userProfile.update({
        where: { id: userId },
        data: { totalXp: getTotalXp(rows), currentLevelId: getCurrentLevel(rows) },
      }),
      ...newBadgeIds.map((badgeId) =>
        prisma.userBadge.create({ data: { userId, badgeId } })
      ),
      ...newBadgeIds.map((badgeId) => {
        const badge = getBadgeById(badgeId)!;
        return prisma.notification.create({
          data: {
            userId,
            type: "BADGE_EARNED",
            title: `Badge débloqué : ${badge.name} ${badge.icon}`,
            body: badge.description,
          },
        });
      }),
    ]);

    badgesUnlocked = newBadgeIds
      .map(getBadgeById)
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .map((b) => ({ id: b.id, name: b.name, icon: b.icon, description: b.description }));
  }

  return { passed, score, xpEarned, badgesUnlocked };
}
