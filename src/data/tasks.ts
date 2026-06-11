import type { Task } from "@/types";

export const tasks: Task[] = [
  // --- Niveau 1 ---
  {
    id: 101,
    levelId: 1,
    title: "Rédige ton idée en une phrase claire",
    description:
      "Sans jargon, sans \"révolutionnaire\". Une phrase simple que tu pourrais dire à ta grand-mère. Si elle comprend, tu es sur la bonne voie.",
    xp: 50,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'une proposition de valeur ?",
        options: [
          "Un slogan publicitaire accrocheur",
          "La raison claire pour laquelle un client choisit ton produit plutôt qu'une alternative",
          "Le prix de ton produit",
          "Une liste de fonctionnalités",
        ],
        correctIndex: 1,
        explanation:
          "La proposition de valeur explique concrètement quel problème tu résous, pour qui, et pourquoi tu es le meilleur choix disponible.",
      },
    ],
  },
  {
    id: 102,
    levelId: 1,
    title: "Liste 3 raisons personnelles profondes",
    description:
      "Pourquoi TU dois faire ça ? Pas \"parce que c'est rentable\" — mais pourquoi toi, avec ton histoire, tes expériences, tu es la bonne personne pour ce projet.",
    xp: 50,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce que l'Ikigai entrepreneurial ?",
        options: [
          "Un outil financier japonais",
          "L'intersection entre ce que tu aimes, ce en quoi tu es bon, ce dont le monde a besoin et ce pour quoi on te paiera",
          "Une technique de méditation pour entrepreneurs",
          "Un framework de pricing",
        ],
        correctIndex: 1,
        explanation:
          "L'Ikigai est un concept japonais qui aide à trouver sa raison d'être. Appliqué à l'entrepreneuriat, il aide à valider l'alignement entre passion, compétence, besoin marché et viabilité économique.",
      },
    ],
  },
  {
    id: 103,
    levelId: 1,
    title: "Identifie 5 problèmes concrets que ton idée résout",
    description:
      "Pas des fonctionnalités — des problèmes. \"Les gens perdent du temps à...\" plutôt que \"Mon app permet de...\"",
    xp: 75,
    quiz: [
      {
        id: 1,
        question: "Quelle est la différence entre un problème et un symptôme ?",
        options: [
          "Il n'y a pas de différence, c'est la même chose",
          "Un symptôme est la manifestation visible, le problème est la cause profonde",
          "Un problème est plus grave qu'un symptôme",
          "Un symptôme concerne les personnes, un problème concerne les entreprises",
        ],
        correctIndex: 1,
        explanation:
          "Traiter un symptôme sans s'attaquer au problème profond produit une solution temporaire. Ex : symptôme = \"je n'ai pas assez de clients\", problème profond = \"je n'ai pas de stratégie d'acquisition définie\".",
      },
    ],
  },
  {
    id: 104,
    levelId: 1,
    title: "Décris ton client idéal",
    description: "Qui est-il, où vit-il, que fait-il ? Sois précis : âge, ville, revenus, habitudes, frustrations quotidiennes.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'une persona ?",
        options: [
          "Un personnage fictif représentant un segment de clients cibles",
          "Le profil LinkedIn de ton premier client",
          "Une étude de marché quantitative",
          "Un sondage en ligne",
        ],
        correctIndex: 0,
        explanation:
          "Une persona est un archétype semi-fictif de ton client idéal, basé sur des données réelles et des hypothèses. Elle humanise ton marché cible et guide tes décisions produit.",
      },
    ],
  },
  {
    id: 105,
    levelId: 1,
    title: "Rédige ta Proposition de Valeur Unique",
    description: "En 2 phrases : pour qui, quel problème tu résous, pourquoi tu es différent. C'est le cœur de tout le reste.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Quel est le format classique d'une UVP (Unique Value Proposition) ?",
        options: [
          "\"Notre produit est le meilleur du marché\"",
          "\"Pour [cible], [notre produit] est [catégorie] qui [bénéfice clé] contrairement à [alternative]\"",
          "Une liste de 5 avantages concurrentiels",
          "Le prix le plus bas du marché",
        ],
        correctIndex: 1,
        explanation:
          "Une bonne UVP identifie clairement : à qui elle s'adresse, ce qu'elle fait, la catégorie du produit, le bénéfice principal, et pourquoi elle est différente des alternatives existantes.",
      },
    ],
  },

  // --- Niveau 2 ---
  {
    id: 201,
    levelId: 2,
    title: "Recherche et liste 3 concurrents",
    description: "Directs ou indirects. Aucun concurrent = mauvais signe (pas de marché) ou mauvaise recherche. Analyse leurs forces et faiblesses.",
    xp: 75,
    quiz: [
      {
        id: 1,
        question: "Pourquoi une analyse concurrentielle est-elle essentielle ?",
        options: [
          "Pour copier les concurrents",
          "Pour comprendre le marché existant, positionner ton offre et identifier les gaps",
          "Pour décourager les investisseurs de financer des concurrents",
          "Elle n'est pas nécessaire si ton idée est vraiment innovante",
        ],
        correctIndex: 1,
        explanation:
          "L'analyse concurrentielle te permet de comprendre qui existe déjà, ce qui fonctionne, et où se trouvent les opportunités non adressées. Elle renforce ton positionnement.",
      },
    ],
  },
  {
    id: 202,
    levelId: 2,
    title: "Estime la taille de ton marché",
    description: "TAM / SAM / SOM simplifié. Pas besoin d'études McKinsey — des estimations raisonnées avec des sources locales.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Comment estimer un marché sans données officielles ?",
        options: [
          "C'est impossible sans études Nielsen ou McKinsey",
          "Par des estimations bottom-up : nombre de clients potentiels × panier moyen",
          "En copiant les chiffres de ton concurrent principal",
          "En multipliant le PIB du pays par 10%",
        ],
        correctIndex: 1,
        explanation:
          "L'estimation bottom-up consiste à partir de données granulaires accessibles (population cible, fréquence d'achat, prix) pour remonter à une taille de marché. Plus fiable que les estimations top-down en Afrique où les données macro sont souvent incomplètes.",
      },
    ],
  },
  {
    id: 203,
    levelId: 2,
    title: "Prépare ton guide d'entretien client",
    description: "5-7 questions ouvertes. L'objectif : comprendre les problèmes, pas valider tes hypothèses. Suis les principes du Mom Test.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Quel est le principe clé du Mom Test pour les interviews clients ?",
        options: [
          "Parler à sa mère en premier car elle sera honnête",
          "Poser des questions sur le passé et les comportements réels, jamais sur les opinions ou le futur",
          "Toujours enregistrer les entretiens",
          "Commencer par présenter son idée pour avoir du feedback",
        ],
        correctIndex: 1,
        explanation:
          "Le Mom Test enseigne à éviter les questions biaisées (\"Tu utiliserais ça ?\") qui donnent des réponses polies mais fausses. On demande plutôt : \"La dernière fois que tu as eu ce problème, qu'est-ce que tu as fait ?\"",
      },
    ],
  },
  {
    id: 204,
    levelId: 2,
    title: "Conduis 5 interviews avec des personnes de ta cible",
    description: "Pas des amis qui valident tout. De vraies personnes de ta cible. Au moins 5. Prends des notes précises — les citations mot pour mot sont de l'or.",
    xp: 200,
    quiz: [
      {
        id: 1,
        question: "Quel biais cognitif est le plus dangereux lors des interviews clients ?",
        options: [
          "Le biais de disponibilité",
          "Le biais de confirmation — entendre ce qu'on veut entendre",
          "Le biais d'ancrage",
          "Le biais de récence",
        ],
        correctIndex: 1,
        explanation:
          "Le biais de confirmation pousse les entrepreneurs à sur-interpréter les signaux positifs et ignorer les signaux négatifs. Pour le contrer : cherche activement à te faire réfuter, pas à valider.",
      },
    ],
  },
  {
    id: 205,
    levelId: 2,
    title: "Synthétise tes 3 insights clés",
    description: "Qu'as-tu vraiment appris ? Décide : continuer avec cette idée, pivoter, ou arrêter. Documente ton raisonnement.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'un pivot en entrepreneuriat ?",
        options: [
          "Abandonner complètement son projet",
          "Un changement structuré de stratégie tout en conservant les apprentissages acquis",
          "Changer de nom d'entreprise",
          "Lever des fonds supplémentaires",
        ],
        correctIndex: 1,
        explanation:
          "Un pivot n'est pas un échec — c'est une décision stratégique basée sur des données. Les pivots les plus réussis conservent le problème identifié mais changent la solution, la cible ou le modèle de revenus.",
      },
    ],
  },

  // --- Niveau 3 ---
  {
    id: 301,
    levelId: 3,
    title: "Remplis les 9 blocs du Business Model Canvas",
    description: "Segments clients, proposition de valeur, canaux, relations clients, sources de revenus, ressources clés, activités clés, partenaires clés, structure de coûts.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Quels sont les 9 blocs du Business Model Canvas ?",
        options: [
          "Clients, Produit, Prix, Place, Promotion, People, Process, Physical, Partners",
          "Segments clients, Proposition de valeur, Canaux, Relations clients, Sources de revenus, Ressources clés, Activités clés, Partenaires clés, Structure de coûts",
          "Vision, Mission, Valeurs, Objectifs, Stratégie, Tactiques, KPIs, Budget, Timeline",
          "Marché, Concurrents, Différenciation, Pricing, Distribution, Marketing, Ventes, Service, Après-vente",
        ],
        correctIndex: 1,
        explanation:
          "Le BMC d'Alexander Osterwalder couvre les 9 dimensions essentielles d'un modèle économique, réparties en deux côtés : création de valeur (gauche) et livraison + capture de valeur (droite).",
      },
    ],
  },
  {
    id: 302,
    levelId: 3,
    title: "Identifie tes 3 sources de revenus potentielles",
    description: "Abonnement, commission, vente directe, freemium, publicité, licence... Laquelle est la plus adaptée à ton marché local ?",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Quel modèle de revenus est le plus adapté à une base clients avec peu de cartes bancaires ?",
        options: [
          "Abonnement mensuel par carte de crédit uniquement",
          "Paiement à l'usage via Mobile Money (Wave, Orange Money, MTN MoMo)",
          "Modèle publicitaire uniquement",
          "Freemium avec conversion premium",
        ],
        correctIndex: 1,
        explanation:
          "En Afrique de l'Ouest, le Mobile Money (Wave, Orange Money, MTN MoMo) est souvent plus accessible que les cartes bancaires. Intégrer ces modes de paiement dès le départ est crucial pour la conversion.",
      },
    ],
  },
  {
    id: 303,
    levelId: 3,
    title: "Calcule ton budget de démarrage minimum",
    description: "En FCFA. Sépare les coûts fixes (loyer, salaires) des coûts variables (production, commissions). Quel est le minimum pour tester en conditions réelles ?",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Quelle est la différence entre coûts fixes et coûts variables ?",
        options: [
          "Les coûts fixes sont plus importants que les coûts variables",
          "Les coûts fixes ne changent pas avec le volume de ventes ; les coûts variables augmentent avec chaque unité produite/vendue",
          "Les coûts fixes concernent les salaires, les variables concernent les fournitures",
          "Il n'y a pas de différence pratique pour une startup",
        ],
        correctIndex: 1,
        explanation:
          "Comprendre cette distinction est fondamental pour ton point mort. Minimiser les coûts fixes au démarrage (bureau en coworking, outils SaaS vs achat licence) te donne plus de flexibilité pour pivoter.",
      },
    ],
  },
  {
    id: 304,
    levelId: 3,
    title: "Définis ta stratégie de pricing",
    description: "Pour le marché local. Ni trop cher (inaccessible), ni trop bas (non crédible). Teste plusieurs niveaux de prix dans tes interviews.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce que le pricing psychologique en Afrique de l'Ouest ?",
        options: [
          "Fixer des prix en nombres ronds comme 5 000 FCFA au lieu de 4 990 FCFA",
          "Adapter le prix en fonction du pouvoir d'achat local, des cycles de revenus (mensuel, hebdomadaire) et des normes culturelles de négociation",
          "Toujours proposer le prix le plus bas du marché",
          "Utiliser des prix en dollars pour paraître plus professionnel",
        ],
        correctIndex: 1,
        explanation:
          "Le pricing en Afrique de l'Ouest doit tenir compte des cycles de revenus (souvent hebdomadaires ou irréguliers), de la culture de la négociation, et de la perception qualité/prix. Un prix trop bas peut signaler une mauvaise qualité.",
      },
    ],
  },
  {
    id: 305,
    levelId: 3,
    title: "Identifie 3 partenaires clés potentiels",
    description: "Et comment les approcher. Dans le contexte UEMOA, les réseaux de confiance (famille, associations, anciens) sont souvent plus efficaces que les approches formelles.",
    xp: 75,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'un partenariat stratégique pour une startup ?",
        options: [
          "Un accord avec un concurrent pour partager des clients",
          "Une relation avec une organisation qui t'apporte des ressources, une distribution ou une légitimité que tu ne pourrais pas créer seul",
          "Un contrat de sous-traitance",
          "Un investissement financier d'une entreprise établie",
        ],
        correctIndex: 1,
        explanation:
          "Les bons partenariats comblent tes gaps : accès à une base clients existante, légitimité institutionnelle, ressources complémentaires. En Afrique de l'Ouest, les ONG, coopératives et associations professionnelles peuvent être des partenaires de distribution puissants.",
      },
    ],
  },

  // --- Niveau 4 ---
  {
    id: 401,
    levelId: 4,
    title: "Liste 10 fonctionnalités, sélectionne les 3 essentielles",
    description: "La méthode MoSCoW : Must have, Should have, Could have, Won't have. Être impitoyable sur ce qui est essentiel est la compétence la plus difficile et la plus précieuse.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Que signifie la méthode de priorisation MoSCoW ?",
        options: [
          "Moscow est la ville où cette méthode a été inventée",
          "Must have, Should have, Could have, Won't have — un framework pour prioriser les fonctionnalités",
          "Maximum Output, Scope Control, Optimized Work — un framework agile",
          "Minimum, Optimal, Standard, Complete, Worth — les niveaux de qualité",
        ],
        correctIndex: 1,
        explanation:
          "MoSCoW aide à distinguer ce qui est critique (Must) de ce qui est souhaitable (Should), possible (Could) ou exclu du périmètre actuel (Won't). Tout mettre en \"Must have\" est le piège classique.",
      },
    ],
  },
  {
    id: 402,
    levelId: 4,
    title: "Choisis le format de ton MVP",
    description: "Landing page, service manuel, prototype papier, app basique... Le MVP le plus efficace est souvent le plus simple.",
    xp: 75,
    quiz: [
      {
        id: 1,
        question: "Quels sont les 5 types de MVP les plus courants ?",
        options: [
          "App mobile, Site web, API, Desktop app, SaaS",
          "Landing page, Concierge (service manuel), Prototype papier/Figma, Wizard of Oz, Produit simplifié",
          "Free trial, Freemium, Open source, Communauté, Marketplace",
          "B2C, B2B, B2G, C2C, D2C",
        ],
        correctIndex: 1,
        explanation:
          "Un MVP Concierge simule le produit manuel (tu fais toi-même ce que l'app ferait), un Wizard of Oz simule une IA ou automatisation avec des humains en coulisses. Ces approches permettent de valider la demande sans code.",
      },
    ],
  },
  {
    id: 403,
    levelId: 4,
    title: "Crée et publie ton MVP",
    description: "Un lien est requis dans la soumission. Peu importe si c'est une landing page Webflow, un groupe WhatsApp, ou un formulaire Google Forms — publie.",
    xp: 300,
    quiz: [
      {
        id: 1,
        question: "Comment mesurer la valeur d'un MVP ?",
        options: [
          "En comptant le nombre de visiteurs uniques",
          "En mesurant si des gens utilisent vraiment le produit et si ça résout leur problème — engagement et rétention, pas juste acquisition",
          "En comparant au chiffre d'affaires de tes concurrents",
          "En obtenant un score App Store supérieur à 4 étoiles",
        ],
        correctIndex: 1,
        explanation:
          "L'acquisition (nouveaux utilisateurs) est facile à gonfler. Ce qui compte : est-ce que les gens reviennent ? Est-ce qu'ils recommandent ? Est-ce qu'ils paient ? Ces métriques indiquent une vraie valeur créée.",
      },
    ],
  },
  {
    id: 404,
    levelId: 4,
    title: "Acquiers tes 10 premiers utilisateurs ou testeurs",
    description: "Sans budget publicitaire. Réseau personnel, groupes WhatsApp, marchés locaux, événements, bouche-à-oreille. Fais-le manuellement.",
    xp: 200,
    quiz: [
      {
        id: 1,
        question: "Quelle est la stratégie d'acquisition sans budget la plus efficace pour une startup africaine ?",
        options: [
          "La publicité Facebook et Instagram",
          "Le SEO (référencement naturel)",
          "Le réseau personnel direct et les communautés de confiance (WhatsApp, associations, marchés)",
          "La presse et les médias traditionnels",
        ],
        correctIndex: 2,
        explanation:
          "En Afrique de l'Ouest, la confiance est le premier facteur d'adoption. Les recommandations dans les groupes WhatsApp, les associations professionnelles et les réseaux familiaux convertissent bien mieux qu'une publicité froide pour une startup inconnue.",
      },
    ],
  },
  {
    id: 405,
    levelId: 4,
    title: "Collecte les retours et rédige un rapport d'apprentissage",
    description: "Qu'as-tu construit ? Qu'as-tu mesuré ? Qu'as-tu appris ? Que vas-tu faire ensuite ? Le framework Build-Measure-Learn en action.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce que le framework Build-Measure-Learn ?",
        options: [
          "Un process de construction d'entreprise en 3 ans",
          "La boucle centrale du Lean Startup : construire un MVP → mesurer les comportements réels → apprendre et itérer",
          "Un framework de management d'équipe",
          "Une méthode comptable pour les startups",
        ],
        correctIndex: 1,
        explanation:
          "Build-Measure-Learn est le moteur du Lean Startup d'Eric Ries. L'objectif est de minimiser le temps de chaque boucle pour apprendre le plus rapidement possible si ton hypothèse est juste ou s'il faut pivoter.",
      },
    ],
  },
];

export function getTaskById(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function getTasksByLevel(levelId: number): Task[] {
  return tasks.filter((t) => t.levelId === levelId);
}
