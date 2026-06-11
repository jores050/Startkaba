"use client";

import { useLevels } from "@/hooks/use-progress";
import { LevelCard } from "@/components/gamification/LevelCard";

export default function ParcoursPage() {
  const { levels, error, isLoading } = useLevels();

  if (isLoading) return <p className="text-muted">Chargement du parcours...</p>;
  if (error || !levels) {
    return <p className="text-error">Impossible de charger le parcours.</p>;
  }

  const totalEarned = levels.reduce((s, l) => s + l.earnedXp, 0);
  const completedLevels = levels.filter((l) => l.status === "COMPLETED").length;

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Mon Parcours
        </h1>
        <p className="text-muted mt-1">
          {completedLevels} niveau{completedLevels > 1 ? "x" : ""} complété
          {completedLevels > 1 ? "s" : ""} ·{" "}
          <span className="text-green font-semibold">{totalEarned} XP</span>{" "}
          gagnés
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}
