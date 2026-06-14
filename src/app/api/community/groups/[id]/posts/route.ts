import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

// GET — posts d'un groupe avec auteur + nb réponses
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const posts = await prisma.groupPost.findMany({
      where: { groupId: params.id },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true, currentLevelId: true } },
        _count: { select: { replies: true } },
      },
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[/api/community/groups/[id]/posts GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const schema = z.object({ content: z.string().min(1).max(1000) });

// POST — créer un post dans le groupe
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Contenu requis (1-1000 caractères)" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? (isDev ? mockProfile.id : null);
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  try {
    const post = await prisma.groupPost.create({
      data: { groupId: params.id, userId, content: parsed.data.content },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true, currentLevelId: true } },
        _count: { select: { replies: true } },
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("[/api/community/groups/[id]/posts POST]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
