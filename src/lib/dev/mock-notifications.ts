// Notifications mockées — singleton globalThis (cf. mock-progress.ts).

export interface MockNotification {
  id: string;
  type: "BADGE_EARNED" | "LEVEL_UNLOCKED" | "TASK_COMPLETED" | "MESSAGE_RECEIVED" | "SYSTEM";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

const globalForMock = globalThis as unknown as {
  mockNotifications?: MockNotification[];
};

const seed: MockNotification[] = [
  {
    id: "n-1",
    type: "BADGE_EARNED",
    title: "Badge débloqué : Marché Validé ✅",
    body: "Tu as complété le Niveau 2 — Valider ton Marché.",
    read: false,
    createdAt: "2026-06-11T13:05:00.000Z",
  },
  {
    id: "n-2",
    type: "LEVEL_UNLOCKED",
    title: "Niveau 3 débloqué ! 🏗️",
    body: "Construire ton Modèle t'attend. Le Business Model Canvas version Afrique de l'Ouest.",
    read: false,
    createdAt: "2026-06-11T13:05:01.000Z",
  },
  {
    id: "n-3",
    type: "TASK_COMPLETED",
    title: "Tâche validée : +150 XP",
    body: "Synthétise tes 3 insights clés — quiz réussi à 100%.",
    read: false,
    createdAt: "2026-06-11T12:40:00.000Z",
  },
  {
    id: "n-4",
    type: "SYSTEM",
    title: "Bienvenue sur StartKaba 🚀",
    body: "Ton aventure entrepreneuriale commence au Niveau 1.",
    read: true,
    createdAt: "2026-04-15T08:00:00.000Z",
  },
];

export const mockNotifications: MockNotification[] =
  globalForMock.mockNotifications ?? seed;
globalForMock.mockNotifications = mockNotifications;
