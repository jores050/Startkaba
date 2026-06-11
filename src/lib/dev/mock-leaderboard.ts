// Classement mocké — en production : vue matérialisée Postgres + Supabase
// Realtime (subscription sur user_profiles.total_xp / city).

export interface LeaderboardUser {
  id: string;
  fullName: string;
  city: string;
  totalXp: number;
  currentLevelId: number;
}

export const mockLeaderboardUsers: LeaderboardUser[] = [
  { id: "u-01", fullName: "Mariam Traoré", city: "BAMAKO", totalXp: 2450, currentLevelId: 5 },
  { id: "u-02", fullName: "Kofi Mensah", city: "LOME", totalXp: 2100, currentLevelId: 4 },
  { id: "u-03", fullName: "Fatou Ndiaye", city: "DAKAR", totalXp: 1980, currentLevelId: 4 },
  { id: "u-04", fullName: "Yao Kouassi", city: "ABIDJAN", totalXp: 1875, currentLevelId: 4 },
  { id: "u-05", fullName: "Sètondji Agbodjan", city: "COTONOU", totalXp: 1650, currentLevelId: 4 },
  { id: "u-06", fullName: "Aminata Diallo", city: "DAKAR", totalXp: 1520, currentLevelId: 3 },
  { id: "u-07", fullName: "Jean-Marc Kobenan", city: "ABIDJAN", totalXp: 1340, currentLevelId: 3 },
  { id: "u-08", fullName: "Rachida Sow", city: "DAKAR", totalXp: 1190, currentLevelId: 3 },
  { id: "u-09", fullName: "Espoir Hounkpatin", city: "COTONOU", totalXp: 1100, currentLevelId: 3 },
  { id: "u-10", fullName: "Adjoua N'Guessan", city: "ABIDJAN", totalXp: 990, currentLevelId: 3 },
  { id: "u-11", fullName: "Moussa Keïta", city: "BAMAKO", totalXp: 870, currentLevelId: 2 },
  { id: "u-12", fullName: "Akossiwa Amenyo", city: "LOME", totalXp: 760, currentLevelId: 2 },
  { id: "u-13", fullName: "Ibrahim Cissé", city: "ABIDJAN", totalXp: 680, currentLevelId: 2 },
  { id: "u-14", fullName: "Chantal Dossou", city: "COTONOU", totalXp: 540, currentLevelId: 2 },
  { id: "u-15", fullName: "Oumar Ba", city: "DAKAR", totalXp: 425, currentLevelId: 2 },
  { id: "u-16", fullName: "Essi Lawson", city: "LOME", totalXp: 320, currentLevelId: 1 },
  { id: "u-17", fullName: "Boubacar Sangaré", city: "BAMAKO", totalXp: 275, currentLevelId: 1 },
  { id: "u-18", fullName: "Grâce Tanoh", city: "ABIDJAN", totalXp: 150, currentLevelId: 1 },
];
