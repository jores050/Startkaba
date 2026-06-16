import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { mockProgress } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

export interface MissionReminderResponse {
  pending: {
    taskId: number;
    taskTitle: string;
    levelId: number;
    missionStatus: string;
  } | null;
}

// GET — retourne la première mission en statut MISSION_IN_PROGRESS pour cet utilisateur.
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      const inProgress = Array.from(mockProgress.values()).find(
        p => p.missionStatus === "MISSION_IN_PROGRESS"
      );
      if (!inProgress) return NextResponse.json({ pending: null });
      const task = getTaskById(inProgress.taskId);
      return NextResponse.json({
        pending: task
          ? { taskId: task.id, taskTitle: task.title, levelId: task.levelId, missionStatus: "MISSION_IN_PROGRESS" }
          : null,
      });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const row = await prisma.userProgress.findFirst({
      where: { userId: user.id, missionStatus: "MISSION_IN_PROGRESS" },
      select: { taskId: true, levelId: true, missionStatus: true },
    });
    if (!row) return NextResponse.json({ pending: null });
    const task = getTaskById(row.taskId);
    return NextResponse.json({
      pending: task && row.missionStatus
        ? { taskId: task.id, taskTitle: task.title, levelId: row.levelId, missionStatus: row.missionStatus }
        : null,
    } satisfies MissionReminderResponse);
  } catch (e) {
    console.error("[/api/user/mission-reminder GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
