import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

// GET — réponses à un post
export async function GET(
  _request: Request,
  { params }: { params: { id: string; postId: string } }
) {
  try {
    const replies = await prisma.groupReply.findMany({
      where: { postId: params.postId },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { id: true, fullName: true, avatarUrl: true } } },
    });
    return NextResponse.json(replies);
  } catch (err) {
    console.error("[/api/community/groups/[id]/posts/[postId]/replies GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const schema = z.object({ content: z.string().min(1).max(500) });

// POST — répondre à un post
export async function POST(
  request: Request,
  { params }: { params: { id: string; postId: string } }
) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Contenu requis" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? (isDev ? mockProfile.id : null);
  if (!userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  try {
    const reply = await prisma.groupReply.create({
      data: { postId: params.postId, userId, content: parsed.data.content },
      include: { user: { select: { id: true, fullName: true, avatarUrl: true } } },
    });
    return NextResponse.json(reply, { status: 201 });
  } catch (err) {
    console.error("[/api/community/groups/[id]/posts/[postId]/replies POST]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
