import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";

const isDev = process.env.NODE_ENV !== "production";

const applySchema = z.object({
  presentation: z.string().min(10).max(500),
  expertise: z.string().min(3).max(200),
  experience: z.string().max(500).optional(),
  mobileMoneyNumber: z.string().max(30).optional(),
  mobileMoneyProvider: z.string().max(30).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = applySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      console.log("[coach/apply] Mock application submitted:", parsed.data);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    await prisma.userProfile.update({
      where: { id: user.id },
      data: {
        coachApplicationStatus: "PENDING",
        payoutInfo: {
          provider: parsed.data.mobileMoneyProvider ?? "",
          number: parsed.data.mobileMoneyNumber ?? "",
          presentation: parsed.data.presentation,
          expertise: parsed.data.expertise,
          experience: parsed.data.experience ?? "",
        },
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/coach/apply POST]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
