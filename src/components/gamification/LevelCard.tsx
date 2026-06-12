import Link from "next/link";
import type { LevelSummary } from "@/lib/progress/compute";
import { getBadgeById } from "@/data/badges";
import { LEVEL_TIME_ESTIMATES } from "@/data/level-meta";

const STATUS_META: Record<
  LevelSummary["status"],
  { label: string; icon: string }
> = {
  COMPLETED: { label: "Complété", icon: "✅" },
  IN_PROGRESS: { label: "En cours", icon: "🔥" },
  UNLOCKED: { label: "Disponible", icon: "✨" },
  LOCKED: { label: "Verrouillé", icon: "🔒" },
  COMING_SOON: { label: "Bientôt disponible", icon: "🔒" },
};

export function LevelCard({ level }: { level: LevelSummary }) {
  const meta = STATUS_META[level.status];
  const locked = level.status === "LOCKED" || level.status === "COMING_SOON";
  const pct =
    level.totalXp > 0 ? Math.round((level.earnedXp / level.totalXp) * 100) : 0;
  const badges = level.badgeIds
    .map(getBadgeById)
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const card = (
    <div
      className={`relative overflow-hidden bg-surface border rounded-2xl p-6 transition-all h-full flex flex-col gap-4 ${
        locked
          ? "border-border opacity-60"
          : level.status === "COMPLETED"
            ? "border-green"
            : "border-border hover:border-primary hover:shadow-md"
      }`}
    >
      {/* Motif wax en décoration subtile */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `url(/patterns/wax-${(level.id % 3) + 1}.svg)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="flex items-start justify-between relative">
        <div className="flex items-center gap-3">
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold ${
              level.status === "COMPLETED"
                ? "bg-green text-white"
                : locked
                  ? "bg-border text-muted"
                  : "bg-primary text-white"
            }`}
          >
            {level.id}
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {level.title}
            </h3>
            <p className="text-muted text-sm">{level.subtitle}</p>
            {level.taskCount > 0 && (
              <p className="text-muted text-xs mt-0.5">
                ⏱ {LEVEL_TIME_ESTIMATES[level.id]}
              </p>
            )}
          </div>
        </div>
        <span title={meta.label} className="text-xl shrink-0">
          {meta.icon}
        </span>
      </div>

      <p className="text-muted text-sm flex-1">{level.description}</p>

      {level.taskCount > 0 && (
        <>
          <div className="h-2 rounded-full bg-green-light/40 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                level.status === "COMPLETED" ? "bg-green" : "bg-primary"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">
              {level.completedTasks}/{level.taskCount} tâches
            </span>
            <span className="font-semibold text-green">
              {level.earnedXp}/{level.totalXp} XP
            </span>
          </div>
        </>
      )}

      {badges.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {badges.map((b) => (
            <span
              key={b.id}
              title={`${b.name} — ${b.description}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-light/30 border border-green/30 text-xs font-medium text-green"
            >
              {b.icon} {b.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (locked) return card;

  return (
    <Link href={`/parcours/${level.id}`} className="block h-full">
      {card}
    </Link>
  );
}
