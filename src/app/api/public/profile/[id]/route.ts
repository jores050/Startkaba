import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { mockProfile } from "@/lib/dev/mock-profile";
import { CITIES } from "@/lib/validations/auth";

const isDev = process.env.NODE_ENV !== "production";

// GET /api/public/profile/[id] — profil public, sans auth requis.
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID requis" }, { status: 400 });
  }

  // En dev sans vraie DB, retourne le mock peu importe l'ID
  if (isDev && id === "mock-user-001") {
    return NextResponse.json(buildPublicProfile(mockProfile as PublicProfileInput));
  }

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        city: true,
        bio: true,
        projectName: true,
        projectDescription: true,
        skills: true,
        currentLevelId: true,
        totalXp: true,
        role: true,
        createdAt: true,
        earnedBadges: {
          select: { badgeId: true, earnedAt: true },
          orderBy: { earnedAt: "asc" },
        },
        progress: {
          where: { status: "COMPLETED" },
          select: { id: true },
        },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });
    }

    return NextResponse.json(buildPublicProfile({
      ...profile,
      badges: profile.earnedBadges,
      stats: { tasksCompleted: profile.progress.length },
    }));
  } catch (e) {
    console.error("[/api/public/profile GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

interface PublicProfileInput {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  city: string;
  bio: string | null;
  projectName: string | null;
  projectDescription: string | null;
  skills: string[];
  currentLevelId: number;
  totalXp: number;
  role?: string;
  createdAt: string | Date;
  badges: { badgeId: number; earnedAt: string | Date }[];
  stats?: { tasksCompleted: number };
}

function buildPublicProfile(p: PublicProfileInput) {
  const cityLabel = CITIES.find((c) => c.value === p.city)?.label ?? p.city;
  return {
    id: p.id,
    fullName: p.fullName,
    avatarUrl: p.avatarUrl,
    city: p.city,
    cityLabel,
    bio: p.bio,
    projectName: p.projectName,
    projectDescription: p.projectDescription,
    skills: p.skills,
    currentLevelId: p.currentLevelId,
    totalXp: p.totalXp,
    role: p.role ?? "ENTREPRENEUR",
    badges: p.badges.map((b) => ({
      badgeId: b.badgeId,
      earnedAt: typeof b.earnedAt === "string" ? b.earnedAt : b.earnedAt.toISOString(),
    })),
    tasksCompleted: p.stats?.tasksCompleted ?? 0,
    memberSince: typeof p.createdAt === "string"
      ? new Date(p.createdAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
      : p.createdAt.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
  };
}
