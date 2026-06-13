import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { MOCK_COMMUNITY_PROFILES } from "@/lib/dev/mock-community";

const isDev = process.env.NODE_ENV !== "production";

// GET — profils ouverts à la connexion co-fondateur
export async function GET() {
  try {
    const profiles = await prisma.userProfile.findMany({
      where: { isOpenToCofounder: true },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        city: true,
        projectName: true,
        projectDescription: true,
        skills: true,
        currentLevelId: true,
        lookingFor: true,
        publicBio: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 50,
    });
    return NextResponse.json(profiles);
  } catch {
    if (isDev) return NextResponse.json(MOCK_COMMUNITY_PROFILES);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
