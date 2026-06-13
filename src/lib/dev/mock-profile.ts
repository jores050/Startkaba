// Profil mocké pour le développement local sans Supabase réel.
// Utilisé en fallback par /api/user/profile quand la base est injoignable.
// Mutable en mémoire pour que PUT fonctionne pendant la session dev.

export interface FullProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  city: string;
  bio: string | null;
  projectName: string | null;
  projectDescription: string | null;
  skills: string[];
  currentLevelId: number;
  totalXp: number;
  subscriptionStatus: string;
  isAdmin: boolean;
  role: "ENTREPRENEUR" | "COACH" | "ADMIN";
  isOpenToCofounder: boolean;
  lookingFor: string[];
  publicBio: string | null;
  createdAt: string;
  badges: { badgeId: number; earnedAt: string }[];
  stats: {
    tasksCompleted: number;
    activeDays: number;
    streakDays?: number;
    xpToday?: number;
    weekly?: { tasksCompleted: number; xpEarned: number; badgeName: string | null };
  };
}

// Singleton sur globalThis — en dev Next.js, les modules ne sont pas
// partagés entre routes API (voir mock-progress.ts).
const globalForMock = globalThis as unknown as { mockProfile?: FullProfile };

const seed: FullProfile = {
  id: "mock-user-001",
  email: "aicha.kone@exemple.com",
  fullName: "Aïcha Koné",
  avatarUrl: null,
  city: "ABIDJAN",
  bio: "Passionnée par l'agritech et le commerce de proximité. Je construis une solution pour les maraîchers d'Abidjan.",
  projectName: "FraisLocal",
  projectDescription:
    "Plateforme de mise en relation directe entre maraîchers périurbains et restaurants d'Abidjan, avec paiement Mobile Money et livraison groupée.",
  skills: ["Vente", "Négociation", "Marketing digital", "Gestion de stock"],
  currentLevelId: 2,
  totalXp: 600,
  subscriptionStatus: "FREE",
  isAdmin: false,
  role: "ENTREPRENEUR",
  isOpenToCofounder: false,
  lookingFor: [],
  publicBio: null,
  createdAt: "2026-04-15T08:00:00.000Z",
  badges: [
    { badgeId: 1, earnedAt: "2026-04-16T10:00:00.000Z" },
    { badgeId: 2, earnedAt: "2026-05-02T14:30:00.000Z" },
    { badgeId: 3, earnedAt: "2026-05-20T09:15:00.000Z" },
  ],
  stats: {
    tasksCompleted: 7,
    activeDays: 23,
    streakDays: 5,
    xpToday: 50,
    weekly: { tasksCompleted: 4, xpEarned: 350, badgeName: "Marché Validé ✅" },
  },
};

export const mockProfile: FullProfile = globalForMock.mockProfile ?? seed;
globalForMock.mockProfile = mockProfile;

export function updateMockProfile(data: Partial<FullProfile>) {
  Object.assign(mockProfile, data);
  return mockProfile;
}
