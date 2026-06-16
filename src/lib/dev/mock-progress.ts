// Progression mockée pour le dev local sans Supabase réel.
// Cohérente avec mock-profile : Aïcha a complété le niveau 1 (425 XP)
// et 2 tâches du niveau 2 (175 XP) = 600 XP, tâche 203 en cours.

import type { ProgressStatus, MissionStatus } from "@/types";

export interface ProgressEntry {
  taskId: number;
  levelId: number;
  status: ProgressStatus;
  quizScore: number | null;
  xpEarned: number;
  completedAt: string | null;
  lastAttemptAt?: string | null;
  missionStatus?: MissionStatus | null;
  missionStartedAt?: string | null;
  missionCompletedAt?: string | null;
}

// Singleton sur globalThis : en dev Next.js, chaque route API peut être
// compilée avec sa propre instance de module — sans ça, les mutations
// du mock ne seraient pas visibles entre les routes.
const globalForMock = globalThis as unknown as {
  mockProgress?: Map<number, ProgressEntry>;
};

const seed: Map<number, ProgressEntry> = new Map(
  (
    [
      { taskId: 101, levelId: 1, status: "COMPLETED", quizScore: 100, xpEarned: 50, completedAt: "2026-04-18T10:00:00.000Z" },
      { taskId: 102, levelId: 1, status: "COMPLETED", quizScore: 100, xpEarned: 50, completedAt: "2026-04-20T10:00:00.000Z" },
      { taskId: 103, levelId: 1, status: "COMPLETED", quizScore: 100, xpEarned: 75, completedAt: "2026-04-25T10:00:00.000Z" },
      { taskId: 104, levelId: 1, status: "COMPLETED", quizScore: 100, xpEarned: 100, completedAt: "2026-04-28T10:00:00.000Z" },
      { taskId: 105, levelId: 1, status: "COMPLETED", quizScore: 100, xpEarned: 150, completedAt: "2026-05-02T14:30:00.000Z" },
      { taskId: 106, levelId: 2, status: "COMPLETED", quizScore: 100, xpEarned: 75, completedAt: "2026-05-10T10:00:00.000Z" },
      { taskId: 107, levelId: 2, status: "COMPLETED", quizScore: 100, xpEarned: 100, completedAt: "2026-05-14T10:00:00.000Z" },
      { taskId: 108, levelId: 2, status: "COMPLETED", quizScore: 100, xpEarned: 100, completedAt: "2026-05-18T10:00:00.000Z" },
    ] as ProgressEntry[]
  ).map((e) => [e.taskId, e])
);

export const mockProgress: Map<number, ProgressEntry> =
  globalForMock.mockProgress ?? seed;
globalForMock.mockProgress = mockProgress;

export function recordMockQuizResult(
  taskId: number,
  levelId: number,
  passed: boolean,
  score: number,
  xpEarned: number
): ProgressEntry {
  const entry: ProgressEntry = passed
    ? {
        taskId,
        levelId,
        status: "COMPLETED",
        quizScore: score,
        xpEarned,
        completedAt: new Date().toISOString(),
        lastAttemptAt: null,
      }
    : {
        taskId,
        levelId,
        status: "IN_PROGRESS",
        quizScore: score,
        xpEarned: 0,
        completedAt: null,
        lastAttemptAt: new Date().toISOString(),
      };
  mockProgress.set(taskId, entry);
  return entry;
}

export function recordMockLessonComplete(
  taskId: number,
  levelId: number,
  xpEarned: number
): ProgressEntry {
  const entry: ProgressEntry = {
    taskId,
    levelId,
    status: "COMPLETED",
    quizScore: 100,
    xpEarned,
    completedAt: new Date().toISOString(),
  };
  mockProgress.set(taskId, entry);
  return entry;
}

// ─── Mock micro-inputs ────────────────────────────────────────────────────────

export interface MicroInputEntry {
  userId: string;
  taskId: number;
  storageKey: string;
  value: string;
}

const globalForMicro = globalThis as unknown as {
  mockMicroInputs?: MicroInputEntry[];
};
export const mockMicroInputs: MicroInputEntry[] =
  globalForMicro.mockMicroInputs ?? [];
globalForMicro.mockMicroInputs = mockMicroInputs;

export function upsertMockMicroInput(entry: MicroInputEntry): void {
  const i = mockMicroInputs.findIndex(
    m => m.userId === entry.userId && m.taskId === entry.taskId && m.storageKey === entry.storageKey
  );
  if (i >= 0) mockMicroInputs[i] = entry;
  else mockMicroInputs.push(entry);
}

export function getMockMicroInputs(userId: string, taskId: number): MicroInputEntry[] {
  return mockMicroInputs.filter(m => m.userId === userId && m.taskId === taskId);
}

// ─── Mock reflections ─────────────────────────────────────────────────────────

export interface ReflectionEntry {
  userId: string;
  taskId: number;
  levelId: number;
  exerciseIndex: number;
  answer: string;
  createdAt: string;
}

const globalForReflections = globalThis as unknown as {
  mockReflections?: ReflectionEntry[];
};

// Seed de démo (dev) : réflexions Niveau 1 d'Aïcha — volontairement imparfaites
// (cause racine circulaire, persona large, jargon) pour démontrer la Passe Kaba.
const reflectionSeed: ReflectionEntry[] = [
  { userId: "mock", taskId: 101, levelId: 1, exerciseIndex: 9, answer: "Une app de livraison de légumes frais pour les restaurants d'Abidjan.", createdAt: "2026-04-18T10:00:00.000Z" },
  { userId: "mock", taskId: 102, levelId: 1, exerciseIndex: 7, answer: "Je veux entreprendre parce que j'en ai marre de travailler pour les autres et je veux lancer ma startup.", createdAt: "2026-04-20T10:00:00.000Z" },
  { userId: "mock", taskId: 103, levelId: 1, exerciseIndex: 9, answer: "Le vrai problème, c'est qu'il n'existe pas de plateforme comme la mienne pour commander des légumes.", createdAt: "2026-04-25T10:00:00.000Z" },
  { userId: "mock", taskId: 104, levelId: 1, exerciseIndex: 11, answer: "Ma cible : restaurateurs et particuliers, étudiants ou salariés de 18 à 45 ans, avec 0 à 500000 FCFA de revenus.", createdAt: "2026-04-28T10:00:00.000Z" },
  { userId: "mock", taskId: 105, levelId: 1, exerciseIndex: 12, answer: "Ma plateforme permet de commander des légumes frais en ligne avec une levée de fonds prévue pour scaler.", createdAt: "2026-05-02T14:30:00.000Z" },
];

export const mockReflections: ReflectionEntry[] =
  globalForReflections.mockReflections ?? reflectionSeed;
globalForReflections.mockReflections = mockReflections;

export function upsertMockReflection(entry: ReflectionEntry): void {
  const i = mockReflections.findIndex(
    r => r.userId === entry.userId && r.taskId === entry.taskId && r.exerciseIndex === entry.exerciseIndex
  );
  if (i >= 0) mockReflections[i] = entry;
  else mockReflections.push(entry);
}

export function getMockReflections(userId: string): ReflectionEntry[] {
  return mockReflections.filter(r => r.userId === userId);
}

export function getMockTaskReflection(userId: string, taskId: number): ReflectionEntry | undefined {
  return mockReflections.find(r => r.userId === userId && r.taskId === taskId);
}

export function updateMockReflection(userId: string, taskId: number, answer: string): void {
  const i = mockReflections.findIndex(r => r.userId === userId && r.taskId === taskId);
  if (i >= 0) mockReflections[i] = { ...mockReflections[i], answer };
}

// ─────────────────────────────────────────────────────────────────────────────

export function startMockTask(taskId: number, levelId: number): ProgressEntry {
  const existing = mockProgress.get(taskId);
  if (existing && existing.status !== "NOT_STARTED") return existing;
  const entry: ProgressEntry = {
    taskId,
    levelId,
    status: "IN_PROGRESS",
    quizScore: null,
    xpEarned: 0,
    completedAt: null,
  };
  mockProgress.set(taskId, entry);
  return entry;
}

export function setMockMissionStatus(
  taskId: number,
  levelId: number,
  missionStatus: MissionStatus,
): ProgressEntry {
  const existing = mockProgress.get(taskId) ?? {
    taskId,
    levelId,
    status: "IN_PROGRESS" as ProgressStatus,
    quizScore: null,
    xpEarned: 0,
    completedAt: null,
  };
  const entry: ProgressEntry = {
    ...existing,
    status: missionStatus === "COMPLETED" ? "COMPLETED" : "IN_PROGRESS",
    missionStatus,
    missionStartedAt: existing.missionStartedAt ?? new Date().toISOString(),
    missionCompletedAt: missionStatus === "COMPLETED" ? new Date().toISOString() : null,
    completedAt: missionStatus === "COMPLETED" ? new Date().toISOString() : existing.completedAt,
  };
  mockProgress.set(taskId, entry);
  return entry;
}

// ─── Mock mission deliverables ────────────────────────────────────────────────

export interface MissionDeliverableEntry {
  userId: string;
  taskId: number;
  type: string;
  content: string;
}

const globalForDeliverables = globalThis as unknown as {
  mockMissionDeliverables?: MissionDeliverableEntry[];
};
export const mockMissionDeliverables: MissionDeliverableEntry[] =
  globalForDeliverables.mockMissionDeliverables ?? [];
globalForDeliverables.mockMissionDeliverables = mockMissionDeliverables;

export function upsertMockMissionDeliverable(entry: MissionDeliverableEntry): void {
  const i = mockMissionDeliverables.findIndex(
    d => d.userId === entry.userId && d.taskId === entry.taskId && d.type === entry.type
  );
  if (i >= 0) mockMissionDeliverables[i] = entry;
  else mockMissionDeliverables.push(entry);
}

export function getMockMissionDeliverable(
  userId: string,
  taskId: number,
  type: string
): MissionDeliverableEntry | undefined {
  return mockMissionDeliverables.find(
    d => d.userId === userId && d.taskId === taskId && d.type === type
  );
}

// ─── Mock Passe Kaba (reviews de niveau) ──────────────────────────────────────

export interface KabaReviewEntry {
  verdict_global: string;
  score: string;
  forces: string[];
  ajustements_suggérés: { card: string; probleme: string; lecon_citee: string; reformulation_possible: string }[];
  proverbe_takeaway: string;
}

const globalForKabaReviews = globalThis as unknown as {
  mockLevelKabaReviews?: Map<string, KabaReviewEntry>;
};
export const mockLevelKabaReviews: Map<string, KabaReviewEntry> =
  globalForKabaReviews.mockLevelKabaReviews ?? new Map();
globalForKabaReviews.mockLevelKabaReviews = mockLevelKabaReviews;

export function getKabaReview(userId: string, levelNumber: number): KabaReviewEntry | undefined {
  return mockLevelKabaReviews.get(`${userId}:${levelNumber}`);
}

export function saveKabaReview(userId: string, levelNumber: number, review: KabaReviewEntry): void {
  mockLevelKabaReviews.set(`${userId}:${levelNumber}`, review);
}
