import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { getMockReflections } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

export interface ReflectionWithMeta {
  taskId: number;
  taskTitle: string;
  levelId: number;
  exerciseIndex: number;
  question: string;
  answer: string;
  createdAt: string;
}

// GET — retourne toutes les réflexions de l'utilisateur connecté.
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      return NextResponse.json(enrichReflections(getMockReflections("mock")));
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const rows = await prisma.taskReflection.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enrichReflections(rows.map(r => ({
      userId: r.userId,
      taskId: r.taskId,
      levelId: r.levelId,
      exerciseIndex: r.exerciseIndex,
      answer: r.answer,
      createdAt: r.createdAt.toISOString(),
    }))));
  } catch (e) {
    console.error("[/api/reflections]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function enrichReflections(rows: { taskId: number; levelId: number; exerciseIndex: number; answer: string; createdAt: string }[]): ReflectionWithMeta[] {
  return rows.flatMap(r => {
    const task = getTaskById(r.taskId);
    if (!task?.lesson) return [];
    const ex = task.lesson.exercises[r.exerciseIndex];
    if (!ex || ex.type !== "reflection") return [];
    return [{
      taskId: r.taskId,
      taskTitle: task.title,
      levelId: r.levelId,
      exerciseIndex: r.exerciseIndex,
      question: ex.question,
      answer: r.answer,
      createdAt: r.createdAt,
    }];
  });
}
