import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { updateMockProfile } from "@/lib/dev/mock-profile";
import { upsertMockMicroInput } from "@/lib/dev/mock-progress";

const isDev = process.env.NODE_ENV !== "production";

// Pseudo-tâche pour rattacher la brique d'onboarding (storageKey defi_initial).
const ONBOARDING_TASK_ID = 100;

const schema = z.object({
  projectName: z.string().trim().max(120).optional().default(""),
  sector: z.enum(["commerce", "services", "agriculture", "tech", "education", "sante", "autre"]).optional(),
  stage: z.enum(["idee", "test", "premiers_clients"]).optional(),
  city: z.enum(["COTONOU", "ABIDJAN", "DAKAR", "LOME", "BAMAKO", "OTHER"]).optional(),
  initialChallenge: z.string().trim().max(280).optional().default(""),
});

// POST — enregistre les réponses d'onboarding et marque le profil comme complété.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données d'onboarding invalides" }, { status: 400 });
  }
  const { projectName, sector, stage, city, initialChallenge } = parsed.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    if (isDev) {
      updateMockProfile({
        onboardingCompleted: true,
        ...(projectName ? { projectName } : {}),
        sector: sector ?? null,
        stage: stage ?? null,
        ...(city ? { city } : {}),
        initialChallenge: initialChallenge || null,
      });
      if (initialChallenge) {
        upsertMockMicroInput({ userId: "mock", taskId: ONBOARDING_TASK_ID, storageKey: "defi_initial", value: initialChallenge });
      }
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    await prisma.userProfile.update({
      where: { id: user.id },
      data: {
        onboardingCompleted: true,
        ...(projectName ? { projectName } : {}),
        sector: sector ?? null,
        stage: stage ?? null,
        ...(city ? { city } : {}),
        initialChallenge: initialChallenge || null,
      },
    });

    if (initialChallenge) {
      await prisma.userMicroInput.upsert({
        where: { userId_taskId_storageKey: { userId: user.id, taskId: ONBOARDING_TASK_ID, storageKey: "defi_initial" } },
        update: { value: initialChallenge },
        create: { userId: user.id, taskId: ONBOARDING_TASK_ID, storageKey: "defi_initial", value: initialChallenge },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/onboarding POST] erreur:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
