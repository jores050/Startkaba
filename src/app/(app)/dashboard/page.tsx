"use client";

import Link from "next/link";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";
import { useLevels, useLevelDetail } from "@/hooks/use-progress";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { badges as badgeDefs, getBadgeById } from "@/data/badges";
import { getQuoteOfTheDay } from "@/data/quotes";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const TOTAL_MVP_XP = 425 + 625 + 575 + 825; // niveaux 1-4

// Activité de la semaine (mock) — hauteurs des barres L→D
const WEEK_HEIGHTS = [30, 44, 32, 52, 3, 3, 3];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-wider uppercase text-muted mb-2">
      {children}
    </p>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const { levels } = useLevels();
  const currentLevelId = user?.currentLevelId ?? 1;
  const { level: currentLevel } = useLevelDetail(currentLevelId);
  const { data: coachData } = useSWR<{
    quota: { remaining: number; total: number; isPremium: boolean };
  }>(`/api/coach/messages?levelId=${currentLevelId}`, fetcher);

  if (!user) return <p className="text-muted">Chargement du dashboard...</p>;

  const summary = levels?.find((l) => l.id === currentLevelId);
  const pct =
    summary && summary.totalXp > 0
      ? Math.round((summary.earnedXp / summary.totalXp) * 100)
      : 0;
  const globalPct = Math.round((user.totalXp / TOTAL_MVP_XP) * 100);

  const todoTasks = currentLevel?.tasks.filter((t) => t.status !== "COMPLETED") ?? [];
  const nextTask = todoTasks[0];
  const dayTasks = currentLevel?.tasks.slice(0, 5) ?? [];

  // Derniers badges gagnés + premier badge verrouillé avec sa condition
  const earnedSorted = [...user.badges].sort(
    (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime()
  );
  const lastBadges = earnedSorted
    .slice(0, 3)
    .map((b) => ({ ...b, def: getBadgeById(b.badgeId) }))
    .filter((b) => b.def);
  const earnedIds = new Set(user.badges.map((b) => b.badgeId));
  const nextLocked = badgeDefs.find((b) => !earnedIds.has(b.id));

  const quota = coachData?.quota;
  const quotaDotsOn =
    quota && quota.total > 0
      ? Math.round((quota.remaining / quota.total) * 5)
      : 5;

  const quote = getQuoteOfTheDay();
  const todayIdx = (new Date().getDay() + 6) % 7; // 0 = lundi
  const weekly = user.stats.weekly;

  return (
    <div className="max-w-[1060px] flex flex-col gap-5">
      {/* b) PROCHAINE ÉTAPE */}
      {nextTask && (
        <div className="relative overflow-hidden bg-primary rounded-2xl px-5 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "url(/patterns/wax-2.svg)", backgroundSize: "60px 60px" }}
          />
          <div
            aria-hidden
            className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none"
          />
          <div className="relative">
            <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-1.5">
              Ta prochaine étape
            </p>
            <p className="font-display text-xl font-extrabold text-white tracking-tight">
              {nextTask.title}
            </p>
            <p className="text-xs text-white/55 mt-1">
              Niveau {currentLevelId} ·{" "}
              <span className="text-green-light font-bold">+{nextTask.xp} XP à la clé</span>
            </p>
          </div>
          <Link
            href={`/parcours/${currentLevelId}`}
            className="relative shrink-0 bg-cta text-white font-bold text-sm px-6 py-3 rounded-lg text-center hover:bg-[#FF9048] hover:-translate-y-px transition-all"
          >
            Reprendre →
          </Link>
        </div>
      )}

      {/* c) NIVEAU EN COURS + XP TOTAL */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-[#151A2E] border border-border rounded-xl p-5">
          <SectionLabel>Niveau en cours</SectionLabel>
          <p className="font-display font-extrabold text-primary mb-3">
            Niveau {currentLevelId} — {summary?.title}
          </p>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-[#2D4FE8] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted mt-1.5">
            <span>{pct}% complété</span>
            <span>{summary?.totalXp} XP max</span>
          </div>
          {nextTask && (
            <p className="mt-3.5 pt-3.5 border-t border-border text-xs text-mid">
              Prochaine tâche :{" "}
              <strong className="text-cta">{nextTask.title}</strong>
            </p>
          )}
        </div>

        <div className="bg-white border border-border rounded-xl p-5 flex flex-col">
          <SectionLabel>XP Total</SectionLabel>
          <p className="font-display text-4xl font-black text-ink leading-none tracking-tight">
            {user.totalXp.toLocaleString("fr-FR")}
          </p>
          <p className="text-xs text-muted mt-1.5 mb-3.5">
            sur {TOTAL_MVP_XP.toLocaleString("fr-FR")} XP du parcours MVP
          </p>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cta to-[#FFAB5E]"
              style={{ width: `${Math.min(100, globalPct)}%` }}
            />
          </div>
          {/* 8 segments — un par niveau */}
          <div className="flex gap-0.5 mt-1.5">
            {Array.from({ length: 8 }, (_, i) => {
              const lvl = i + 1;
              const status = levels?.find((l) => l.id === lvl)?.status;
              return (
                <div
                  key={lvl}
                  className={`flex-1 h-1 rounded-sm ${
                    status === "COMPLETED"
                      ? "bg-green"
                      : lvl === currentLevelId
                        ? "bg-primary"
                        : "bg-border"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted mt-1.5">
            <span>Niv.1</span>
            <span>🚀 Niv.8</span>
          </div>
        </div>
      </div>

      {/* d) BADGES + TÂCHES + KABA */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Badges */}
        <div className="bg-white dark:bg-[#151A2E] border border-border rounded-xl overflow-hidden">
          <div className="px-5 pt-4 flex justify-between items-center">
            <span className="text-base font-bold">Derniers badges</span>
            <Link href="/badges" className="text-xs font-semibold text-primary">
              Tout voir
            </Link>
          </div>
          <div className="px-5 py-3.5 flex flex-col gap-2.5">
            {lastBadges.map((b) => (
              <div key={b.badgeId} className="flex items-center gap-3">
                <span className="w-[34px] h-[34px] rounded-lg bg-green-bg flex items-center justify-center text-base shrink-0">
                  {b.def!.icon}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{b.def!.name}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {new Date(b.earnedAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
            {nextLocked && (
              <div className="flex items-center gap-3">
                <span className="w-[34px] h-[34px] rounded-lg bg-app grayscale opacity-45 flex items-center justify-center text-base shrink-0">
                  {nextLocked.icon}
                </span>
                <div>
                  <p className="text-sm font-bold text-muted">{nextLocked.name}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {nextLocked.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tâches du jour */}
        <div className="bg-white dark:bg-[#151A2E] border border-border rounded-xl overflow-hidden">
          <div className="px-5 pt-4 flex justify-between items-center">
            <span className="text-base font-bold">Tâches du jour</span>
            <Link
              href={`/parcours/${currentLevelId}`}
              className="text-xs font-semibold text-primary"
            >
              Voir tout
            </Link>
          </div>
          <div className="px-5 py-2">
            {dayTasks.map((t) => {
              const done = t.status === "COMPLETED";
              return (
                <Link
                  key={t.id}
                  href={`/parcours/${currentLevelId}`}
                  className="flex items-center gap-3 py-2.5 border-b border-border last:border-0 group"
                >
                  <span
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                      done
                        ? "bg-green border-green text-white"
                        : "border-border group-hover:border-primary"
                    }`}
                  >
                    {done ? "✓" : ""}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-sm font-semibold truncate ${
                        done ? "line-through text-muted" : "text-ink"
                      }`}
                    >
                      {t.title}
                    </span>
                    <span className="block text-xs text-muted mt-0.5">
                      Niv.{currentLevelId} ·{" "}
                      {done
                        ? "Complété"
                        : t.status === "IN_PROGRESS"
                          ? "En cours"
                          : "À faire"}
                    </span>
                  </span>
                  <span className="text-xs font-bold text-cta bg-cta-bg px-2 py-0.5 rounded-full shrink-0">
                    +{t.xp}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Kaba */}
        <div className="relative overflow-hidden rounded-xl p-5 flex flex-col bg-gradient-to-br from-primary to-[#0D2FD4] md:col-span-2 lg:col-span-1">
          <div
            aria-hidden
            className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none"
          />
          <span className="relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-xl mb-3">
            🤖
          </span>
          <p className="font-display text-base font-extrabold text-white mb-1.5">
            Kaba, ton coach
          </p>
          <p className="text-xs text-white/55 leading-relaxed mb-3.5">
            Bloqué sur une décision ? Kaba connaît ton projet et les réalités du terrain.
          </p>
          {quota && !quota.isPremium && (
            <div className="flex items-center gap-2 mb-3.5">
              <span className="flex gap-[3px]">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`w-[7px] h-[7px] rounded-full ${
                      i < quotaDotsOn ? "bg-cta" : "bg-white/15"
                    }`}
                  />
                ))}
              </span>
              <span className="text-xs text-white/40">
                {quota.remaining}/{quota.total} messages restants
              </span>
            </div>
          )}
          <Link
            href={`/coach?niveau=${currentLevelId}`}
            className="relative mt-auto bg-white text-primary font-bold text-sm py-2.5 rounded-lg text-center hover:opacity-90 transition-opacity"
          >
            Parler à Kaba →
          </Link>
        </div>
      </div>

      {/* e) CITATION + SEMAINE */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="relative overflow-hidden bg-green rounded-xl p-5">
          <span
            aria-hidden
            className="absolute -top-4 left-3 text-[5rem] leading-none text-white/10 font-serif select-none"
          >
            &ldquo;
          </span>
          <p className="relative text-sm text-white italic leading-relaxed mb-3">
            « {quote.text} »
          </p>
          <p className="text-xs font-bold text-green-light">
            — {quote.author}, {quote.role}
          </p>
        </div>

        <div className="bg-white dark:bg-[#151A2E] border border-border rounded-xl p-5">
          <p className="text-base font-bold mb-4">Cette semaine</p>
          <div className="flex gap-6">
            <div>
              <p className="font-display text-2xl font-black text-ink leading-none">
                {weekly?.tasksCompleted ?? 0}
              </p>
              <p className="text-xs text-muted mt-1">tâches complétées</p>
            </div>
            <div>
              <p className="font-display text-2xl font-black text-green leading-none">
                +{weekly?.xpEarned ?? 0} XP
              </p>
              <p className="text-xs text-muted mt-1">gagnés</p>
            </div>
          </div>
          {weekly?.badgeName && (
            <p className="mt-2.5 text-xs text-mid font-medium">
              Badge débloqué :{" "}
              <span className="bg-green-bg text-green font-bold text-xs px-2 py-0.5 rounded-full">
                {weekly.badgeName}
              </span>
            </p>
          )}
          <div className="flex gap-1.5 items-end h-14 mt-3.5">
            {WEEK_HEIGHTS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t ${
                    i === todayIdx ? "bg-cta" : h > 3 ? "bg-primary" : "bg-border"
                  }`}
                  style={{ height: h }}
                />
                <span
                  className={`text-xs font-semibold ${
                    i === todayIdx ? "text-cta" : "text-muted"
                  }`}
                >
                  {["L", "M", "M", "J", "V", "S", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* f) CLASSEMENT */}
      <Leaderboard defaultCity={user.city !== "OTHER" ? user.city : ""} />
    </div>
  );
}
