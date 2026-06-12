"use client";

import { useUser } from "@/hooks/use-user";
import { badges as badgeDefs } from "@/data/badges";
import { BadgeCard } from "@/components/gamification/BadgeCard";

export default function BadgesPage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) return <p className="text-muted">Chargement...</p>;

  const earned = new Map(user.badges.map((b) => [b.badgeId, b.earnedAt]));

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-extrabold text-foreground mb-1">
        Mes Badges
      </h1>
      <p className="text-muted mb-8">
        <span className="text-green font-bold">{earned.size}</span>/
        {badgeDefs.length} badges décrochés — chaque badge raconte une étape de
        ton aventure.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {badgeDefs.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            earned={earned.has(badge.id)}
            earnedAt={earned.get(badge.id)}
          />
        ))}
      </div>
    </div>
  );
}
