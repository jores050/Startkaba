import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { updateMockConnectionStatus } from "@/lib/dev/mock-community";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

const patchSchema = z.object({
  status: z.enum(["ACCEPTED", "DECLINED"]),
});

// PATCH — accepter ou refuser une demande de connexion reçue
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "status requis (ACCEPTED|DECLINED)" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      updateMockConnectionStatus(params.id, parsed.data.status);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const conn = await prisma.connectionRequest.findUnique({
      where: { id: params.id },
    });
    if (!conn) {
      return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });
    }
    if (conn.toUserId !== user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    const updated = await prisma.connectionRequest.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[/api/community/connections/[id] PATCH]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
