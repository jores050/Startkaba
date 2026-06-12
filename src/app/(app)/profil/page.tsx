"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import type { ReflectionWithMeta } from "@/app/api/reflections/route";
import { useUser, type FullProfile } from "@/hooks/use-user";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";
import { Avatar } from "@/components/ui/Avatar";
import { badges as badgeDefs, getBadgeById } from "@/data/badges";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { getLevelById } from "@/data/levels";
import { CITIES } from "@/lib/validations/auth";
import { getXpProgress } from "@/lib/utils/xp";
import { formatXp } from "@/lib/utils/format";

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
          ? "border-[#1A6B00] bg-[#F0FAF0] text-[#1A6B00]"
          : "border-[#0722AB] text-[#0722AB] hover:bg-[#0722AB] hover:text-white"
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
        <p className="text-sm font-medium text-[#0A0E2A]">Son de validation</p>
        <p className="text-xs text-[#8892C8] mt-0.5">Joue une mélodie à chaque tâche validée</p>
      </div>
      <span className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${on ? "bg-[#1A6B00]" : "bg-[#E8EAF0]"}`}>
        <span className={`block w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${on ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

function ReflectionsSection() {
  const { data, isLoading } = useSWR<ReflectionWithMeta[]>("/api/reflections", fetcher);

  if (isLoading) {
    return (
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="h-5 bg-[#E8EAF0] rounded w-48 mb-4" />
        <div className="flex flex-col gap-3">
          <div className="h-20 bg-[#E8EAF0] rounded-xl" />
          <div className="h-20 bg-[#E8EAF0] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  // Group by levelId
  const byLevel = data.reduce<Record<number, ReflectionWithMeta[]>>((acc, r) => {
    (acc[r.levelId] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-1">Mes réflexions</h2>
      <p className="text-[#8892C8] text-sm mb-5">Tes réponses aux exercices de réflexion, par niveau.</p>
      {Object.entries(byLevel)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([levelId, refs]) => (
          <div key={levelId} className="mb-6 last:mb-0">
            <p className="text-xs font-bold text-[#0722AB] uppercase tracking-wider mb-3">
              Niveau {levelId}
            </p>
            <div className="flex flex-col gap-4">
              {refs.map((r) => (
                <div key={`${r.taskId}-${r.exerciseIndex}`} className="bg-[#F8F9FF] border border-[#E8EAF0] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#8892C8] mb-1">{r.taskTitle}</p>
                  <p className="text-sm font-medium text-[#0A0E2A] mb-2">💭 {r.question}</p>
                  <p className="text-sm text-[#4A5280] leading-relaxed whitespace-pre-wrap">{r.answer}</p>
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
      <div className="animate-pulse bg-[#E8EAF0] rounded-2xl h-36" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="animate-pulse bg-[#E8EAF0] rounded-2xl h-24" />
        <div className="animate-pulse bg-[#E8EAF0] rounded-2xl h-24" />
      </div>
      <div className="animate-pulse bg-[#E8EAF0] rounded-2xl h-32" />
      <div className="animate-pulse bg-[#E8EAF0] rounded-2xl h-48" />
    </div>
  );
}

export default function ProfilPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <ProfilSkeleton />;
  if (error || !user) {
    return (
      <div className="max-w-md">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-[#4A5280]">Impossible de charger le profil.</p>
        </div>
      </div>
    );
  }

  const level = getLevelById(user.currentLevelId);
  const cityLabel = CITIES.find((c) => c.value === user.city)?.label ?? user.city;
  const xpProgress = getXpProgress(user.totalXp, user.currentLevelId);
  const earnedIds = new Set(user.badges.map((b) => b.badgeId));
  const completeness = getCompleteness(user);

  const timeline = [...user.badges]
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .map((b) => ({ ...b, def: getBadgeById(b.badgeId) }))
    .filter((b) => b.def);

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {/* Carte identité */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar fullName={user.fullName} avatarUrl={user.avatarUrl} size="lg" />
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">
              {user.fullName}
            </h1>
            <p className="text-[#8892C8] text-sm mt-1">📍 {cityLabel}</p>
            {user.bio && <p className="text-[#4A5280] mt-3 text-sm leading-relaxed">{user.bio}</p>}
            {user.projectName && (
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#EEF1FF] text-[#0722AB] text-xs font-semibold">
                  🚀 {user.projectName}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#F0FAF0] text-[#1A6B00] text-xs font-semibold">
                  Niveau {user.currentLevelId} — {level?.title}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <ShareButton userId={user.id} />
            <Link
              href="/profil/edit"
              className="px-4 py-2 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Modifier
            </Link>
          </div>
        </div>
      </div>

      {/* Stats — ligne */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "XP Total", value: formatXp(user.totalXp), color: "text-[#1A6B00]" },
          { label: "Niveau", value: `Niv. ${user.currentLevelId}`, color: "text-[#0722AB]" },
          { label: "Série", value: `${user.stats.streakDays}j 🔥`, color: "text-[#F77E2D]" },
          { label: "Tâches", value: String(user.stats.tasksCompleted), color: "text-[#0A0E2A]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E8EAF0] rounded-2xl p-4 text-center shadow-sm">
            <p className={`font-display text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[#8892C8] text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* XP + complétude */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-5 shadow-sm">
          <p className="text-[#8892C8] text-sm mb-3">Progression XP</p>
          <div className="flex justify-between text-xs text-[#8892C8] mb-1.5">
            <span>Niveau {user.currentLevelId}</span>
            <span className="font-bold text-[#1A6B00]">{xpProgress.current}/{xpProgress.needed} XP</span>
          </div>
          <div className="h-2.5 rounded-full bg-[#F0FAF0] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1A6B00] transition-all"
              style={{ width: `${xpProgress.percentage}%` }}
            />
          </div>
          <p className="text-[#8892C8] text-xs mt-2">
            {Math.max(0, xpProgress.needed - xpProgress.current)} XP pour le niveau suivant
          </p>
        </div>

        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#8892C8] text-sm">Complétude du profil</p>
            <p className="font-display font-extrabold text-[#0722AB]">{completeness.score}%</p>
          </div>
          <div className="h-2.5 rounded-full bg-[#EEF1FF] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0722AB] transition-all"
              style={{ width: `${completeness.score}%` }}
            />
          </div>
          {completeness.hint ? (
            <p className="text-[#8892C8] text-xs mt-2">
              💡{" "}
              <Link href="/profil/edit" className="hover:text-[#0722AB] underline">
                {completeness.hint}
              </Link>
            </p>
          ) : (
            <p className="text-[#1A6B00] text-xs mt-2 font-semibold">✓ Profil complet !</p>
          )}
        </div>
      </div>

      {/* Projet */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-4">Mon projet</h2>
        {user.projectName ? (
          <div>
            <p className="font-display text-xl font-bold text-[#0722AB]">{user.projectName}</p>
            {user.projectDescription && (
              <p className="text-[#4A5280] text-sm mt-2 leading-relaxed">{user.projectDescription}</p>
            )}
            {user.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-[#EEF1FF] text-[#0722AB] text-xs font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-[#8892C8] text-sm mb-3">Aucun projet renseigné.</p>
            <Link
              href="/profil/edit"
              className="px-4 py-2 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Ajouter mon projet
            </Link>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-[#0A0E2A]">Badges</h2>
          <span className="px-3 py-1 rounded-full bg-[#EEF1FF] text-[#0722AB] text-xs font-bold">
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

      {/* Timeline */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-4">Ma progression</h2>
        {timeline.length > 0 ? (
          <ol className="relative border-l-2 border-[#E8EAF0] ml-3 flex flex-col gap-5">
            {timeline.map((t) => (
              <li key={t.badgeId} className="pl-6 relative">
                <span className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-[#1A6B00] text-white text-xs flex items-center justify-center font-bold">
                  ✓
                </span>
                <p className="text-sm font-semibold text-[#0A0E2A]">
                  {t.def!.icon} {t.def!.name}
                </p>
                <p className="text-[#8892C8] text-xs mt-0.5">
                  {new Date(t.earnedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {t.def!.description}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="text-center py-6">
            <p className="text-4xl mb-2">🏁</p>
            <p className="text-[#8892C8] text-sm">
              Ta progression apparaîtra ici dès ton premier badge.
            </p>
          </div>
        )}
      </div>

      {/* Réflexions */}
      <ReflectionsSection />

      {/* Préférences */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-4">Préférences</h2>
        <SoundToggle />
      </div>
    </div>
  );
}
