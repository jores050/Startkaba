import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { computeLevelSummaries, type ProgressRow } from "@/lib/progress/compute";
import { mockProgress } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

// GET — les 8 niveaux avec la progression de l'utilisateur.
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      const rows: ProgressRow[] = Array.from(mockProgress.values());
      return NextResponse.json({ levels: computeLevelSummaries(rows) });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const rows = await prisma.userProgress.findMany({
      where: { userId: user.id },
      select: {
        taskId: true,
        levelId: true,
        status: true,
        quizScore: true,
        xpEarned: true,
        completedAt: true,
      },
    });
    return NextResponse.json({ levels: computeLevelSummaries(rows) });
  } catch (e) {
    console.error("[/api/levels GET] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
