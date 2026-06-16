// Logique de progression partagée entre les routes API (réelles et mockées).

import { levels } from "@/data/levels";
import type { Level } from "@/types";

export type LevelStatus = "COMPLETED" | "IN_PROGRESS" | "UNLOCKED" | "LOCKED" | "COMING_SOON";

export interface ProgressRow {
  taskId: number;
  levelId: number;
  status: string;
  quizScore: number | null;
  xpEarned: number;
  completedAt: string | Date | null;
  missionStatus?: string | null;
}

export interface LevelSummary {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  totalXp: number;
  taskCount: number;
  badgeIds: number[];
  earnedXp: number;
  completedTasks: number;
  status: LevelStatus;
}

function isLevelComplete(level: Level, rows: ProgressRow[]): boolean {
  if (level.tasks.length === 0) return false;
  const completed = rows.filter(
    (r) => r.levelId === level.id && r.status === "COMPLETED"
  ).length;
  return completed === level.tasks.length;
}

export function computeLevelSummaries(rows: ProgressRow[]): LevelSummary[] {
  let previousComplete = true; // le niveau 1 est toujours déverrouillé

  return levels.map((level) => {
    const levelRows = rows.filter((r) => r.levelId === level.id);
    const completedTasks = levelRows.filter((r) => r.status === "COMPLETED").length;
    const earnedXp = levelRows.reduce((sum, r) => sum + r.xpEarned, 0);
    const complete = isLevelComplete(level, rows);

    let status: LevelStatus;
    if (level.tasks.length === 0) {
      status = "COMING_SOON"; // niveaux 5-8, Phase 2
    } else if (complete) {
      status = "COMPLETED";
    } else if (!previousComplete) {
      status = "LOCKED";
    } else if (levelRows.length > 0) {
      status = "IN_PROGRESS";
    } else {
      status = "UNLOCKED";
    }

    previousComplete = complete;

    return {
      id: level.id,
      title: level.title,
      subtitle: level.subtitle,
      description: level.description,
      totalXp: level.totalXp,
      taskCount: level.tasks.length,
      badgeIds: level.badgeIds,
      earnedXp,
      completedTasks,
      status,
    };
  });
}

export function isLevelUnlocked(levelId: number, rows: ProgressRow[]): boolean {
  const summary = computeLevelSummaries(rows).find((l) => l.id === levelId);
  return summary !== undefined && summary.status !== "LOCKED";
}
