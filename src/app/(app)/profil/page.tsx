"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { MapPin, Rocket } from "lucide-react";
import type { ReflectionWithMeta } from "@/app/api/reflections/route";
import { useUser, type FullProfile } from "@/hooks/use-user";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";
import { Avatar } from "@/components/ui/Avatar";
import { badges as badgeDefs } from "@/data/badges";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { getLevelById, levels } from "@/data/levels";
import { tasks } from "@/data/tasks";
import { CITIES } from "@/lib/validations/auth";
import { getXpProgress } from "@/lib/utils/xp";
import { formatXp } from "@/lib/utils/format";

const TOTAL_TASKS = tasks.length;

// Stade du projet déduit du niveau actuel
function getProjectStage(levelId: number): string {
  if (levelId <= 2) return "Idée & Proposition de valeur";
  if (levelId <= 4) return "Validation & MVP";
  if (levelId === 5) return "Acquisition clients";
  if (levelId === 6) return "Structuration légale";
  if (levelId === 7) return "Financement";
  return "Lancement officiel";
}

function getCompleteness(user: FullProfile): { score: number; hint: string | null } {
  const criteria: { ok: boolean; hint: string }[] = [
    { ok: Boolean(user.avatarUrl), hint: "Ajoute une photo de profil" },
    { ok: Boolean(user.bio), hint: "Ajoute ta bio" },
    { ok: Boolean(user.projectName), hint: "Nomme ton projet" },
    { ok: Boolean(user.projectDescription), hint: "Décris ton projet" },
    { ok: user.skills.length > 0, hint: "Ajoute tes compétences" },
  ];
  const done = criteria.filter((c) => c.ok).length;
  const next = criteria.find((c) => !c.ok);
  return {
    score: done * 20,
    hint: next ? `${next.hint} pour atteindre ${(done + 1) * 20}%` : null,
  };
}

function ShareButton({ userId }: { userId: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${window.location.origin}/p/${userId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }}
      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
        copied
          ? "border-green dark:border-[#4ADE80] bg-green-bg dark:bg-[rgba(74,222,128,0.08)] text-green dark:text-[#4ADE80]"
          : "border-primary dark:border-[#4D6FFF] text-primary dark:text-[#4D6FFF] hover:bg-primary hover:text-white dark:hover:bg-[#4D6FFF]"
      }`}
    >
      {copied ? "✓ Lien copié !" : "Partager"}
    </button>
  );
}

function SoundToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => setOn(isSoundEnabled()), []);
  return (
    <button
      onClick={() => { setSoundEnabled(!on); setOn(!on); }}
      className="flex items-center justify-between w-full"
    >
      <div>
        <p className="text-sm font-medium text-foreground">Son de validation</p>
        <p className="text-xs text-muted mt-0.5">Joue une mélodie à chaque tâche validée</p>
      </div>
      <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${on ? "bg-green dark:bg-[#4ADE80]" : "bg-border"}`}>
        <span className={`block w-5 h-5 rounded-full bg-white dark:bg-[#0B0F1A] transition-transform shadow-sm ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

function ReflectionsSection() {
  const { data, isLoading } = useSWR<ReflectionWithMeta[]>("/api/reflections", fetcher);

  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-2xl p-6 animate-pulse">
        <div className="h-5 bg-border/60 rounded w-48 mb-4" />
        <div className="flex flex-col gap-3">
          <div className="h-20 bg-border/60 rounded-xl" />
          <div className="h-20 bg-border/60 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  const byLevel = data.reduce<Record<number, ReflectionWithMeta[]>>((acc, r) => {
    (acc[r.levelId] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <h2 className="font-display text-xl font-bold text-foreground mb-1">Mes réflexions</h2>
      <p className="text-muted text-sm mb-5">Tes réponses aux exercices de réflexion, par niveau.</p>
      {Object.entries(byLevel)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([levelId, refs]) => (
          <div key={levelId} className="mb-6 last:mb-0">
            <p className="text-xs font-bold text-primary dark:text-[#4D6FFF] uppercase tracking-wider mb-3">
              Niveau {levelId}
            </p>
            <div className="flex flex-col gap-4">
              {refs.map((r) => (
                <div key={`${r.taskId}-${r.exerciseIndex}`} className="bg-background border border-border rounded-xl p-4">
                  <p className="text-xs font-semibold text-muted mb-1">{r.taskTitle}</p>
                  <p className="text-sm font-medium text-foreground mb-2">💭 {r.question}</p>
                  <p className="text-sm text-mid leading-relaxed whitespace-pre-wrap">{r.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function ProfilSkeleton() {
  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <div className="animate-pulse bg-border/40 rounded-2xl h-36" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="animate-pulse bg-border/40 rounded-2xl h-24" />
        <div className="animate-pulse bg-border/40 rounded-2xl h-24" />
      </div>
      <div className="animate-pulse bg-border/40 rounded-2xl h-32" />
    </div>
  );
}

export default function ProfilPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <ProfilSkeleton />;
  if (error || !user) {
    return (
      <div className="max-w-md">
        <div className="bg-surface border border-border rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-mid">Impossible de charger le profil.</p>
        </div>
      </div>
    );
  }

  const level = getLevelById(user.currentLevelId);
  const cityLabel = CITIES.find((c) => c.value === user.city)?.label ?? user.city;
  const xpProgress = getXpProgress(user.totalXp, user.currentLevelId);
  const earnedIds = new Set(user.badges.map((b) => b.badgeId));
  const completeness = getCompleteness(user);
  const stage = getProjectStage(user.currentLevelId);
  const isCoach = (user as FullProfile & { role?: string }).role === "COACH" || user.isAdmin;

  // Timeline : niveaux complétés (via badges level_N_complete) + niveau en cours
  const levelBadgeMap: Record<number, number> = { 1: 2, 2: 4, 3: 6, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19 };
  const completedLevels = levels
    .filter((l) => {
      const badgeId = levelBadgeMap[l.id];
      return badgeId && earnedIds.has(badgeId);
    })
    .map((l) => {
      const badgeId = levelBadgeMap[l.id];
      const earned = user.badges.find((b) => b.badgeId === badgeId);
      return {
        levelId: l.id,
        title: l.title,
        date: earned ? new Date(earned.earnedAt) : null,
        xp: l.totalXp,
      };
    });

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {/* ── Carte identité ──────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar fullName={user.fullName} avatarUrl={user.avatarUrl} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-3xl font-extrabold text-foreground">
                {user.fullName}
              </h1>
              {isCoach && (
                <span className="px-2.5 py-0.5 rounded-full bg-cta/10 text-cta text-xs font-bold">
                  Coach ✦
                </span>
              )}
            </div>
            <p className="text-muted text-sm mt-1 flex items-center gap-1"><MapPin size={12} strokeWidth={2} />{cityLabel}</p>
            {user.bio && (
              <p className="text-mid mt-3 text-sm leading-relaxed">{user.bio}</p>
            )}
            {user.projectName && (
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-primary-light text-primary dark:text-[#4D6FFF] text-xs font-semibold">
                  <Rocket size={12} strokeWidth={2} className="inline mr-0.5 align-[-1px]" />{user.projectName}
                </span>
                <span className="px-3 py-1 rounded-full bg-green-bg text-green dark:text-[#4ADE80] text-xs font-semibold">
                  {stage}
                </span>
              </div>
            )}
            {/* Complétude mini */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted">Complétude du profil</p>
                <p className="text-xs font-bold text-primary dark:text-[#4D6FFF]">{completeness.score}%</p>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary dark:bg-[#4D6FFF] transition-all"
                  style={{ width: `${completeness.score}%` }}
                />
              </div>
              {completeness.hint ? (
                <p className="text-muted text-xs mt-1">
                  💡{" "}
                  <Link href="/profil/edit" className="hover:text-primary dark:hover:text-[#4D6FFF] underline">
                    {completeness.hint}
                  </Link>
                </p>
              ) : (
                <p className="text-green dark:text-[#4ADE80] text-xs mt-1 font-semibold">✓ Profil complet !</p>
              )}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <ShareButton userId={user.id} />
            <Link
              href="/profil/edit"
              className="px-4 py-2 rounded-xl bg-cta text-white text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Modifier
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats 4 cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "XP Total", value: formatXp(user.totalXp), color: "text-green dark:text-[#4ADE80]" },
          { label: "Niveau", value: `${user.currentLevelId}/8`, color: "text-primary dark:text-[#4D6FFF]" },
          { label: "Série", value: `${user.stats.streakDays ?? 0}j 🔥`, color: "text-cta" },
          { label: "Tâches", value: `${user.stats.tasksCompleted}/${TOTAL_TASKS}`, color: "text-foreground" },
        ].map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-2xl p-4 text-center">
            <p className={`font-display text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-muted text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Progression XP ──────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-5">
        <p className="text-muted text-sm mb-3">Progression vers Niveau {user.currentLevelId + 1}</p>
        <div className="flex justify-between text-xs text-muted mb-1.5">
          <span>Niveau {user.currentLevelId}</span>
          <span className="font-bold text-green dark:text-[#4ADE80]">{xpProgress.current}/{xpProgress.needed} XP</span>
        </div>
        <div className="h-2.5 rounded-full bg-green-bg dark:bg-[rgba(74,222,128,0.08)] overflow-hidden">
          <div
            className="h-full rounded-full bg-green dark:bg-[#4ADE80] transition-all"
            style={{ width: `${xpProgress.percentage}%` }}
          />
        </div>
        <p className="text-muted text-xs mt-2">
          {Math.max(0, xpProgress.needed - xpProgress.current)} XP pour le niveau suivant
        </p>
      </div>

      {/* ── Mon projet ──────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-foreground">Mon projet</h2>
          <Link href="/projet" className="text-xs font-semibold text-primary dark:text-[#4D6FFF] hover:underline">
            Voir en détail →
          </Link>
        </div>
        {user.projectName ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="font-display text-xl font-bold text-primary dark:text-[#4D6FFF]">{user.projectName}</p>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-semibold">
                {stage}
              </span>
            </div>
            {user.projectDescription && (
              <p className="text-mid text-sm leading-relaxed">{user.projectDescription}</p>
            )}
            {user.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary-light dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted text-sm mb-3">Aucun projet renseigné.</p>
            <Link href="/profil/edit" className="px-4 py-2 rounded-xl bg-cta text-white text-sm font-bold hover:opacity-90 transition-opacity">
              Ajouter mon projet
            </Link>
          </div>
        )}
      </div>

      {/* ── Badges ──────────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-foreground">Badges</h2>
          <span className="px-3 py-1 rounded-full bg-primary-light dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-bold">
            {earnedIds.size}/{badgeDefs.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {badgeDefs.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              earned={earnedIds.has(badge.id)}
              earnedAt={user.badges.find((b) => b.badgeId === badge.id)?.earnedAt}
            />
          ))}
        </div>
      </div>

      {/* ── Timeline de progression ─────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Timeline de progression</h2>
        {completedLevels.length > 0 ? (
          <ol className="relative border-l-2 border-border ml-3 flex flex-col gap-5">
            {completedLevels.map((t) => (
              <li key={t.levelId} className="pl-6 relative">
                <span className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-green dark:bg-[#4ADE80] text-white dark:text-[#0B0F1A] text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
                <p className="text-sm font-semibold text-foreground">
                  Niveau {t.levelId} — {t.title}
                </p>
                <p className="text-muted text-xs mt-0.5">
                  {t.date?.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) ?? "Date inconnue"}
                  {" · "}
                  <span className="text-green dark:text-[#4ADE80] font-semibold">{t.xp} XP</span>
                </p>
              </li>
            ))}
            {/* Niveau en cours */}
            {user.currentLevelId <= 8 && !earnedIds.has(levelBadgeMap[user.currentLevelId] ?? -1) && (
              <li className="pl-6 relative">
                <span className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-primary dark:bg-[#4D6FFF] text-white text-xs flex items-center justify-center font-bold">
                  …
                </span>
                <p className="text-sm font-semibold text-foreground">
                  Niveau {user.currentLevelId} — {level?.title} <span className="text-primary dark:text-[#4D6FFF] font-normal text-xs">(en cours)</span>
                </p>
                <p className="text-muted text-xs mt-0.5">
                  {user.stats.tasksCompleted} tâches complétées · {xpProgress.percentage}% du niveau
                </p>
              </li>
            )}
          </ol>
        ) : (
          <div className="text-center py-6">
            <p className="text-4xl mb-2">🏁</p>
            <p className="text-muted text-sm">
              Ta progression apparaîtra ici dès ton premier niveau complété.
            </p>
          </div>
        )}
      </div>

      {/* ── Réflexions ──────────────────────────────────────────────── */}
      <ReflectionsSection />

      {/* ── Préférences ─────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Préférences</h2>
        <SoundToggle />
        <div className="mt-4 pt-4 border-t border-border">
          <Link href="/profil/edit#apparence" className="text-sm text-primary dark:text-[#4D6FFF] hover:underline">
            Modifier l&apos;apparence (thème clair/sombre) →
          </Link>
        </div>
      </div>
    </div>
  );
}
