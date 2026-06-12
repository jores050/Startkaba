import { prisma } from "@/lib/prisma/client";
import { Prisma } from "@prisma/client";
import type { City } from "@prisma/client";

interface EnsureProfileParams {
  userId: string;
  email: string;
  fullName: string;
  city?: City;
  avatarUrl?: string;
}

// Crée ou retrouve le profil au premier login.
// Gère le cas où l'email est déjà pris par un ancien compte (après clean-db ou
// recréation d'un compte Supabase Auth avec le même email) :
// dans ce cas on retrouve le profil existant par email et on l'utilise.
export async function ensureProfile({
  userId,
  email,
  fullName,
  city,
  avatarUrl,
}: EnsureProfileParams) {
  try {
    return await prisma.userProfile.upsert({
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
  } catch (e) {
    // P2002 = unique constraint violation : l'email existe déjà avec un autre ID.
    // On retrouve le profil par email pour continuer sans bloquer l'utilisateur.
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const existing = await prisma.userProfile.findUnique({
        where: { email },
      });
      if (existing) return existing;
    }
    throw e;
  }
}
