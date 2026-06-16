import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getLevelById } from "@/data/levels";
import {
  computeLevelSummaries,
  isLevelUnlocked,
  type ProgressRow,
} from "@/lib/progress/compute";
import { mockProgress } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

function buildLevelDetail(levelId: number, rows: ProgressRow[]) {
  const level = getLevelById(levelId);
  if (!level) return null;

  const summary = computeLevelSummaries(rows).find((l) => l.id === levelId)!;
  const byTask = new Map(rows.map((r) => [r.taskId, r]));

  return {
    ...summary,
    tasks: level.tasks.map((task) => {
      const p = byTask.get(task.id);
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        xp: task.xp,
        quizQuestionCount: task.quiz?.length ?? 0,
        status: p?.status ?? "NOT_STARTED",
        quizScore: p?.quizScore ?? null,
        xpEarned: p?.xpEarned ?? 0,
        completedAt: p?.completedAt ?? null,
        lesson: task.lesson,
        recapLabel: task.recapLabel,
        taskType: task.taskType,
        missionCaptureIndexes: task.missionCaptureIndexes,
        missionStatus: p?.missionStatus ?? null,
      };
    }),
  };
}

// GET — détail d'un niveau : tâches + progression.
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const levelId = Number(params.id);
  if (!Number.isInteger(levelId) || !getLevelById(levelId)) {
    return NextResponse.json({ error: "Niveau introuvable" }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      const rows = Array.from(mockProgress.values());
      if (!isLevelUnlocked(levelId, rows)) {
        return NextResponse.json(
          { error: "Niveau verrouillé — complète d'abord le niveau précédent" },
          { status: 403 }
        );
      }
      return NextResponse.json(buildLevelDetail(levelId, rows));
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const rows = await prisma.userProgress.findMany({
      where: { userId: user.id },
      select: {
        taskId: true,
        levelId: true,
        status: true,
        quizScore: true,
        xpEarned: true,
        completedAt: true,
        missionStatus: true,
      },
    });

    if (!isLevelUnlocked(levelId, rows)) {
      return NextResponse.json(
        { error: "Niveau verrouillé — complète d'abord le niveau précédent" },
        { status: 403 }
      );
    }

    return NextResponse.json(buildLevelDetail(levelId, rows));
  } catch (e) {
    console.error("[/api/levels/[id] GET] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
