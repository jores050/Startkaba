"use client";

import Link from "next/link";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";
import { useLevels, useLevelDetail } from "@/hooks/use-progress";
import { XpBar } from "@/components/gamification/XpBar";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { getBadgeById } from "@/data/badges";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const TOTAL_MVP_XP = 425 + 625 + 575 + 825; // niveaux 1-4

export default function DashboardPage() {
  const { user } = useUser();
  const { levels } = useLevels();
  const currentLevelId = user?.currentLevelId ?? 1;
  const { level: currentLevel } = useLevelDetail(currentLevelId);
  const { data: coachData } = useSWR<{ quota: { remaining: number; total: number; isPremium: boolean } }>(
    `/api/coach/messages?levelId=${currentLevelId}`,
    fetcher
  );

  if (!user) return <p className="text-muted">Chargement du dashboard...</p>;

  const summary = levels?.find((l) => l.id === currentLevelId);
  const pct =
    summary && summary.totalXp > 0
      ? Math.round((summary.earnedXp / summary.totalXp) * 100)
      : 0;

  // Prochaine tâche + 3 tâches suggérées du jour
  const todoTasks =
    currentLevel?.tasks.filter((t) => t.status !== "COMPLETED") ?? [];
  const nextTask = todoTasks[0];
  const todayTasks = todoTasks.slice(0, 3);

  const lastBadges = [...user.badges]
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .slice(0, 3)
    .map((b) => ({ ...b, def: getBadgeById(b.badgeId) }))
    .filter((b) => b.def);

  const quota = coachData?.quota;
  const firstName = user.fullName.split(" ")[0];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-1">
        Salut {firstName} 👋🏾
      </h1>
      <p className="text-muted mb-8">Voici où en est ton aventure aujourd&apos;hui.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Niveau en cours */}
        <Link
          href={`/parcours/${currentLevelId}`}
          className="md:col-span-2 bg-surface border border-border rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all block"
        >
          <p className="text-muted text-sm mb-1">Niveau en cours</p>
          <h2 className="font-display text-xl font-bold text-primary mb-3">
            Niveau {currentLevelId} — {summary?.title}
          </h2>
          <XpBar current={summary?.earnedXp ?? 0} max={summary?.totalXp ?? 1} />
          <p className="text-muted text-sm mt-2">{pct}% complété</p>
          {nextTask && (
            <p className="text-foreground text-sm mt-3">
              <span className="text-cta font-semibold">Prochaine tâche :</span>{" "}
              {nextTask.title}
            </p>
          )}
        </Link>

        {/* XP total */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <p className="text-muted text-sm mb-1">XP Total</p>
          <p className="font-display text-4xl font-bold text-green mb-3">
            {user.totalXp}
          </p>
          <XpBar current={user.totalXp} max={TOTAL_MVP_XP} />
          <p className="text-muted text-xs mt-2">
            sur {TOTAL_MVP_XP} XP du parcours MVP
          </p>
        </div>

        {/* Badges récents */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted text-sm">Derniers badges</p>
            <Link href="/profil" className="text-primary text-xs hover:underline">
              Tout voir
            </Link>
          </div>
          {lastBadges.length > 0 ? (
            <div className="flex flex-col gap-3">
              {lastBadges.map((b) => (
                <div key={b.badgeId} className="flex items-center gap-3">
                  <span className="text-2xl">{b.def!.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {b.def!.name}
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(b.earnedAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">
              Complète ta première tâche pour gagner un badge !
            </p>
          )}
        </div>

        {/* Tâches du jour */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <p className="text-muted text-sm mb-4">Tâches du jour</p>
          {todayTasks.length > 0 ? (
            <div className="flex flex-col gap-3">
              {todayTasks.map((t) => (
                <Link
                  key={t.id}
                  href={`/parcours/${currentLevelId}`}
                  className="flex items-start gap-2 text-sm group"
                >
                  <span
                    className={
                      t.status === "IN_PROGRESS" ? "text-cta" : "text-muted"
                    }
                  >
                    {t.status === "IN_PROGRESS" ? "🔥" : "○"}
                  </span>
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {t.title}
                  </span>
                  <span className="text-green text-xs font-semibold ml-auto shrink-0">
                    +{t.xp}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">
              Toutes les tâches du niveau sont faites — bravo ! 🎉
            </p>
          )}
        </div>

        {/* Accès rapide Kaba */}
        <div className="bg-primary rounded-2xl p-6 text-white flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🤖</span>
            <p className="font-display font-bold">Kaba, ton coach</p>
          </div>
          <p className="text-white/80 text-sm flex-1">
            Bloqué sur une décision ? Kaba connaît ton projet et les réalités du
            terrain.
          </p>
          {quota && !quota.isPremium && (
            <p className="text-white/70 text-xs mt-3">
              {quota.remaining}/{quota.total} messages restants
            </p>
          )}
          <Link
            href={`/coach?niveau=${currentLevelId}`}
            className="mt-3 px-4 py-2 rounded-lg bg-cta text-white font-bold text-center hover:opacity-90 transition-opacity"
          >
            Parler à Kaba
          </Link>
        </div>
      </div>

      {/* Classement */}
      <div className="mt-6">
        <Leaderboard defaultCity={user.city !== "OTHER" ? user.city : ""} />
      </div>
    </div>
  );
}
