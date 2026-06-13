"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/layout/Logo";
import { getLevelById } from "@/data/levels";
import { getBadgeById } from "@/data/badges";
import { tasks } from "@/data/tasks";
import { formatXp } from "@/lib/utils/format";

const TOTAL_TASKS = tasks.length;

interface PublicProfile {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  city: string;
  cityLabel: string;
  bio: string | null;
  projectName: string | null;
  projectDescription: string | null;
  skills: string[];
  currentLevelId: number;
  totalXp: number;
  role: string;
  badges: { badgeId: number; earnedAt: string }[];
  tasksCompleted: number;
  memberSince: string;
}

function ProjectStage(levelId: number): string {
  if (levelId <= 2) return "Idée";
  if (levelId <= 4) return "Validation";
  if (levelId <= 5) return "Acquisition";
  if (levelId <= 6) return "Structuration";
  if (levelId <= 7) return "Financement";
  return "Lancement";
}

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/public/profile/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setProfile(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Chargement du profil...</p>
      </main>
    );
  }

  if (notFound || !profile) {
    return (
      <main className="min-h-screen bg-background px-4 py-10 flex flex-col items-center justify-center gap-6">
        <Logo size={36} />
        <p className="text-4xl">🔍</p>
        <h1 className="font-display text-2xl font-bold text-foreground">Profil introuvable</h1>
        <p className="text-muted text-sm text-center max-w-sm">
          Ce lien de profil est invalide ou l&apos;utilisateur n&apos;existe plus.
        </p>
        <Link href="/" className="px-5 py-2.5 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity">
          Retour à l&apos;accueil
        </Link>
      </main>
    );
  }

  const level = getLevelById(profile.currentLevelId);
  const earnedBadges = profile.badges
    .map((b) => getBadgeById(b.badgeId))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const stage = ProjectStage(profile.currentLevelId);
  const isCoach = profile.role === "COACH" || profile.role === "ADMIN";

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-lg mx-auto flex flex-col gap-5">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-2">
          <Logo size={28} />
          <span className="font-display text-xl font-bold text-primary dark:text-[#4D6FFF]">
            StartKaba
          </span>
        </Link>

        {/* Hero card */}
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <Avatar fullName={profile.fullName} avatarUrl={profile.avatarUrl} size="lg" />
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {profile.fullName}
            </h1>
            {isCoach && (
              <span className="px-2 py-0.5 rounded-full bg-cta/10 text-cta text-xs font-bold">
                Coach
              </span>
            )}
          </div>
          <p className="text-muted text-sm">📍 {profile.cityLabel}</p>
          {profile.bio && (
            <p className="text-foreground mt-3 text-sm leading-relaxed max-w-sm mx-auto">
              {profile.bio}
            </p>
          )}
          <p className="text-muted text-xs mt-2">Membre depuis {profile.memberSince}</p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            <div>
              <p className="font-display text-2xl font-bold text-green dark:text-[#4ADE80]">
                {formatXp(profile.totalXp)}
              </p>
              <p className="text-muted text-xs">XP</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-primary dark:text-[#4D6FFF]">
                {profile.currentLevelId}/8
              </p>
              <p className="text-muted text-xs">{level?.title}</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-foreground">
                {profile.tasksCompleted}/{TOTAL_TASKS}
              </p>
              <p className="text-muted text-xs">tâches</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-cta">
                {earnedBadges.length}
              </p>
              <p className="text-muted text-xs">badges</p>
            </div>
          </div>
        </div>

        {/* Projet */}
        {profile.projectName && (
          <div className="bg-surface border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-muted uppercase tracking-wider">Projet</p>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-semibold">
                {stage}
              </span>
            </div>
            <p className="font-display font-bold text-foreground text-lg">{profile.projectName}</p>
            {profile.projectDescription && (
              <p className="text-muted text-sm mt-1 leading-relaxed">{profile.projectDescription}</p>
            )}
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {profile.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-primary/10 dark:bg-[rgba(77,111,255,0.15)] text-primary dark:text-[#4D6FFF] text-xs font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <div className="bg-surface border border-border rounded-2xl p-5">
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
              Badges ({earnedBadges.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map((b) => (
                <span
                  key={b.id}
                  title={`${b.name} — ${b.description}`}
                  className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-default"
                >
                  {b.icon}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA rejoindre */}
        <div className="bg-gradient-to-br from-primary/5 to-cta/5 dark:from-[rgba(77,111,255,0.08)] dark:to-[rgba(247,126,45,0.08)] border border-border rounded-2xl p-6 text-center">
          <p className="font-display font-bold text-foreground text-lg mb-1">
            Lance ton propre projet 🚀
          </p>
          <p className="text-muted text-sm mb-4">
            Rejoins {profile.fullName.split(" ")[0]} et des centaines d&apos;entrepreneurs d&apos;Afrique de l&apos;Ouest sur StartKaba.
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
          >
            Commencer gratuitement →
          </Link>
        </div>
      </div>
    </main>
  );
}
