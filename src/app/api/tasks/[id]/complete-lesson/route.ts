import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { getCurrentLevel, getTotalXp } from "@/lib/utils/xp";
import { checkAndAwardBadges } from "@/lib/utils/badges";
import { getBadgeById } from "@/data/badges";
import { mockProgress, recordMockLessonComplete, upsertMockReflection } from "@/lib/dev/mock-progress";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

const bodySchema = z.object({
  xpEarned: z.number().int().min(0).max(500),
  reflections: z.array(z.object({
    exerciseIndex: z.number().int().min(0),
    answer: z.string().max(10000),
  })).optional().default([]),
});

interface LessonResponse {
  xpEarned: number;
  badgesUnlocked: { id: number; name: string; icon: string; description: string }[];
}

// POST — marque une leçon comme complétée, attribue l'XP, sauvegarde les réflexions.
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const task = getTaskById(taskId);
  if (!task) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }
  if (!task.lesson) {
    return NextResponse.json({ error: "Cette tâche n\'utilise pas le format leçon" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "xpEarned requis (entier 0-500)" }, { status: 400 });
  }

  const { xpEarned, reflections } = parsed.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      return NextResponse.json(completeMock(taskId, task.levelId, xpEarned, reflections));
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    return NextResponse.json(await completeReal(user.id, taskId, task.levelId, xpEarned, reflections));
  } catch (e) {
    console.error("[/api/tasks/[id]/complete-lesson] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function completeMock(
  taskId: number,
  levelId: number,
  xpEarned: number,
  reflections: { exerciseIndex: number; answer: string }[]
): LessonResponse {
  recordMockLessonComplete(taskId, levelId, xpEarned);

  const now = new Date().toISOString();
  for (const r of reflections) {
    upsertMockReflection({ userId: "mock", taskId, levelId, exerciseIndex: r.exerciseIndex, answer: r.answer, createdAt: now });
  }

  const rows = Array.from(mockProgress.values());
  mockProfile.totalXp = getTotalXp(rows);
  mockProfile.currentLevelId = getCurrentLevel(rows);
  mockProfile.stats.tasksCompleted = rows.filter(r => r.status === "COMPLETED").length;

  const newBadgeIds = checkAndAwardBadges(
    { rows, earnedBadgeIds: mockProfile.badges.map(b => b.badgeId) },
    "TASK_COMPLETED"
  );
  for (const id of newBadgeIds) {
    mockProfile.badges.push({ badgeId: id, earnedAt: now });
  }

  return {
    xpEarned,
    badgesUnlocked: newBadgeIds
      .map(getBadgeById)
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .map(b => ({ id: b.id, name: b.name, icon: b.icon, description: b.description })),
  };
}

async function completeReal(
  userId: string,
  taskId: number,
  levelId: number,
  xpEarned: number,
  reflections: { exerciseIndex: number; answer: string }[]
): Promise<LessonResponse> {
  await prisma.userProgress.upsert({
    where: { userId_taskId: { userId, taskId } },
    update: { status: "COMPLETED", xpEarned, completedAt: new Date() },
    create: { userId, taskId, levelId, status: "COMPLETED", xpEarned, completedAt: new Date() },
  });

  // Upsert reflections
  if (reflections.length > 0) {
    await Promise.all(reflections.map(r =>
      prisma.taskReflection.upsert({
        where: { userId_taskId_exerciseIndex: { userId, taskId, exerciseIndex: r.exerciseIndex } },
        update: { answer: r.answer },
        create: { userId, taskId, levelId, exerciseIndex: r.exerciseIndex, answer: r.answer },
      })
    ));
  }

  const [rows, earnedBadges] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId },
      select: { taskId: true, levelId: true, status: true, xpEarned: true },
    }),
    prisma.userBadge.findMany({ where: { userId }, select: { badgeId: true } }),
  ]);

  const newBadgeIds = checkAndAwardBadges(
    { rows, earnedBadgeIds: earnedBadges.map(b => b.badgeId) },
    "TASK_COMPLETED"
  );

  await prisma.$transaction([
    prisma.userProfile.update({
      where: { id: userId },
      data: { totalXp: getTotalXp(rows), currentLevelId: getCurrentLevel(rows) },
    }),
    ...newBadgeIds.map(badgeId => prisma.userBadge.create({ data: { userId, badgeId } })),
    ...newBadgeIds.map(badgeId => {
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

  return {
    xpEarned,
    badgesUnlocked: newBadgeIds
      .map(getBadgeById)
      .filter((b): b is NonNullable<typeof b> => Boolean(b))
      .map(b => ({ id: b.id, name: b.name, icon: b.icon, description: b.description })),
  };
}
