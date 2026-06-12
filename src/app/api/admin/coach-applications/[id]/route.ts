import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

const isDev = process.env.NODE_ENV !== "production";

const patchSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "status invalide" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDev) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (isDev) {
    return NextResponse.json({ ok: true });
  }

  try {
    await prisma.userProfile.update({
      where: { id: params.id },
      data: {
        coachApplicationStatus: parsed.data.status,
        role: parsed.data.status === "APPROVED" ? "COACH" : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/admin/coach-applications/[id] PATCH]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
