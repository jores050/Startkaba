// Types partagés pour la "Passe Kaba" — analyse honnête des réflexions d'un niveau.

export type KabaScore =
  | "excellent"
  | "solide_avec_ajustements"
  | "à_retravailler"
  | "à_recommencer";

export interface KabaAjustement {
  card: string;
  probleme: string;
  lecon_citee: string;
  reformulation_possible: string;
}

export interface KabaReview {
  verdict_global: string;
  score: KabaScore;
  forces: string[];
  ajustements_suggérés: KabaAjustement[];
  proverbe_takeaway: string;
}

// Métadonnées d'affichage par score.
export const SCORE_META: Record<
  KabaScore,
  { label: string; color: string; bg: string; border: string; emoji: string }
> = {
  excellent: {
    label: "Excellent",
    color: "#1A6B00",
    bg: "rgba(174,255,148,0.25)",
    border: "rgba(26,107,0,0.3)",
    emoji: "🌟",
  },
  solide_avec_ajustements: {
    label: "Solide, avec ajustements",
    color: "#B45309",
    bg: "rgba(251,191,36,0.15)",
    border: "rgba(180,83,9,0.3)",
    emoji: "👍",
  },
  à_retravailler: {
    label: "À retravailler",
    color: "#F77E2D",
    bg: "rgba(247,126,45,0.12)",
    border: "rgba(247,126,45,0.35)",
    emoji: "🔧",
  },
  à_recommencer: {
    label: "À recommencer",
    color: "#DC2626",
    bg: "rgba(220,38,38,0.1)",
    border: "rgba(220,38,38,0.3)",
    emoji: "🔁",
  },
};

export function isKabaScore(v: unknown): v is KabaScore {
  return (
    v === "excellent" ||
    v === "solide_avec_ajustements" ||
    v === "à_retravailler" ||
    v === "à_recommencer"
  );
}
