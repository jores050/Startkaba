import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { ensureProfile } from "@/lib/auth/ensure-profile";
import { profileUpdateSchema } from "@/lib/validations/profile";
import { getBadgeById } from "@/data/badges";
import { mockProfile, updateMockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

// GET — profil complet (infos + badges + statistiques de progression).
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pas de session : mock en dev uniquement (test sans compte Supabase réel).
  if (!user) {
    if (isDev) return NextResponse.json(mockProfile);
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Utilisateur authentifié → on ne retombe JAMAIS sur le mock.
  try {
    const profile = await ensureProfile({
      userId: user.id,
      email: user.email ?? "",
      fullName:
        (user.user_metadata.full_name as string) ??
        (user.user_metadata.name as string) ??
        "Entrepreneur",
      city: user.user_metadata.city,
      avatarUrl: user.user_metadata.avatar_url as string | undefined,
    });

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const [badges, tasksCompleted, completedDates] = await Promise.all([
      prisma.userBadge.findMany({
        where: { userId: user.id },
        select: { badgeId: true, earnedAt: true },
        orderBy: { earnedAt: "asc" },
      }),
      prisma.userProgress.count({
        where: { userId: user.id, status: "COMPLETED" },
      }),
      prisma.userProgress.findMany({
        where: { userId: user.id, status: "COMPLETED", completedAt: { not: null } },
        select: { completedAt: true },
      }),
    ]);

    // Streak : jours consécutifs d'activité jusqu'à aujourd'hui/hier
    const activeDays = new Set(
      completedDates.map((r) => r.completedAt!.toISOString().slice(0, 10))
    );
    const uniqueDates = Array.from(activeDays).sort().reverse();
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    let streakDays = 0;
    if (uniqueDates.length > 0 && (uniqueDates[0] === today || uniqueDates[0] === yesterday)) {
      streakDays = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prev = new Date(uniqueDates[i - 1]);
        const curr = new Date(uniqueDates[i]);
        if (Math.round((prev.getTime() - curr.getTime()) / 86_400_000) === 1) {
          streakDays++;
        } else {
          break;
        }
      }
    }

    let weekly: { tasksCompleted: number; xpEarned: number; badgeName?: string } | undefined;
    try {
      const [weeklyProgress, weeklyBadge] = await Promise.all([
        prisma.userProgress.aggregate({
          where: {
            userId: user.id,
            status: "COMPLETED",
            completedAt: { gte: weekStart },
          },
          _count: { id: true },
          _sum: { xpEarned: true },
        }),
        prisma.userBadge.findFirst({
          where: { userId: user.id, earnedAt: { gte: weekStart } },
          orderBy: { earnedAt: "desc" },
        }),
      ]);
      weekly = {
        tasksCompleted: weeklyProgress._count.id,
        xpEarned: weeklyProgress._sum.xpEarned ?? 0,
        badgeName: weeklyBadge ? getBadgeById(weeklyBadge.badgeId)?.name : undefined,
      };
    } catch {
      // stats weekly non-critiques
    }

    return NextResponse.json({
      ...profile,
      role: profile.role ?? "ENTREPRENEUR",
      isOpenToCofounder: profile.isOpenToCofounder ?? false,
      lookingFor: profile.lookingFor ?? [],
      publicBio: profile.publicBio ?? null,
      badges,
      stats: {
        tasksCompleted,
        activeDays: activeDays.size,
        streakDays,
        weekly,
      },
    });
  } catch (e) {
    console.error("[/api/user/profile GET] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT — mise à jour du profil, validée avec Zod.
export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corps JSON invalide" }, { status: 400 });
  }

  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  const data = {
    fullName: parsed.data.fullName,
    city: parsed.data.city,
    bio: parsed.data.bio || null,
    projectName: parsed.data.projectName || null,
    projectDescription: parsed.data.projectDescription || null,
    skills: parsed.data.skills,
    ...(parsed.data.avatarUrl ? { avatarUrl: parsed.data.avatarUrl } : {}),
    ...(parsed.data.isOpenToCofounder !== undefined
      ? { isOpenToCofounder: parsed.data.isOpenToCofounder }
      : {}),
    ...(parsed.data.lookingFor !== undefined
      ? { lookingFor: parsed.data.lookingFor }
      : {}),
    ...(parsed.data.publicBio !== undefined
      ? { publicBio: parsed.data.publicBio || null }
      : {}),
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) return NextResponse.json(updateMockProfile(data));
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const updated = await prisma.userProfile.update({
      where: { id: user.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("[/api/user/profile PUT] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
