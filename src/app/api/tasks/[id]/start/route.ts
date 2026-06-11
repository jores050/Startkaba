import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { isLevelUnlocked, type ProgressRow } from "@/lib/progress/compute";
import { mockProgress, startMockTask } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

// POST — marque une tâche comme IN_PROGRESS.
export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const task = getTaskById(taskId);
  if (!task) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (isDev) {
        const rows = Array.from(mockProgress.values());
        if (!isLevelUnlocked(task.levelId, rows)) {
          return NextResponse.json({ error: "Niveau verrouillé" }, { status: 403 });
        }
        return NextResponse.json(startMockTask(taskId, task.levelId));
      }
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const rows: ProgressRow[] = await prisma.userProgress.findMany({
      where: { userId: user.id },
      select: {
        taskId: true,
        levelId: true,
        status: true,
        quizScore: true,
        xpEarned: true,
        completedAt: true,
      },
    });

    if (!isLevelUnlocked(task.levelId, rows)) {
      return NextResponse.json({ error: "Niveau verrouillé" }, { status: 403 });
    }

    const existing = rows.find((r) => r.taskId === taskId);
    if (existing && existing.status !== "NOT_STARTED") {
      return NextResponse.json(existing);
    }

    const progress = await prisma.userProgress.upsert({
      where: { userId_taskId: { userId: user.id, taskId } },
      update: { status: "IN_PROGRESS" },
      create: {
        userId: user.id,
        taskId,
        levelId: task.levelId,
        status: "IN_PROGRESS",
      },
    });

    return NextResponse.json(progress);
  } catch (e) {
    if (isDev) {
      return NextResponse.json(startMockTask(taskId, task.levelId));
    }
    throw e;
  }
}
