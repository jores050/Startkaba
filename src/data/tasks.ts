import type { Task } from "@/types";

export const tasks: Task[] = [
  // --- Niveau 1 (format Duolingo) ---
  {
    id: 101,
    levelId: 1,
    title: "Rédige ton idée en une phrase claire",
    description:
      "Sans jargon, sans \"révolutionnaire\". Une phrase simple que tu pourrais dire à ta grand-mère. Si elle comprend, tu es sur la bonne voie.",
    xp: 50,
    lesson: {
      title: "La proposition de valeur — construite brique par brique",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "🎯",
          title: "Qu\'est-ce qu\'une proposition de valeur ?",
          content: "C\'est la réponse à \"Pourquoi toi et pas les autres ?\" Elle tient en une phrase : qui est ton client, quel problème tu résous, et quel bénéfice concret tu apportes. Pas un slogan. Pas une liste de fonctionnalités. Une promesse claire.",
          xp: 5,
        },
        // 1 — MCQ : enseigne "qui précis"
        {
          type: "mcq",
          question: "Laquelle de ces descriptions de client est la plus précise pour une UVP ?",
          options: [
            "Les gens qui ont besoin d\'un service rapide.",
            "Les jeunes entrepreneurs africains.",
            "Les employés de bureau d\'Abidjan Plateau qui déjeunent sur place faute de temps.",
          ],
          correctIndex: 2,
          explanation: "La 3ème cible une situation précise : lieu (Abidjan Plateau), statut (employés de bureau), contrainte réelle (déjeuner sur place). Plus c\'est précis, plus ton client se reconnaît — et plus il se dit \"c\'est fait pour moi\".",
          xp: 8,
        },
        // 2 — Micro-input : brique "qui"
        {
          type: "micro_input",
          prompt: "Et ton client à toi — décris-le aussi précisément que l\'exemple : qui est-il, où est-il, dans quelle situation ?",
          placeholder: "Ex : les mamans de Dakar Plateau qui travaillent et n\'ont pas le temps de cuisiner le soir...",
          storageKey: "qui",
          xp: 2,
        },
        // 3 — Scénario : enseigne "vrai problème vs symptôme"
        {
          type: "scenario",
          context: "Aïcha veut lancer une appli de livraison de repas. Elle pense que le problème de ses clients est : \"Il n\'y a pas d\'appli pratique pour commander à manger.\" Mais après avoir parlé à 10 collègues, elle entend surtout : \"Je perds presque une heure chaque midi à chercher où manger et à faire la queue.\"",
          question: "Quel est le VRAI problème qu\'Aïcha doit résoudre ?",
          options: [
            "L\'absence d\'une bonne application mobile.",
            "Perdre 45-60 minutes chaque midi à cause de la restauration.",
            "Le manque de restaurants près des bureaux.",
          ],
          correctIndex: 1,
          explanation: "\"Pas d\'appli\" est le symptôme — la solution qu\'Aïcha imagine. Le vrai problème, c\'est le temps perdu. Une bonne UVP nomme le problème réel du client, pas l\'absence de ta solution. Si tu résous le temps perdu, l\'appli n\'est qu\'un moyen parmi d\'autres.",
          xp: 8,
        },
        // 4 — Micro-input : brique "probleme"
        {
          type: "micro_input",
          prompt: "Quel est le VRAI problème que vit ton client — pas \"il manque ma solution\", mais la douleur concrète au quotidien ?",
          placeholder: "Ex : passe 2h par semaine à chercher un artisan fiable et se fait souvent escroquer...",
          storageKey: "probleme",
          xp: 2,
        },
        // 5 — Info : les 4 caractéristiques
        {
          type: "info",
          icon: "✏️",
          title: "Les 4 caractéristiques d\'une UVP puissante",
          content: "Claire : ta grand-mère comprend en 10 secondes. Spécifique : s\'adresse à une cible précise, pas à tout le monde. Différenciante : explique en quoi tu te distingues des alternatives. Orientée bénéfice : parle du résultat pour le client, pas de ta technologie.",
          xp: 5,
        },
        // 6 — Scénario : enseigne "bénéfice unique concret + différenciant"
        {
          type: "scenario",
          context: "Kofi à Lomé veut lancer un service de réparation de smartphones. Il hésite entre trois formulations.",
          question: "Laquelle formule le bénéfice de façon unique, concrète ET différenciante ?",
          options: [
            "Kofi Tech : réparation professionnelle avec techniciens certifiés.",
            "Réparation rapide et fiable de tous types d\'appareils à Lomé.",
            "Ton smartphone réparé en 2h — garanti 6 mois ou remboursé.",
          ],
          correctIndex: 2,
          explanation: "La 3ème gagne : délai précis (2h), garantie béton (6 mois), engagement fort (remboursé). C\'est mémorable et vérifiable. \"Professionnel\" et \"rapide\" sont des mots que tout concurrent peut copier — une promesse chiffrée, non.",
          xp: 8,
        },
        // 7 — Micro-input : brique "benefice"
        {
          type: "micro_input",
          prompt: "Quel est TON bénéfice unique — concret, si possible chiffré, et difficile à copier pour un concurrent ?",
          placeholder: "Ex : livrée en 20 min chrono dans ton quartier, garantie fraîcheur ou on recommence...",
          storageKey: "benefice",
          xp: 2,
        },
        // 8 — True/false
        {
          type: "true_false",
          statement: "Une bonne UVP liste toutes les fonctionnalités de ton produit pour montrer sa richesse.",
          isTrue: false,
          explanation: "Faux. Une UVP parle d\'un seul bénéfice central, vu du côté client. \"Livraison en 30 min\" (bénéfice) convainc infiniment mieux que \"application avec tracking GPS, notifications push et paiement Mobile Money intégré\" (fonctionnalités). Moins c\'est plus.",
          xp: 5,
        },
        // 9 — Reflection template : assemblage final
        {
          type: "reflection_template",
          intro: "Voilà — tu as déjà tout construit ! Tes trois briques forment maintenant ta proposition de valeur. Relis, ajuste les mots si besoin, et c\'est ta vraie UVP.",
          template: "Pour {qui}, qui {probleme}, mon idée apporte {benefice}.",
          variables: ["qui", "probleme", "benefice"],
          xp: 5,
        },
      ],
    },
  },
  {
    id: 102,
    levelId: 1,
    title: "Liste 3 raisons personnelles profondes",
    description:
      "Pourquoi TU dois faire ça ? Pas \"parce que c\'est rentable\" — mais pourquoi toi, avec ton histoire, tes expériences, tu es la bonne personne pour ce projet.",
    xp: 50,
    lesson: {
      title: "Ton moteur intérieur — pourquoi toi, pourquoi maintenant",
      exercises: [
        {
          type: "info",
          icon: "🔥",
          title: "Pourquoi les raisons profondes comptent autant que l\'idée",
          content: "La plupart des startups ne meurent pas à cause d\'une mauvaise idée — elles meurent parce que le fondateur a abandonné au premier moment difficile. \'Parce que c\'est rentable\' ne suffit pas quand tu n\'as pas dormi depuis 3 jours et que ton premier client demande un remboursement.",
          xp: 5,
        },
        {
          type: "mcq",
          question: "Parmi ces motivations, laquelle est la plus durable sur 5 ans ?",
          options: [
            "Gagner beaucoup d\'argent rapidement.",
            "Résoudre un problème que j\'ai personnellement vécu et que je connais de l\'intérieur.",
            "Suivre une tendance de marché actuelle.",
          ],
          correctIndex: 1,
          explanation: "La motivation \'problème personnel\' est la plus durable parce qu\'elle ne dépend pas de facteurs externes. Les entrepreneurs qui ont vécu le problème ont une compréhension profonde de la douleur de leurs clients — et ça ne se simule pas. Les deux autres s\'effondrent au premier obstacle.",
          xp: 10,
        },
        {
          type: "true_false",
          statement: "Si ton idée ne te passionne pas complètement dès le départ, tu ne devrais pas la poursuivre.",
          isTrue: false,
          explanation: "Faux. La passion peut venir après la maîtrise et les premiers succès. Ce qui compte : es-tu motivé par le PROBLÈME que tu veux résoudre ? Certains grands entrepreneurs n\'aimaient pas leur secteur au départ mais croyaient profondément à l\'impact qu\'ils pouvaient avoir.",
          xp: 5,
        },
        {
          type: "info",
          icon: "⚡",
          title: "L\'Ikigai entrepreneurial : trouver ton intersection",
          content: "4 cercles qui, à leur intersection, créent un projet durable : ce que tu AIMES faire, ce en quoi tu es BON (prouvé), ce dont le monde a BESOIN (quelqu\'un paie pour ça), ce pour quoi on te PAIERA. Manquer un cercle, c\'est construire sur du sable.",
          xp: 5,
        },
        {
          type: "scenario",
          context: "Moussa à Bamako a 3 idées. Idée 1 : livraison de médicaments (marché évident, mais aucune connexion avec le secteur santé). Idée 2 : formation Excel pour PME (il a 8 ans de comptabilité, il connaît exactement les lacunes). Idée 3 : appli de dating (il a vu que ça marche en Europe).",
          question: "Quelle idée a le meilleur alignement motivation + compétence + marché ?",
          options: [
            "Idée 1 — le marché de la santé est le plus large en Afrique.",
            "Idée 2 — il connaît le problème de l\'intérieur, a les compétences, et le marché PME est réel.",
            "Idée 3 — les tendances internationales arrivent toujours en Afrique.",
          ],
          correctIndex: 1,
          explanation: "Idée 2 est l\'alignement parfait : Moussa a vécu le problème (8 ans à voir les PME galèrer avec Excel), il a la compétence technique, et il connaît ses futurs clients. C\'est exactement ce que les investisseurs et les clients recherchent : l\'expert du problème.",
          xp: 15,
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Écris tes 3 raisons profondes",
          placeholder: "Raison 1 (vécu personnel) : Quelle expérience dans ta vie t\'a montré que ce problème est réel et important pour toi ?\n\nRaison 2 (compétence) : Qu\'est-ce que tu sais faire — prouvé par des expériences passées — qui te rend particulièrement apte à résoudre ce problème ?\n\nRaison 3 (mission) : Si ton projet réussit dans 5 ans, qu\'est-ce qui change concrètement dans la vie des gens que tu sers ?",
          xp: 10,
        },
      ],
    },
  },
  {
    id: 103,
    levelId: 1,
    title: "Identifie 5 problèmes concrets que ton idée résout",
    description:
      "Pas des fonctionnalités — des problèmes. \"Les gens perdent du temps à...\" plutôt que \"Mon app permet de...\"",
    xp: 75,
    lesson: {
      title: "Penser problème, pas solution — la discipline qui sauve les startups",
      exercises: [
        {
          type: "info",
          icon: "🔍",
          title: "Le piège de la solution",
          content: "La plupart des entrepreneurs passent leurs premières semaines à décrire leur produit. C\'est l\'erreur classique de quelqu\'un amoureux de sa solution. Tu peux construire quelque chose de techniquement parfait qui ne résout aucun problème que les gens sont prêts à payer pour résoudre.",
          xp: 5,
        },
        {
          type: "mcq",
          question: "Yao dit : \'Je veux créer une appli de gestion de boutique car les outils existants sont mauvais.\' Quel est le problème avec cette approche ?",
          options: [
            "Il devrait d\'abord vérifier si des applis similaires existent déjà.",
            "Il part d\'une solution (appli) pas d\'un problème (ce que vivent les propriétaires de boutiques).",
            "Les outils existants sont peut-être bons — il ne les a pas assez étudiés.",
          ],
          correctIndex: 1,
          explanation: "Yao part d\'une solution technique et cherche à la justifier. Le bon point de départ : \'Qu\'est-ce qui frustre vraiment les propriétaires de boutiques au quotidien ?\' La réponse pourrait mener à une appli — ou à une formation, un service, ou autre chose entièrement.",
          xp: 10,
        },
        {
          type: "true_false",
          statement: "Un bon entrepreneur doit avoir une idée de solution précise avant de commencer ses recherches.",
          isTrue: false,
          explanation: "Faux. Les meilleurs entrepreneurs commencent par observer un problème réel, l\'étudient en profondeur, et laissent la solution émerger des données terrain. Airbnb n\'a pas commencé par \'créons une plateforme\' — ils ont commencé par \'nous n\'avons pas d\'argent pour le loyer, des gens ont des chambres vides\'.",
          xp: 5,
        },
        {
          type: "info",
          icon: "🌳",
          title: "La méthode des 5 Pourquoi",
          content: "Inventée chez Toyota : à chaque réponse, tu poses un nouveau \'Pourquoi ?\' jusqu\'à 5 fois pour atteindre la cause racine. \'Mes clients annulent\' → Pourquoi ? → \'Livraisons en retard\' → Pourquoi ? → \'Fournisseurs imprévisibles\' → Pourquoi ? → Voilà le vrai problème à résoudre.",
          xp: 5,
        },
        {
          type: "fill_blank",
          template: "La méthode des 5 Pourquoi part du {0} visible pour atteindre la {1} racine du problème.",
          blanks: ["symptôme", "cause"],
          isOpenAnswer: false,
          xp: 10,
        },
        {
          type: "scenario",
          context: "Moussa à Bamako remarque que les commerçants du marché Médine perdent beaucoup de marchandise périmée. Après 5 Pourquoi : ils commandent trop → ne savent pas ce qui se vend → pas de registre de ventes → trop compliqué → ça prend 1h par soir.",
          question: "Quelle est la vraie solution que Moussa devrait développer ?",
          options: [
            "Un système de réfrigération pour allonger la durée de vie des marchandises.",
            "Un outil de suivi des ventes qui prend moins de 5 minutes par jour.",
            "Une formation sur la gestion des stocks pour les commerçants.",
          ],
          correctIndex: 1,
          explanation: "La cause racine est le temps (1h/soir trop long). La 2ème adresse exactement ça : rendre le suivi rapide. La réfrigération et la formation adressent des symptômes, pas la cause. C\'est la puissance des 5 Pourquoi : éviter de résoudre le mauvais problème.",
          xp: 15,
        },
        {
          type: "reorder",
          items: [
            "Observer une frustration répétée chez des personnes réelles",
            "Poser \'Pourquoi ?\' pour aller plus loin que le symptôme",
            "Répéter jusqu\'à trouver une cause qu\'on peut réellement traiter",
            "Reformuler le problème avec précision (qui, quoi, conséquence)",
            "Valider que d\'autres personnes ont le même problème",
          ],
          xp: 10,
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Quel est le vrai problème que tu veux résoudre ?",
          placeholder: "Commence par le symptôme, puis applique les 5 Pourquoi :\n\nSymptôme observé : ...\nPourquoi ? → ...\nPourquoi ? → ...\nPourquoi ? → ...\nPourquoi ? → ...\nPourquoi ? → ...\n\nCause racine identifiée : ...\n\nFormulation finale du problème :\n\'Les [qui] qui [contexte] ont du mal à [quoi] parce que [cause racine], et ça leur coûte [conséquence].\'",
          xp: 15,
        },
      ],
    },
  },
  {
    id: 104,
    levelId: 1,
    title: "Décris ton client idéal",
    description: "Qui est-il, où vit-il, que fait-il ? Sois précis : âge, ville, revenus, habitudes, frustrations quotidiennes.",
    xp: 100,
    lesson: {
      title: "Construire ta persona — mettre un visage sur ton marché",
      exercises: [
        {
          type: "info",
          icon: "👤",
          title: "Qu\'est-ce qu\'une persona ?",
          content: "Un personnage semi-fictif qui représente ton client idéal — avec un nom, une histoire, des habitudes et des frustrations précises. Sans persona précise, tu construis pour tout le monde, ce qui veut dire pour personne. Elle guide chaque décision : produit, prix, canal, message.",
          xp: 5,
        },
        {
          type: "mcq",
          question: "À quoi sert concrètement une persona dans la création d\'un business ?",
          options: [
            "À définir le nom et le logo de ton entreprise.",
            "À prendre des décisions de produit, de prix et de communication alignées avec un vrai client.",
            "À estimer la taille totale de ton marché.",
          ],
          correctIndex: 1,
          explanation: "La persona guide toutes les micro-décisions : \'Ma persona utilise WhatsApp ou Instagram ?\', \'Elle préfère payer avant ou après ?\', \'Elle lit les descriptions longues ?\'. Sans réponses précises à ces questions, tu dépenses ton argent sur les mauvais canaux.",
          xp: 10,
        },
        {
          type: "true_false",
          statement: "Plus ta persona est large (ex: \'femmes 18-45 ans\'), plus tu touches de clientes potentielles.",
          isTrue: false,
          explanation: "Faux. Une persona trop large = message trop générique = personne ne se reconnaît. \'Mamans de 28-38 ans à Lomé qui travaillent et cherchent des solutions de garde fiables pour moins de 15 000 FCFA/semaine\' est bien plus puissant. La précision permet un message qui résonne vraiment.",
          xp: 5,
        },
        {
          type: "info",
          icon: "🗂️",
          title: "Les 6 dimensions d\'une persona complète",
          content: "Démographique (âge, ville, situation familiale), Professionnel (métier, revenus approximatifs), Comportemental (habitudes mobile, achat), Frustrations (ce qui l\'énerve dans les solutions actuelles), Motivations (ce qu\'il/elle veut vraiment), Médias (WhatsApp ? Facebook ? Terrain ?).",
          xp: 5,
        },
        {
          type: "mcq",
          question: "Quelle est la source de données la plus fiable pour construire une persona ?",
          options: [
            "Ton intuition — tu connais bien ton secteur.",
            "Des interviews réelles avec 5-10 personnes de ta cible.",
            "Les données démographiques nationales de ton pays.",
          ],
          correctIndex: 1,
          explanation: "Les interviews réelles révèlent ce que les gens ne disent pas : comportements réels, vraies frustrations, mots exacts qu\'ils utilisent. L\'intuition biaise, les stats nationales sont trop macro. Une persona construite sur des citations réelles est une arme — une persona imaginée est une illusion.",
          xp: 10,
        },
        {
          type: "scenario",
          context: "Fatou vend des pagnes au marché d\'Adidogomé à Lomé. 32 ans, 2 enfants, utilise WhatsApp Business, gère son stock sur carnet (abandonne souvent après 2 semaines). Revenu : 180-250k FCFA/mois. Frustration principale : ne sait jamais combien elle a gagné à la fin du mois.",
          question: "Quel produit correspond le mieux à la persona de Fatou ?",
          options: [
            "Une formation en comptabilité de 3 jours à 50 000 FCFA.",
            "Un bot WhatsApp où elle note ses ventes en 10 secondes par message vocal.",
            "Un logiciel de comptabilité complet sur PC.",
          ],
          correctIndex: 1,
          explanation: "Fatou utilise WhatsApp, abandonne les solutions qui demandent trop d\'effort (cahier = abandon), et a besoin de rapidité. Le bot WhatsApp correspond exactement à ses habitudes et à sa contrainte. Formation = trop cher et long, PC = hors de son usage quotidien.",
          xp: 15,
        },
        {
          type: "fill_blank",
          template: "Une persona efficace décrit un client {0} — pas un groupe {1}. Elle est construite sur des {2} réelles, pas sur des {3}.",
          blanks: ["précis", "vague", "données", "suppositions"],
          isOpenAnswer: false,
          xp: 10,
        },
        {
          type: "match",
          pairs: [
            { left: "Démographique", right: "Âge, ville, situation familiale" },
            { left: "Comportemental", right: "Habitudes d\'achat et canal digital préféré" },
            { left: "Frustrations", right: "Ce que la solution actuelle ne résout pas" },
            { left: "Motivations", right: "Ce qu\'il veut vraiment accomplir dans sa vie" },
          ],
          xp: 10,
        },
        {
          type: "mcq",
          question: "Tu as 2 personas. A = \'femmes entrepreneurs à Dakar\'. B = \'femmes dirigeantes de PME 3-15 employés à Dakar Plateau, 30-45 ans, qui gèrent leur compta sur Excel et perdent 1h/jour à corriger des erreurs\'. Laquelle est utilisable ?",
          options: [
            "A — elle couvre plus de clientes potentielles.",
            "B — elle est assez précise pour guider les décisions produit et communication.",
            "Les deux sont équivalentes.",
          ],
          correctIndex: 1,
          explanation: "B est la seule utilisable. Avec A, impossible de savoir où les trouver, quel message leur envoyer, quel prix elles accepteront. Avec B : elles sont sur LinkedIn Dakar et dans les réseaux PME, le message est \'finissez avec Excel\', le prix peut se calculer à partir de l\'heure perdue.",
          xp: 10,
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Construis ta persona principale en 6 dimensions",
          placeholder: "Prénom fictif + âge : ...\n\n📍 Démographique (ville, quartier, situation familiale) :\n💼 Professionnel (métier, revenus approximatifs en FCFA) :\n📱 Comportemental (mobile, habitudes d\'achat, canal préféré) :\n😤 Frustrations (3 choses qui l\'énervent dans les solutions actuelles) :\n🎯 Motivation profonde (ce qu\'elle/il veut vraiment) :\n📢 Médias (WhatsApp ? Facebook ? Terrain ? Radio ?) :\n\nUne citation typique qu\'il/elle dirait sur son problème :",
          xp: 20,
        },
      ],
    },
  },
  {
    id: 105,
    levelId: 1,
    title: "Rédige ta Proposition de Valeur Unique",
    description: "En 2 phrases : pour qui, quel problème tu résous, pourquoi tu es différent. C\'est le cœur de tout le reste.",
    xp: 150,
    lesson: {
      title: "L\'UVP — l\'arme de communication la plus puissante de ton business",
      exercises: [
        {
          type: "info",
          icon: "💎",
          title: "UVP vs proposition de valeur : la différence clé",
          content: "Ta proposition de valeur définit ce que tu offres (interne). Ton UVP est la formulation externe, la phrase que tu dis à un client : \'Pourquoi moi ?\' Elle doit déclencher \'Ah, c\'est exactement ce qu\'il me faut !\' — pas \'c\'est intéressant\'. Si c\'est intéressant, c\'est pas assez fort.",
          xp: 5,
        },
        {
          type: "mcq",
          question: "Quel est l\'objectif principal d\'une bonne UVP ?",
          options: [
            "Expliquer toutes les fonctionnalités de ton produit en détail.",
            "Déclencher chez le client idéal la pensée : \'c\'est exactement pour moi\'.",
            "Te différencier de 100% de tes concurrents sur tous les points.",
          ],
          correctIndex: 1,
          explanation: "Une UVP n\'a pas besoin d\'expliquer tout le produit. Son objectif est précis : faire en sorte que la bonne personne se reconnaisse immédiatement et veuille en savoir plus. Un médecin qui lit \'pour les médecins débordés qui veulent faire des ordonnances en 30 secondes\' clique — même sans savoir comment ça marche.",
          xp: 15,
        },
        {
          type: "true_false",
          statement: "Une UVP qui plaît à tout le monde est une UVP efficace.",
          isTrue: false,
          explanation: "Faux. Une UVP qui plaît à tout le monde ne choisit pas — et ne résonne fort pour personne. Les meilleures UVP polarisent : elles font dire \'c\'est exactement pour moi\' à certains et \'ça ne me concerne pas\' à d\'autres. C\'est le signe qu\'elles sont suffisamment précises.",
          xp: 5,
        },
        {
          type: "info",
          icon: "🏗️",
          title: "Le framework en 4 parties",
          content: "Structure éprouvée : \'Pour [CIBLE PRÉCISE] qui [PROBLÈME PRINCIPAL], [PRODUIT/SERVICE] est [CATÉGORIE] qui [BÉNÉFICE UNIQUE] contrairement à [ALTERNATIVE ACTUELLE].\' Chaque partie élimine quelqu\'un — et c\'est une bonne chose. La précision, c\'est de la force.",
          xp: 10,
        },
        {
          type: "fill_blank",
          template: "Une bonne UVP doit être comprise en moins de {0} secondes, et dire en quoi tu es {1} des alternatives existantes.",
          blanks: ["10", "différent"],
          isOpenAnswer: false,
          xp: 15,
        },
        {
          type: "scenario",
          context: "Bintou à Dakar lance un service de coiffure à domicile. Elle hésite entre 3 formulations.",
          question: "Quelle UVP est la plus efficace ?",
          options: [
            "Bintou Hair : services de coiffure professionnelle à domicile de qualité.",
            "Je me déplace chez toi à Dakar pour te coiffer en 2h, sans rendez-vous raté ni taxi à prendre.",
            "La coiffure réinventée pour la femme moderne africaine qui a du goût.",
          ],
          correctIndex: 1,
          explanation: "La 2ème est concrète et résout un vrai problème (rendez-vous ratés, trajet). La 1ère est vague (\'qualité\' dit tout le monde). La 3ème est poétique mais vide — \'femme moderne avec du goût\' ne dit rien sur le problème résolu. Une cliente qui lit la 2ème dit immédiatement \'j\'en ai marre des rendez-vous ratés\'.",
          xp: 20,
        },
        {
          type: "match",
          pairs: [
            { left: "\'La meilleure appli du marché\'", right: "Affirmation invérifiable" },
            { left: "\'Pour les entrepreneurs africains\'", right: "Cible trop large" },
            { left: "\'Optimise votre expérience\'", right: "Bénéfice vague" },
            { left: "\'Notre technologie révolutionnaire\'", right: "Parle solution, pas bénéfice" },
          ],
          xp: 15,
        },
        {
          type: "reorder",
          items: [
            "Définir la cible précise (pour qui exactement)",
            "Identifier le problème douloureux (ce que le client souffre)",
            "Formuler le bénéfice concret et mesurable (ce qu\'il gagne)",
            "Nommer le différenciateur vs alternatives actuelles",
            "Tester avec une vraie personne de la cible",
          ],
          xp: 15,
        },
        {
          type: "mcq",
          question: "Comment tester si ton UVP est assez forte ?",
          options: [
            "La montrer à des proches et compter les \'j\'aime bien\'.",
            "La dire à quelqu\'un de ta cible et mesurer sa première réaction et question.",
            "La comparer aux UVP de tes 3 principaux concurrents.",
          ],
          correctIndex: 1,
          explanation: "Le vrai test : ta cible entend ton UVP et dit \'comment tu fais ça ?\' ou \'c\'est exactement mon problème !\' — signe d\'intérêt réel. Si la réaction est polie mais neutre, ce n\'est pas encore assez précis. Les proches sont trop bienveillants — cherche des inconnus qui correspondent à ta cible.",
          xp: 10,
        },
        {
          type: "info",
          icon: "🧪",
          title: "Le test Grand-mère et le test Concurrent",
          content: "Test Grand-mère : lis ton UVP à quelqu\'un hors du secteur. Si elle comprend en 10 secondes ce que tu fais et pour qui — elle est claire. Test Concurrent : remplace ton nom par celui d\'un concurrent. Si l\'UVP reste vraie pour lui aussi — elle n\'est pas assez différenciante.",
          xp: 5,
        },
        {
          type: "reflection",
          icon: "🤔",
          question: "Rédige ton UVP finale en utilisant le framework complet",
          placeholder: "\'Pour [ta persona précise — reprise de la tâche 4]\nqui [son problème principal en ses mots],\n[ton produit/service] est [catégorie]\nqui [bénéfice concret, si possible chiffré]\ncontrairement à [ce que ta cible utilise aujourd\'hui].\'\n\nRésultat du test Grand-mère :\nRésultat du test Concurrent :\nCe que tu as ajusté après les tests :",
          xp: 30,
        },
      ],
    },
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
