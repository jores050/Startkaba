import { NextResponse } from "next/server";
import { mockLeaderboardUsers } from "@/lib/dev/mock-leaderboard";
import { mockProfile } from "@/lib/dev/mock-profile";

const CITIES = ["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO"];

// GET /api/leaderboard?city=&limit= — classement global ou par ville.
// Mocké en local ; en production : vue matérialisée + Supabase Realtime.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.toUpperCase() ?? "";
  const limit = Math.min(50, Number(searchParams.get("limit")) || 10);

  // L'utilisateur courant (mock) participe au classement avec son XP réel
  const me = {
    id: mockProfile.id,
    fullName: mockProfile.fullName,
    city: mockProfile.city,
    totalXp: mockProfile.totalXp,
    currentLevelId: mockProfile.currentLevelId,
  };

  let pool = [...mockLeaderboardUsers.filter((u) => u.id !== me.id), me];
  if (city && CITIES.includes(city)) {
    pool = pool.filter((u) => u.city === city);
  }

  pool.sort((a, b) => b.totalXp - a.totalXp);
  const ranked = pool.map((u, i) => ({ ...u, rank: i + 1 }));
  const myEntry = ranked.find((u) => u.id === me.id) ?? null;

  return NextResponse.json({
    entries: ranked.slice(0, limit),
    me: myEntry,
    city: city || "GLOBAL",
  });
}
