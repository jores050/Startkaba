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
export const mockReflections: ReflectionEntry[] =
  globalForReflections.mockReflections ?? [];
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
