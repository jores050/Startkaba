// Quota Kaba : 3 messages par niveau débloqué (plan FREE), illimité en PREMIUM.

import { computeLevelSummaries, type ProgressRow } from "@/lib/progress/compute";

export const MESSAGES_PER_LEVEL = 3;

export function countUnlockedLevels(rows: ProgressRow[]): number {
  return computeLevelSummaries(rows).filter(
    (l) => l.status === "COMPLETED" || l.status === "IN_PROGRESS" || l.status === "UNLOCKED"
  ).length;
}

export interface QuotaInfo {
  used: number;
  total: number;
  remaining: number;
  isPremium: boolean;
}

export function computeQuota(
  rows: ProgressRow[],
  userMessageCount: number,
  isPremium: boolean
): QuotaInfo {
  if (isPremium) {
    return { used: userMessageCount, total: -1, remaining: -1, isPremium: true };
  }
  const total = countUnlockedLevels(rows) * MESSAGES_PER_LEVEL;
  return {
    used: userMessageCount,
    total,
    remaining: Math.max(0, total - userMessageCount),
    isPremium: false,
  };
}
