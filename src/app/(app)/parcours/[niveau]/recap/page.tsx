"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLevelDetail } from "@/hooks/use-progress";
import { Card } from "@/components/ui/Card";
import { getBadgeById } from "@/data/badges";
import { LEVEL_LEARNINGS } from "@/data/level-meta";

export default function RecapPage() {
  const params = useParams<{ niveau: string }>();
  const levelId = Number(params.niveau);
  const { level, error, isLoading } = useLevelDetail(levelId);

  if (isLoading) return <p className="text-muted">Chargement...</p>;
  if (error || !level) {
    return (
      <div>
        <p className="text-error mb-4">{error?.message ?? "Niveau introuvable."}</p>
        <Link href="/parcours" className="text-primary hover:underline">
          ← Retour au parcours
        </Link>
      </div>
    );
  }

  const completed = level.status === "COMPLETED";
  const badges = level.badgeIds
    .map(getBadgeById)
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const learnings = LEVEL_LEARNINGS[levelId] ?? [];
  const nextLevelId = levelId < 8 ? levelId + 1 : null;

  if (!completed) {
    return (
      <div className="max-w-2xl text-center py-12">
        <span className="text-5xl block mb-4">🔒</span>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Récap pas encore disponible
        </h1>
        <p className="text-muted mb-6">
          Complète les {level.taskCount} tâches du niveau {levelId} pour
          débloquer ton récapitulatif ({level.completedTasks}/{level.taskCount}{" "}
          pour l&apos;instant).
        </p>
        <Link
          href={`/parcours/${levelId}`}
          className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
        >
          Reprendre le niveau
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link
        href={`/parcours/${levelId}`}
        className="text-muted hover:text-primary transition-colors text-sm"
      >
        ← Niveau {levelId}
      </Link>

      <div className="text-center my-8">
        <span className="text-6xl block mb-4 animate-badge-pop">🎓</span>
        <h1 className="font-display text-3xl font-extrabold text-foreground">
          Niveau {levelId} complété !
        </h1>
        <p className="text-muted mt-2 italic">{level.subtitle}</p>
      </div>

      {/* Chiffres */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="text-center">
          <p className="font-display text-3xl font-extrabold text-green">
            {level.earnedXp} XP
          </p>
          <p className="text-muted text-sm mt-1">gagnés sur ce niveau</p>
        </Card>
        <Card className="text-center">
          <p className="font-display text-3xl font-extrabold text-primary">
            {level.taskCount}
          </p>
          <p className="text-muted text-sm mt-1">tâches validées par quiz</p>
        </Card>
      </div>

      {/* Ce que tu as appris */}
      <Card className="mb-6">
        <h2 className="font-display text-xl font-bold text-foreground mb-4">
          Ce que tu as appris
        </h2>
        <ul className="flex flex-col gap-3">
          {learnings.map((l) => (
            <li key={l} className="flex items-start gap-3 text-sm">
              <span className="text-green mt-0.5">✓</span>
              <span className="text-foreground">{l}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Badges du niveau */}
      {badges.length > 0 && (
        <Card className="mb-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Badges décrochés
          </h2>
          <div className="flex gap-3 flex-wrap">
            {badges.map((b) => (
              <span
                key={b.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-light/30 border border-green/30 text-green font-medium"
              >
                <span className="text-2xl">{b.icon}</span> {b.name}
              </span>
            ))}
          </div>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {nextLevelId && (
          <Link
            href={`/parcours/${nextLevelId}`}
            className="flex-1 px-6 py-3 rounded-xl bg-cta text-white font-bold text-center hover:opacity-90 transition-opacity"
          >
            Passer au niveau {nextLevelId} →
          </Link>
        )}
        <Link
          href="/parcours"
          className="px-6 py-3 rounded-xl border border-primary text-primary font-semibold text-center hover:bg-primary hover:text-white transition-colors"
        >
          Voir le parcours
        </Link>
      </div>
    </div>
  );
}
