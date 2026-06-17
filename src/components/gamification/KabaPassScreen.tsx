"use client";

import Link from "next/link";
import { SCORE_META, type KabaReview } from "@/lib/kaba/review-types";
import { KabaPerfectModel } from "./KabaPerfectModel";

interface Props {
  levelId: number;
  review: KabaReview;
  readOnly?: boolean;
}

function KabaAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-primary dark:bg-[#1E2A5E] border-2 border-primary dark:border-[#4D6FFF] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
      K
    </div>
  );
}

export function KabaPassScreen({ levelId, review, readOnly = false }: Props) {
  const meta = SCORE_META[review.score] ?? SCORE_META.solide_avec_ajustements;
  const mustRewrite = review.score === "à_recommencer";

  return (
    <div className="max-w-xl mx-auto px-4 pb-16 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 mt-2">
        <KabaAvatar />
        <div>
          <p className="font-semibold text-[#0722AB] dark:text-[#4D6FFF] text-sm">La passe de Kaba</p>
          <p className="text-xs text-muted">Avant de publier ton Niveau {levelId}</p>
        </div>
      </div>

      {/* Verdict + score */}
      <div
        className="rounded-2xl border p-5 mb-5"
        style={{ backgroundColor: meta.bg, borderColor: meta.border }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{meta.emoji}</span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: meta.color, color: "white" }}
          >
            {meta.label}
          </span>
        </div>
        <p className="text-foreground text-sm leading-relaxed font-medium">{review.verdict_global}</p>
      </div>

      {/* Recommandation forte si à recommencer */}
      {mustRewrite && (
        <div className="rounded-2xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-[#2A1212] p-4 mb-5">
          <p className="text-sm font-semibold text-red-700 dark:text-red-300">
            🔁 Kaba te recommande fortement de réécrire avant publication. Tu peux quand même publier en l&apos;état, mais ton projet en pâtira.
          </p>
        </div>
      )}

      {/* Forces */}
      {review.forces.length > 0 && (
        <section className="mb-5">
          <h2 className="font-display text-base font-bold text-foreground mb-3">Ce qui est solide</h2>
          <div className="flex flex-col gap-2">
            {review.forces.map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-surface border border-border rounded-xl p-3.5">
                <span className="shrink-0 mt-0.5">✅</span>
                <p className="text-sm text-foreground leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ajustements */}
      {review.ajustements_suggérés.length > 0 && (
        <section className="mb-6">
          <h2 className="font-display text-base font-bold text-foreground mb-3">Ce que Kaba ajusterait</h2>
          <div className="flex flex-col gap-3">
            {review.ajustements_suggérés.map((a, i) => (
              <div
                key={i}
                className="bg-amber-50 dark:bg-[#2A2410] border border-amber-300 dark:border-amber-500/40 rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    {a.card}
                  </span>
                </div>
                <p className="text-sm text-amber-900 dark:text-amber-100 leading-snug">{a.probleme}</p>
                {a.lecon_citee && (
                  <p className="text-xs text-amber-700 dark:text-amber-300 italic">📖 {a.lecon_citee}</p>
                )}
                {a.reformulation_possible && (
                  <div className="bg-white dark:bg-[#1A1505] rounded-lg px-3 py-2 mt-1">
                    <p className="text-xs font-semibold text-foreground/70 mb-0.5">Reformulation possible</p>
                    <p className="text-sm text-foreground leading-snug">{a.reformulation_possible}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Proverbe */}
      {review.proverbe_takeaway && (
        <div className="bg-[#EEF1FF] dark:bg-[#1A2040] border border-[#0722AB]/20 dark:border-[#4D6FFF]/30 rounded-2xl p-4 mb-6 flex gap-3 items-start">
          <span className="text-xl shrink-0">💬</span>
          <p className="text-sm text-foreground italic leading-relaxed">{review.proverbe_takeaway}</p>
        </div>
      )}

      {/* Parfaire mon modèle en un clic — après lecture des suggestions */}
      <KabaPerfectModel levelId={levelId} />

      {/* CTAs */}
      {readOnly ? (
        <Link
          href={`/parcours/${levelId}/recap`}
          className="w-full block text-center px-6 py-4 rounded-2xl bg-cta text-white font-bold text-base hover:opacity-90 transition-opacity"
        >
          Retour au récap
        </Link>
      ) : (
        <div className="flex flex-col gap-3">
          <Link
            href={`/parcours/${levelId}/recap`}
            className="w-full text-center px-6 py-4 rounded-2xl bg-cta text-white font-bold text-base hover:opacity-90 transition-opacity"
          >
            Valider en l&apos;état et publier →
          </Link>
          <Link
            href="/projet"
            className="w-full text-center px-6 py-3 rounded-2xl border border-[#0722AB] text-[#0722AB] dark:text-[#4D6FFF] dark:border-[#4D6FFF] font-semibold text-sm hover:bg-[#EEF1FF] dark:hover:bg-[#1A2040] transition-colors"
          >
            Ajuster avant publication
          </Link>
        </div>
      )}
    </div>
  );
}
