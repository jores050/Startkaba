import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getTaskById } from "@/data/tasks";
import { getMockTaskReflection, updateMockReflection } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

// GET — retourne la reflection sauvegardée pour (userId, taskId)
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      const entry = getMockTaskReflection("mock", taskId);
      return NextResponse.json({ answer: entry?.answer ?? null });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const row = await prisma.taskReflection.findFirst({
      where: { userId: user.id, taskId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ answer: row?.answer ?? null });
  } catch (e) {
    console.error("[/api/tasks/[id]/reflection GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const putSchema = z.object({ answer: z.string().min(1).max(10000) });

// PUT — met à jour la reflection sauvegardée
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  const task = getTaskById(taskId);
  if (!task) return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = putSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "answer requis" }, { status: 400 });
  const { answer } = parsed.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      updateMockReflection("mock", taskId, answer);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    await prisma.taskReflection.updateMany({
      where: { userId: user.id, taskId },
      data: { answer },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/tasks/[id]/reflection PUT]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
