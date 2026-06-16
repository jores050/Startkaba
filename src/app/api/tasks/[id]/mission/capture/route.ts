import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { getCurrentLevel, getTotalXp } from "@/lib/utils/xp";
import { checkAndAwardBadges } from "@/lib/utils/badges";
import { getBadgeById } from "@/data/badges";
import {
  mockProgress,
  setMockMissionStatus,
  upsertMockReflection,
  upsertMockMicroInput,
  upsertMockMissionDeliverable,
} from "@/lib/dev/mock-progress";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

const bodySchema = z.object({
  xpEarned: z.number().int().min(0).max(500),
  interviewNotes: z.string().max(20000).optional().default(""),
  microInputs: z.array(z.object({
    storageKey: z.string().max(100),
    value: z.string().max(10000),
  })).optional().default([]),
  reflections: z.array(z.object({
    exerciseIndex: z.number().int().min(0),
    answer: z.string().max(10000),
  })).optional().default([]),
});

// POST — complète la phase terrain (Phase C) : notes + micro_inputs + reflection → COMPLETED.
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const task = getTaskById(taskId);
  if (!task || task.taskType !== "mission") {
    return NextResponse.json({ error: "Mission introuvable" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }
  const { xpEarned, interviewNotes, microInputs, reflections } = parsed.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      return NextResponse.json(completeMock(taskId, task.levelId, xpEarned, interviewNotes, microInputs, reflections));
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    return NextResponse.json(
      await completeReal(user.id, taskId, task.levelId, xpEarned, interviewNotes, microInputs, reflections)
    );
  } catch (e) {
    console.error("[/api/tasks/[id]/mission/capture] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function completeMock(
  taskId: number,
  levelId: number,
  xpEarned: number,
  interviewNotes: string,
  microInputs: { storageKey: string; value: string }[],
  reflections: { exerciseIndex: number; answer: string }[]
) {
  const now = new Date().toISOString();

  // Save raw notes as mission deliverable
  if (interviewNotes.trim()) {
    upsertMockMissionDeliverable({ userId: "mock", taskId, type: "INTERVIEW_NOTES", content: interviewNotes });
  }

  // Save micro_inputs
  for (const m of microInputs) {
    upsertMockMicroInput({ userId: "mock", taskId, storageKey: m.storageKey, value: m.value });
  }

  // Save reflections
  for (const r of reflections) {
    upsertMockReflection({ userId: "mock", taskId, levelId, exerciseIndex: r.exerciseIndex, answer: r.answer, createdAt: now });
  }

  // Mark mission as COMPLETED
  setMockMissionStatus(taskId, levelId, "COMPLETED");
  const entry = mockProgress.get(taskId)!;
  mockProgress.set(taskId, { ...entry, xpEarned });

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
  interviewNotes: string,
  microInputs: { storageKey: string; value: string }[],
  reflections: { exerciseIndex: number; answer: string }[]
) {
  // Save raw interview notes
  if (interviewNotes.trim()) {
    await prisma.missionDeliverable.upsert({
      where: { userId_taskId_type: { userId, taskId, type: "INTERVIEW_NOTES" } },
      update: { content: interviewNotes },
      create: { userId, taskId, type: "INTERVIEW_NOTES", content: interviewNotes },
    });
  }

  // Upsert micro_inputs
  for (const m of microInputs) {
    await prisma.userMicroInput.upsert({
      where: { userId_taskId_storageKey: { userId, taskId, storageKey: m.storageKey } },
      update: { value: m.value },
      create: { userId, taskId, storageKey: m.storageKey, value: m.value },
    });
  }

  // Upsert reflections
  for (const r of reflections) {
    await prisma.taskReflection.upsert({
      where: { userId_taskId_exerciseIndex: { userId, taskId, exerciseIndex: r.exerciseIndex } },
      update: { answer: r.answer },
      create: { userId, taskId, levelId, exerciseIndex: r.exerciseIndex, answer: r.answer },
    });
  }

  // Mark COMPLETED + missionStatus=COMPLETED
  await prisma.userProgress.upsert({
    where: { userId_taskId: { userId, taskId } },
    update: { status: "COMPLETED", xpEarned, completedAt: new Date(), missionStatus: "COMPLETED", missionCompletedAt: new Date() },
    create: { userId, taskId, levelId, status: "COMPLETED", xpEarned, completedAt: new Date(), missionStatus: "COMPLETED", missionStartedAt: new Date(), missionCompletedAt: new Date() },
  });

  const [rows, earnedBadges] = await Promise.all([
    prisma.userProgress.findMany({ where: { userId }, select: { taskId: true, levelId: true, status: true, xpEarned: true } }),
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
        data: { userId, type: "BADGE_EARNED", title: `Badge débloqué : ${badge.name} ${badge.icon}`, body: badge.description },
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

void mockProgress;
