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
    course: {
      title: "La proposition de valeur — le cœur de ton business",
      readingTime: "6 min",
      steps: [
        {
          type: "concept",
          icon: "🎯",
          title: "Qu'est-ce qu'une proposition de valeur ?",
          content: "Une proposition de valeur est la réponse claire et honnête à cette question : pourquoi un client devrait-il te choisir toi plutôt que n'importe quelle autre alternative — y compris ne rien faire du tout ?\n\nCe n'est pas un slogan. Ce n'est pas une liste de fonctionnalités. C'est une phrase (deux maximum) qui explique :\n• Quel problème concret tu résous\n• Pour qui exactement\n• Pourquoi tu es le meilleur choix disponible\n\nLa plupart des entrepreneurs font l'erreur inverse : ils décrivent ce que leur produit fait au lieu d'expliquer ce que le client gagne. \"Notre application utilise l'IA pour optimiser les flux logistiques\" ne dit rien à ton client. \"Tu livres en 2h au lieu de 2 jours, sans chauffeur supplémentaire\" — ça, ça parle."
        },
        {
          type: "concept",
          icon: "✏️",
          title: "Les 4 caractéristiques d'une bonne proposition",
          content: "Pour être efficace, ta proposition de valeur doit être :\n\n**Claire** — Ton client la comprend en 5 secondes, sans explication supplémentaire. Si tu dois \"expliquer\" pour qu'elle soit comprise, elle ne l'est pas encore.\n\n**Spécifique** — Elle parle à une cible précise, pas à \"tout le monde\". \"Pour les restaurateurs de Dakar qui font plus de 50 couverts par soir\" est bien plus puissant que \"pour les entrepreneurs\".\n\n**Différenciante** — Elle souligne pourquoi tu es différent de ce qui existe déjà. Pas nécessairement meilleur sur tous les points — mais clairement meilleur sur CE qui compte pour ta cible.\n\n**Centrée sur le bénéfice** — Elle parle de ce que le client obtient (gain, problème résolu, douleur évitée), pas de comment tu le fais techniquement."
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : Kofi à Lomé",
          content: "Kofi développe une application pour les artisans menuisiers de Lomé. Voici comment sa proposition de valeur a évolué :\n\n**Version 1 (vague) :** « Une plateforme digitale qui connecte les artisans à leurs clients via une interface intuitive. »\n→ Problème : ça décrit la technologie, pas la valeur. N'importe quel artisan lira ça et dira « et alors ? »\n\n**Version 2 (trop large) :** « La solution pour tous les artisans d'Afrique de l'Ouest. »\n→ Problème : trop vague, pas crédible, ne parle à personne précisément.\n\n**Version 3 (la bonne) :** « Pour les menuisiers de Lomé, MorebiCraft génère 3 à 5 nouvelles commandes par mois via WhatsApp — sans site web ni avance de frais. »\n→ Pourquoi ça marche : cible précise (menuisiers de Lomé), bénéfice chiffré (3-5 commandes), canal connu (WhatsApp), frein levé (sans avance).\n\nLa différence ? La version 3 répond directement à la question qu'a dans la tête chaque menuisier : « Qu'est-ce que ça m'apporte concrètement ? »"
        },
        {
          type: "concept",
          icon: "🔧",
          title: "La méthode pratique : 4 questions + 1 formule",
          content: "Pose-toi ces 4 questions pour construire ta proposition :\n\n1. **Qui est mon client ?** (sois précis : secteur, ville, situation)\n2. **Quel est son problème #1 ?** (le problème qu'il ressent chaque semaine)\n3. **Qu'est-ce qu'il gagne avec moi ?** (résultat concret, si possible chiffré)\n4. **Pourquoi moi plutôt que l'alternative actuelle ?** (ce que les autres ne font pas)\n\nEnsuite, assemble avec cette formule :\n\n« Pour [QUI], [ton produit/service] [BÉNÉFICE PRINCIPAL] contrairement à [ALTERNATIVE ACTUELLE]. »\n\nExemple : « Pour les PME de Cotonou, FacturaPro génère des devis professionnels en 2 minutes via Mobile Money, contrairement aux tableaux Excel qui prennent 30 minutes et font fuir les clients. »\n\nÇa peut paraître simple. C'est volontaire — la clarté est une force, pas une faiblesse."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Écris ta proposition de valeur en utilisant la formule",
          placeholder: "Pour [qui précisément], [ton produit/service] [bénéfice concret, si possible chiffré] contrairement à [ce que ta cible fait aujourd'hui comme alternative].\n\nEx : « Pour les chauffeurs de taxi-moto d'Abidjan, RidePro augmente leurs courses de 40% par semaine grâce à une file d'attente automatique, contrairement à l'attente passive au bord de la route. »"
        },
        {
          type: "check",
          icon: "✅",
          question: "Laquelle de ces propositions de valeur est la meilleure ?",
          options: [
            "\"Une solution innovante de gestion pour les entrepreneurs africains modernes\"",
            "\"Pour les vendeuses du marché de Sandaga à Dakar, StockFacile élimine les ruptures de stock en envoyant une alerte WhatsApp 48h avant — sans smartphone haut de gamme requis\"",
            "\"Le meilleur logiciel de gestion d'inventaire d'Afrique de l'Ouest\"",
          ],
          correctIndex: 1,
          explanation: "La deuxième est la bonne, et voici pourquoi précisément :\n• Cible définie : vendeuses du marché de Sandaga (pas \"entrepreneurs africains\")\n• Problème réel : les ruptures de stock font perdre des ventes\n• Bénéfice concret : alerte 48h avant (pas \"gérer mieux\")\n• Canal adapté au terrain : WhatsApp\n• Frein levé : fonctionne sans smartphone haut de gamme\n\nLa première est un ensemble de mots vides (\"innovant\", \"moderne\") sans aucun bénéfice. La troisième est une affirmation non vérifiable (\"le meilleur\") qui ne dit rien sur le problème résolu."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"Si tu ne peux pas expliquer simplement ton idée, c'est que tu ne la comprends pas encore assez bien.\" — Appliqué à l'entrepreneuriat, ça veut dire : la clarté n'est pas une simplification. C'est ta première preuve de maîtrise."
        }
      ]
    },
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
    course: {
      title: "Ton moteur intérieur — pourquoi toi, pourquoi maintenant",
      readingTime: "5 min",
      steps: [
        {
          type: "concept",
          icon: "🔥",
          title: "Pourquoi les raisons profondes comptent autant que l'idée",
          content: "La plupart des startups ne meurent pas à cause d'une mauvaise idée. Elles meurent parce que le fondateur a abandonné au premier moment difficile — et les moments difficiles, dans tout projet entrepreneurial, arrivent toujours.\n\nCe qui fait la différence entre celui qui tient et celui qui lâche, c'est la profondeur de ses raisons. \"Parce que c'est rentable\" ne suffit pas quand tu n'as pas dormi depuis 3 jours, que ton premier client demande un remboursement, et que ton associé perd confiance.\n\nTes raisons profondes sont ton carburant de réserve. Elles doivent répondre à trois niveaux :\n• **Niveau 1 (personnel)** : Ce que tu as vécu qui rend ce problème important pour toi\n• **Niveau 2 (compétence)** : Ce que tu sais faire mieux que la plupart, lié à ce projet\n• **Niveau 3 (mission)** : Ce que ce projet change dans la vie des gens autour de toi"
        },
        {
          type: "concept",
          icon: "⚡",
          title: "L'Ikigai entrepreneurial : trouver l'intersection",
          content: "L'Ikigai est un concept japonais qui signifie \"raison d'être\". Appliqué à l'entrepreneuriat, il identifie 4 cercles qui, à leur intersection, créent un projet durable :\n\n**Ce que tu aimes faire** — Les activités où tu perds la notion du temps. Ce que tu ferais même sans être payé.\n\n**Ce en quoi tu es bon** — Tes compétences réelles, validées par des résultats concrets. Pas ce que tu penses être bon — ce que les autres t'ont demandé de faire pour eux.\n\n**Ce dont le monde (ton marché) a besoin** — Un problème réel que des gens paient pour résoudre, ou souffrent de ne pas voir résolu.\n\n**Ce pour quoi on te paiera** — La preuve que quelqu'un est prêt à sortir de l'argent pour cette valeur.\n\nLe piège le plus fréquent : lancer un projet uniquement parce que \"ça paie\" (sans passion ni compétence) ou uniquement parce qu'on \"aime ça\" (sans marché ni capacité à monétiser)."
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : Aminata à Abidjan",
          content: "Aminata travaille comme comptable dans une PME à Abidjan. Elle veut lancer un service de comptabilité pour les petits commerçants du marché de Cocody. Voici ses 3 raisons profondes :\n\n**Raison 1 (vécu personnel) :** Sa mère a tenu un stand de tissus pendant 15 ans sans jamais comprendre pourquoi elle ne faisait pas de bénéfices. Aminata a découvert à 18 ans que sa mère perdait 30% de son chiffre d'affaires en coûts cachés non suivis. Cette douleur est ancrée.\n\n**Raison 2 (compétence réelle) :** Elle a géré les finances de 3 associations étudiantes et a restructuré la comptabilité de son employeur actuel. Elle sait simplifier des sujets complexes pour des non-comptables.\n\n**Raison 3 (mission) :** 80% des commerçants du marché Cocody sont des femmes. Leur donner les outils pour comprendre leurs chiffres, c'est les rendre financièrement indépendantes — pas seulement plus rentables.\n\nCes 3 raisons tiennent quand ça va mal. Elles expliquent POURQUOI elle est la bonne personne, pas juste quelqu'un qui veut \"être son propre patron\"."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Écris tes 3 raisons profondes",
          placeholder: "Raison 1 (vécu personnel) : Quelle expérience dans ta vie t'a montré que ce problème est réel et important ?\n\nRaison 2 (compétence) : Qu'est-ce que tu sais faire — prouvé par des expériences passées — qui te rend particulièrement apte à résoudre ce problème ?\n\nRaison 3 (mission) : Si ton projet réussit dans 5 ans, qu'est-ce qui change dans la vie des gens que tu sers ?"
        },
        {
          type: "check",
          icon: "✅",
          question: "Qu'est-ce que l'Ikigai entrepreneurial ?",
          options: [
            "Un outil financier japonais pour calculer la rentabilité d'un projet",
            "L'intersection entre ce que tu aimes, ce en quoi tu es bon, ce dont le monde a besoin et ce pour quoi on te paiera",
            "Une technique de méditation pour gérer le stress des entrepreneurs",
          ],
          correctIndex: 1,
          explanation: "L'Ikigai est un outil de positionnement personnel, pas financier. Son utilité en entrepreneuriat est de s'assurer que ton projet repose sur les 4 piliers à la fois. Manquer l'un d'eux crée un déséquilibre :\n• Passion + compétence + besoin sans monétisation = œuvre charitable, non durable\n• Compétence + besoin + monétisation sans passion = burn-out assuré en 2 ans\n• Passion + besoin + monétisation sans compétence = frustration et perte de crédibilité\n\nCe n'est pas de la méditation — c'est de la stratégie fondateur."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"L'éléphant qui porte son fardeau sur ses propres épaules ne trébuche pas.\" Tes raisons personnelles profondes sont ce fardeau que tu es le seul à pouvoir porter avec fierté. Personne d'autre ne peut avoir les mêmes."
        }
      ]
    },
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
    course: {
      title: "Penser problème, pas solution — la discipline qui sauve les startups",
      readingTime: "6 min",
      steps: [
        {
          type: "concept",
          icon: "🔍",
          title: "Pourquoi les fondateurs confondent problème et fonctionnalité",
          content: "La plupart des entrepreneurs passent leurs premières semaines à décrire leur produit : \"Mon application permet de faire X, Y et Z.\" C'est l'erreur classique de quelqu'un amoureux de sa solution.\n\nLe problème avec cette approche : tu peux construire quelque chose de techniquement parfait qui ne résout aucun problème que les gens sont prêts à payer pour résoudre.\n\nLa bonne posture est l'inverse : commencer par articuler les problèmes avec précision, puis voir si ta solution est vraiment la meilleure réponse.\n\nUn problème bien formulé ressemble à :\n• \"Les gérants de maquis à Cotonou passent 2h par soir à réconcilier leurs recettes à la main et trouvent des erreurs 3 fois par semaine.\"\n\nPas à :\n• \"Il manque un bon logiciel de caisse pour les restaurants africains.\"\n\nLa première formulation te dit exactement ce que ressent ton client. La deuxième est une observation de marché vague qui ne t'aide pas à construire."
        },
        {
          type: "concept",
          icon: "🌳",
          title: "Problème racine vs symptôme — la méthode des 5 Pourquoi",
          content: "Un symptôme est ce que le client voit et se plaint. Le problème racine est la cause profonde que le symptôme révèle.\n\nExemple :\n**Symptôme :** « Je n'ai pas assez de clients ce mois-ci. »\n**Pourquoi ?** → Je ne fais pas assez de prospection.\n**Pourquoi ?** → Je passe tout mon temps à gérer les livraisons en retard.\n**Pourquoi ?** → Mes fournisseurs ne respectent pas les délais.\n**Pourquoi ?** → Je commande trop tard car je n'ai pas de visibilité sur mon stock.\n**Problème racine :** absence de gestion de stock en temps réel.\n\nSi tu construis une solution pour \"avoir plus de clients\" tu rates la cible. Si tu construis une solution pour \"gérer son stock en temps réel\", tu règles le vrai problème.\n\nLa méthode des 5 Pourquoi : à chaque réponse, pose un nouveau \"Pourquoi ?\" jusqu'à arriver à une cause que tu peux réellement traiter."
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : Moussa à Bamako, service de livraison",
          content: "Moussa veut lancer un service de livraison de repas à Bamako. Voici comment il a identifié 5 problèmes réels en parlant à ses cibles :\n\n**Problème 1 :** Les employés de bureau de Bamako perdent 45-60 minutes à midi pour trouver de la nourriture, ce qui rogne sur leur pause.\n\n**Problème 2 :** Les restaurateurs du quartier ACI 2000 perdent des commandes potentielles car ils n'ont pas la capacité de livrer eux-mêmes.\n\n**Problème 3 :** Les clients ne savent pas si le plat est disponible avant de se déplacer — ils font le trajet pour rien 30% du temps.\n\n**Problème 4 :** Le paiement à la livraison en cash crée des frictions (monnaie, reçus, retards).\n\n**Problème 5 :** Il n'y a pas de moyen de noter ou recommander un restaurant à ses collègues via WhatsApp facilement.\n\nChacun de ces problèmes lui donne une feature à prioriser — et certains (le problème 3 et 4) sont des bloquants plus critiques que le problème 5 pour son lancement."
        },
        {
          type: "concept",
          icon: "📋",
          title: "Comment formuler un problème correctement",
          content: "Un problème bien formulé contient :\n\n**Qui** : la personne précise qui souffre de ce problème\n**Quoi** : la situation ou l'action où le problème se produit\n**Conséquence** : ce que ça coûte (temps, argent, stress, opportunité perdue)\n**Fréquence** : à quelle fréquence ça arrive (quotidien, hebdomadaire...)\n\nModèle : « [Qui] a du mal à [quoi] quand [situation], ce qui lui coûte [conséquence], et ça arrive [fréquence]. »\n\nExemple : « Les gérants de boutiques de téléphonie à Dakar ont du mal à suivre leurs stocks de crédit téléphonique quand ils ont plusieurs points de vente, ce qui leur fait rater des ventes et créer des conflits avec les livreurs, et ça arrive plusieurs fois par semaine. »\n\nAvec cette formulation, tu sais exactement pour qui tu construis, dans quel contexte, et pourquoi c'est urgent."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Liste tes 5 problèmes concrets avec la formule complète",
          placeholder: "Problème 1 : [Qui] a du mal à [quoi] quand [situation], ce qui lui coûte [conséquence], et ça arrive [fréquence].\n\nProblème 2 : ...\n\nProblème 3 : ...\n\nProblème 4 : ...\n\nProblème 5 : ...\n\nLequel de ces 5 problèmes te semble le plus douloureux pour ta cible ? Mets-le en tête."
        },
        {
          type: "check",
          icon: "✅",
          question: "Quelle est la différence entre un problème et un symptôme ?",
          options: [
            "Il n'y a pas de différence, les deux termes sont interchangeables en entrepreneuriat",
            "Un symptôme est la manifestation visible d'une souffrance, le problème racine est la cause profonde que le symptôme révèle",
            "Un problème est plus grave qu'un symptôme — les startups ne doivent s'attaquer qu'aux problèmes",
          ],
          correctIndex: 1,
          explanation: "La distinction est cruciale pour construire la bonne solution. Si tu traites le symptôme (\"pas assez de clients\"), ta solution sera superficielle. Si tu traites le problème racine (\"pas de visibilité sur son stock → livraisons en retard → moins de temps pour prospecter\"), ta solution est structurelle et difficile à remplacer.\n\nLes startups qui échouent s'attaquent souvent à des symptômes avec des solutions technologiques complexes. Les startups qui réussissent trouvent la cause profonde et la traitent de la manière la plus simple possible."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"On ne soigne pas la fièvre en enlevant le thermomètre.\" En entrepreneuriat : résoudre le symptôme visible sans s'attaquer au problème racine, c'est construire une solution que le client abandonnera dès qu'il trouvera mieux."
        }
      ]
    },
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
    course: {
      title: "Construire ta persona — mettre un visage sur ton marché",
      readingTime: "7 min",
      steps: [
        {
          type: "concept",
          icon: "👤",
          title: "Qu'est-ce qu'une persona et pourquoi c'est indispensable",
          content: "Une persona est un personnage semi-fictif qui représente ton client idéal. Ce n'est pas une moyenne statistique — c'est un individu avec un nom, une histoire, des habitudes et des frustrations précises.\n\nPourquoi ne pas se contenter de \"les jeunes entrepreneurs de 25-35 ans\" ?\n\nParce que cette description ne t'aide pas à prendre de décisions. Est-ce que ta persona préfère WhatsApp ou une application ? Est-ce qu'elle paie avec Mobile Money ou en cash ? Est-ce qu'elle fait confiance aux recommandations de sa famille ou aux avis Google ?\n\nUne bonne persona répond à toutes ces questions. Elle te permet de :\n• Décider quelles fonctionnalités prioriser\n• Choisir ton canal de communication\n• Fixer ton prix au bon niveau\n• Écrire des messages qui résonnent vraiment\n\nEn résumé : sans persona précise, tu construis pour tout le monde, ce qui veut dire pour personne."
        },
        {
          type: "concept",
          icon: "🗂️",
          title: "Les 6 dimensions d'une persona complète",
          content: "Pour construire une persona utile, tu as besoin de 6 dimensions :\n\n**1. Identité** : Prénom fictif, âge, ville précise (pas juste \"Dakar\" — quartier ?), situation familiale, profession.\n\n**2. Situation économique** : Revenus mensuels (en FCFA), mode de paiement habituel (cash, Mobile Money, virement), cycle de revenus (mensuel, hebdomadaire, irrégulier).\n\n**3. Journée type** : Comment passe-t-il/elle sa journée ? Quand a-t-il/elle du temps ? Quels outils utilise-t-il/elle (WhatsApp, Facebook, téléphone)?)\n\n**4. Problèmes prioritaires** : Ses 3 frustrations majeures liées à ton domaine. Formulées avec ses mots, pas les tiens.\n\n**5. Ce qu'il/elle essaie déjà** : La solution actuelle (même imparfaite) qu'il/elle utilise. C'est ton concurrent réel.\n\n**6. Ce qui le/la ferait changer** : Quel déclencheur le pousserait à essayer quelque chose de nouveau ? (Recommandation d'un ami ? Promotion ? Preuve sociale ?)"
        },
        {
          type: "example",
          icon: "💡",
          title: "Persona complète : Fatou, revendeuse de tissus à Lomé",
          content: "**Nom :** Fatou Mensah, 34 ans\n**Lieu :** Marché d'Adidogomé, Lomé\n**Situation :** Mariée, 2 enfants, revendeuse de tissus depuis 6 ans au marché\n\n**Situation économique :**\nRevenu mensuel : 180 000 à 280 000 FCFA selon la saison. Paie tout en cash ou T-Money (Togocel). Pas de compte bancaire formel. Revenus très irréguliers (forte saison avant les fêtes, creux en janvier-février).\n\n**Journée type :**\nOuvre son stand à 7h30. Utilise WhatsApp Business depuis 1 an pour envoyer des photos de nouveaux tissus à ses clientes régulières. Ferme à 18h. Gère son stock mentalement ou sur un carnet.\n\n**Frustrations principales :**\n• Elle ne sait jamais quand réapprovisionner — elle découvre les ruptures quand un client demande un tissu qu'elle n'a plus.\n• Elle perd du temps à aller voir ses fournisseurs en personne alors qu'une commande WhatsApp suffirait.\n• En fin de mois, elle ne sait pas combien elle a vraiment gagné.\n\n**Solution actuelle :** Un carnet manuscrit et sa mémoire. Parfois appelle son mari pour qu'il l'aide à compter.\n\n**Ce qui la ferait changer :** Une recommandation d'une autre vendeuse du marché, ou une démo gratuite de 1 mois sans engagement."
        },
        {
          type: "concept",
          icon: "⚠️",
          title: "Les erreurs classiques dans la construction de persona",
          content: "**Erreur 1 — La persona trop large** : \"Entrepreneurs de 20-50 ans en Afrique de l'Ouest\" n'est pas une persona. C'est un continent entier. Sois spécifique jusqu'à l'inconfort.\n\n**Erreur 2 — La persona inventée** : Une persona doit être basée sur de vraies conversations avec de vraies personnes. Si tu n'as encore parlé à personne, appelle-la \"hypothèse de persona\" — elle changera dès que tu feras tes premières interviews.\n\n**Erreur 3 — Plusieurs personas pour commencer** : Au lancement, cible une seule persona. Servir 3 personas différentes avec des besoins différents, c'est construire 3 produits en même temps.\n\n**Erreur 4 — La persona figée** : Ta persona doit évoluer avec tes découvertes. Note la date de création et mets-la à jour après chaque série d'interviews."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Construis ta persona principale",
          placeholder: "Prénom fictif et âge : \nVille et quartier précis : \nProfession / situation : \nRevenus mensuels (FCFA) : \nMode de paiement habituel : \n\nJournée type (en 3-4 phrases) : \n\nSes 3 frustrations principales liées à ton domaine :\n1. \n2. \n3. \n\nCe qu'elle/il utilise aujourd'hui comme solution alternative : \n\nCe qui le/la ferait adopter ton produit : "
        },
        {
          type: "check",
          icon: "✅",
          question: "Qu'est-ce qu'une persona ?",
          options: [
            "Un personnage fictif représentant un segment de clients cibles, basé sur des données réelles et des hypothèses validées",
            "Le profil LinkedIn de ton premier client — la vraie personne qui paie",
            "Une étude de marché quantitative avec des centaines de répondants",
          ],
          correctIndex: 0,
          explanation: "Une persona est semi-fictive par définition : elle a un nom, une histoire, un prénom — mais elle représente un archétype construit à partir de vraies données et de vraies conversations. Elle n'est pas une personne réelle (ce serait trop limitant) ni une statistique froide (ce serait trop abstrait).\n\nLe profil LinkedIn d'un vrai client ne t'aide pas à généraliser — il te dit ce qu'une personne fait, pas ce que ta cible pense. L'étude quantitative te donne des tendances mais pas des motivations profondes. La persona synthétise les deux."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"Si tu essaies de plaire à tout le monde, tu ne plais à personne.\" — En entrepreneuriat, choisir une persona précise n'est pas restrictif : c'est ce qui te permet d'être tellement bon pour cette personne qu'elle te recommande à ses proches."
        }
      ]
    },
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
    course: {
      title: "L'UVP — l'arme de communication la plus puissante de ton business",
      readingTime: "7 min",
      steps: [
        {
          type: "concept",
          icon: "💎",
          title: "Pourquoi l'UVP est différente de la proposition de valeur simple",
          content: "Tu as déjà défini une proposition de valeur à la tâche 1. L'UVP (Unique Value Proposition) va plus loin : elle intègre l'aspect de différenciation compétitive.\n\nLa proposition de valeur dit : « Voici ce que je fais et pourquoi c'est utile. »\nL'UVP dit : « Voici ce que je fais, pourquoi c'est utile, ET pourquoi personne d'autre ne le fait aussi bien pour toi. »\n\nC'est cette dernière partie — l'unicité — qui est souvent manquante. Et c'est elle qui transforme une bonne solution en business défendable.\n\nL'unicité ne signifie pas inventer quelque chose qui n'existe pas. Elle signifie trouver ta combinaison unique de :\n• Cible (qui tu sers précisément)\n• Problème (lequel tu adresses en priorité)\n• Approche (comment tu le résous)\n• Contexte (dans quel environnement tu opères)"
        },
        {
          type: "concept",
          icon: "🏗️",
          title: "Le framework en 4 parties pour construire ton UVP",
          content: "Utilise cette structure éprouvée :\n\n**Pour [CIBLE PRÉCISE]**\nQui est exactement cette personne ? (reprise de ta persona)\n\n**Qui [PROBLÈME PRINCIPAL]**\nQuelle est sa douleur principale que tu adresses ?\n\n**Notre [PRODUIT/SERVICE] est [CATÉGORIE]**\nDans quelle catégorie tu te places ? (application mobile, service de livraison, conseil...)\n\n**Qui [BÉNÉFICE UNIQUE] contrairement à [ALTERNATIVE ACTUELLE]**\nQu'est-ce que tu fais que personne d'autre ne fait dans ce contexte précis ?\n\n---\n\nExemple complet :\n« Pour les maraîchers de la périphérie d'Abidjan qui perdent 20-30% de leurs légumes faute d'acheteurs, FraisConnect est une plateforme de vente directe qui les met en contact avec des restaurants en moins de 4h — contrairement à la vente au marché central où ils attendent des jours et vendent à perte. »\n\nChaque mot est choisi. Chaque mot élimine quelqu'un (et c'est une bonne chose)."
        },
        {
          type: "example",
          icon: "💡",
          title: "Analyse de 3 UVP — bonne, mauvaise, excellente",
          content: "**UVP 1 (mauvaise) :** « La meilleure application de gestion pour les entrepreneurs africains. »\n→ Problèmes : \"meilleure\" ne veut rien dire, \"entrepreneurs africains\" est trop large, aucun bénéfice concret, aucune différenciation.\n\n**UVP 2 (bonne) :** « Pour les PME de Cotonou, FacturaPro génère des devis professionnels en 2 minutes. »\n→ Correct : cible géographique précise, bénéfice chiffré. Mais : pas de différenciation vs concurrents, pas de contexte de paiement local.\n\n**UVP 3 (excellente) :** « Pour les PME de Cotonou qui perdent des contrats à cause de devis informels faits à la main, FacturaPro génère des devis professionnels en 2 minutes, encaissables directement par Flooz ou MTN MoMo — contrairement aux logiciels français qui nécessitent une carte bancaire et un expert-comptable. »\n→ Pourquoi c'est excellent :\n• Cible avec son problème exprimé (\"perdent des contrats\")\n• Bénéfice chiffré (2 minutes)\n• Contexte local intégré (Flooz, MTN MoMo)\n• Différenciation face au concurrent réel (logiciels étrangers inadaptés)\n\nLa troisième prend 3x plus de temps à lire — mais elle convertit 5x mieux."
        },
        {
          type: "concept",
          icon: "🧪",
          title: "Le test \"Grand-mère\" et le test \"Concurrent\"",
          content: "Deux tests rapides pour valider ton UVP :\n\n**Test Grand-mère** : Lis ton UVP à quelqu'un qui ne connaît rien à ton secteur. Si après 10 secondes elle peut te dire ce que tu fais et pour qui — elle est claire. Si elle te demande d'expliquer — simplifie.\n\n**Test Concurrent** : Remplace ton nom par celui d'un concurrent direct. Si l'UVP reste vraie pour lui aussi — elle n'est pas assez différenciante. Si elle sonne faux avec son nom — tu as trouvé quelque chose de réel.\n\n**Test Prix** : Après avoir lu ton UVP, quelqu'un de ta cible devrait se dire spontanément \"combien ça coûte ?\" — pas \"c'est quoi exactement ?\". Si la deuxième question arrive avant la première, ton UVP n'est pas encore assez claire sur le bénéfice."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Rédige ton UVP finale en utilisant le framework complet",
          placeholder: "Pour [ta persona précise — reprise de la tâche 4]\nqui [son problème principal en ses mots],\n[ton produit/service] est [catégorie]\nqui [bénéfice concret, si possible chiffré]\ncontrairement à [ce que ta cible utilise aujourd'hui].\n\nEnsuite : fais les 3 tests (Grand-mère, Concurrent, Prix) et note ici ce que tu as ajusté."
        },
        {
          type: "check",
          icon: "✅",
          question: "Quel est le format le plus efficace pour une UVP ?",
          options: [
            "\"Notre produit est le meilleur du marché grâce à notre technologie avancée\"",
            "\"Pour [cible précise] qui [problème], [produit] est [catégorie] qui [bénéfice] contrairement à [alternative actuelle]\"",
            "Une liste de 5 fonctionnalités clés accompagnées de leur prix",
          ],
          correctIndex: 1,
          explanation: "Le format en 4 parties est efficace précisément parce qu'il force à répondre aux 4 questions que se pose tout client potentiel : Est-ce que c'est pour moi ? Est-ce que ça résout mon problème ? Qu'est-ce que j'y gagne ? Pourquoi pas ce que j'utilise déjà ?\n\n\"Le meilleur du marché\" est une affirmation non vérifiable qui crée de la méfiance. Une liste de fonctionnalités parle à l'équipe produit, pas au client qui cherche à résoudre un problème concret."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"La différence entre une bonne idée et un bon business, c'est la clarté sur ce que tu offres à qui — et la capacité à l'expliquer en 30 secondes à un inconnu dans le bus.\" Si tu as ton UVP, tu as ton pitch de bus. Tout le reste en découle."
        }
      ]
    },
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
    course: {
      title: "Analyse concurrentielle — comprendre le terrain avant de te battre",
      readingTime: "6 min",
      steps: [
        {
          type: "concept",
          icon: "🗺️",
          title: "Pourquoi \"zéro concurrent\" est rarement une bonne nouvelle",
          content: "Beaucoup d'entrepreneurs présentent l'absence de concurrents comme une force : \"Je suis le premier sur ce marché !\"\n\nEn réalité, ça peut signifier trois choses très différentes :\n\n**Scénario 1 (rare, bon) :** Tu as découvert un vrai gap de marché que personne n'a encore adressé. Ça arrive, mais c'est exceptionnel.\n\n**Scénario 2 (fréquent, dangereux) :** Des gens ont essayé avant toi et ont échoué. Le marché n'est pas viable ou le timing est mauvais. Absence de concurrent = cimetière de startups précédentes.\n\n**Scénario 3 (très fréquent) :** Tu n'as pas cherché assez loin ou tu définis ton concurrent trop étroitement. Un concurrent n'est pas seulement quelqu'un qui fait la même chose — c'est toute alternative que ton client utilise aujourd'hui pour résoudre son problème.\n\nLe stylo est le concurrent de l'application de prise de notes. Le motocycliste taxi est le concurrent d'un service de livraison.\n\n**Avoir des concurrents prouve qu'il y a un marché.** C'est une bonne nouvelle, pas un problème."
        },
        {
          type: "concept",
          icon: "🔎",
          title: "Les 3 types de concurrents à identifier",
          content: "**1. Concurrents directs** : Ils proposent la même solution au même problème à la même cible. Si tu lances un service de nettoyage à domicile à Dakar, les autres services de nettoyage à Dakar sont tes concurrents directs. Ils sont les plus faciles à identifier.\n\n**2. Concurrents indirects** : Ils résolvent le même problème mais avec une approche différente. Si tu lances un service de livraison de repas, les restaurants où les gens mangent sur place sont des concurrents indirects. Ils capturent le même budget \"repas du midi\".\n\n**3. Concurrents de substitution** : Ce sont les comportements alternatifs. L'habitude de faire soi-même, de se débrouiller, ou de ne pas résoudre le problème du tout. Ce sont parfois tes concurrents les plus coriaces car ils ne coûtent rien au client.\n\nPour ton analyse : liste 1-2 de chaque catégorie. Cela te donne une vision complète de l'écosystème dans lequel tu entres."
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : analyse concurrentielle de PharmaGo à Cotonou",
          content: "Segun veut lancer PharmaGo — livraison de médicaments à domicile à Cotonou en 2h. Voici son analyse :\n\n**Concurrents directs :**\n• Jumia Food (a essayé la livraison de médicaments, abandonné en 2022 — à analyser : pourquoi ?)\n• Quelques pharmacies qui font de la livraison informelle via moto-taxi\n\n**Concurrents indirects :**\n• Les pharmacies de quartier (les gens se déplacent eux-mêmes)\n• Les proches (\"appelle ton cousin qui passe près de la pharmacie\")\n\n**Concurrents de substitution :**\n• Ne pas acheter le médicament parce que la démarche est trop compliquée\n• Acheter des médicaments au marché informel (moins chers, moins sûrs)\n\n**Ce que cette analyse lui apprend :**\n→ Jumia a échoué : il doit comprendre pourquoi (délais ? prix ? confiance ?)\n→ Le concurrent principal n'est pas une autre appli — c'est l'habitude d'envoyer un proche\n→ Sa différenciation doit adresser deux peurs : la confiance (vrais médicaments ?) et le délai (plus rapide que d'envoyer quelqu'un ?)"
        },
        {
          type: "concept",
          icon: "📊",
          title: "La grille d'analyse : 4 dimensions à comparer",
          content: "Pour chaque concurrent, analyse 4 dimensions :\n\n**Prix** : Combien facturent-ils ? Comment (abonnement, à l'acte, commission) ? Comment ça se compare au pouvoir d'achat de ta cible ?\n\n**Canaux** : Comment trouvent-ils leurs clients ? (réseaux sociaux, bouche à oreille, physique, appli) Comment livrent-ils ? Ces canaux sont-ils accessibles à ta cible ?\n\n**Points forts** : Ce qu'ils font bien. Sois honnête — ne sous-estime pas tes concurrents.\n\n**Points faibles** : Ce qui frustre leurs utilisateurs actuels. C'est là que tu trouves TON opportunité.\n\nLe plus précieux à chercher : les avis négatifs de leurs clients actuels. Sur Google, Facebook, les groupes WhatsApp locaux. Ce que les gens se plaignent de tes concurrents, c'est exactement ce que tu dois promettre de faire mieux."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Analyse tes 3 concurrents avec la grille complète",
          placeholder: "Concurrent 1 (direct) : [Nom]\n• Ce qu'il fait : \n• Prix : \n• Canal principal : \n• Point fort : \n• Point faible (ce que ses clients lui reprochent) : \n\nConcurrent 2 (indirect) : [Nom]\n• ...\n\nConcurrent 3 (substitution) : [Comportement alternatif]\n• ...\n\nConclusion : Quelle est la brèche que tu as identifiée — ce que personne ne fait assez bien aujourd'hui ?"
        },
        {
          type: "check",
          icon: "✅",
          question: "Pourquoi une analyse concurrentielle est-elle essentielle avant de lancer ?",
          options: [
            "Pour copier ce qui fonctionne chez les concurrents et éviter d'innover",
            "Pour comprendre le marché existant, trouver les gaps non adressés et affiner ton positionnement",
            "Elle n'est pas nécessaire si ton idée est vraiment innovante et qu'il n'y a pas de concurrents",
          ],
          correctIndex: 1,
          explanation: "L'analyse concurrentielle n'est pas là pour copier — c'est là pour apprendre du marché sans avoir à tout tester toi-même. Elle te donne :\n• La preuve que le marché existe (tes concurrents ont des clients)\n• Les erreurs à ne pas répéter (pourquoi certains ont échoué)\n• Les attentes de base que tu dois satisfaire (table stakes)\n• Les frustrations à exploiter (ton avantage différenciant)\n\nAbsence de concurrents n'est pas un avantage — c'est souvent le signal d'un marché non viable ou d'une recherche incomplète."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"Étudie tes concurrents avec le respect qu'on doit à un enseignant — ils ont déjà fait les erreurs coûteuses et trouvé ce qui fonctionne. Ton rôle est de faire mieux, pas de réinventer le marché de zéro.\""
        }
      ]
    },
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
    course: {
      title: "Estimer son marché — la méthode bottom-up sans données McKinsey",
      readingTime: "6 min",
      steps: [
        {
          type: "concept",
          icon: "📏",
          title: "TAM, SAM, SOM — les 3 cercles à connaître",
          content: "Quand un investisseur ou un partenaire te demande \"quelle est la taille de ton marché ?\" — il ne s'attend pas à un rapport de consulting. Il veut savoir si tu as réfléchi sérieusement.\n\nVoici les 3 niveaux :\n\n**TAM (Total Addressable Market)** : Tout le marché théorique si 100% des clients potentiels utilisaient ta solution. C'est le rêve maximal.\n\n**SAM (Serviceable Addressable Market)** : La portion du TAM que tu peux réellement servir avec ton modèle, ta géographie, ton canal. Tu vends à Dakar ? Ton SAM = le marché dakarois, pas le marché mondial.\n\n**SOM (Serviceable Obtainable Market)** : Ce que tu peux réalistement capturer dans les 2-3 prochaines années. Typiquement 1-10% du SAM pour une startup en démarrage.\n\nLe SOM, c'est ton vrai objectif de business. TAM et SAM montrent le potentiel — SOM montre l'ambition réaliste."
        },
        {
          type: "concept",
          icon: "🔢",
          title: "Bottom-up vs top-down : quelle méthode utiliser ?",
          content: "**Méthode top-down (déconseillée pour les startups early-stage en Afrique) :**\nPIB du pays × pourcentage du secteur = taille de marché\nProblème : les données macro-économiques africaines sont souvent obsolètes, mal segmentées, ou calculées sur des économies formelles qui excluent une large part de l'activité réelle.\n\n**Méthode bottom-up (recommandée) :**\nTu construis ton estimation depuis le bas — à partir de données granulaires que tu peux vérifier toi-même :\n\n`Nombre de clients potentiels × Fréquence d'achat par an × Prix unitaire = Taille de marché`\n\nPar exemple :\n• Combien y a-t-il de femmes entre 25-45 ans dans ma ville ?\n• Parmi elles, combien ont ce problème spécifique ?\n• Combien de fois par mois achèteraient-elles ma solution ?\n• À quel prix seraient-elles prêtes à payer ?\n\nCes données, tu peux les estimer avec des sources gratuites (ANSD, recensements, terrain) et du bon sens."
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : estimation bottom-up pour BobiBraid à Abidjan",
          content: "Koffi veut lancer BobiBraid — plateforme de mise en relation avec des tresseuses à domicile à Abidjan. Voici son estimation :\n\n**Étape 1 : Définir la cible**\nFemmes 18-45 ans à Abidjan : ~800 000 personnes (source : RGPH 2021, projection)\n\n**Étape 2 : Filtrer par problème réel**\n\"Qui fait des tresses régulièrement ET cherche une tresseuse ?\" → Il suppose 40% = 320 000 femmes\n\n**Étape 3 : Fréquence d'achat**\nTressage en moyenne 1 fois par mois = 12 fois/an\n\n**Étape 4 : Panier moyen**\nTressage simple : 3 000-8 000 FCFA. Il prend 5 000 FCFA en median.\n\n**Calcul SAM :**\n320 000 × 12 × 5 000 FCFA = **19,2 milliards FCFA/an** (~30M USD)\n\n**SOM à 3 ans :**\nAvec 3% de part de marché = **576 millions FCFA/an**\n(réaliste pour une startup avec 2-3 ans de croissance)\n\n**Validation :** Il croise avec d'autres signaux — nombre de tresseuses à Abidjan, concurrents actifs, volume des recherches sur les réseaux sociaux."
        },
        {
          type: "concept",
          icon: "🌍",
          title: "Sources de données gratuites pour l'Afrique de l'Ouest",
          content: "Pas besoin d'acheter des rapports à 5 000€. Ces sources sont gratuites et souvent meilleures :\n\n**Données démographiques :**\n• Résultats des recensements nationaux (ANSD Sénégal, INS Côte d'Ivoire, INSAE Bénin)\n• CIA World Factbook pour des estimations rapides\n• Worldometers.info pour les données en temps réel par ville\n\n**Données de marché :**\n• Rapports Afrique de la Banque Mondiale (gratuits)\n• GSMA Intelligence pour les données mobile/internet\n• Groupes Facebook et WhatsApp locaux (taille = proxy d'intérêt)\n\n**Validation terrain :**\n• Demander directement dans la rue à 10-20 personnes de ta cible\n• Observer le flux dans un lieu pertinent (marché, arrêt de bus)\n• Parler aux acteurs du secteur (grossistes, associations)\n\n**Règle d'or :** note tes hypothèses clairement. Une bonne estimation n'est pas celle qui a le bon chiffre — c'est celle dont les hypothèses sont transparentes et défendables."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Calcule ton marché avec la méthode bottom-up",
          placeholder: "Définis ta cible précise : [qui, où, quel problème]\n\nNombre estimé de clients potentiels : ___\nSource : ___\n\nFréquence d'achat (fois/an) : ___\n\nPrix unitaire moyen (FCFA) : ___\n\nTAM = ___ × ___ × ___ = ___ FCFA/an\nSAM (ta géographie/segment) = ___ FCFA/an\nSOM réaliste à 3 ans (___%) = ___ FCFA/an\n\nHypothèse la plus risquée de mon estimation : ___\nComment je pourrais la vérifier rapidement : ___"
        },
        {
          type: "check",
          icon: "✅",
          question: "Comment estimer un marché sans données officielles ?",
          options: [
            "C'est impossible sans études Nielsen ou McKinsey",
            "Par des estimations bottom-up : nombre de clients potentiels × fréquence × prix",
            "En copiant les chiffres du concurrent principal",
          ],
          correctIndex: 1,
          explanation: "L'estimation bottom-up est la méthode la plus fiable pour les marchés africains où les données macro sont incomplètes. Elle part de données granulaires accessibles (population cible par recensement, observations terrain, interviews) pour construire une taille de marché défendable.\n\nBonus : elle te force à réfléchir à qui exactement est ton client, combien de fois il achète, et à quel prix — ce qui affûte aussi ton positionnement produit."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"Un marché de 500 millions FCFA que tu as estimé toi-même, avec des hypothèses claires et vérifiables, vaut infiniment plus qu'un rapport qui dit '50 milliards' mais que tu ne sais pas défendre.\""
        }
      ]
    },
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
    course: {
      title: "Le Mom Test — comment mener des interviews qui révèlent la vérité",
      readingTime: "7 min",
      steps: [
        {
          type: "concept",
          icon: "🙅",
          title: "Pourquoi la plupart des interviews clients sont inutiles",
          content: "Voici comment se passe typiquement une \"interview client\" mal préparée :\n\nToi : \"J'ai une idée d'appli pour commander des repas. Tu l'utiliserais ?\"\nEux : \"Oui, bonne idée ! Tu sais, je commande souvent de la nourriture.\"\nToi : *(enthousiasmé)* \"Super ! Tu paierais combien ?\"\nEux : \"Ça dépend... Peut-être 2 000 FCFA par commande ?\"\n\nRésultat : tu rentes chez toi convaincu que ton idée est validée. Mais tu viens de recueillir des **opinions sur l'avenir** — pas des données sur le comportement réel.\n\n**Trois problèmes fondamentaux :**\n1. Les gens veulent être gentils — ils ne vont pas dire \"ton idée est nulle\"\n2. Les opinions sur le futur sont peu fiables — \"je ferai ça\" ≠ \"je fais ça\"\n3. La formulation de tes questions induit les réponses que tu veux entendre\n\nLe Mom Test (de Rob Fitzpatrick) est une méthode pour contourner ces biais."
        },
        {
          type: "concept",
          icon: "📖",
          title: "Les 3 règles du Mom Test",
          content: "Le principe central : pose des questions si bonnes que même ta maman ne pourrait pas te mentir — pas parce qu'elle veut être honnête, mais parce que tes questions ne lui donnent pas l'occasion de te faire plaisir.\n\n**Règle 1 : Parle de leur vie, pas de ton idée**\nNe présente jamais ton idée au début. Demande leur réalité actuelle.\nMauvais : \"Est-ce que tu achèterais une appli de livraison ?\"\nBon : \"Comment tu fais quand tu veux manger chez toi sans cuisiner ?\"\n\n**Règle 2 : Pose des questions sur le passé, pas sur le futur**\nLe passé est un fait. Le futur est une promesse que les gens ne tiendront pas forcément.\nMauvais : \"Est-ce que tu utiliserais ça ?\" (futur)\nBon : \"La dernière fois que tu as eu ce problème, qu'est-ce que tu as fait ?\" (passé)\n\n**Règle 3 : Écoute les comportements, pas les opinions**\nSi quelqu'un te dit qu'il a un problème mais n'a jamais rien fait pour le résoudre — c'est peut-être que le problème n'est pas assez douloureux. Les gens qui ont vraiment un problème cherchent activement des solutions, même imparfaites."
        },
        {
          type: "example",
          icon: "💡",
          title: "Bon vs mauvais guide d'entretien — exemple concret à Dakar",
          content: "Aminata veut lancer un service de garde d'enfants à domicile à Dakar. Voici deux versions de son guide :\n\n**VERSION MAUVAISE** (questions biaisées)\n❌ \"Si j'avais un service de garde d'enfants fiable, tu l'utiliserais ?\"\n❌ \"Combien tu serais prête à payer pour une nounou de confiance ?\"\n❌ \"Tu penses que la sécurité des enfants c'est important ?\"\n\nProblème : toutes ces questions induisent un \"oui\" poli.\n\n**VERSION CORRECTE** (Mom Test)\n✅ \"Comment tu gères la garde de tes enfants aujourd'hui ?\"\n✅ \"La dernière fois que tu avais besoin d'une garde d'urgence, qu'est-ce que tu as fait ?\"\n✅ \"Est-ce que tu as déjà cherché activement une solution ? Qu'est-ce que tu as trouvé ?\"\n✅ \"Qu'est-ce qui t'a empêché de résoudre ça complètement jusqu'ici ?\"\n✅ \"Si je disparaissais demain et que mon service n'existait pas, tu ferais quoi ?\"\n\n**Ce que la 2ème version révèle :**\n→ La vraie solution actuelle (souvent = demander à la famille)\n→ À quel point le problème est douloureux (ont-elles perdu des opportunités à cause de ça ?)\n→ Les vraies barrières (confiance ? prix ? disponibilité ?)"
        },
        {
          type: "concept",
          icon: "📝",
          title: "Structure d'un guide d'entretien en 5 phases",
          content: "**Phase 1 — Contexte (2 min)** : Comprendre qui est la personne en face.\n\"Parle-moi de toi — que fais-tu au quotidien ?\"\n\n**Phase 2 — Problème général (5 min)** : Explorer leur réalité sans mentionner ton idée.\n\"Dans ta journée/semaine, quelles sont les choses les plus difficiles ou frustrantes autour de [thème général] ?\"\n\n**Phase 3 — Comportements passés (10 min)** : Les questions Mom Test essentielles.\n\"La dernière fois que tu as eu [le problème], qu'est-ce que tu as fait ?\"\n\"As-tu essayé d'autres solutions ? Qu'est-ce qui n'a pas marché ?\"\n\"Combien de temps/argent ça t'a coûté ?\"\n\n**Phase 4 — Motivations profondes (5 min)** : Comprendre le \"pourquoi\".\n\"Si tu réglais ça complètement demain, qu'est-ce que ça changerait dans ta vie ?\"\n\n**Phase 5 — Recommandations (2 min)** : Clôture et signal d'intérêt réel.\n\"Est-ce que tu connais d'autres personnes qui vivent ce problème que je pourrais rencontrer ?\"\n(Si la personne donne des noms, c'est un signal fort d'intérêt.)"
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Rédige ton guide d'entretien de 5-7 questions",
          placeholder: "Problème que j'investigate : [ton hypothèse de départ]\n\nQuestion 1 (contexte) : \n\nQuestion 2 (comportement passé) : \n\nQuestion 3 (comportement passé) : \n\nQuestion 4 (solutions actuelles) : \n\nQuestion 5 (motivation profonde) : \n\nQuestion bonus (signal d'intérêt) : \n\n⚠️ Vérifie : est-ce que chaque question parle du PASSÉ et de leur VIE, pas de ton idée ?"
        },
        {
          type: "check",
          icon: "✅",
          question: "Quel est le principe clé du Mom Test pour les interviews clients ?",
          options: [
            "Parler à sa mère en premier car elle sera honnête",
            "Poser des questions sur le passé et les comportements réels, jamais sur les opinions ou le futur",
            "Toujours enregistrer les entretiens",
          ],
          correctIndex: 1,
          explanation: "Le Mom Test repose sur une vérité simple : les gens vous mentent sans le vouloir quand on leur demande des opinions sur l'avenir (\"tu l'utiliserais ?\") car ils veulent être gentils.\n\nEn posant des questions sur le passé (\"la dernière fois que...\") et les comportements réels (\"qu'est-ce que tu as fait ?\"), on recueille des faits vérifiables — pas des intentions polies.\n\nSignal le plus puissant : si quelqu'un te dit qu'il a un problème mais n'a JAMAIS rien fait pour le résoudre, ce problème n'est probablement pas assez douloureux pour payer pour une solution."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"Un bon guide d'entretien ne contient pas le mot 'solution' avant la toute dernière question. Les 80% du temps, tu écoutes — tu ne pitches pas.\""
        }
      ]
    },
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
    course: {
      title: "Conduire des interviews sans biais — l'art d'écouter vraiment",
      readingTime: "6 min",
      steps: [
        {
          type: "concept",
          icon: "⚠️",
          title: "Le biais de confirmation : l'ennemi numéro un de l'entrepreneur",
          content: "Tu as passé des semaines sur ton idée. Tu y crois profondément. Et maintenant tu vas parler à des gens pour \"valider\" — mais inconsciemment, ton cerveau cherche à confirmer ce qu'il veut entendre, pas à découvrir la vérité.\n\nC'est le **biais de confirmation** : la tendance à chercher, interpréter et mémoriser les informations qui confirment nos croyances préexistantes.\n\n**Comment il se manifeste en interview :**\n• Tu poses des questions suggestives : \"N'est-ce pas que c'est un vrai problème ?\"\n• Tu sur-interprètes les signaux positifs : un \"oui peut-être\" devient \"forte demande validée\"\n• Tu minimises les signaux négatifs : \"il n'a pas compris mon idée\"\n• Tu choisis des interviewés parmi des proches qui t'aiment\n• Tu arrêtes les interviews dès que tu as 2-3 \"oui\"\n\n**Le test du biais de confirmation :**\nSi après 5 interviews tu n'as rien appris de surprenant, tu n'as pas fait de vraies interviews — tu as fait une mise en scène de validation.\n\nUne vraie découverte terrain doit te surprendre, te remettre en question, voire t'inquiéter. C'est normal et c'est utile."
        },
        {
          type: "concept",
          icon: "🎯",
          title: "Qui interviewer — et qui éviter absolument",
          content: "**Qui interviewer :**\n• Des personnes qui correspondent précisément à ta persona (âge, situation, comportement)\n• Des personnes qui ont le problème que tu veux résoudre aujourd'hui — pas dans le futur\n• Des inconnus ou des semi-inconnus (pas ta famille, pas tes amis proches)\n• Des personnes qui utilisent déjà des solutions alternatives (elles sont les plus \"éduquées\" sur le problème)\n\n**Comment les trouver à Abidjan, Dakar, Lomé :**\n• Groupes Facebook et WhatsApp de ta niche (mères de famille, entrepreneurs, jeunes professionnels)\n• Associations et coopératives locales\n• Marchés et centres commerciaux fréquentés par ta cible\n• Demander à chaque interviewé de te recommander 2 personnes (effet boule de neige)\n• Universités, cafés, mosquées, églises — selon ta cible\n\n**Qui éviter :**\n❌ Ta famille et amis proches (trop biaisés en ta faveur)\n❌ D'autres entrepreneurs (ils pensent en solutions, pas en problèmes)\n❌ Des gens qui \"connaissent bien le sujet\" mais ne vivent pas le problème au quotidien\n❌ Des gens qui ont déjà entendu ton pitch"
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : 5 interviews qui ont changé un projet à Lomé",
          content: "Kofi voulait lancer une appli de gestion de budget pour les jeunes travailleurs à Lomé. Il pensait que le problème était \"les gens ne savent pas épargner\".\n\n**Ses 5 interviews ont révélé quelque chose de différent :**\n\n**Interview 1 — Akosua, secrétaire, 26 ans**\n\"Je sais exactement combien j'ai et combien je dépense. Le problème c'est que ma famille me demande de l'argent et je ne peux pas refuser.\"\n\n**Interview 2 — Mawuli, technicien, 31 ans**\n\"J'utilise déjà un carnet. L'appli, je l'aurais sur mon téléphone et mes collègues verraient que j'ai de l'argent. Ce n'est pas une bonne idée.\"\n\n**Interview 3 — Ama, commerçante, 29 ans**\n\"Mon problème c'est pas le budget — c'est le Mobile Money. J'ai 3 comptes différents et je ne sais jamais combien j'ai en tout.\"\n\n**Interview 4 — Yawo, chauffeur, 34 ans**\n\"Je mets de l'argent de côté en donnant à ma sœur. Elle garde pour moi. C'est mon système d'épargne.\"\n\n**Interview 5 — Edem, fonctionnaire, 28 ans**\n\"Le vrai problème : entre le 15 et le 30, j'ai plus rien. Pas à cause de mauvaise gestion — à cause des dépenses imprévues collectives [funérailles, baptêmes].\"\n\n**Ce que Kofi a appris :**\nSon hypothèse de départ était fausse. Le problème réel = **pression sociale sur l'argent** + **fragmentation des comptes Mobile Money** + **dépenses collectives imprévisibles**. Son appli de budget ne résoudrait rien de ça. Il a pivoté vers un outil de gestion d'épargne collective — bien plus adapté."
        },
        {
          type: "concept",
          icon: "📋",
          title: "Le protocole d'une interview réussie en 5 points",
          content: "**1. Prépare ton cadre**\nArrive avec ton guide de questions (pas un script — des thèmes). Prends de quoi écrire ou enregistre avec permission. Prévois 30-45 minutes.\n\n**2. Brise la glace correctement**\n\"Je ne teste pas un produit — j'essaie de comprendre comment tu vis [le problème]. Il n'y a pas de bonne ou mauvaise réponse. Ton honnêteté m'aide plus que ta politesse.\"\n\n**3. Pose tes questions, puis ferme la bouche**\nAprès chaque question, laisse 5 secondes de silence. Les gens remplissent le silence — et c'est là que les vraies informations sortent.\n\n**4. Capture les citations exactes**\nNote les mots exacts, pas ton interprétation. \"Je suis obligée\" ≠ \"elle préférerait\". Les citations mot pour mot sont tes données les plus précieuses.\n\n**5. Cherche activement à te faire contredire**\nPose toujours : \"Qu'est-ce qui t'empêcherait d'utiliser une solution comme ça ?\" ou \"Quelqu'un à qui tu as parlé a le même problème que toi ?\" Si personne ne connaît quelqu'un d'autre avec ce problème — signal d'alarme."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Documente tes 5 interviews — insights et surprises",
          placeholder: "Interview 1 — [Prénom, situation, âge approximatif]\nCitation clé : \"...\"\nSurprise ou apprentissage : \n\nInterview 2 — \nCitation clé : \"...\"\nSurprise : \n\nInterview 3 — \nCitation clé : \"...\"\nSurprise : \n\nInterview 4 — \nCitation clé : \"...\"\nSurprise : \n\nInterview 5 — \nCitation clé : \"...\"\nSurprise : \n\nCe que j'avais supposé mais qui s'est révélé faux ou plus nuancé :\nCe que je n'avais pas anticipé du tout :"
        },
        {
          type: "check",
          icon: "✅",
          question: "Quel biais cognitif est le plus dangereux lors des interviews clients ?",
          options: [
            "Le biais de disponibilité — se souvenir surtout des interviews récentes",
            "Le biais de confirmation — entendre ce qu'on veut entendre",
            "Le biais d'ancrage — fixer son prix trop tôt",
          ],
          correctIndex: 1,
          explanation: "Le biais de confirmation est particulièrement destructeur dans la recherche utilisateur parce qu'il opère de manière invisible. L'entrepreneur ne réalise pas qu'il biaise ses questions, sur-interprète les signaux positifs et ignore les négatifs.\n\nLe contrer :\n• Recherche activement les preuves que ton idée est mauvaise\n• Demande à quelqu'un d'autre d'analyser tes notes (un regard externe voit les biais)\n• Compte les signaux négatifs autant que les positifs\n• Si 5 interviews ne t'ont rien appris de nouveau — recommence avec de meilleures questions"
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"L'entrepreneur qui cherche à se faire réfuter apprend dix fois plus que celui qui cherche à se faire valider. La vérité inconfortable aujourd'hui vaut mieux que l'illusion confortable qui coûtera tout demain.\""
        }
      ]
    },
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
    course: {
      title: "Du terrain à la décision — synthétiser pour pivoter ou persévérer",
      readingTime: "5 min",
      steps: [
        {
          type: "concept",
          icon: "🔬",
          title: "Un insight ≠ une observation — la différence qui change tout",
          content: "Après tes interviews et ta recherche concurrentielle, tu as probablement une liste de notes, de citations, d'observations. Mais une liste de faits n'est pas une synthèse.\n\n**Observation** : \"3 interviewés sur 5 m'ont dit qu'ils envoient de l'argent à leur famille chaque mois.\"\n\n**Insight** : \"L'envoi d'argent à la famille est une obligation sociale incontournable qui capte 20-30% du revenu disponible des jeunes travailleurs — avant toute décision d'épargne ou de consommation. Toute solution financière qui ignore cette réalité sera adoptée puis abandonnée.\"\n\nUn insight :\n• Explique le POURQUOI derrière une observation\n• A des implications concrètes pour ton projet\n• Te surprend ou te force à reconsidérer quelque chose\n• Est actionnable — il peut changer une décision\n\nPour transformer une observation en insight, pose-toi : \"Et alors ? Qu'est-ce que ça implique pour mon projet ?\""
        },
        {
          type: "concept",
          icon: "🔀",
          title: "Continuer, pivoter ou arrêter — un cadre de décision clair",
          content: "Après ta recherche, tu dois prendre une décision. Voici comment l'aborder honnêtement :\n\n**Continuer (même direction) si :**\n✓ Le problème est réel et douloureux (les gens ont essayé de le résoudre eux-mêmes)\n✓ Ta solution adresse le vrai problème découvert (pas ton hypothèse initiale)\n✓ Les clients cibles sont identifiés et atteignables\n✓ Il existe un modèle de revenus plausible\n\n**Pivoter (même problème, solution différente) si :**\n↺ Le problème est réel mais ta solution n'est pas la bonne approche\n↺ La cible est différente de ce que tu pensais\n↺ Le canal ou le modèle économique doit changer\n↺ Tu as découvert un problème adjacent plus important\n\n**Arrêter si :**\n✗ Le problème n'est pas assez douloureux pour que les gens paient\n✗ La concurrence est trop établie sans avantage différenciant clair\n✗ Le marché adressable est trop petit pour un business viable\n✗ Tu n'as aucune envie de travailler là-dessus encore 5 ans\n\nArrêter n'est pas un échec — c'est de l'intelligence. Mieux vaut 2 semaines de recherche terrain que 2 ans sur un projet non viable."
        },
        {
          type: "example",
          icon: "💡",
          title: "Cas concret : synthèse et pivot à Bamako",
          content: "Mariam voulait lancer une plateforme de cours en ligne pour lycéens à Bamako. Après 5 interviews et son analyse concurrentielle, voici sa synthèse :\n\n**Ses 3 insights :**\n\n**Insight 1** : Le problème réel n'est pas l'accès aux cours — c'est la préparation aux examens du BAC. Les lycéens ont accès à beaucoup de contenu (YouTube, groupes WhatsApp) mais pas à des annales commentées et des simulateurs d'examens.\n\n**Insight 2** : Les parents (payeurs) font confiance uniquement aux professeurs identifiés. \"Une appli inconnue\" = méfiance. Mais \"le Prof Diallo que mon fils connaît via une appli\" = accepté.\n\n**Insight 3** : La connectivité est un vrai frein — 3 interviewés sur 5 ont des données mobiles rationnées. Contenu téléchargeable = critère éliminatoire si absent.\n\n**Sa décision : Pivot partiel**\n→ Garde : lycéens à Bamako, préparation aux examens\n→ Change : focus uniquement sur les annales BAC commentées + simulateurs hors ligne\n→ Ajoute : système où les enseignants réels peuvent publier (confiance + contenu local)\n\n**Ce qu'elle aurait perdu sans cette étape :** 6 mois à développer une plateforme de vidéos en ligne que personne n'aurait pu utiliser sans wifi."
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Synthèse finale — tes 3 insights et ta décision",
          placeholder: "Insight 1 (observation → implication pour mon projet) :\nObservation : ...\nImplication : ...\n\nInsight 2 :\nObservation : ...\nImplication : ...\n\nInsight 3 :\nObservation : ...\nImplication : ...\n\nMon hypothèse initiale qui s'est révélée fausse ou incomplète :\n\nMa décision : [ ] Continuer  [ ] Pivoter  [ ] Arrêter\n\nPourquoi (arguments concrets, pas émotionnels) :\n\nSi pivot — qu'est-ce qui change exactement :"
        },
        {
          type: "check",
          icon: "✅",
          question: "Qu'est-ce qu'un pivot en entrepreneuriat ?",
          options: [
            "Abandonner complètement son projet et recommencer de zéro",
            "Un changement structuré de stratégie tout en conservant les apprentissages acquis",
            "Changer de nom d'entreprise pour relancer la communication",
          ],
          correctIndex: 1,
          explanation: "Un pivot conserve les apprentissages — c'est sa force. Tu ne jettes pas les interviews, l'analyse concurrentielle, la compréhension du problème. Tu changes quelque chose de précis : la cible, la solution, le canal, ou le modèle de revenus.\n\nExemples de pivots célèbres :\n• Instagram : app de check-in géolocalisé → app de partage de photos\n• Slack : outil interne d'une startup de jeux → plateforme de communication d'entreprise\n• PayPal : paiement entre PalmPilots → paiement par email\n\nDans chaque cas : le problème de fond (coordination, paiement) est resté. La solution a changé suite aux données terrain.\n\nArrêter n'est pas un échec non plus — c'est une décision rationnelle basée sur des données."
        },
        {
          type: "takeaway",
          icon: "🎯",
          content: "\"Un proverbe akan dit : 'Ce n'est pas parce qu'on a commencé à couper un arbre qu'on doit finir de l'abattre s'il est le mauvais.' La vraie bravoure est de pivoter au bon moment — pas de persévérer aveuglément.\""
        }
      ]
    },
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
