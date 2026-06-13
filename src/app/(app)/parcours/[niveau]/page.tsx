"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { useLevelDetail, useStartTask } from "@/hooks/use-progress";
import { TaskCard } from "@/components/gamification/TaskCard";
import { ToastStack, type ToastData } from "@/components/gamification/XpToast";
import { Confetti } from "@/components/gamification/Confetti";
import type { QuizResult } from "@/components/gamification/QuizModal";
import { getBadgeById } from "@/data/badges";
import { LEVEL_TIME_ESTIMATES } from "@/data/level-meta";
import { playSuccessSound } from "@/lib/sound";

let toastId = 0;

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-[#E8EAF0] dark:bg-[#1E2540] ${className}`} />;
}

function NiveauSkeleton() {
  return (
    <div className="max-w-3xl">
      <Skeleton className="h-5 w-32 mb-6" />
      <Skeleton className="h-10 w-80 mb-2" />
      <Skeleton className="h-5 w-64 mb-6" />
      <Skeleton className="h-28 w-full mb-8" />
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}
      </div>
    </div>
  );
}

export default function NiveauPage() {
  const params = useParams<{ niveau: string }>();
  const levelId = Number(params.niveau);
  const { level, error, isLoading } = useLevelDetail(levelId);
  const { startTask } = useStartTask(levelId);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [confetti, setConfetti] = useState(false);

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
    playSuccessSound();
    const isLevelComplete = level && level.completedTasks + 1 === level.taskCount;
    if (isLevelComplete) {
      setConfetti(true);
      setTimeout(() => {
        router.push(`/parcours/${levelId}/recap`);
      }, 2800);
    }
    mutate(`/api/levels/${levelId}`);
    mutate("/api/levels");
    mutate("/api/user/profile");
  }

  if (!Number.isInteger(levelId) || levelId < 1 || levelId > 8) {
    return <p className="text-[#8892C8]">Niveau introuvable.</p>;
  }
  if (isLoading) return <NiveauSkeleton />;
  if (error) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">🔒</p>
          <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-2">
            {error.message}
          </h2>
          <Link href="/parcours" className="text-[#0722AB] hover:underline text-sm">
            ← Retour au parcours
          </Link>
        </div>
      </div>
    );
  }
  if (!level) return null;

  const badges = level.badgeIds
    .map(getBadgeById)
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const pct = level.totalXp > 0
    ? Math.round((level.earnedXp / level.totalXp) * 100)
    : 0;

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <Link
        href="/parcours"
        className="inline-flex items-center gap-1.5 text-[#8892C8] hover:text-[#0722AB] transition-colors text-sm mb-6"
      >
        ← Retour au parcours
      </Link>

      {/* Header niveau */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url(/patterns/wax-${(levelId % 3) + 1}.svg)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[#0722AB] text-white font-display font-extrabold text-xl flex items-center justify-center shrink-0">
                {level.id}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-2xl font-extrabold text-[#0A0E2A]">
                    {level.title}
                  </h1>
                  {level.status === "COMPLETED" && (
                    <span className="px-2 py-0.5 rounded-full bg-[#AEFF94]/40 text-[#1A6B00] text-xs font-bold">
                      ✓ Complété
                    </span>
                  )}
                </div>
                <p className="text-[#8892C8] text-sm italic mt-0.5">{level.subtitle}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {level.status === "COMPLETED" && (
                <Link
                  href={`/parcours/${level.id}/recap`}
                  className="px-4 py-2 rounded-xl bg-[#1A6B00] text-white text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  🎓 Récap
                </Link>
              )}
              <Link
                href={`/coach?niveau=${level.id}`}
                className="px-4 py-2 rounded-xl border border-[#0722AB] text-[#0722AB] text-sm font-bold hover:bg-[#0722AB] hover:text-white transition-colors"
              >
                🤖 Demander à Kaba
              </Link>
            </div>
          </div>

          <p className="text-[#4A5280] text-sm mb-5">{level.description}</p>

          <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
            <span className="text-[#8892C8]">⏱ {LEVEL_TIME_ESTIMATES[level.id]}</span>
            <span className="text-[#8892C8]">
              {level.completedTasks}/{level.taskCount} tâches
            </span>
            <span className="text-[#1A6B00] font-semibold">
              {level.earnedXp}/{level.totalXp} XP
            </span>
          </div>

          <div className="h-2.5 rounded-full bg-[#EEF1FF] overflow-hidden mb-3">
            <div
              className={`h-full rounded-full transition-all ${
                level.status === "COMPLETED" ? "bg-[#1A6B00]" : "bg-[#0722AB]"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          {badges.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {badges.map((b) => (
                <span
                  key={b.id}
                  title={b.description}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    level.status === "COMPLETED"
                      ? "bg-[#AEFF94]/40 text-[#1A6B00] border border-[#1A6B00]/20"
                      : "bg-[#EEF1FF] text-[#0722AB] border border-[#0722AB]/20"
                  }`}
                >
                  {b.icon} {b.name}
                </span>
              ))}
            </div>
          )}
        </div>
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

      {/* Bouton flottant Kaba (mobile) */}
      <Link
        href={`/coach?niveau=${level.id}`}
        className="fixed bottom-24 right-4 md:hidden z-30 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#0722AB] text-white font-bold shadow-lg hover:opacity-90 transition-opacity text-sm"
      >
        🤖 Kaba
      </Link>

      <ToastStack toasts={toasts} onDone={dismissToast} />
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
    </div>
  );
}
