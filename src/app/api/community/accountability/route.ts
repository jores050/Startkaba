import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? (isDev ? mockProfile.id : null);
  } catch {
    return isDev ? mockProfile.id : null;
  }
}

// GET — récupère le binôme actif de l'utilisateur
export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  try {
    const pair = await prisma.accountabilityPair.findFirst({
      where: {
        status: "ACTIVE",
        OR: [{ userAId: userId }, { userBId: userId }],
      },
      include: {
        userA: { select: { id: true, fullName: true, avatarUrl: true, city: true, currentLevelId: true } },
        userB: { select: { id: true, fullName: true, avatarUrl: true, city: true, currentLevelId: true } },
      },
    });
    return NextResponse.json(pair ?? null);
  } catch (err) {
    console.error("[/api/community/accountability GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST — chercher un binôme (même niveau, ville différente)
export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  try {
    // Vérifier que l'utilisateur n'a pas déjà un binôme actif
    const existing = await prisma.accountabilityPair.findFirst({
      where: {
        status: "ACTIVE",
        OR: [{ userAId: userId }, { userBId: userId }],
      },
    });
    if (existing) return NextResponse.json({ error: "Tu as déjà un binôme actif" }, { status: 409 });

    const me = await prisma.userProfile.findUnique({
      where: { id: userId },
      select: { currentLevelId: true, city: true },
    });
    if (!me) return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });

    // Chercher un candidat : même niveau, ville différente, sans binôme actif
    const alreadyPaired = await prisma.accountabilityPair.findMany({
      where: { status: "ACTIVE" },
      select: { userAId: true, userBId: true },
    });
    const pairedIds = alreadyPaired.flatMap(p => [p.userAId, p.userBId]);

    const candidate = await prisma.userProfile.findFirst({
      where: {
        id: { not: userId, notIn: pairedIds },
        currentLevelId: me.currentLevelId,
        city: { not: me.city },
      },
      select: { id: true, fullName: true, avatarUrl: true, city: true, currentLevelId: true },
    });

    if (!candidate) {
      return NextResponse.json({ error: "Aucun binôme disponible pour l'instant" }, { status: 404 });
    }

    const pair = await prisma.accountabilityPair.create({
      data: { userAId: userId, userBId: candidate.id },
      include: {
        userA: { select: { id: true, fullName: true, avatarUrl: true, city: true, currentLevelId: true } },
        userB: { select: { id: true, fullName: true, avatarUrl: true, city: true, currentLevelId: true } },
      },
    });
    return NextResponse.json(pair, { status: 201 });
  } catch (err) {
    console.error("[/api/community/accountability POST]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
