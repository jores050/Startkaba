import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelTag = searchParams.get("level");

  try {
    const requests = await prisma.helpRequest.findMany({
      where: levelTag ? { levelTag: parseInt(levelTag) } : undefined,
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        _count: { select: { replies: true } },
      },
    });
    return NextResponse.json(requests);
  } catch (err) {
    console.error("[/api/community/help GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const schema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
  levelTag: z.number().int().min(1).max(10).optional(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? (isDev ? mockProfile.id : null);
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  try {
    const helpRequest = await prisma.helpRequest.create({
      data: { userId, ...parsed.data },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        _count: { select: { replies: true } },
      },
    });
    return NextResponse.json(helpRequest, { status: 201 });
  } catch (err) {
    console.error("[/api/community/help POST]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
