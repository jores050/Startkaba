// Vérification des conditions de badges après chaque action.
// Fonction pure : prend l'état, retourne les badges nouvellement débloqués.

import { getTasksByLevel } from "@/data/tasks";

// Tâches spéciales liées à des badges
export const BADGE_TASKS = {
  INTERVIEWS: 204, // "Conduis 5 interviews" → Ethnographe
  BMC: 301, // "Remplis les 9 blocs du BMC" → Architecte
  MVP_LINK: 403, // "Crée et publie ton MVP" → Bâtisseur
  TEN_USERS: 404, // "Acquiers tes 10 premiers utilisateurs" → Premier Client
} as const;

export interface BadgeCheckContext {
  rows: { taskId: number; levelId: number; status: string }[];
  earnedBadgeIds: number[];
  coachMessageCount?: number; // messages USER envoyés à Kaba
  cityRank?: number; // rang dans le classement de sa ville (1 = premier)
}

export type BadgeEvent =
  | "TASK_COMPLETED"
  | "COACH_MESSAGE_SENT"
  | "LEADERBOARD_UPDATED";

function isLevelComplete(levelId: number, rows: BadgeCheckContext["rows"]): boolean {
  const tasks = getTasksByLevel(levelId);
  if (tasks.length === 0) return false;
  const completed = rows.filter(
    (r) => r.levelId === levelId && r.status === "COMPLETED"
  ).length;
  return completed === tasks.length;
}

function isTaskComplete(taskId: number, rows: BadgeCheckContext["rows"]): boolean {
  return rows.some((r) => r.taskId === taskId && r.status === "COMPLETED");
}

// Conditions de chaque badge (id → prédicat).
const BADGE_CONDITIONS: Record<number, (ctx: BadgeCheckContext) => boolean> = {
  1: (ctx) => ctx.rows.some((r) => r.status === "COMPLETED"), // Premier Pas
  2: (ctx) => isLevelComplete(1, ctx.rows), // Idée Forgée
  3: (ctx) => isTaskComplete(BADGE_TASKS.INTERVIEWS, ctx.rows), // Ethnographe
  4: (ctx) => isLevelComplete(2, ctx.rows), // Marché Validé
  5: (ctx) => isTaskComplete(BADGE_TASKS.BMC, ctx.rows), // Architecte
  6: (ctx) => isLevelComplete(3, ctx.rows), // Modèle Ancré
  7: (ctx) => isTaskComplete(BADGE_TASKS.MVP_LINK, ctx.rows), // Bâtisseur
  8: (ctx) => isTaskComplete(BADGE_TASKS.TEN_USERS, ctx.rows), // Premier Client
  9: (ctx) => isLevelComplete(4, ctx.rows), // MVP Livré
  10: (ctx) => (ctx.coachMessageCount ?? 0) >= 20, // Fan de Kaba
  11: (ctx) => (ctx.cityRank ?? Infinity) <= 10, // Top 10 Ville
};

// Badges concernés par chaque type d'événement (évite les checks inutiles).
const EVENT_BADGES: Record<BadgeEvent, number[]> = {
  TASK_COMPLETED: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  COACH_MESSAGE_SENT: [10],
  LEADERBOARD_UPDATED: [11],
};

export function checkAndAwardBadges(
  ctx: BadgeCheckContext,
  event: BadgeEvent
): number[] {
  const earned = new Set(ctx.earnedBadgeIds);
  return EVENT_BADGES[event].filter(
    (badgeId) => !earned.has(badgeId) && BADGE_CONDITIONS[badgeId](ctx)
  );
}
