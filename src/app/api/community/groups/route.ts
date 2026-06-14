import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

// GET — liste tous les groupes avec compteur de posts
export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: [{ type: "asc" }, { cityOrLevel: "asc" }],
      include: { _count: { select: { posts: true } } },
    });
    return NextResponse.json(groups);
  } catch (err) {
    console.error("[/api/community/groups GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
