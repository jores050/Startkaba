"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SCORE_META, type KabaReview } from "@/lib/kaba/review-types";

interface Props {
  levelId: number;
}

function KabaAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-primary dark:bg-[#1E2A5E] border-2 border-primary dark:border-[#4D6FFF] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
      K
    </div>
  );
}

// Résumé court du verdict de la Passe Kaba — affiché dans le récap.
// Lien "Revoir l'analyse complète" qui rouvre la passe en lecture seule.
export function KabaVerdictSummary({ levelId }: Props) {
  const [review, setReview] = useState<KabaReview | null>(null);
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/kaba/analyze-level-reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niveau: levelId }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.review) {
          setReview(d.review);
          setState("done");
        } else setState("error");
      })
      .catch(() => !cancelled && setState("error"));
    return () => {
      cancelled = true;
    };
  }, [levelId]);

  if (state === "error") return null;

  const meta = review ? (SCORE_META[review.score] ?? SCORE_META.solide_avec_ajustements) : null;

  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        🔍 L&apos;analyse de Kaba
      </h2>

      <div className="bg-[#EEF1FF] dark:bg-[#1A2040] border border-[#0722AB]/20 dark:border-[rgba(77,111,255,0.25)] rounded-2xl p-5">
        <div className="flex gap-3 items-start">
          <KabaAvatar />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#0722AB] dark:text-[#4D6FFF] text-sm mb-2">Kaba</p>

            {state === "loading" && (
              <div className="flex items-center gap-2 py-2">
                <span className="inline-flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary dark:bg-[#4D6FFF] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
                <span className="text-sm text-muted">Kaba récupère son analyse...</span>
              </div>
            )}

            {state === "done" && review && meta && (
              <>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2"
                  style={{ backgroundColor: meta.color, color: "white" }}
                >
                  {meta.emoji} {meta.label}
                </span>
                <p className="text-foreground text-sm leading-relaxed">{review.verdict_global}</p>
                <Link
                  href={`/parcours/${levelId}/passe-kaba?readonly=1`}
                  className="inline-block mt-3 text-xs font-semibold text-[#0722AB] dark:text-[#4D6FFF] hover:underline"
                >
                  Revoir l&apos;analyse complète →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
