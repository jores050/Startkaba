import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import {
  mockConnections,
  addMockConnection,
} from "@/lib/dev/mock-community";
import { mockProfile } from "@/lib/dev/mock-profile";

const isDev = process.env.NODE_ENV !== "production";

// GET — mes connexions (envoyées + reçues)
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      return NextResponse.json({
        sent: mockConnections.filter((c) => c.fromUserId === mockProfile.id),
        received: mockConnections.filter((c) => c.toUserId === mockProfile.id),
      });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const [sent, received] = await Promise.all([
      prisma.connectionRequest.findMany({
        where: { fromUserId: user.id },
        include: { toUser: { select: { id: true, fullName: true, avatarUrl: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.connectionRequest.findMany({
        where: { toUserId: user.id },
        include: { fromUser: { select: { id: true, fullName: true, avatarUrl: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
    ]);
    return NextResponse.json({ sent, received });
  } catch (err) {
    console.error("[/api/community/connections GET]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

const postSchema = z.object({
  toUserId: z.string().uuid(),
  message: z.string().max(300).optional(),
});

// POST — envoyer une demande de connexion
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "toUserId requis" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      const conn = {
        id: `conn-${Date.now()}`,
        fromUserId: mockProfile.id,
        toUserId: parsed.data.toUserId,
        message: parsed.data.message ?? null,
        status: "PENDING" as const,
        createdAt: new Date().toISOString(),
      };
      addMockConnection(conn);
      return NextResponse.json(conn, { status: 201 });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (user.id === parsed.data.toUserId) {
    return NextResponse.json(
      { error: "Tu ne peux pas te connecter à toi-même" },
      { status: 400 }
    );
  }

  try {
    const conn = await prisma.connectionRequest.upsert({
      where: { fromUserId_toUserId: { fromUserId: user.id, toUserId: parsed.data.toUserId } },
      create: {
        fromUserId: user.id,
        toUserId: parsed.data.toUserId,
        message: parsed.data.message ?? null,
        status: "PENDING",
      },
      update: { message: parsed.data.message ?? null, status: "PENDING" },
    });

    // Notification à l'autre utilisateur
    const fromProfile = await prisma.userProfile.findUnique({
      where: { id: user.id },
      select: { fullName: true },
    });
    await prisma.notification.create({
      data: {
        userId: parsed.data.toUserId,
        type: "CONNECTION_REQUEST",
        title: "Nouvelle demande de connexion",
        body: `${fromProfile?.fullName ?? "Quelqu'un"} souhaite se connecter avec toi.`,
      },
    }).catch(() => {});

    return NextResponse.json(conn, { status: 201 });
  } catch (err) {
    console.error("[/api/community/connections POST]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
