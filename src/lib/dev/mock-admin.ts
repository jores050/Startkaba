// Données admin mockées — singleton globalThis (cf. mock-progress.ts).

import { mockLeaderboardUsers } from "./mock-leaderboard";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  city: string;
  currentLevelId: number;
  totalXp: number;
  subscriptionStatus: "FREE" | "PREMIUM";
  isAdmin: boolean;
  disabled: boolean;
  createdAt: string;
}

const globalForMock = globalThis as unknown as { mockAdminUsers?: AdminUser[] };

const seed: AdminUser[] = mockLeaderboardUsers.map((u, i) => ({
  id: u.id,
  fullName: u.fullName,
  email: `${u.fullName.toLowerCase().replace(/[^a-z]+/g, ".")}@exemple.com`,
  city: u.city,
  currentLevelId: u.currentLevelId,
  totalXp: u.totalXp,
  subscriptionStatus: i % 6 === 0 ? "PREMIUM" : "FREE",
  isAdmin: false,
  disabled: false,
  createdAt: new Date(2026, 3 + (i % 3), 1 + i).toISOString(),
}));

export const mockAdminUsers: AdminUser[] = globalForMock.mockAdminUsers ?? seed;
globalForMock.mockAdminUsers = mockAdminUsers;

export const mockAdminStats = {
  signupsToday: 7,
  signupsThisWeek: 34,
  kabaMessagesToday: 51,
  badgesEarnedToday: 12,
  totalUsers: mockAdminUsers.length + 1,
  // Répartition des utilisateurs par niveau atteint
  usersPerLevel: [
    { levelId: 1, count: 3 },
    { levelId: 2, count: 6 },
    { levelId: 3, count: 5 },
    { levelId: 4, count: 4 },
    { levelId: 5, count: 1 },
    { levelId: 6, count: 0 },
    { levelId: 7, count: 0 },
    { levelId: 8, count: 0 },
  ],
  avgXp: 1156,
  // Rétention hebdomadaire (% d'actifs par semaine depuis l'inscription)
  weeklyRetention: [100, 72, 58, 49, 41, 38],
};
