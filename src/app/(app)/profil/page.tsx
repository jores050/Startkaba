"use client";

import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "@/components/ui/Avatar";
import { badges as badgeDefs } from "@/data/badges";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { getLevelById } from "@/data/levels";
import { CITIES } from "@/lib/validations/auth";
import { getXpProgress } from "@/lib/utils/xp";
import { formatXp } from "@/lib/utils/format";

export default function ProfilPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <p className="text-muted">Chargement du profil...</p>;
  }
  if (error || !user) {
    return (
      <p className="text-error">
        Impossible de charger le profil. Réessaie dans un instant.
      </p>
    );
  }

  const level = getLevelById(user.currentLevelId);
  const cityLabel =
    CITIES.find((c) => c.value === user.city)?.label ?? user.city;
  const xpProgress = getXpProgress(user.totalXp, user.currentLevelId);
  const earnedIds = new Set(user.badges.map((b) => b.badgeId));

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      {/* En-tête identité */}
      <section className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <Avatar fullName={user.fullName} avatarUrl={user.avatarUrl} size="lg" />
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {user.fullName}
          </h1>
          <p className="text-muted mt-1">{cityLabel}</p>
          {user.bio && <p className="text-foreground mt-3">{user.bio}</p>}
        </div>
        <Link
          href="/profil/edit"
          className="px-4 py-2 rounded-lg bg-cta text-white font-semibold hover:opacity-90 transition-opacity shrink-0"
        >
          Modifier
        </Link>
      </section>

      {/* XP + niveau */}
      <section className="bg-surface border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-muted text-sm">Niveau actuel</p>
            <p className="font-display text-xl font-bold text-primary">
              Niveau {user.currentLevelId} — {level?.title ?? ""}
            </p>
          </div>
          <p className="font-display text-2xl font-bold text-green">
            {formatXp(user.totalXp)}
          </p>
        </div>
        <div className="h-3 rounded-full bg-green-light/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-green transition-all"
            style={{ width: `${xpProgress.percentage}%` }}
          />
        </div>
        <p className="text-muted text-sm mt-2">
          {xpProgress.current} / {xpProgress.needed} XP vers le niveau suivant
        </p>
      </section>

      {/* Projet */}
      <section className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-foreground mb-3">
          Mon projet
        </h2>
        {user.projectName ? (
          <>
            <p className="text-primary font-semibold">{user.projectName}</p>
            {user.projectDescription && (
              <p className="text-muted mt-2">{user.projectDescription}</p>
            )}
          </>
        ) : (
          <p className="text-muted">
            Aucun projet renseigné.{" "}
            <Link href="/profil/edit" className="text-primary hover:underline">
              Ajoute-le
            </Link>
          </p>
        )}
      </section>

      {/* Compétences */}
      <section className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-foreground mb-3">
          Compétences
        </h2>
        {user.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted">Aucune compétence renseignée.</p>
        )}
      </section>

      {/* Badges */}
      <section className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold text-foreground mb-4">
          Badges{" "}
          <span className="text-muted font-normal text-sm">
            ({earnedIds.size}/{badgeDefs.length})
          </span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badgeDefs.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              earned={earnedIds.has(badge.id)}
              earnedAt={
                user.badges.find((b) => b.badgeId === badge.id)?.earnedAt
              }
            />
          ))}
        </div>
      </section>

      {/* Statistiques */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-6 text-center">
          <p className="font-display text-3xl font-bold text-primary">
            {user.stats.tasksCompleted}
          </p>
          <p className="text-muted text-sm mt-1">Tâches complétées</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 text-center">
          <p className="font-display text-3xl font-bold text-green">
            {user.stats.activeDays}
          </p>
          <p className="text-muted text-sm mt-1">Jours actifs</p>
        </div>
      </section>
    </div>
  );
}
