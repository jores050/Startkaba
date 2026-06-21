import Link from "next/link";
import {
  CheckCircle2,
  Flame,
  Sparkles,
  Lock,
  Construction,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { LevelSummary } from "@/lib/progress/compute";
import { getBadgeById } from "@/data/badges";
import { LEVEL_TIME_ESTIMATES } from "@/data/level-meta";
import { IconBadge } from "@/components/ui/IconBadge";

const STATUS_META: Record<
  LevelSummary["status"],
  { label: string; Icon: LucideIcon }
> = {
  COMPLETED: { label: "Complété", Icon: CheckCircle2 },
  IN_PROGRESS: { label: "En cours", Icon: Flame },
  UNLOCKED: { label: "Disponible", Icon: Sparkles },
  LOCKED: { label: "Verrouillé", Icon: Lock },
  COMING_SOON: { label: "Bientôt disponible", Icon: Construction },
};

export function LevelCard({ level }: { level: LevelSummary }) {
  const meta = STATUS_META[level.status];
  const locked = level.status === "LOCKED";
  const comingSoon = level.status === "COMING_SOON";
  const inactive = locked || comingSoon;
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
          : comingSoon
            ? "border-[#F77E2D]/30 opacity-80"
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
                  : comingSoon
                    ? "bg-[#F77E2D]/15 text-[#F77E2D]"
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
              <p className="text-muted text-xs mt-0.5 flex items-center gap-1">
                <Clock size={12} strokeWidth={2} />
                {LEVEL_TIME_ESTIMATES[level.id]}
              </p>
            )}
          </div>
        </div>
        {comingSoon ? (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F77E2D]/10 text-[#F77E2D] border border-[#F77E2D]/25 shrink-0 whitespace-nowrap flex items-center gap-1">
            <Construction size={12} strokeWidth={2} />
            Bientôt
          </span>
        ) : (
          <span title={meta.label} className="shrink-0 text-foreground">
            <meta.Icon size={20} strokeWidth={2} />
          </span>
        )}
      </div>

      <p className="text-muted text-sm flex-1">{level.description}</p>

      {comingSoon && (
        <p className="text-xs text-[#F77E2D] font-medium">
          Ce module arrive bientôt — continue les niveaux précédents.
        </p>
      )}

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
              <IconBadge iconKey={b.icon} size={12} strokeWidth={2} />
              {b.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (inactive) return card;

  return (
    <Link href={`/parcours/${level.id}`} className="block h-full">
      {card}
    </Link>
  );
}
