"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { useLevelDetail, useStartTask } from "@/hooks/use-progress";
import { TaskCard } from "@/components/gamification/TaskCard";
import { XpBar } from "@/components/gamification/XpBar";
import { ToastStack, type ToastData } from "@/components/gamification/XpToast";
import type { QuizResult } from "@/components/gamification/QuizModal";
import { getBadgeById } from "@/data/badges";

let toastId = 0;

export default function NiveauPage() {
  const params = useParams<{ niveau: string }>();
  const levelId = Number(params.niveau);
  const { level, error, isLoading } = useLevelDetail(levelId);
  const { startTask } = useStartTask(levelId);
  const { mutate } = useSWRConfig();
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  function handleQuizCompleted(result: QuizResult) {
    const newToasts: ToastData[] = [
      { id: ++toastId, type: "xp", xp: result.xpEarned },
      ...result.badgesUnlocked.map((b) => ({
        id: ++toastId,
        type: "badge" as const,
        badgeName: b.name,
        badgeIcon: b.icon,
      })),
    ];
    setToasts((prev) => [...prev, ...newToasts]);
    // Revalide niveau, liste des niveaux et profil (XP/badges)
    mutate(`/api/levels/${levelId}`);
    mutate("/api/levels");
    mutate("/api/user/profile");
  }

  if (!Number.isInteger(levelId) || levelId < 1 || levelId > 8) {
    return <p className="text-error">Niveau introuvable.</p>;
  }
  if (isLoading) return <p className="text-muted">Chargement du niveau...</p>;
  if (error) {
    return (
      <div className="max-w-2xl">
        <p className="text-error mb-4">{error.message}</p>
        <Link href="/parcours" className="text-primary hover:underline">
          ← Retour au parcours
        </Link>
      </div>
    );
  }
  if (!level) return null;

  const badges = level.badgeIds
    .map(getBadgeById)
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="max-w-3xl">
      <Link
        href="/parcours"
        className="text-muted hover:text-primary transition-colors text-sm"
      >
        ← Retour au parcours
      </Link>

      <div className="flex items-start justify-between gap-4 mt-4 mb-2">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Niveau {level.id} — {level.title}
          </h1>
          <p className="text-muted italic mt-1">{level.subtitle}</p>
        </div>
        <Link
          href={`/coach?niveau=${level.id}`}
          className="shrink-0 px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          🤖 Demander à Kaba
        </Link>
      </div>

      <p className="text-foreground mb-6">{level.description}</p>

      {/* Progression du niveau */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted">
            {level.completedTasks}/{level.taskCount} tâches complétées
          </span>
          <span className="font-bold text-green">
            {level.earnedXp}/{level.totalXp} XP
          </span>
        </div>
        <XpBar current={level.earnedXp} max={level.totalXp} />
        {badges.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {badges.map((b) => (
              <span
                key={b.id}
                title={b.description}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-light/30 border border-green/30 text-xs font-medium text-green"
              >
                {b.icon} {b.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tâches */}
      <div className="flex flex-col gap-4">
        {level.tasks.map((task, i) => (
          <TaskCard
            key={task.id}
            task={task}
            index={i + 1}
            onStart={startTask}
            onQuizCompleted={handleQuizCompleted}
          />
        ))}
      </div>

      <ToastStack toasts={toasts} onDone={dismissToast} />
    </div>
  );
}
