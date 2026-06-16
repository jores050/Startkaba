// Heuristiques côté client (sans appel API) pour signaler les défauts
// classiques d'une réflexion avant validation. Non bloquant — informatif.

export type QualityFlag = {
  id: string;
  severity: "warning" | "info";
  message: string;
};

export function checkReflectionQuality(
  text: string,
  context: { exerciseType: string; storageKeys?: string[] }
): QualityFlag[] {
  const flags: QualityFlag[] = [];
  const lower = text.toLowerCase();

  // 1. Jargon non expliqué — test Grand-mère.
  // Limites de mots (\b) pour éviter les faux positifs : "roi" dans "froide",
  // "trois", "endroit" ; "pivot" dans "pivoter", etc.
  const jargon = [
    "startup", "mvp", "levée de fonds", "scaling", "kpi", "growth hacking",
    "b2b", "b2c", "roi", "burn rate", "saas", "uvp", "pivot",
  ];
  const jargonHits = jargon.filter((w) => {
    const re = new RegExp(`(^|[^a-zàâäéèêëïîôöùûüç])${w}([^a-zàâäéèêëïîôöùûüç]|$)`, "i");
    return re.test(lower);
  });
  if (jargonHits.length > 0) {
    flags.push({
      id: "jargon",
      severity: "warning",
      message: `Tu utilises des mots techniques (${jargonHits.join(", ")}). Le test Grand-mère passe-t-il ?`,
    });
  }

  // 2. Cause racine circulaire — "il manque ma solution"
  const circular = [
    "manque de solution", "il n'existe pas", "absence d'application",
    "aucune plateforme", "pas d'outil pour", "manque d'application",
    "manque de plateforme",
  ];
  if (circular.some((p) => lower.includes(p))) {
    flags.push({
      id: "circular",
      severity: "warning",
      message:
        "Ta cause racine semble dire 'il manque ma solution'. C'est exactement le piège de la Tâche 103. Quel est le vrai vécu du client AVANT que tu arrives ?",
    });
  }

  // 3. Persona trop large — 2 profils mélangés
  const personaWide = [
    /étudiant\s+(ou|et)\s+salarié/i,
    /18\s*(à|-)\s*(45|50|55|60)/,
    /jeune\s+(et|ou)\s+adulte/i,
    /0\s+(à|et)\s+\d{6}/, // revenus de 0 à 500000+
  ];
  if (personaWide.some((re) => re.test(text))) {
    flags.push({
      id: "persona_wide",
      severity: "warning",
      message:
        "Ta cible semble mélanger 2 profils distincts. Choisis-en un — une persona précise vaut mieux qu'une cible large.",
    });
  }

  // 4. Réflexion trop courte
  if (text.trim().length < 40 && context.exerciseType === "reflection_template") {
    flags.push({
      id: "too_short",
      severity: "info",
      message: "Ta réflexion fait moins de 40 caractères. Tu peux la développer davantage.",
    });
  }

  // 5. Doublons grossiers (mot répété collé)
  const doublons = /\b(\w+)\s+\1\b/gi;
  if (doublons.test(text)) {
    flags.push({
      id: "doublon",
      severity: "info",
      message: "Tu as un mot répété qui semble être une faute de frappe. Relis avant d'enregistrer.",
    });
  }

  return flags;
}
