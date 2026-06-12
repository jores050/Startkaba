"use client";

import Link from "next/link";
import { useLevels } from "@/hooks/use-progress";
import { LevelCard } from "@/components/gamification/LevelCard";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-[#E8EAF0] ${className}`} />;
}

function ParcoursSkeletons() {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-12 w-48 rounded-xl" />
      </div>
      <Skeleton className="h-24 w-full mb-8" />
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-52" />
        ))}
      </div>
    </div>
  );
}

export default function ParcoursPage() {
  const { levels, error, isLoading } = useLevels();

  if (isLoading) return <ParcoursSkeletons />;
  if (error || !levels) {
    return (
      <div className="max-w-md">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">😕</p>
          <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-2">
            Impossible de charger le parcours
          </h2>
          <p className="text-[#8892C8] text-sm">Réessaie dans quelques instants.</p>
        </div>
      </div>
    );
  }

  const playable = levels.filter((l) => l.taskCount > 0);
  const totalTasks = playable.reduce((s, l) => s + l.taskCount, 0);
  const completedTasks = playable.reduce((s, l) => s + l.completedTasks, 0);
  const globalPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalEarned = levels.reduce((s, l) => s + l.earnedXp, 0);
  const completedLevels = levels.filter((l) => l.status === "COMPLETED").length;

  const continueLevel =
    levels.find((l) => l.status === "IN_PROGRESS") ??
    levels.find((l) => l.status === "UNLOCKED");

  return (
    <div className="max-w-5xl">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">
            Mon Parcours
          </h1>
          <p className="text-[#8892C8] mt-1 text-sm">
            {completedLevels} niveau{completedLevels > 1 ? "x" : ""} complété
            {completedLevels > 1 ? "s" : ""} ·{" "}
            <span className="text-[#1A6B00] font-semibold">{totalEarned.toLocaleString("fr-FR")} XP</span>{" "}
            gagnés
          </p>
        </div>
        {continueLevel && (
          <Link
            href={`/parcours/${continueLevel.id}`}
            className="px-5 py-3 rounded-xl bg-[#F77E2D] text-white font-bold hover:opacity-90 transition-opacity text-center shrink-0 text-sm"
          >
            Continuer le niveau {continueLevel.id} →
          </Link>
        )}
      </div>

      {/* Progression globale */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-5 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#8892C8] text-sm">Progression globale du parcours MVP</p>
            <p className="text-[#0A0E2A] text-xs mt-0.5">
              {completedTasks}/{totalTasks} tâches complétées (niveaux 1 à 4)
            </p>
          </div>
          <span className="font-display font-extrabold text-[#0722AB] text-2xl">
            {globalPct}%
          </span>
        </div>
        <div className="h-3 rounded-full bg-[#EEF1FF] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0722AB] transition-all"
            style={{ width: `${globalPct}%` }}
          />
        </div>
        {globalPct === 100 && (
          <p className="text-[#1A6B00] text-sm font-semibold mt-2">
            🎉 Parcours MVP complété ! Tu es prêt à lancer.
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}
