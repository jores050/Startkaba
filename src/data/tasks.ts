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

  // --- Niveau 5 ---
  {
    id: 501,
    levelId: 5,
    title: "Identifie les 2 canaux où ta cible passe le plus de temps",
    description:
      "WhatsApp, Facebook, TikTok, terrain, marché… Choisis selon les habitudes réelles de ta cible, pas selon tes préférences personnelles. 2 canaux maîtrisés valent mieux que 10 abandonnés.",
    xp: 75,
    quiz: [
      {
        id: 1,
        question: "Pourquoi se concentrer sur 2 canaux plutôt que d'être partout à la fois ?",
        options: [
          "Pour économiser du budget publicitaire",
          "La concentration sur 2 canaux permet de les maîtriser, d'accumuler des apprentissages et d'obtenir des résultats mesurables — sur 10 canaux, tu fais tout à moitié",
          "Parce que les algorithmes pénalisent les comptes actifs sur plusieurs plateformes",
          "C'est une règle imposée par les agences de communication",
        ],
        correctIndex: 1,
        explanation:
          "La dispersion est l'erreur la plus fréquente en marketing digital. Avec 2 canaux bien maîtrisés, tu comprends l'algorithme, tu crées du contenu adapté et tu mesures ce qui fonctionne réellement.",
      },
    ],
  },
  {
    id: 502,
    levelId: 5,
    title: "Crée ton contenu de lancement : 1 post + 1 statut WhatsApp + 1 message à partager",
    description:
      "Pas besoin de graphic designer ni de budget. Un message clair, honnête, avec un appel à l'action précis. Écris comme tu parlerais à un ami qui pourrait avoir besoin de ton produit.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'un appel à l'action (CTA) efficace ?",
        options: [
          "Un titre accrocheur en début de post",
          "Une publicité payante boostée sur Facebook",
          "Une instruction claire et spécifique qui dit exactement ce que tu veux que la personne fasse après avoir lu ton contenu",
          "Un lien vers ton site web en fin de message",
        ],
        correctIndex: 2,
        explanation:
          "Un bon CTA est spécifique (\"Envoie-moi KABA en message privé\"), facile à exécuter et urgent. \"Partage si tu connais quelqu'un que ça peut aider\" est un CTA puissant en Afrique de l'Ouest où le partage communautaire est naturel.",
      },
    ],
  },
  {
    id: 503,
    levelId: 5,
    title: "Construis ta liste de 50 contacts chauds",
    description:
      "WhatsApp, proches, réseau professionnel, anciens collègues, voisins. Ces 50 personnes sont ta première communauté. Classe-les par ordre de confiance et de pertinence avec ton offre.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Quelle est la différence entre un prospect chaud et un prospect froid ?",
        options: [
          "Un prospect chaud est quelqu'un qui a de l'argent, un prospect froid n'en a pas",
          "Un prospect chaud connaît déjà ton existence ou ton domaine — la barrière de confiance est déjà partiellement franchie ; un prospect froid découvre ton offre pour la première fois",
          "La température désigne uniquement la rapidité avec laquelle ils répondent à tes messages",
          "Un prospect chaud est un ami, un prospect froid est un inconnu total",
        ],
        correctIndex: 1,
        explanation:
          "En Afrique de l'Ouest, la confiance est le premier facteur d'adoption. Tes 50 premiers contacts doivent être des personnes qui te connaissent ou connaissent quelqu'un qui te connaît — le réseau de confiance est ton meilleur canal d'acquisition au démarrage.",
      },
    ],
  },
  {
    id: 504,
    levelId: 5,
    title: "Lance ta première campagne d'acquisition et suis 3 métriques",
    description:
      "Vues, clics, conversions (inscription, achat, contact). Documente tout dans un tableau simple. Ce premier lancement est une expérience d'apprentissage autant qu'une opération commerciale.",
    xp: 200,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'un taux de conversion ?",
        options: [
          "Le pourcentage de posts qui reçoivent des likes",
          "La vitesse à laquelle tes ventes augmentent chaque mois",
          "Le pourcentage de personnes qui passent d'une étape à la suivante dans ton tunnel — ex : visiteurs → inscrits → acheteurs",
          "Le ratio entre le coût de ta campagne et le nombre de vues",
        ],
        correctIndex: 2,
        explanation:
          "Un taux de conversion de 2% signifie que 2 personnes sur 100 qui voient ta page s'inscrivent réellement. Améliorer ce chiffre de 1% peut doubler tes résultats sans augmenter ton budget d'acquisition.",
      },
    ],
  },
  {
    id: 505,
    levelId: 5,
    title: "Obtiens tes 3 premiers retours clients écrits (témoignages)",
    description:
      "Demande directement à tes premiers utilisateurs de décrire leur expérience en quelques phrases. Ces témoignages sont ta meilleure arme marketing — plus puissants que n'importe quelle publicité.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Pourquoi les témoignages clients sont-ils particulièrement puissants dans un marché de confiance ?",
        options: [
          "Parce qu'ils permettent d'améliorer le produit",
          "Parce qu'ils sont gratuits contrairement à la publicité",
          "Parce que la preuve sociale réduit le risque perçu : si quelqu'un de similaire à moi a essayé et validé, c'est plus crédible qu'une promesse du vendeur",
          "Parce qu'ils améliorent le référencement Google",
        ],
        correctIndex: 2,
        explanation:
          "En Afrique de l'Ouest, la confiance est le premier frein à l'achat. Un témoignage d'une personne de la même ville, du même secteur ou du même réseau élimine la méfiance. \"Ma cousine a essayé et c'est vraiment bien\" vaut plus que 100 publicités payantes.",
      },
    ],
  },

  // --- Niveau 6 ---
  {
    id: 601,
    levelId: 6,
    title: "Choisis ton statut juridique",
    description:
      "Entreprise individuelle, SARL ou SAS-OHADA ? Chaque statut a ses implications sur la responsabilité, la fiscalité et la crédibilité. Compare selon ta situation réelle, pas selon ce qui semble le plus impressionnant.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Quelle est la principale différence pratique entre une entreprise individuelle et une SARL ?",
        options: [
          "La SARL est réservée aux entreprises avec des associés étrangers",
          "L'entreprise individuelle est simple mais engage ton patrimoine personnel en cas de dettes ; la SARL protège ton patrimoine grâce à la limitation de responsabilité",
          "Il n'y a pas de différence pratique pour une petite structure de moins de 10 employés",
          "La SAS est réservée aux entreprises technologiques",
        ],
        correctIndex: 1,
        explanation:
          "En cas de dettes avec une entreprise individuelle, tes biens personnels (compte bancaire, véhicule) peuvent être saisis. La SARL protège ton patrimoine personnel. Pour une startup avec des associés, la SAS-OHADA offre plus de flexibilité dans la gouvernance.",
      },
    ],
  },
  {
    id: 602,
    levelId: 6,
    title: "Identifie la procédure RCCM dans ton pays",
    description:
      "Bénin, Côte d'Ivoire, Sénégal, Togo, Mali… La procédure varie mais l'objectif est le même : donner une existence légale à ton entreprise. Renseigne-toi sur les délais et coûts réels dans ta ville.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce que le RCCM et pourquoi est-il indispensable ?",
        options: [
          "Un registre bancaire obligatoire pour ouvrir un compte professionnel",
          "Le Registre du Commerce et du Crédit Mobilier — l'immatriculation officielle qui donne l'existence légale à ton entreprise dans l'espace OHADA",
          "Un registre fiscal pour payer la TVA",
          "Une association professionnelle facultative pour les commerçants",
        ],
        correctIndex: 1,
        explanation:
          "Sans RCCM, tu ne peux légalement pas signer des contrats commerciaux, ouvrir un compte professionnel ou remporter des appels d'offres. L'immatriculation se fait au Tribunal de Commerce ou au guichet unique de création d'entreprise selon le pays.",
      },
    ],
  },
  {
    id: 603,
    levelId: 6,
    title: "Comprends les bases de la fiscalité de ton pays",
    description:
      "Régime simplifié vs régime réel. TVA, IS, patente… Pas besoin d'être expert-comptable, mais tu dois savoir ce que tu dois payer, à quelle fréquence et à qui. Consulte un comptable local pour au moins 1 heure.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Quelle est la différence entre TVA et IS ?",
        options: [
          "La TVA est nationale, l'IS est régional",
          "La TVA est collectée sur tes ventes auprès des clients pour le compte de l'État ; l'IS (Impôt sur les Sociétés) est calculé sur tes bénéfices annuels",
          "La TVA s'applique aux services, l'IS aux produits physiques",
          "Seules les grandes entreprises de plus de 50 employés paient l'IS",
        ],
        correctIndex: 1,
        explanation:
          "Tu collectes la TVA (18-20% selon le pays UEMOA) sur chaque vente et tu la reverses à l'État. L'IS s'applique sur ton bénéfice net en fin d'exercice (taux généralement entre 25-30%). Le régime simplifié allège ces obligations pour les petites structures.",
      },
    ],
  },
  {
    id: 604,
    levelId: 6,
    title: "Rédige ton accord de co-fondateurs si tu n'es pas seul",
    description:
      "Utilise le template fourni. Même entre amis proches, les règles du jeu doivent être écrites avant que l'argent arrive. Un accord clair aujourd'hui évite 90% des conflits futurs.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Quelles sont les 3 clauses essentielles d'un pacte d'associés ?",
        options: [
          "Les salaires, les locaux et l'identité visuelle de l'entreprise",
          "La répartition du capital, les conditions de sortie d'un associé (vesting, bad leaver), et les règles de prise de décision (majorités requises)",
          "Le nom de l'entreprise, le secteur d'activité et le siège social",
          "La durée du contrat, les pénalités de rupture et les conditions de renouvellement",
        ],
        correctIndex: 1,
        explanation:
          "90% des disputes entre co-fondateurs portent sur ces 3 points. La répartition doit être discutée avant de commencer. Les clauses de vesting (actions acquises progressivement) protègent l'entreprise si un associé part tôt sans avoir contribué suffisamment.",
      },
    ],
  },
  {
    id: 605,
    levelId: 6,
    title: "Liste les autorisations et licences spécifiques à ton secteur",
    description:
      "Agroalimentaire, santé, finance, transport, éducation… Certains secteurs requièrent des agréments spécifiques. Mieux vaut le savoir avant d'investir 6 mois de travail dans un modèle non autorisé.",
    xp: 125,
    quiz: [
      {
        id: 1,
        question: "Pourquoi opérer formellement protège réellement ton entreprise ?",
        options: [
          "Uniquement pour éviter les amendes et contrôles fiscaux",
          "La formalité donne accès aux marchés publics, aux financements institutionnels et aux partenariats avec les grandes entreprises — et protège ta marque de la concurrence déloyale",
          "C'est surtout utile pour se développer hors d'Afrique",
          "Elle n'apporte aucun avantage concurrentiel direct pour une petite structure",
        ],
        correctIndex: 1,
        explanation:
          "De nombreux marchés porteurs en Afrique de l'Ouest — appels d'offres de l'État, contrats avec les grandes entreprises, financements des bailleurs — sont exclusivement accessibles aux entreprises formelles. La formalisation protège aussi ta marque et tes contrats.",
      },
    ],
  },

  // --- Niveau 7 ---
  {
    id: 701,
    levelId: 7,
    title: "Construis ton plan de financement par ordre de priorité",
    description:
      "Bootstrap → love money → revenus clients → subventions → investisseurs. Dans cet ordre. Chaque étape validée renforce ta position pour la suivante et préserve ton indépendance.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Pourquoi commencer par le financement local plutôt que chercher immédiatement des investisseurs ?",
        options: [
          "Parce que les investisseurs étrangers ne s'intéressent généralement pas à l'Afrique",
          "Le financement local te garde maître de ta vision, évite une dilution prématurée et ancre ton entreprise dans son écosystème — et donne du levier dans les négociations futures",
          "Uniquement pour des raisons fiscales et réglementaires",
          "Parce que c'est une obligation légale avant d'accéder aux fonds internationaux",
        ],
        correctIndex: 1,
        explanation:
          "Lever des fonds trop tôt peut t'amener à construire pour tes investisseurs, pas pour tes clients locaux. Valider localement d'abord prouve que ton modèle fonctionne dans le contexte africain et renforce considérablement ton dossier auprès des investisseurs.",
      },
    ],
  },
  {
    id: 702,
    levelId: 7,
    title: "Identifie 3 fonds ou subventions accessibles à ton secteur en Afrique francophone",
    description:
      "Tony Elumelu Foundation, Orange Corners, BOAD, fonds nationaux d'aide aux PME, AFD… Il existe plus d'opportunités qu'on ne le croit. Recherche les critères d'éligibilité et les prochaines deadlines.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Quelle est la différence entre subvention, prêt et equity ?",
        options: [
          "Ce sont trois façons différentes de dire la même chose",
          "Subvention = argent à ne pas rembourser (mais avec conditions d'usage) ; Prêt = argent à rembourser avec intérêts ; Equity = part du capital en échange d'argent — tu cèdes une partie de la propriété",
          "Subvention = État, Prêt = banque, Equity = famille uniquement",
          "La différence est uniquement le montant : subvention < prêt < equity",
        ],
        correctIndex: 1,
        explanation:
          "Pour une startup en phase initiale, priorise les subventions (Tony Elumelu Foundation, AFD, Banque Mondiale) avant de diluer ton capital avec des investisseurs. Les prêts ont un coût fixe indépendant de tes performances ; l'equity aligne les intérêts mais réduit ta part.",
      },
    ],
  },
  {
    id: 703,
    levelId: 7,
    title: "Calcule ton besoin de financement réel — runway 6 mois",
    description:
      "Dépenses mensuelles × 6. Ajoute 20% de marge de sécurité. Sépare ce qui est absolument nécessaire de ce qui serait bien d'avoir. Lever trop c'est diluer inutilement — lever trop peu c'est se retrouver en urgence.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce que le \"runway\" en financement de startup ?",
        options: [
          "Le temps nécessaire pour développer ton produit jusqu'à la version finale",
          "Le nombre de mois pendant lesquels tu peux opérer avant de manquer de trésorerie — calculé en divisant ta trésorerie disponible par tes dépenses mensuelles",
          "La durée de ton contrat avec tes premiers clients payants",
          "Le délai légal pour déposer tes comptes annuels au RCCM",
        ],
        correctIndex: 1,
        explanation:
          "Règle d'or : commence à lever des fonds quand il te reste 6 mois de runway, jamais en urgence. Si tu as 3 000 000 FCFA en trésorerie et dépenses 500 000 FCFA par mois, ton runway est de 6 mois. L'urgence te met en position de faiblesse dans les négociations.",
      },
    ],
  },
  {
    id: 704,
    levelId: 7,
    title: "Crée ton pitch deck de 10 slides",
    description:
      "Utilise le template fourni : Problème → Solution → Marché → Traction → Modèle économique → Équipe → Compétition → Roadmap → Financials → Ask. Sois concis — chaque slide doit pouvoir être comprise en 20 secondes.",
    xp: 250,
    quiz: [
      {
        id: 1,
        question: "Quels sont les 3 éléments qu'un investisseur regarde en premier dans un pitch deck ?",
        options: [
          "Le logo, les couleurs de la présentation et la qualité des visuels",
          "Le problème (est-il réel et douloureux ?), l'équipe (peut-elle l'exécuter ?) et la traction (y a-t-il déjà des preuves concrètes ?)",
          "Les projections financières à 5 ans, la valorisation demandée et l'exit strategy",
          "La taille du marché en milliards, les brevets déposés et la feuille de route technique",
        ],
        correctIndex: 1,
        explanation:
          "Les investisseurs africains expérimentés regardent d'abord l'équipe (ils investissent dans des personnes), puis la traction (est-ce que le marché répond déjà ?), puis le problème. Les projections à 5 ans sont souvent ignorées — les investisseurs savent qu'elles seront fausses.",
      },
    ],
  },
  {
    id: 705,
    levelId: 7,
    title: "Prépare-toi à pitcher : les 5 questions pièges des investisseurs",
    description:
      "\"Pourquoi vous ?\", \"Et si Google fait la même chose ?\", \"Quelle est votre exit strategy ?\", \"Pourquoi maintenant ?\", \"Comment allez-vous dépenser les fonds ?\". Prépare des réponses honnêtes et directes.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Comment garder le contrôle de ton entreprise face à un investisseur ?",
        options: [
          "Refuser tout investissement extérieur et rester 100% bootstrapé",
          "Lever le moins possible pour diluer le moins possible, négocier des droits de vote, comprendre les clauses de liquidation préférentielle et choisir des investisseurs alignés avec ta vision africaine",
          "Créer une holding familiale avant toute levée de fonds",
          "Toujours lever en devise étrangère pour protéger son capital",
        ],
        correctIndex: 1,
        explanation:
          "Les clauses à surveiller dans tout term sheet : liquidation préférentielle (qui se paie en premier en cas de vente), anti-dilution (protection de l'investisseur), et drag-along (l'investisseur peut te forcer à vendre). Fais-toi accompagner par un avocat spécialisé avant de signer.",
      },
    ],
  },

  // --- Niveau 8 ---
  {
    id: 801,
    levelId: 8,
    title: "Fixe ta date de lancement et crée ton plan sur 2 semaines",
    description:
      "J-14, J-7, J-3, J-1, Jour J. Remonte dans le temps depuis la date de lancement et identifie ce qui doit être prêt à chaque étape. Une date sans plan est un vœu — un plan sans date est un rêve.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Pourquoi un lancement a absolument besoin d'une date fixe ?",
        options: [
          "Pour des raisons administratives et fiscales liées au RCCM",
          "Une date crée une échéance concrète qui mobilise l'équipe, donne un signal clair à l'audience et transforme une intention en engagement public — \"bientôt\" ne mobilise personne",
          "Uniquement pour pouvoir planifier la campagne publicitaire",
          "C'est une obligation légale imposée par le registre du commerce",
        ],
        correctIndex: 1,
        explanation:
          "La peur de rater la deadline est souvent le meilleur remède à la procrastination entrepreneuriale. Une date précise permet de travailler en remontant : qu'est-ce qui doit être prêt J-14 ? J-7 ? Elle transforme le lancement en événement que ton audience peut anticiper.",
      },
    ],
  },
  {
    id: 802,
    levelId: 8,
    title: "Prépare ton annonce de lancement — post + message presse local",
    description:
      "Un post de lancement pour tes réseaux, et un message court pour les journalistes, blogueurs tech et influenceurs locaux pertinents. L'objectif : être relayé gratuitement par des tiers crédibles.",
    xp: 150,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'un communiqué de presse minimal efficace ?",
        options: [
          "Un post Instagram de plusieurs pages avec toutes les informations de l'entreprise",
          "Un document de 1 page qui répond à : Qui ? Quoi ? Quand ? Où ? Pourquoi ? — envoyé aux médias, blogs tech et influenceurs locaux pertinents",
          "Une publicité payante dans un journal national",
          "Un email envoyé en masse à tous ses contacts personnels",
        ],
        correctIndex: 1,
        explanation:
          "En Afrique de l'Ouest, les blogs tech locaux, les groupes Facebook d'entrepreneurs et les journalistes économiques locaux sont des cibles plus pertinentes que les grands médias nationaux. Un communiqué inclut une citation du fondateur, un lien vers le produit et un contact presse.",
      },
    ],
  },
  {
    id: 803,
    levelId: 8,
    title: "Mobilise ton premier cercle — 10 personnes prêtes à partager le Jour J",
    description:
      "Briefe ces 10 personnes à l'avance : quoi partager, quand, dans quels groupes. Des partages simultanés créent un effet de vague bien plus fort que des partages éparpillés sur plusieurs semaines.",
    xp: 100,
    quiz: [
      {
        id: 1,
        question: "Quel est l'effet de levier concret du bouche-à-oreille au lancement ?",
        options: [
          "Le bouche-à-oreille est moins efficace que la publicité payante en termes de portée",
          "Si 10 personnes partagent à 50 contacts chacune dans leurs groupes WhatsApp, tu atteins 500 personnes avec un taux de confiance élevé — sans aucun budget",
          "Cela ne fonctionne que si tu as déjà plus de 1 000 abonnés sur les réseaux",
          "Cela ne fonctionne efficacement que pour les produits grand public à bas prix",
        ],
        correctIndex: 1,
        explanation:
          "En Afrique de l'Ouest, un partage WhatsApp dans un groupe familial ou professionnel a un impact immédiat. L'objectif du Jour J : créer une vague de partages simultanés pour maximiser l'effet réseau. Chaque partage dans 2-3 groupes de 50 personnes, c'est une croissance exponentielle.",
      },
    ],
  },
  {
    id: 804,
    levelId: 8,
    title: "Lance officiellement et suis tes métriques J+1, J+7, J+30",
    description:
      "Le lancement n'est pas une fin — c'est un début. Documente tout : ce qui a fonctionné, ce qui n'a pas fonctionné, les retours reçus. Ces données sont la base de ton plan des 30 prochains jours.",
    xp: 300,
    quiz: [
      {
        id: 1,
        question: "Quelles métriques prioriser après le lancement ?",
        options: [
          "Uniquement les ventes et le chiffre d'affaires du premier jour",
          "Les métriques demandées par tes investisseurs uniquement",
          "J+1 : trafic et inscriptions (acquisition) ; J+7 : engagement et retours (les gens reviennent-ils ?) ; J+30 : revenus et rétention (le modèle économique fonctionne-t-il ?)",
          "Le nombre de followers sur Instagram et TikTok",
        ],
        correctIndex: 2,
        explanation:
          "Les métriques de vanité (likes, vues) ne disent rien sur la viabilité. J+1 mesure l'acquisition, J+7 mesure si les gens activent et reviennent, J+30 mesure si le modèle économique tient. Le taux de rétention à J+30 est souvent le meilleur indicateur de la valeur réelle créée.",
      },
    ],
  },
  {
    id: 805,
    levelId: 8,
    title: "Rédige ton bilan de lancement et tes 3 prochains objectifs",
    description:
      "Qu'est-ce qui a marché ? Qu'est-ce qui n'a pas marché ? Qu'est-ce que tu aurais fait différemment ? Documente tout, puis formule tes 3 prochains objectifs avec des résultats mesurables.",
    xp: 175,
    quiz: [
      {
        id: 1,
        question: "Qu'est-ce qu'un OKR simple pour une startup ?",
        options: [
          "Un contrat d'objectifs annuels avec ses employés",
          "Objective + Key Results : un objectif ambitieux et qualitatif accompagné de 2-3 résultats clés mesurables qui prouvent concrètement qu'il est atteint",
          "Un outil de gestion de projet similaire à Trello ou Notion",
          "Un bilan financier simplifié pour les startups en phase initiale",
        ],
        correctIndex: 1,
        explanation:
          "Exemple d'OKR post-lancement : Objectif = \"Devenir la référence des entrepreneurs dans mon secteur à Dakar\" ; KR1 = \"Atteindre 500 utilisateurs actifs\" ; KR2 = \"Obtenir un taux de rétention J+30 de 40%\" ; KR3 = \"Être mentionné dans 3 médias locaux\". Les OKRs donnent la direction sans dicter la méthode.",
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
