import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

const CITIES = ["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO"];

// GET /api/leaderboard?city=&limit=
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.toUpperCase() ?? "";
  const limit = Math.min(50, Number(searchParams.get("limit")) || 10);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const where =
    city && CITIES.includes(city)
      ? { city: city as "COTONOU" | "ABIDJAN" | "DAKAR" | "LOME" | "BAMAKO" }
      : {};

  const profiles = await prisma.userProfile.findMany({
    where,
    select: {
      id: true,
      fullName: true,
      city: true,
      totalXp: true,
      currentLevelId: true,
    },
    orderBy: { totalXp: "desc" },
    take: limit + 1, // +1 pour inclure l'utilisateur courant si hors top
  });

  const ranked = profiles.map((p, i) => ({ ...p, rank: i + 1 }));
  const me = user ? ranked.find((p) => p.id === user.id) ?? null : null;

  // Si l'utilisateur connecté n'est pas dans le top, on le récupère séparément
  let meEntry = me;
  if (user && !me) {
    const myProfile = await prisma.userProfile.findUnique({
      where: { id: user.id },
      select: { id: true, fullName: true, city: true, totalXp: true, currentLevelId: true },
    });
    if (myProfile) {
      const myRank = await prisma.userProfile.count({
        where: { totalXp: { gt: myProfile.totalXp } },
      });
      meEntry = { ...myProfile, rank: myRank + 1 };
    }
  }

  return NextResponse.json({
    entries: ranked.slice(0, limit),
    me: meEntry,
    city: city || "GLOBAL",
  });
}
