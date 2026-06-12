import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { computeQuota } from "@/lib/coach/quota";
import { mockCoachMessages } from "@/lib/dev/mock-coach";
import { mockProgress } from "@/lib/dev/mock-progress";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

function mockResponse(levelId: number) {
  const rows = Array.from(mockProgress.values());
  const userCount = mockCoachMessages.filter((m) => m.role === "USER").length;
  return NextResponse.json({
    messages: mockCoachMessages
      .filter((m) => m.levelId === levelId)
      .slice(-20),
    quota: computeQuota(rows, userCount, mockProfile.subscriptionStatus === "PREMIUM"),
  });
}

// GET /api/coach/messages?levelId= — historique (20 derniers) + quota.
export async function GET(request: Request) {
  const levelId = Number(new URL(request.url).searchParams.get("levelId") ?? 1);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) return mockResponse(levelId);
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const [messages, userCount, rows, profile] = await Promise.all([
      prisma.coachMessage.findMany({
        where: { userId: user.id, levelId },
        orderBy: { createdAt: "asc" },
        take: 20,
      }),
      prisma.coachMessage.count({ where: { userId: user.id, role: "USER" } }),
      prisma.userProgress.findMany({
        where: { userId: user.id },
        select: { taskId: true, levelId: true, status: true, quizScore: true, xpEarned: true, completedAt: true },
      }),
      prisma.userProfile.findUnique({ where: { id: user.id } }),
    ]);

    return NextResponse.json({
      messages,
      quota: computeQuota(rows, userCount, profile?.subscriptionStatus === "PREMIUM"),
    });
  } catch (e) {
    console.error("[/api/coach/messages GET] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
