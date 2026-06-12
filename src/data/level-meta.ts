// Temps estimé par niveau (affichage parcours).
export const LEVEL_TIME_ESTIMATES: Record<number, string> = {
  1: "~2 heures",
  2: "~1 semaine",
  3: "~3 heures",
  4: "~2 semaines",
  5: "~1 semaine",
  6: "~1 semaine",
  7: "~2 semaines",
  8: "~1 semaine",
};

// Ce que l'entrepreneur a appris — affiché sur la page récap du niveau.
export const LEVEL_LEARNINGS: Record<number, string[]> = {
  1: [
    "Formuler une idée en une phrase claire, sans jargon",
    "Identifier tes motivations profondes (ikigai entrepreneurial)",
    "Distinguer un vrai problème d'un simple symptôme",
    "Construire une persona client précise",
    "Rédiger une Proposition de Valeur Unique",
  ],
  2: [
    "Analyser tes concurrents directs et indirects",
    "Estimer un marché sans données fiables (TAM/SAM/SOM)",
    "Préparer un guide d'entretien façon Mom Test",
    "Mener des interviews clients sans biais de confirmation",
    "Décider en connaissance de cause : continuer ou pivoter",
  ],
  3: [
    "Remplir les 9 blocs du Business Model Canvas",
    "Identifier et comparer des sources de revenus",
    "Calculer un budget de démarrage réaliste en FCFA",
    "Construire un pricing adapté au marché local",
    "Approcher des partenaires stratégiques",
  ],
  4: [
    "Prioriser les fonctionnalités avec MoSCoW",
    "Choisir le bon format de MVP",
    "Publier un MVP et le confronter au réel",
    "Acquérir tes premiers utilisateurs sans budget",
    "Boucler un cycle Build-Measure-Learn complet",
  ],
};
