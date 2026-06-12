import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

const isDev = process.env.NODE_ENV !== "production";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isDev) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (isDev) {
    return NextResponse.json({ applications: [] });
  }

  try {
    const applications = await prisma.userProfile.findMany({
      where: { coachApplicationStatus: { not: null } },
      select: {
        id: true,
        email: true,
        fullName: true,
        coachApplicationStatus: true,
        payoutInfo: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ applications });
  } catch (e) {
    console.error("[/api/admin/coach-applications GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
