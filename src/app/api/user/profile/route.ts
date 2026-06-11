import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { ensureProfile } from "@/lib/auth/ensure-profile";
import { profileUpdateSchema } from "@/lib/validations/profile";
import { mockProfile, updateMockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

// GET — profil complet (infos + badges + statistiques de progression).
// En dev sans Supabase réel, retourne le profil mocké.
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (isDev) return NextResponse.json(mockProfile);
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

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

    const [badges, tasksCompleted, activeDaysRows] = await Promise.all([
      prisma.userBadge.findMany({
        where: { userId: user.id },
        select: { badgeId: true, earnedAt: true },
        orderBy: { earnedAt: "asc" },
      }),
      prisma.userProgress.count({
        where: { userId: user.id, status: "COMPLETED" },
      }),
      prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(DISTINCT DATE("updatedAt")) AS count
        FROM "user_progress" WHERE "userId" = ${user.id}
      `,
    ]);

    return NextResponse.json({
      ...profile,
      badges,
      stats: {
        tasksCompleted,
        activeDays: Number(activeDaysRows[0]?.count ?? 0),
      },
    });
  } catch (e) {
    if (isDev) return NextResponse.json(mockProfile);
    throw e;
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
  };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (isDev) return NextResponse.json(updateMockProfile(data));
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const updated = await prisma.userProfile.update({
      where: { id: user.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (e) {
    if (isDev) return NextResponse.json(updateMockProfile(data));
    throw e;
  }
}
