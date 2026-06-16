import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { getMockMicroInputs } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

// GET — récupère les micro_inputs d'une tâche pour l'utilisateur courant.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const taskId = Number(params.id);
  if (isNaN(taskId)) return NextResponse.json({ inputs: {} });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      const entries = getMockMicroInputs("mock", taskId);
      const inputs = Object.fromEntries(entries.map(e => [e.storageKey, e.value]));
      return NextResponse.json({ inputs });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const rows = await prisma.userMicroInput.findMany({
      where: { userId: user.id, taskId },
      select: { storageKey: true, value: true },
    });
    const inputs = Object.fromEntries(rows.map(r => [r.storageKey, r.value]));
    return NextResponse.json({ inputs });
  } catch (e) {
    console.error("[/api/tasks/[id]/micro-inputs GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
