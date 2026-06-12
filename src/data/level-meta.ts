// Cartes de réflexion affichées sur la page récap — une par tâche ayant une reflection.
export interface RecapCard {
  icon: string;
  title: string;
  taskId: number;
  exerciseIndex: number; // index de l'exercise type "reflection" dans lesson.exercises
}

export const LEVEL_RECAP_CARDS: Record<number, RecapCard[]> = {
  1: [
    { icon: "🎯", title: "Ta proposition de valeur", taskId: 101, exerciseIndex: 9 },
    { icon: "❤️", title: "Pourquoi ce projet te tient à cœur", taskId: 102, exerciseIndex: 5 },
    { icon: "🔍", title: "Les problèmes que tu résous", taskId: 103, exerciseIndex: 6 },
    { icon: "👤", title: "Ton client idéal", taskId: 104, exerciseIndex: 6 },
    { icon: "✨", title: "Ta proposition de valeur (version finale)", taskId: 105, exerciseIndex: 6 },
  ],
};

// Message de clôture de Kaba — affiché en bas de la page récap.
export const LEVEL_KABA_MESSAGES: Record<number, string> = {
  1: "Tu as maintenant une vision claire de ton client et du problème que tu résous. C'est la base sur laquelle tout le reste va se construire. Niveau 2 : on passe à la validation terrain — parler à de vraies personnes pour confirmer (ou challenger) ce que tu viens de formuler.",
  2: "Tu sais maintenant si ton idée correspond à un vrai marché. Ces entretiens clients t'ont donné des preuves concrètes — pas des intuitions. Niveau 3 : transformons ces insights en un modèle économique solide.",
  3: "Ton Business Model Canvas est posé. Tu as une vision claire de comment ton projet crée, délivre et capture de la valeur. Niveau 4 : il est temps de construire le minimum pour tester tout ça dans le monde réel.",
  4: "Ton MVP est entre les mains de vrais utilisateurs. Tu as appris plus en quelques semaines qu'en mois de théorie. Niveau 5 : captons maintenant tes premiers vrais clients, sans budget publicitaire.",
  5: "Tu as tes premières acquisitions clients. WhatsApp, ton réseau, ta crédibilité — tes outils les plus puissants. Niveau 6 : protégeons ce que tu bâtis avec un cadre légal adapté à l'Afrique de l'Ouest.",
  6: "Ton entreprise est structurée légalement. Tu peux signer des contrats, ouvrir un compte pro, répondre à des appels d'offres. Niveau 7 : parlons financement — bootstrap d'abord, puis pitch.",
  7: "Tu as une stratégie de financement claire et un pitch professionnel. Niveau 8 : le grand saut — on organise ton lancement officiel.",
  8: "Tu as lancé. Officiellement. Tu fais partie des entrepreneurs qui passent de l'idée à l'action. La vraie aventure commence maintenant.",
};

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
