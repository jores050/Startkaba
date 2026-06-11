import { prisma } from "@/lib/prisma/client";
import type { City } from "@prisma/client";

interface EnsureProfileParams {
  userId: string;
  email: string;
  fullName: string;
  city?: City;
  avatarUrl?: string;
}

// Crée l'entrée user_profiles au premier login si elle n'existe pas
// (équivalent du hook on_auth_user_created, côté application).
export async function ensureProfile({
  userId,
  email,
  fullName,
  city,
  avatarUrl,
}: EnsureProfileParams) {
  return prisma.userProfile.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email,
      fullName,
      city: city ?? "OTHER",
      avatarUrl,
      currentLevelId: 1,
      totalXp: 0,
      subscriptionStatus: "FREE",
    },
  });
}
