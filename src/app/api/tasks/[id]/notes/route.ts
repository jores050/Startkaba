import { NextResponse } from "next/server";
import { z } from "zod";
import { getTaskById } from "@/data/tasks";

// Notes personnelles par tâche — mock en mémoire (singleton globalThis).
const globalForMock = globalThis as unknown as {
  mockTaskNotes?: Map<number, string>;
};
const notes = globalForMock.mockTaskNotes ?? new Map<number, string>();
globalForMock.mockTaskNotes = notes;

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  if (!getTaskById(taskId)) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }
  return NextResponse.json({ note: notes.get(taskId) ?? "" });
}

const noteSchema = z.object({ note: z.string().max(2000, "Note trop longue (2000 caractères max)") });

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  if (!getTaskById(taskId)) {
    return NextResponse.json({ error: "Tâche introuvable" }, { status: 404 });
  }
  const body = await request.json().catch(() => null);
  const parsed = noteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Format invalide" },
      { status: 400 }
    );
  }
  notes.set(taskId, parsed.data.note);
  return NextResponse.json({ ok: true, note: parsed.data.note });
}
