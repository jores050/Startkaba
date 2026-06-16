"use client";

import type { QualityFlag } from "@/lib/quality/check-reflection";

interface Props {
  flags: QualityFlag[];
}

// Affiché au-dessus du bouton "Valider ma réflexion" — non bloquant.
// L'utilisateur passe outre en validant normalement.
export function QualityChecklist({ flags }: Props) {
  if (flags.length === 0) return null;

  const hasWarning = flags.some((f) => f.severity === "warning");

  return (
    <div
      className={`rounded-xl border p-4 flex flex-col gap-2.5 ${
        hasWarning
          ? "bg-amber-50 dark:bg-[#2A2410] border-amber-300 dark:border-amber-500/40"
          : "bg-[#EEF1FF] dark:bg-[#1A2040] border-[#0722AB]/20 dark:border-[#4D6FFF]/30"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-wider ${
          hasWarning ? "text-amber-700 dark:text-amber-400" : "text-[#0722AB] dark:text-[#4D6FFF]"
        }`}
      >
        Quelques points à vérifier avant de valider
      </p>
      <ul className="flex flex-col gap-2">
        {flags.map((flag) => (
          <li key={flag.id} className="flex items-start gap-2 text-sm leading-snug">
            <span className="shrink-0 mt-0.5">{flag.severity === "warning" ? "⚠️" : "ℹ️"}</span>
            <span
              className={
                flag.severity === "warning"
                  ? "text-amber-800 dark:text-amber-200"
                  : "text-foreground"
              }
            >
              {flag.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
