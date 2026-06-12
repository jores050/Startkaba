"use client";

// Profil public partageable (lecture seule). En mock local, affiche le
// profil de démonstration quel que soit l'id.

import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/layout/Logo";
import { getLevelById } from "@/data/levels";
import { getBadgeById } from "@/data/badges";
import { CITIES } from "@/lib/validations/auth";

export default function PublicProfilePage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Chargement du profil...</p>
      </main>
    );
  }

  const level = getLevelById(user.currentLevelId);
  const cityLabel = CITIES.find((c) => c.value === user.city)?.label ?? user.city;
  const badges = user.badges
    .map((b) => getBadgeById(b.badgeId))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <Logo size={28} />
          <span className="font-display text-xl font-bold text-primary">
            StartKaba
          </span>
        </Link>

        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <Avatar fullName={user.fullName} avatarUrl={user.avatarUrl} size="lg" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {user.fullName}
          </h1>
          <p className="text-muted">{cityLabel}</p>
          {user.bio && <p className="text-foreground mt-3 text-sm">{user.bio}</p>}

          {user.projectName && (
            <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-primary font-display font-bold">
                {user.projectName}
              </p>
              {user.projectDescription && (
                <p className="text-muted text-sm mt-1">{user.projectDescription}</p>
              )}
            </div>
          )}

          <div className="flex justify-center gap-6 mt-6">
            <div>
              <p className="font-display text-2xl font-bold text-green">
                {user.totalXp}
              </p>
              <p className="text-muted text-xs">XP</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-primary">
                {user.currentLevelId}/8
              </p>
              <p className="text-muted text-xs">{level?.title}</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-cta">
                {badges.length}
              </p>
              <p className="text-muted text-xs">badges</p>
            </div>
          </div>

          {badges.length > 0 && (
            <div className="flex justify-center gap-2 flex-wrap mt-5">
              {badges.map((b) => (
                <span key={b.id} title={b.name} className="text-2xl">
                  {b.icon}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="text-center mt-6">
          <Link
            href="/signup"
            className="inline-block px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
          >
            Lance ton aventure sur StartKaba 🚀
          </Link>
        </p>
      </div>
    </main>
  );
}
