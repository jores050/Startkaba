import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET() {
  try {
    const profiles = await prisma.userProfile.findMany({
      where: { showcaseOptIn: true },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        city: true,
        currentLevelId: true,
        projectName: true,
        projectDescription: true,
        publicBio: true,
      },
      orderBy: { currentLevelId: "desc" },
      take: 20,
    });
    return NextResponse.json(profiles);
  } catch (err) {
    console.error("[/api/community/showcase GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
