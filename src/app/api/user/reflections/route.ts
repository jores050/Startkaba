import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { tasks } from "@/data/tasks";
import { levels } from "@/data/levels";
import { mockProgress, getMockTaskReflection, getMockMissionDeliverable } from "@/lib/dev/mock-progress";
import type { ProjetSection, ProjetResponse, MissionDeliverable } from "@/lib/projet-types";

const isDev = process.env.NODE_ENV !== "production";

// Tasks that have a reflection_template exercise (internal — not exported)
const REFLECTION_TASKS = tasks
  .filter((t) => t.lesson?.exercises.some((e) => e.type === "reflection_template"))
  .map((t) => ({
    taskId: t.id,
    levelId: t.levelId,
    taskTitle: t.title,
    recapLabel: t.recapLabel ?? "📝 Ta réflexion",
  }));

// Mission tasks that have deliverables
const MISSION_TASKS = tasks
  .filter((t) => t.taskType === "mission")
  .map((t) => ({
    taskId: t.id,
    levelId: t.levelId,
    recapLabel: t.recapLabel ?? "🎤 Mission terrain",
  }));

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let completedTaskIds: Set<number>;
  let reflMap: Map<number, string>;
  let userCurrentLevelId: number;

  let missionNotesMap = new Map<number, string | null>();

  if (!user) {
    if (isDev) {
      completedTaskIds = new Set(
        Array.from(mockProgress.values())
          .filter((p) => p.status === "COMPLETED")
          .map((p) => p.taskId)
      );
      reflMap = new Map<number, string>();
      for (const t of REFLECTION_TASKS) {
        const ans = getMockTaskReflection("mock", t.taskId)?.answer;
        if (ans) reflMap.set(t.taskId, ans);
      }
      // Mission deliverables (dev mock)
      for (const t of MISSION_TASKS) {
        const d = getMockMissionDeliverable("mock", t.taskId, "INTERVIEW_NOTES");
        missionNotesMap.set(t.taskId, d?.content ?? null);
      }
      userCurrentLevelId = 2;
    } else {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }
  } else {
    try {
      const profile = await prisma.userProfile.findUnique({
        where: { id: user.id },
        select: { currentLevelId: true },
      });
      userCurrentLevelId = profile?.currentLevelId ?? 1;

      const progress = await prisma.userProgress.findMany({
        where: { userId: user.id, status: "COMPLETED" },
        select: { taskId: true },
      });
      completedTaskIds = new Set(progress.map((p) => p.taskId));

      const reflections = await prisma.taskReflection.findMany({
        where: {
          userId: user.id,
          taskId: { in: REFLECTION_TASKS.map((t) => t.taskId) },
        },
        orderBy: { createdAt: "desc" },
      });
      reflMap = new Map<number, string>();
      for (const r of reflections) {
        if (!reflMap.has(r.taskId)) reflMap.set(r.taskId, r.answer);
      }

      // Mission deliverables
      const deliverables = await prisma.missionDeliverable.findMany({
        where: { userId: user.id, taskId: { in: MISSION_TASKS.map(t => t.taskId) }, type: "INTERVIEW_NOTES" },
        select: { taskId: true, content: true },
      });
      for (const d of deliverables) {
        missionNotesMap.set(d.taskId, d.content);
      }
    } catch (e) {
      console.error("[/api/user/reflections GET]", e);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
  }

  const byLevel = new Map<number, typeof REFLECTION_TASKS>();
  for (const t of REFLECTION_TASKS) {
    const arr = byLevel.get(t.levelId) ?? [];
    arr.push(t);
    byLevel.set(t.levelId, arr);
  }

  const missionByLevel = new Map<number, typeof MISSION_TASKS>();
  for (const t of MISSION_TASKS) {
    const arr = missionByLevel.get(t.levelId) ?? [];
    arr.push(t);
    missionByLevel.set(t.levelId, arr);
  }

  const completedCount = REFLECTION_TASKS.filter((t) =>
    completedTaskIds.has(t.taskId)
  ).length;

  const sections: ProjetSection[] = levels.map((level) => ({
    levelId: level.id,
    levelTitle: level.title,
    isUnlocked: level.id <= userCurrentLevelId,
    reflections: (byLevel.get(level.id) ?? []).map((t) => ({
      taskId: t.taskId,
      taskTitle: t.taskTitle,
      recapLabel: t.recapLabel,
      isCompleted: completedTaskIds.has(t.taskId),
      answer: completedTaskIds.has(t.taskId) ? (reflMap.get(t.taskId) ?? null) : null,
    })),
    missionDeliverables: (missionByLevel.get(level.id) ?? []).map((t): MissionDeliverable => ({
      taskId: t.taskId,
      recapLabel: t.recapLabel,
      isCompleted: completedTaskIds.has(t.taskId),
      notes: completedTaskIds.has(t.taskId) ? (missionNotesMap.get(t.taskId) ?? null) : null,
    })),
  }));

  const body: ProjetResponse = {
    sections,
    totalSections: REFLECTION_TASKS.length,
    completedCount,
  };
  return NextResponse.json(body);
}
