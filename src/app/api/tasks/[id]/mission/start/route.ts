import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import {
  mockProgress,
  setMockMissionStatus,
  getMockMicroInputs,
} from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

// POST — démarre la phase terrain d'une mission (missionStatus → MISSION_IN_PROGRESS).
// Retourne aussi les micro_inputs de la tâche 108 pour afficher le guide d'entretien.
export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const task = getTaskById(taskId);
  if (!task || task.taskType !== "mission") {
    return NextResponse.json({ error: "Mission introuvable" }, { status: 404 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      // Ensure task is in progress first
      const existing = mockProgress.get(taskId);
      if (!existing || existing.status === "NOT_STARTED") {
        mockProgress.set(taskId, {
          taskId,
          levelId: task.levelId,
          status: "IN_PROGRESS",
          quizScore: null,
          xpEarned: 0,
          completedAt: null,
          missionStatus: "MISSION_IN_PROGRESS",
          missionStartedAt: new Date().toISOString(),
        });
      } else {
        setMockMissionStatus(taskId, task.levelId, "MISSION_IN_PROGRESS");
      }

      // Return guide from task 108 micro_inputs
      const guide = getMockMicroInputs("mock", 108);
      return NextResponse.json({
        ok: true,
        guide: {
          question_1: guide.find(m => m.storageKey === "question_1")?.value ?? null,
          question_2: guide.find(m => m.storageKey === "question_2")?.value ?? null,
        },
      });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    await prisma.userProgress.upsert({
      where: { userId_taskId: { userId: user.id, taskId } },
      update: { missionStatus: "MISSION_IN_PROGRESS", missionStartedAt: new Date() },
      create: {
        userId: user.id,
        taskId,
        levelId: task.levelId,
        status: "IN_PROGRESS",
        missionStatus: "MISSION_IN_PROGRESS",
        missionStartedAt: new Date(),
      },
    });

    const guide108 = await prisma.userMicroInput.findMany({
      where: { userId: user.id, taskId: 108, storageKey: { in: ["question_1", "question_2"] } },
      select: { storageKey: true, value: true },
    });
    const guideMap = new Map(guide108.map(m => [m.storageKey, m.value]));

    return NextResponse.json({
      ok: true,
      guide: {
        question_1: guideMap.get("question_1") ?? null,
        question_2: guideMap.get("question_2") ?? null,
      },
    });
  } catch (e) {
    console.error("[/api/tasks/[id]/mission/start] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

