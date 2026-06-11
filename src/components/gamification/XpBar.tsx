interface XpBarProps {
  current: number;
  max: number;
  variant?: "primary" | "green";
  animated?: boolean;
}

export function XpBar({ current, max, variant = "green", animated = true }: XpBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((current / max) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={max}
      className="h-3 rounded-full bg-green-light/40 overflow-hidden"
    >
      <div
        className={`h-full rounded-full transition-all ${
          variant === "green" ? "bg-green" : "bg-primary"
        } ${animated ? "animate-xp-fill" : ""}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
