import type { Badge } from "@/types";

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  earnedAt?: string;
}

export function BadgeCard({ badge, earned, earnedAt }: BadgeCardProps) {
  return (
    <div
      title={badge.description}
      className={`rounded-xl border p-4 text-center transition-colors ${
        earned
          ? "border-green bg-green-light/30"
          : "border-border bg-background opacity-40 grayscale"
      }`}
    >
      <span className="text-3xl block mb-1">{badge.icon}</span>
      <p className="text-sm font-medium text-foreground">{badge.name}</p>
      <p className="text-xs text-muted mt-1">{badge.description}</p>
      {earned && earnedAt && (
        <p className="text-xs text-green mt-1 font-medium">
          {new Date(earnedAt).toLocaleDateString("fr-FR")}
        </p>
      )}
    </div>
  );
}
