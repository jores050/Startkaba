// Progression mockée pour le dev local sans Supabase réel.
// Cohérente avec mock-profile : Aïcha a complété le niveau 1 (425 XP)
// et 2 tâches du niveau 2 (175 XP) = 600 XP, tâche 203 en cours.

import type { ProgressStatus } from "@/types";

export interface ProgressEntry {
  taskId: number;
  levelId: number;
  status: ProgressStatus;
  quizScore: number | null;
  xpEarned: number;
  completedAt: string | null;
  lastAttemptAt?: string | null; // dernière tentative de quiz (échouée)
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
      { taskId: 201, levelId: 2, status: "COMPLETED", quizScore: 100, xpEarned: 75, completedAt: "2026-05-10T10:00:00.000Z" },
      { taskId: 202, levelId: 2, status: "COMPLETED", quizScore: 100, xpEarned: 100, completedAt: "2026-05-18T10:00:00.000Z" },
      { taskId: 203, levelId: 2, status: "IN_PROGRESS", quizScore: null, xpEarned: 0, completedAt: null },
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
