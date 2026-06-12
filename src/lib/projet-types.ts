// Types partagés pour la page Mon Projet — séparés du route handler.

export interface ProjetReflection {
  taskId: number;
  taskTitle: string;
  recapLabel: string;
  isCompleted: boolean;
  answer: string | null;
}

export interface ProjetSection {
  levelId: number;
  levelTitle: string;
  isUnlocked: boolean;
  reflections: ProjetReflection[];
}

export interface ProjetResponse {
  sections: ProjetSection[];
  totalSections: number;
  completedCount: number;
}
