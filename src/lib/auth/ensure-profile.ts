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

export async function ensureProfile({
  userId,
  email,
  fullName,
  city,
  avatarUrl,
}: EnsureProfileParams) {
  const createData = {
    id: userId,
    email,
    fullName,
    city: city ?? "OTHER",
    avatarUrl,
    currentLevelId: 1,
    totalXp: 0,
    subscriptionStatus: "FREE" as const,
  };

  try {
    return await prisma.userProfile.upsert({
      where: { id: userId },
      update: {},
      create: createData,
    });
  } catch (e) {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError) || e.code !== "P2002") {
      throw e;
    }

    // Conflit email : un profil existe avec le même email mais un ID différent.
    // Cas typique : clean-db a supprimé les profils mais pas les comptes Auth,
    // et l'utilisateur s'est réinscrit avec un nouvel ID.
    const conflicting = await prisma.userProfile.findUnique({ where: { email } });

    if (conflicting) {
      // Vérifier si ce profil orphelin a des dépendances (progress, badges…)
      const [progressCount, badgeCount] = await Promise.all([
        prisma.userProgress.count({ where: { userId: conflicting.id } }),
        prisma.userBadge.count({ where: { userId: conflicting.id } }),
      ]);

      if (progressCount === 0 && badgeCount === 0) {
        // Profil sans données : on le remplace par le bon (avec le bon auth ID).
        await prisma.userProfile.delete({ where: { id: conflicting.id } });
        return prisma.userProfile.create({ data: createData });
      }

      // Profil avec des données existantes : on met à jour l'email pour libérer
      // la contrainte, puis on crée le nouveau profil propre.
      // L'utilisateur perd ses anciennes données mais peut avancer.
      await prisma.userProfile.update({
        where: { id: conflicting.id },
        data: { email: `__orphan__${conflicting.id}@startkaba.invalid` },
      });
    }

    return prisma.userProfile.create({ data: createData });
  }
}
