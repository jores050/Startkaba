import { getTaskById, getTasksByLevel } from "@/data/tasks";

export const QUIZ_PASS_THRESHOLD = 60; // score minimum en %

export interface XpProgressRow {
  taskId: number;
  levelId: number;
  status: string;
  xpEarned: number;
}

// XP gagné pour une tâche selon le score du quiz.
// Tout ou rien : l'XP complet si le quiz est réussi (≥ 60%), sinon 0.
export function calculateXp(taskId: number, quizScore: number): number {
  const task = getTaskById(taskId);
  if (!task) return 0;
  return quizScore >= QUIZ_PASS_THRESHOLD ? task.xp : 0;
}

// XP total à partir des lignes de progression.
export function getTotalXp(rows: XpProgressRow[]): number {
  return rows.reduce((sum, r) => sum + r.xpEarned, 0);
}

// Niveau courant = premier niveau jouable non complété (le 8 si tout est fini).
export function getCurrentLevel(rows: XpProgressRow[]): number {
  for (let levelId = 1; levelId <= 8; levelId++) {
    const tasks = getTasksByLevel(levelId);
    if (tasks.length === 0) return levelId; // niveaux Phase 2 non jouables
    const completed = rows.filter(
      (r) => r.levelId === levelId && r.status === "COMPLETED"
    ).length;
    if (completed < tasks.length) return levelId;
  }
  return 8;
}

// Pourcentage de complétion d'un niveau (0-100).
export function getLevelProgress(levelId: number, rows: XpProgressRow[]): number {
  const tasks = getTasksByLevel(levelId);
  if (tasks.length === 0) return 0;
  const completed = rows.filter(
    (r) => r.levelId === levelId && r.status === "COMPLETED"
  ).length;
  return Math.round((completed / tasks.length) * 100);
}

// --- Helpers d'affichage (barre XP du profil) ---

export function getXpForNextLevel(currentLevelId: number): number {
  const xpThresholds = [425, 625, 575, 825, 600, 700, 750, 900];
  return xpThresholds[currentLevelId - 1] ?? 0;
}

export function getXpProgress(
  totalXp: number,
  currentLevelId: number
): { current: number; needed: number; percentage: number } {
  const levelStartXp = [0, 425, 1050, 1625, 2450, 3050, 3650, 4250];
  const start = levelStartXp[currentLevelId - 1] ?? 0;
  const needed = getXpForNextLevel(currentLevelId);
  const current = Math.max(0, totalXp - start);
  const percentage =
    needed > 0 ? Math.min(100, Math.round((current / needed) * 100)) : 100;
  return { current, needed, percentage };
}
