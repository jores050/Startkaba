import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const helpRequest = await prisma.helpRequest.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        replies: {
          orderBy: { createdAt: "asc" },
          include: { user: { select: { id: true, fullName: true, avatarUrl: true } } },
        },
      },
    });
    if (!helpRequest) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
    return NextResponse.json(helpRequest);
  } catch (err) {
    console.error("[/api/community/help/[id] GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PATCH — marquer comme résolu (auteur uniquement)
export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? (isDev ? mockProfile.id : null);
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  try {
    const existing = await prisma.helpRequest.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
    if (existing.userId !== userId) return NextResponse.json({ error: "Interdit" }, { status: 403 });

    const updated = await prisma.helpRequest.update({
      where: { id: params.id },
      data: { status: "RESOLVED" },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[/api/community/help/[id] PATCH]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
