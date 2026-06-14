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
    recapLabel: "🎯 Ta proposition de valeur",
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
        // 10 — Self-check : test de la grand-mère (0 XP bonus — total de base reste 50 XP)
        {
          type: "self_check",
          title: "Le test de la grand-mère 👵",
          description: "Relis ta proposition de valeur à voix haute. Sans jargon, sans \"révolutionnaire\" — une phrase simple que tu pourrais dire à ta grand-mère. Si elle comprend, tu es sur la bonne voie.",
          checklist: [
            { id: "no_jargon", label: "Pas de mot technique ou anglophone incompris" },
            { id: "grandma_test", label: "Ma grand-mère comprendrait cette phrase" },
            { id: "specific", label: "Elle parle d\'UNE personne précise, pas de \"tout le monde\"" },
          ],
          xp: 0,
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
    recapLabel: "❤️ Pourquoi ce projet te tient à cœur",
    lesson: {
      title: "Ton moteur intérieur — pourquoi toi, pourquoi maintenant",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "🔥",
          title: "Pourquoi les raisons profondes comptent autant que l\'idée",
          content: "La plupart des startups ne meurent pas à cause d\'une mauvaise idée — elles meurent parce que le fondateur a abandonné au premier moment difficile. \'Parce que c\'est rentable\' ne suffit pas quand tu n\'as pas dormi depuis 3 jours et que ton premier client demande un remboursement.",
          xp: 5,
        },
        // 1 — MCQ : enseigne "motivation durable"
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
        // 2 — Micro-input : brique "motivation"
        {
          type: "micro_input",
          prompt: "Quelle est ta raison profonde à toi — celle qui tiendra quand ce sera difficile ? (Vécu personnel, problème observé de près, conviction forte...)",
          placeholder: "Ex : j\'ai vu ma mère passer des heures à chercher un médecin pour mon frère, et aucun système fiable n\'existait dans notre quartier...",
          storageKey: "motivation",
          xp: 2,
        },
        // 3 — True/false
        {
          type: "true_false",
          statement: "Si ton idée ne te passionne pas complètement dès le départ, tu ne devrais pas la poursuivre.",
          isTrue: false,
          explanation: "Faux. La passion peut venir après la maîtrise et les premiers succès. Ce qui compte : es-tu motivé par le PROBLÈME que tu veux résoudre ? Certains grands entrepreneurs n\'aimaient pas leur secteur au départ mais croyaient profondément à l\'impact qu\'ils pouvaient avoir.",
          xp: 5,
        },
        // 4 — Info : Ikigai
        {
          type: "info",
          icon: "⚡",
          title: "L\'Ikigai entrepreneurial : trouver ton intersection",
          content: "4 cercles qui, à leur intersection, créent un projet durable : ce que tu AIMES faire, ce en quoi tu es BON (prouvé), ce dont le monde a BESOIN (quelqu\'un paie pour ça), ce pour quoi on te PAIERA. Manquer un cercle, c\'est construire sur du sable.",
          xp: 5,
        },
        // 5 — Scénario : enseigne "compétence alignée"
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
          xp: 16,
        },
        // 6 — Micro-input : brique "competence"
        {
          type: "micro_input",
          prompt: "Quelle est ta compétence prouvée pour résoudre ce problème ? (Ce que tu sais déjà faire, démontré par une expérience réelle — pas ce que tu veux apprendre.)",
          placeholder: "Ex : 6 ans de gestion d\'une boutique en ligne, je connais tous les obstacles des commerçants numériques débutants...",
          storageKey: "competence",
          xp: 2,
        },
        // 7 — Reflection template : assemblage final
        {
          type: "reflection_template",
          intro: "Tes deux ancrages sont posés. Voilà ce que ça donne assemblé — ajuste les mots si besoin.",
          template: "Je me lance dans ce projet parce que {motivation}. Je suis particulièrement bien placé pour ça parce que {competence}.",
          variables: ["motivation", "competence"],
          xp: 5,
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
    recapLabel: "🔍 Les problèmes que tu résous",
    lesson: {
      title: "Penser problème, pas solution — la discipline qui sauve les startups",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "🔍",
          title: "Le piège de la solution",
          content: "La plupart des entrepreneurs passent leurs premières semaines à décrire leur produit. C\'est l\'erreur classique de quelqu\'un amoureux de sa solution. Tu peux construire quelque chose de techniquement parfait qui ne résout aucun problème que les gens sont prêts à payer pour résoudre.",
          xp: 5,
        },
        // 1 — MCQ : enseigne "symptôme vs vrai problème"
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
        // 2 — Micro-input : brique "probleme_principal"
        {
          type: "micro_input",
          prompt: "Quel est le VRAI problème que tu veux résoudre — formulé du côté de ton client, pas du tien ? (Pas \'il n\'existe pas mon produit\', mais la douleur concrète qu\'il vit.)",
          placeholder: "Ex : les artisans de Dakar perdent 3 clients par semaine faute de pouvoir prouver leur sérieux — pas de portfolio, pas d\'avis vérifiés, pas de contact fiable...",
          storageKey: "probleme_principal",
          xp: 2,
        },
        // 3 — True/false
        {
          type: "true_false",
          statement: "Un bon entrepreneur doit avoir une idée de solution précise avant de commencer ses recherches.",
          isTrue: false,
          explanation: "Faux. Les meilleurs entrepreneurs commencent par observer un problème réel, l\'étudient en profondeur, et laissent la solution émerger des données terrain. Airbnb n\'a pas commencé par \'créons une plateforme\' — ils ont commencé par \'nous n\'avons pas d\'argent pour le loyer, des gens ont des chambres vides\'.",
          xp: 5,
        },
        // 4 — Info : 5 Pourquoi
        {
          type: "info",
          icon: "🌳",
          title: "La méthode des 5 Pourquoi",
          content: "Inventée chez Toyota : à chaque réponse, tu poses un nouveau \'Pourquoi ?\' jusqu\'à 5 fois pour atteindre la cause racine. \'Mes clients annulent\' → Pourquoi ? → \'Livraisons en retard\' → Pourquoi ? → \'Fournisseurs imprévisibles\' → Pourquoi ? → Voilà le vrai problème à résoudre.",
          xp: 5,
        },
        // 5 — Fill blank
        {
          type: "fill_blank",
          template: "La méthode des 5 Pourquoi part du {0} visible pour atteindre la {1} racine du problème.",
          blanks: ["symptôme", "cause"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 6 — Scénario : enseigne "cause_racine via 5 Pourquoi"
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
        // 7 — Micro-input : brique "cause_racine"
        {
          type: "micro_input",
          prompt: "Après avoir posé 5 Pourquoi sur ton problème, quelle est la cause racine — la vraie source profonde, pas le symptôme visible ?",
          placeholder: "Ex : cause racine = les commerçants n\'ont aucun moyen simple de collecter des avis clients depuis leur téléphone basique, donc ils ne peuvent pas prouver leur fiabilité...",
          storageKey: "cause_racine",
          xp: 2,
        },
        // 8 — Reorder
        {
          type: "reorder",
          items: [
            "Observer une frustration répétée chez des personnes réelles",
            "Poser \'Pourquoi ?\' pour aller plus loin que le symptôme",
            "Répéter jusqu\'à trouver une cause qu\'on peut réellement traiter",
            "Reformuler le problème avec précision (qui, quoi, conséquence)",
            "Valider que d\'autres personnes ont le même problème",
          ],
          xp: 8,
        },
        // 9 — Reflection template : assemblage final
        {
          type: "reflection_template",
          intro: "Le vrai problème que tu résous est maintenant formulé avec précision. Relis et ajuste les mots si besoin.",
          template: "Le problème principal que je résous : {probleme_principal}. Sa cause racine (après 5 Pourquoi) : {cause_racine}.",
          variables: ["probleme_principal", "cause_racine"],
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
    recapLabel: "👤 Ton client idéal",
    lesson: {
      title: "Construire ta persona — mettre un visage sur ton marché",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "👤",
          title: "Qu\'est-ce qu\'une persona ?",
          content: "Un personnage semi-fictif qui représente ton client idéal — avec un nom, une histoire, des habitudes et des frustrations précises. Sans persona précise, tu construis pour tout le monde, ce qui veut dire pour personne. Elle guide chaque décision : produit, prix, canal, message.",
          xp: 5,
        },
        // 1 — MCQ
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
        // 2 — True/false
        {
          type: "true_false",
          statement: "Plus ta persona est large (ex: \'femmes 18-45 ans\'), plus tu touches de clientes potentielles.",
          isTrue: false,
          explanation: "Faux. Une persona trop large = message trop générique = personne ne se reconnaît. \'Mamans de 28-38 ans à Lomé qui travaillent et cherchent des solutions de garde fiables pour moins de 15 000 FCFA/semaine\' est bien plus puissant. La précision permet un message qui résonne vraiment.",
          xp: 5,
        },
        // 3 — Info
        {
          type: "info",
          icon: "🗂️",
          title: "Les 6 dimensions d\'une persona complète",
          content: "Démographique (âge, ville, situation familiale), Professionnel (métier, revenus approximatifs), Comportemental (habitudes mobile, achat), Frustrations (ce qui l\'énerve dans les solutions actuelles), Motivations (ce qu\'il/elle veut vraiment), Médias (WhatsApp ? Facebook ? Terrain ?).",
          xp: 5,
        },
        // 4 — MCQ
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
        // 5 — Scénario : enseigne "frustration + comportement = clés de la persona"
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
        // 6 — Micro-input : brique "frustration"
        {
          type: "micro_input",
          prompt: "Quelle est la frustration principale de ton client avec les solutions actuelles — ce qu\'il se dit quand ça ne marche pas ?",
          placeholder: "Ex : elle doit appeler 5 couturières différentes à chaque commande, aucune ne répond à l\'heure, et les prix changent sans prévenir...",
          storageKey: "frustration",
          xp: 2,
        },
        // 7 — Fill blank
        {
          type: "fill_blank",
          template: "Une persona efficace décrit un client {0} — pas un groupe {1}. Elle est construite sur des {2} réelles, pas sur des {3}.",
          blanks: ["précis", "vague", "données", "suppositions"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 8 — Match
        {
          type: "match",
          pairs: [
            { left: "Démographique", right: "Âge, ville, situation familiale" },
            { left: "Comportemental", right: "Habitudes d\'achat et canal digital préféré" },
            { left: "Frustrations", right: "Ce que la solution actuelle ne résout pas" },
            { left: "Motivations", right: "Ce qu\'il veut vraiment accomplir dans sa vie" },
          ],
          xp: 8,
        },
        // 9 — MCQ : enseigne "précision du profil client"
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
        // 10 — Micro-input : brique "profil_client"
        {
          type: "micro_input",
          prompt: "Décris ton client idéal précisément : qui est-il, où est-il, quelle est sa situation quotidienne ? (Âge approximatif, ville, métier, revenu estimé en FCFA)",
          placeholder: "Ex : femme de 30-42 ans, commerçante à Abidjan Adjamé, 2-3 enfants, revenu ~250k FCFA/mois, utilise WhatsApp tout le temps, gère ses comptes sur carnet...",
          storageKey: "profil_client",
          xp: 2,
        },
        // 11 — Reflection template : assemblage final
        {
          type: "reflection_template",
          intro: "Ta persona principale prend forme. Voilà ce que donnent tes deux briques assemblées — enrichis le texte librement.",
          template: "Mon client idéal : {profil_client}. Sa frustration principale avec les solutions actuelles : {frustration}.",
          variables: ["profil_client", "frustration"],
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
    recapLabel: "✨ Ta proposition de valeur (version finale)",
    lesson: {
      title: "L\'UVP — l\'arme de communication la plus puissante de ton business",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "💎",
          title: "UVP vs proposition de valeur : la différence clé",
          content: "Ta proposition de valeur définit ce que tu offres (interne). Ton UVP est la formulation externe, la phrase que tu dis à un client : \'Pourquoi moi ?\' Elle doit déclencher \'Ah, c\'est exactement ce qu\'il me faut !\' — pas \'c\'est intéressant\'. Si c\'est intéressant, c\'est pas assez fort.",
          xp: 5,
        },
        // 1 — MCQ
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
        // 2 — True/false : enseigne "précision = force / cibler tout le monde = faiblesse"
        {
          type: "true_false",
          statement: "Une UVP qui plaît à tout le monde est une UVP efficace.",
          isTrue: false,
          explanation: "Faux. Une UVP qui plaît à tout le monde ne choisit pas — et ne résonne fort pour personne. Les meilleures UVP polarisent : elles font dire \'c\'est exactement pour moi\' à certains et \'ça ne me concerne pas\' à d\'autres. C\'est le signe qu\'elles sont suffisamment précises.",
          xp: 5,
        },
        // 3 — Micro-input : brique "cible_uvp"
        {
          type: "micro_input",
          prompt: "Pour qui EXACTEMENT est ton offre ? Sois aussi précis que dans ta persona — une situation concrète, pas \'tout le monde\'.",
          placeholder: "Ex : les propriétaires de boutiques de prêt-à-porter à Cotonou qui font 150-400k FCFA/mois et gèrent encore leur stock à la main...",
          storageKey: "cible_uvp",
          xp: 2,
        },
        // 4 — Info
        {
          type: "info",
          icon: "🏗️",
          title: "Le framework en 4 parties",
          content: "Structure éprouvée : \'Pour [CIBLE PRÉCISE] qui [PROBLÈME PRINCIPAL], [PRODUIT/SERVICE] est [CATÉGORIE] qui [BÉNÉFICE UNIQUE] contrairement à [ALTERNATIVE ACTUELLE].\' Chaque partie élimine quelqu\'un — et c\'est une bonne chose. La précision, c\'est de la force.",
          xp: 10,
        },
        // 5 — Fill blank
        {
          type: "fill_blank",
          template: "Une bonne UVP doit être comprise en moins de {0} secondes, et dire en quoi tu es {1} des alternatives existantes.",
          blanks: ["10", "différent"],
          isOpenAnswer: false,
          xp: 15,
        },
        // 6 — Scénario : enseigne "bénéfice concret + différenciant"
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
        // 7 — Micro-input : brique "benefice_differenciateur"
        {
          type: "micro_input",
          prompt: "Quel est ton bénéfice concret et différenciant — précis, mesurable si possible — et en quoi te différencies-tu des alternatives que ton client utilise aujourd\'hui ?",
          placeholder: "Ex : bilan financier automatique chaque soir en 2 min, contrairement au cahier qui prend 1h et aux logiciels PC que les commerçants n\'utilisent jamais...",
          storageKey: "benefice_differenciateur",
          xp: 2,
        },
        // 8 — Match
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
        // 9 — Reorder
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
        // 10 — MCQ
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
        // 11 — Info
        {
          type: "info",
          icon: "🧪",
          title: "Le test Grand-mère et le test Concurrent",
          content: "Test Grand-mère : lis ton UVP à quelqu\'un hors du secteur. Si elle comprend en 10 secondes ce que tu fais et pour qui — elle est claire. Test Concurrent : remplace ton nom par celui d\'un concurrent. Si l\'UVP reste vraie pour lui aussi — elle n\'est pas assez différenciante.",
          xp: 5,
        },
        // 12 — Reflection template : assemblage final
        {
          type: "reflection_template",
          intro: "Tu as tous les éléments pour une UVP complète. Voilà ce que donnent tes briques assemblées — édite jusqu\'à ce que ça sonne juste pour quelqu\'un de ta cible.",
          template: "Pour {cible_uvp}, mon offre apporte {benefice_differenciateur} — contrairement aux alternatives actuelles.",
          variables: ["cible_uvp", "benefice_differenciateur"],
          xp: 31,
        },
      ],
    },
  },

  // --- Niveau 2 ---
  {
    id: 106,
    levelId: 2,
    title: "Analyse tes concurrents",
    description:
      "Directs ou indirects. Aucun concurrent = mauvais signe (pas de marché) ou mauvaise recherche. Identifie leurs faiblesses et construis ta différenciation.",
    xp: 100,
    recapLabel: "🥊 Tes concurrents",
    lesson: {
      title: "Connaître tes concurrents pour mieux te différencier",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "🥊",
          title: "Pourquoi analyser la concurrence — même informelle",
          content:
            "Tout marché a des concurrents. Parfois ce sont des entreprises officielles, parfois c\'est l\'habitude de tes clients (cuisiner à la maison, se débrouiller seul, ne rien faire). Identifier ces alternatives te permet de comprendre ce que ton client fait DÉJÀ pour résoudre son problème — et où tu peux faire mieux.",
          xp: 5,
        },
        // 1 — MCQ : enseigne "pas de concurrent = mauvais signal"
        {
          type: "mcq",
          question:
            "Un entrepreneur dit : \'Je n\'ai aucun concurrent — mon idée est totalement nouvelle.\' Qu\'est-ce que ça signifie le plus souvent ?",
          options: [
            "Il a trouvé un marché vierge exceptionnel à saisir immédiatement.",
            "Sa recherche est incomplète, ou il n\'y a pas encore de marché validé.",
            "Il est en avance sur son temps — il suffit d\'attendre.",
          ],
          correctIndex: 1,
          explanation:
            "Un marché sans concurrent est soit inexploré (personne ne veut payer pour ça), soit mal cherché (les concurrents existent mais sont informels ou indirects). Quand Jumia a lancé en Côte d\'Ivoire, les \'concurrents\' étaient les marchés Adjamé et les boutiques de quartier — pas d\'autres sites e-commerce.",
          xp: 10,
        },
        // 2 — Scénario : concurrent informel réel (enseigne "concurrent_1")
        {
          type: "scenario",
          context:
            "Koffi à Dakar veut lancer LunchKaba, une app de livraison de repas chauds pour les employés de bureau. Il pense n\'avoir aucun concurrent car il n\'existe pas d\'app similaire à Dakar. Mais en faisant ses interviews, il découvre que 7 personnes sur 10 font livrer des plats par leur maman, leur bonne, ou un voisin via WhatsApp.",
          question: "Quels sont les vrais concurrents de LunchKaba ?",
          options: [
            "Aucun — il n\'y a pas d\'app concurrente, donc le marché est libre.",
            "Les mamans, bonnes et voisins qui livrent via WhatsApp — ce sont des concurrents informels réels.",
            "Uniquement les restaurants qui font de la livraison officielle.",
          ],
          correctIndex: 1,
          explanation:
            "Le concurrent de LunchKaba n\'est pas une autre app — c\'est le système WhatsApp + personne de confiance déjà en place. Pour convaincre un client de changer, Koffi doit être MEILLEUR que ce système existant : plus rapide, plus fiable, moins cher, ou les trois. Ignorer l\'informel, c\'est construire dans le vide.",
          xp: 10,
        },
        // 3 — Micro-input : brique "concurrent_1" (suit le scénario qui enseigne le concept de concurrent informel)
        {
          type: "micro_input",
          prompt:
            "Qui fait déjà ce que tu veux faire — même informellement ? (Habitudes actuelles, système D, concurrents directs ou indirects)",
          placeholder:
            "Ex : les artisans du quartier trouvés via bouche-à-oreille, les groupes WhatsApp de recommandation, les marchés ambulants...",
          storageKey: "concurrent_1",
          xp: 2,
        },
        // 4 — Scénario : enseigne "identifier la faiblesse d'un concurrent"
        {
          type: "scenario",
          context:
            "Awa à Abidjan veut lancer un service de blanchisserie à domicile. Sa principale concurrente est Mme Bamba, une blanchisseuse de quartier réputée. Points positifs de Mme Bamba : prix bas (500 FCFA/pièce), connue de tous. Points faibles : prend souvent 5-7 jours, rend parfois les vêtements avec une tache ou abîmés, ne répond pas au téléphone.",
          question:
            "Quelle faiblesse de Mme Bamba Awa devrait exploiter en priorité pour se différencier ?",
          options: [
            "Proposer un prix encore plus bas que 500 FCFA/pièce.",
            "Garantir un délai de 48h maximum avec suivi WhatsApp — là où Mme Bamba prend 5-7 jours.",
            "S\'installer dans un autre quartier pour ne pas être en concurrence directe.",
          ],
          correctIndex: 1,
          explanation:
            "La principale douleur des clients de Mme Bamba, c\'est l\'incertitude : quand ça revient, dans quel état ? Awa peut gagner sur la fiabilité — pas sur le prix. Baisser les prix l\'entraînerait dans une guerre qu\'elle perdrait face à une concurrente établie. Exploiter une faiblesse réelle, c\'est construire une différenciation durable.",
          xp: 10,
        },
        // 5 — Micro-input : brique "faiblesse_concurrent" (suit le scénario qui enseigne comment identifier une faiblesse)
        {
          type: "micro_input",
          prompt:
            "Quelle est la principale faiblesse de tes concurrents actuels — la frustration que leurs clients mentionnent le plus souvent ?",
          placeholder:
            "Ex : trop lent, prix imprévisibles, pas de suivi, qualité irrégulière, impossible à joindre en cas de problème...",
          storageKey: "faiblesse_concurrent",
          xp: 2,
        },
        // 6 — Info : différenciation directe vs indirecte
        {
          type: "info",
          icon: "🎯",
          title: "Différenciation directe vs indirecte",
          content:
            "Différenciation directe : tu fais la même chose qu\'un concurrent mais MIEUX sur un axe précis (plus rapide, moins cher, plus fiable). Différenciation indirecte : tu résous le même problème d\'une façon totalement différente (là où le concurrent vient chez toi, toi tu vas chez le client). Les deux sont valides — mais chaque différenciateur doit être défendable dans le temps.",
          xp: 5,
        },
        // 7 — True/false
        {
          type: "true_false",
          statement:
            "Si tu n\'as aucun concurrent direct, tu n\'as pas besoin d\'analyse concurrentielle.",
          isTrue: false,
          explanation:
            "Faux. Même sans concurrent direct, ton client utilise toujours une alternative — souvent une solution informelle ou une habitude (\'je gère moi-même\', \'je demande à un ami\'). Ces alternatives sont tes vrais concurrents. Ne pas les analyser, c\'est construire sans comprendre ce contre quoi tu te bats.",
          xp: 5,
        },
        // 8 — Match
        {
          type: "match",
          pairs: [
            { left: "Concurrent direct", right: "Même produit, même cible" },
            { left: "Concurrent indirect", right: "Même besoin, solution différente" },
            { left: "Alternative informelle", right: "Système D, débrouille, habitude" },
            { left: "Différenciateur fort", right: "Avantage précis, défendable dans le temps" },
          ],
          xp: 8,
        },
        // 9 — Reflection template : assemblage (exerciseIndex 9)
        {
          type: "reflection_template",
          intro:
            "Tu connais maintenant tes concurrents et leur faiblesse principale. Voilà ce que ça donne assemblé — ajuste les mots pour que ça sonne juste.",
          template:
            "Mes principaux concurrents sont {concurrent_1}. Leur faiblesse principale : {faiblesse_concurrent}. Je me différencie en résolvant exactement ce point mieux qu\'eux.",
          variables: ["concurrent_1", "faiblesse_concurrent"],
          xp: 43,
        },
      ],
    },
  },

  {
    id: 107,
    levelId: 2,
    title: "Estime la taille de ton marché",
    description:
      "TAM / SAM / SOM simplifié. Pas besoin d\'études McKinsey — des estimations raisonnées construites depuis le bas.",
    xp: 100,
    recapLabel: "📊 Ton marché estimé",
    lesson: {
      title: "Estimer ton marché sans données officielles",
      exercises: [
        // 0 — Info : TAM/SAM/SOM
        {
          type: "info",
          icon: "📊",
          title: "TAM / SAM / SOM expliqués avec un exemple chiffré",
          content:
            "TAM (Total Addressable Market) : tout le monde qui POURRAIT acheter ton produit. SAM (Serviceable Addressable Market) : ceux que tu peux RÉELLEMENT atteindre avec tes canaux. SOM (Serviceable Obtainable Market) : ta cible réaliste dans les 12-24 premiers mois.\n\nExemple : restauration livrée à Abidjan. TAM = toute personne qui commande de la nourriture (~3 millions). SAM = employés de bureau en Plateau/Cocody qui commandent via smartphone (~120 000). SOM = zone Plateau, 1 km autour du bureau pilote (~8 000 personnes).",
          xp: 5,
        },
        // 1 — Scénario : méthode bottom-up (enseigne "marche_cible")
        {
          type: "scenario",
          context:
            "Issiaka à Bamako veut lancer un service de comptabilité simplifiée pour les petits commerçants. Il hésite entre deux approches pour estimer son marché : A) \'Il y a des millions de commerçants en Afrique de l\'Ouest, donc le marché est énorme.\' B) \'Je cible les boutiques de textile du marché Médine. Je compte 200 boutiques, chacune pourrait payer 10 000 FCFA/mois → SOM = 2 000 000 FCFA/mois.\'",
          question: "Quelle approche est la plus crédible pour estimer le marché d\'Issiaka ?",
          options: [
            "A — le marché total africain est plus impressionnant pour les investisseurs.",
            "B — elle part de données réelles et donne une estimation défendable et actionnable.",
            "Les deux sont equivalentes — il suffit de choisir la plus grande.",
          ],
          correctIndex: 1,
          explanation:
            "L\'approche B est la méthode \'bottom-up\' : partir d\'une unité concrète qu\'on peut observer (une boutique, un bureau, un quartier) et multiplier. Elle est vérifiable et crédible. L\'approche A est du \'top-down\' vague — elle rassure mais ne dit pas si le business est viable dans un contexte précis.",
          xp: 10,
        },
        // 2 — Micro-input : brique "marche_cible" (suit le scénario qui enseigne la méthode bottom-up)
        {
          type: "micro_input",
          prompt:
            "Combien de personnes ou d\'entreprises dans ta zone correspondent à ton client idéal ? Donne ton estimation avec ta méthode de calcul (bottom-up).",
          placeholder:
            "Ex : ~500 restaurants à Dakar Plateau × 2 commandes/semaine × 3 000 FCFA = 3 000 000 FCFA/semaine de marché accessible...",
          storageKey: "marche_cible",
          xp: 2,
        },
        // 3 — Info : SOM pas limitant
        {
          type: "info",
          icon: "🔬",
          title: "Pourquoi commencer petit (SOM) est rassurant, pas limitant",
          content:
            "Un SOM de 500 clients n\'est pas une ambition timide — c\'est une stratégie intelligente. Maîtriser 500 clients, c\'est comprendre profondément leurs besoins, ajuster ton produit, et construire ta réputation. Beaucoup de succès africains ont commencé par dominer un quartier ou un marché avant de s\'étendre : Wave au Sénégal, Kobo360 au Nigeria. Le \'commencer petit\' est une phase, pas une finalité.",
          xp: 5,
        },
        // 4 — MCQ : check SAM vs SOM
        {
          type: "mcq",
          question:
            "Fatou lance un service de livraison de pagnes à Cotonou. Son SAM est de 50 000 femmes. Son SOM réaliste en année 1 est de 800 femmes dans son quartier. Que doit-elle cibler en priorité ?",
          options: [
            "Toutes les 50 000 femmes du SAM dès le départ pour maximiser la traction.",
            "Les 800 femmes du SOM — dominer ce sous-segment avant d\'élargir.",
            "Un marché entre les deux : environ 5 000 femmes.",
          ],
          correctIndex: 1,
          explanation:
            "Le SOM n\'est pas un plafond — c\'est un point de départ. Dominer 800 clients en profondeur (satisfaction, bouche-à-oreille, fidélité) construit une base solide pour s\'étendre au SAM ensuite. Vouloir tout le SAM dès le départ, c\'est diluer ses efforts et ne convertir personne vraiment.",
          xp: 10,
        },
        // 5 — Fill blank
        {
          type: "fill_blank",
          template:
            "La méthode {0} part d\'une unité concrète (un client, un quartier) pour estimer le marché, tandis que la méthode {1} part du marché total pour descendre.",
          blanks: ["bottom-up", "top-down"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 6 — True/false
        {
          type: "true_false",
          statement:
            "Un SOM de 200 clients en année 1 est trop petit pour construire un business viable.",
          isTrue: false,
          explanation:
            "Faux. 200 clients fidèles à 50 000 FCFA/an = 10 000 000 FCFA de revenus annuels — largement suffisant pour tester, ajuster et amorcer la croissance. La taille du marché initial compte moins que la profondeur de la maîtrise. Wave a commencé avec quelques dizaines de marchands à Dakar.",
          xp: 5,
        },
        // 7 — Match
        {
          type: "match",
          pairs: [
            { left: "TAM", right: "Tous ceux qui pourraient théoriquement acheter" },
            { left: "SAM", right: "Ceux que tu peux atteindre avec tes canaux réels" },
            { left: "SOM", right: "Ton objectif réaliste en 12-24 mois" },
            { left: "Bottom-up", right: "Partir d\'une unité concrète et multiplier" },
          ],
          xp: 8,
        },
        // 8 — Reflection template (exerciseIndex 8)
        {
          type: "reflection_template",
          intro:
            "Ton marché estimé est maintenant chiffré. Voilà ce que donne ta brique assemblée — précise les chiffres si tu peux.",
          template:
            "Mon marché cible estimé (SAM) : {marche_cible}. Pour commencer, je vise un premier sous-segment dans ma ville — mon SOM de départ.",
          variables: ["marche_cible"],
          xp: 47,
        },
      ],
    },
  },

  {
    id: 108,
    levelId: 2,
    title: "Prépare ton guide d\'entretien client",
    description:
      "5-7 questions ouvertes basées sur le Mom Test. L\'objectif : comprendre les comportements réels, pas valider tes hypothèses.",
    xp: 100,
    recapLabel: "🎙️ Ton guide d\'entretien",
    lesson: {
      title: "Préparer des questions qui révèlent la vérité (méthode Mom Test)",
      exercises: [
        // 0 — Info : Mom Test
        {
          type: "info",
          icon: "🎙️",
          title: "Le Mom Test — pourquoi ne pas demander \'tu aimerais mon produit ?\'",
          content:
            "Rob Fitzpatrick a écrit le Mom Test après avoir vu des centaines de startups échouer en collectant des faux signaux positifs. Principe : même ta maman te mentira par gentillesse si tu lui demandes \'tu achèterais mon app ?\'. Mais elle ne peut pas mentir sur son propre comportement passé. Demande-lui : \'La dernière fois que tu avais ce problème, qu\'est-ce que tu as fait ?\' — là, tu obtiens de la vraie data.",
          xp: 5,
        },
        // 1 — Scénario : question biaisée vs Mom Test (enseigne "question_1")
        {
          type: "scenario",
          context:
            "Moussa veut créer une app de gestion de stock pour boutiques à Lomé. Il teste deux approches :\n\nQuestion A : \'Est-ce que tu utiliserais une app pour gérer ton stock si elle coûtait 5 000 FCFA/mois ?\'\n\nQuestion B : \'La semaine dernière, comment tu as géré ton stock ? Tu as eu des ruptures ou des surplus ?\'",
          question: "Laquelle de ces questions respecte le Mom Test ?",
          options: [
            "Question A — elle teste directement l\'intention d\'achat, c\'est ce qui compte.",
            "Question B — elle explore le comportement réel, pas une intention hypothétique.",
            "Les deux sont bonnes à utiliser ensemble.",
          ],
          correctIndex: 1,
          explanation:
            "La question A est un piège classique : les gens disent \'oui\' par politesse même s\'ils n\'achèteront jamais. La question B révèle ce qui se passe vraiment : si la commerçante te répond \'j\'ai eu 3 ruptures cette semaine et j\'ai perdu 2 clients\', c\'est un signal fort. Si elle dit \'ça va, ça se gère\', l\'urgence n\'est peut-être pas là.",
          xp: 10,
        },
        // 2 — Micro-input : brique "question_1" (suit le scénario qui enseigne les questions sur le comportement actuel)
        {
          type: "micro_input",
          prompt:
            "Écris une question Mom Test sur le comportement ACTUEL de ton client — sur ce qu\'il fait déjà, pas sur ce qu\'il ferait avec ton idée.",
          placeholder:
            "Ex : \'Comment tu fais aujourd\'hui pour trouver un artisan de confiance dans ton quartier ?\' ou \'La dernière fois que tu avais besoin de [X], qu\'est-ce que tu as fait ?\' ...",
          storageKey: "question_1",
          xp: 2,
        },
        // 3 — Scénario : creuser le "pourquoi" (enseigne "question_2")
        {
          type: "scenario",
          context:
            "Aïcha interviewe une commerçante à Abidjan Adjamé. La commerçante répond : \'Je galère toujours avec les livraisons.\' Aïcha peut s\'arrêter là, ou creuser davantage.",
          question: "Quelle question permettra à Aïcha d\'obtenir une information vraiment utile ?",
          options: [
            "\'Est-ce que mon service de livraison t\'intéresserait ?\' — tester directement l\'intérêt.",
            "\'Qu\'est-ce qui se passe exactement quand tu galères ? Donne-moi un exemple récent.\' — creuser le problème concret.",
            "\'Tu penses que combien de commerçants ont ce problème ?\' — valider l\'ampleur.",
          ],
          correctIndex: 1,
          explanation:
            "\'Je galère avec les livraisons\' est vague. En demandant \'donne-moi un exemple récent\', Aïcha obtient : \'Hier, mon fournisseur de tissus devait livrer à 9h, il est arrivé à 15h, et j\'ai perdu ma cliente de la matinée.\' C\'est concret, citable, et révèle la vraie douleur : le retard qui fait perdre des clients. Creuser transforme une vague plainte en insight exploitable.",
          xp: 10,
        },
        // 4 — Micro-input : brique "question_2" (suit le scénario sur comment creuser)
        {
          type: "micro_input",
          prompt:
            "Écris une question pour creuser le problème en profondeur — pour obtenir un exemple concret récent, pas une opinion générale.",
          placeholder:
            "Ex : \'Donne-moi un exemple récent où ce problème t\'a coûté quelque chose (temps, argent, client perdu).\' ou \'Qu\'est-ce qui s\'est passé exactement la dernière fois ?\' ...",
          storageKey: "question_2",
          xp: 2,
        },
        // 5 — True/false
        {
          type: "true_false",
          statement:
            "Si 3 personnes sur 5 disent \'oui, c\'est une bonne idée\', ton idée est validée.",
          isTrue: false,
          explanation:
            "Faux. \'Bonne idée\' est de la politesse, pas de la validation. La validation, c\'est : quelqu\'un te décrit spontanément le problème avec sa propre vie, montre une vraie frustration, ou mieux — te demande quand tu lances pour être le premier client. Un \'oui\' poli sans comportement passé confirmant le problème ne vaut rien.",
          xp: 5,
        },
        // 6 — Fill blank
        {
          type: "fill_blank",
          template:
            "Le Mom Test dit : ne demande jamais si les gens {0} ton produit. Demande ce qu\'ils {1} déjà pour résoudre le problème.",
          blanks: ["aimeraient", "font"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 7 — Info
        {
          type: "info",
          icon: "⚠️",
          title: "Les 3 questions à ne JAMAIS poser",
          content:
            "1. \'Tu utiliserais mon produit ?\' → Opinion future, pas engagement réel.\n2. \'Tu penses que les gens paieraient pour ça ?\' → Ils ne parlent pas pour les autres.\n3. \'C\'est une bonne idée, non ?\' → Tu attends un compliment, pas une info.\n\nRemplace chacune par une question sur le PASSÉ et le COMPORTEMENT RÉEL.",
          xp: 5,
        },
        // 8 — Match
        {
          type: "match",
          pairs: [
            { left: "\'Tu utiliserais ça ?\'", right: "Question biaisée — opinion future" },
            { left: "\'Dernière fois que... qu\'est-ce que tu as fait ?\'", right: "Bonne question — comportement passé" },
            { left: "\'C\'est une bonne idée ?\'", right: "Question biaisée — recherche de validation" },
            { left: "\'Donne-moi un exemple récent\'", right: "Bonne question — cas concret" },
          ],
          xp: 8,
        },
        // 9 — Reflection template : assemblage (exerciseIndex 9)
        {
          type: "reflection_template",
          intro:
            "Tes deux questions clés sont prêtes. Elles forment le cœur de ton guide d\'entretien — complète avec 3-5 questions supplémentaires dans ce style.",
          template:
            "Mes 2 questions clés pour mes interviews : 1) {question_1} 2) {question_2}",
          variables: ["question_1", "question_2"],
          xp: 45,
        },
      ],
    },
  },

  {
    id: 109,
    levelId: 2,
    title: "Mène 5 interviews terrain",
    description:
      "Pas des amis qui valident tout. De vraies personnes de ta cible. Au moins 5. Écoute 90% du temps — parle 10%.",
    xp: 200,
    recapLabel: "🎤 Tes 5 interviews",
    lesson: {
      title: "Sur le terrain — écouter sans diriger",
      exercises: [
        // 0 — Info : posture
        {
          type: "info",
          icon: "👂",
          title: "La règle des 90/10 — écouter plus que parler",
          content:
            "Pendant un entretien client, ton rôle est d\'écouter, pas de convaincre. Règle : parle maximum 10% du temps. Résiste à l\'envie d\'expliquer ton idée ou de corriger une mauvaise compréhension — si tu corriges, tu biaises. Si tu expliques, tu vends. Ici, tu cherches à comprendre la réalité de l\'autre, pas à défendre la tienne.",
          xp: 5,
        },
        // 1 — Scénario : signal fort vs politesse (enseigne "signal_fort")
        {
          type: "scenario",
          context:
            "Bintou mène des interviews pour son service de pressing à Dakar. Elle obtient ces 3 réponses :\n\nRéponse A : \'Oui, c\'est une bonne idée, ça manque dans le quartier.\'\nRéponse B : \'Oh, si tu faisais ça, je t\'enverrais mes vêtements demain matin — j\'ai encore perdu une chemise chez ma blanchisseuse ce mois.\'\nRéponse C : \'Peut-être que j\'essaierais, ça dépend du prix.\'",
          question: "Quelle réponse est un vrai signal fort que le problème est urgent et réel ?",
          options: [
            "Réponse A — elle valide l\'idée clairement.",
            "Réponse B — elle montre une frustration actuelle ET une intention concrète immédiate.",
            "Réponse C — elle montre un vrai intérêt sous réserve de prix acceptable.",
          ],
          correctIndex: 1,
          explanation:
            "La réponse B est le signal le plus fort : la personne décrit une douleur récente (chemise perdue ce mois) ET exprime une intention d\'achat immédiate (\'demain matin\'). C\'est la différence entre \'idée sympa\' et \'je paie pour ça\'. Mémorise ces moments — ils guident ton positionnement.",
          xp: 15,
        },
        // 2 — Micro-input : brique "signal_fort" (suit le scénario sur signal vs politesse)
        {
          type: "micro_input",
          prompt:
            "Quel est le signal le plus fort que tu as entendu dans tes interviews — une vraie réaction émotionnelle, pas une politesse ? (Cite si possible les mots exacts.)",
          placeholder:
            "Ex : \'Une commerçante m\'a dit \'je dépense 15 000 FCFA par mois pour corriger les erreurs de mon comptable — si tu fais mieux pour ce prix, je signe aujourd\'hui\'\' ...",
          storageKey: "signal_fort",
          xp: 2,
        },
        // 3 — Info : gérer les surprises
        {
          type: "info",
          icon: "💡",
          title: "Les surprises terrain sont tes meilleures données",
          content:
            "Quand une interview te révèle quelque chose d\'inattendu — un usage que tu n\'avais pas prévu, une douleur que tu ne soupçonnais pas, un refus là où tu attendais de l\'enthousiasme — c\'est précieux. Ces surprises valent plus que 50 réponses qui confirment ce que tu pensais déjà. Note-les mot pour mot.",
          xp: 5,
        },
        // 4 — Scénario : gérer un retour négatif/surprise (enseigne "surprise")
        {
          type: "scenario",
          context:
            "Yao lance une app de mise en relation artisans-clients à Lomé. Il pensait que le problème principal était \'trouver un artisan\'. Mais dans ses 5 interviews, 4 personnes lui disent : \'Les artisans ne sont pas difficiles à trouver — le problème, c\'est qu\'on ne sait jamais s\'ils vont finir le travail à temps et au prix convenu.\'",
          question: "Comment Yao doit-il réagir à cette surprise ?",
          options: [
            "Ignorer — son hypothèse initiale reste valide, il n\'a interviewé que 5 personnes.",
            "Prendre note et ajuster : son vrai problème à résoudre est la fiabilité et la transparence, pas la mise en relation.",
            "Arrêter le projet — si ce n\'est pas le problème qu\'il pensait, son idée n\'est pas bonne.",
          ],
          correctIndex: 1,
          explanation:
            "4 personnes sur 5 qui disent la même chose, c\'est un signal fort. Yao n\'abandonne pas son projet — il l\'ajuste. L\'idée \'artisans + clients\' est bonne, mais la vraie valeur n\'est pas la mise en relation (déjà possible via WhatsApp), c\'est la garantie de fiabilité. Une surprise terrain n\'est pas un échec — c\'est un apprentissage qu\'il a payé avant de construire.",
          xp: 15,
        },
        // 5 — Micro-input : brique "surprise" (suit le scénario sur retour surprise)
        {
          type: "micro_input",
          prompt:
            "Qu\'est-ce qui t\'a le plus surpris dans tes 5 interviews — ce que tu n\'attendais pas, que ça soit positif ou négatif ?",
          placeholder:
            "Ex : je pensais que le prix était le frein principal, mais tous mes interlocuteurs parlaient surtout de la fiabilité et du manque de suivi...",
          storageKey: "surprise",
          xp: 2,
        },
        // 6 — True/false
        {
          type: "true_false",
          statement:
            "Si une personne dit \'c\'est intéressant, je pourrais utiliser ça\', c\'est un signal positif fort qui valide ton idée.",
          isTrue: false,
          explanation:
            "Faux. \'C\'est intéressant\' est de la politesse africaine — une façon de ne pas blesser. Les vrais signaux forts : la personne te parle spontanément de ses frustrations actuelles, te demande comment ça fonctionne, ou t\'exprime un intérêt concret lié à un problème récent. La politesse bienveillante est l\'ennemi de la validation réelle.",
          xp: 5,
        },
        // 7 — Fill blank
        {
          type: "fill_blank",
          template:
            "Pendant une interview, parle maximum {0}% du temps. Ton rôle est d\'{1}, pas de convaincre.",
          blanks: ["10", "écouter"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 8 — MCQ
        {
          type: "mcq",
          question:
            "Comment choisir les 5 personnes à interviewer pour valider ton hypothèse ?",
          options: [
            "Tes proches — ils seront honnêtes car ils te connaissent.",
            "Des personnes qui correspondent précisément à ta persona client — idéalement des inconnus ou des connaissances distantes.",
            "Des experts du secteur — ils connaissent le marché mieux que les utilisateurs.",
          ],
          correctIndex: 1,
          explanation:
            "Les proches biaiseront leurs réponses pour te protéger. Les experts te parleront de leur vision du marché, pas de leur vie quotidienne. Seules les personnes qui correspondent à ta persona et vivent le problème au quotidien peuvent te donner des données fiables. Un inconnu qui rit de frustration quand tu décris ton problème vaut plus que 10 amis qui disent \'super idée\'.",
          xp: 10,
        },
        // 9 — Match
        {
          type: "match",
          pairs: [
            { left: "\'Bonne idée, ça manque ici\'", right: "Politesse — pas un signal fort" },
            { left: "\'Je dépense X FCFA/mois sur ce problème\'", right: "Signal fort — douleur chiffrée" },
            { left: "\'Peut-être, ça dépend du prix\'", right: "Intérêt faible — problème pas urgent" },
            { left: "\'Quand tu lances ? Je suis le premier\'", right: "Signal fort — intention réelle" },
          ],
          xp: 8,
        },
        // 10 — Reorder : les étapes d\'une bonne interview
        {
          type: "reorder",
          items: [
            "Commencer par des questions ouvertes sur la vie quotidienne (sans parler de ton idée)",
            "Laisser la personne décrire son problème dans ses propres mots",
            "Creuser avec \'donne-moi un exemple récent\'",
            "Écouter les signaux forts (frustrations chiffrées, intentions concrètes)",
            "Ne dévoiler ton idée QU\'EN FIN d\'entretien — et noter la première réaction",
          ],
          xp: 10,
        },
        // 11 — Info
        {
          type: "info",
          icon: "📝",
          title: "Note les mots exacts — pas tes interprétations",
          content:
            "En prenant des notes, écris les mots EXACTS de la personne, pas ton résumé. \'Il a dit qu\'il avait des problèmes de gestion\' est une interprétation. \'Il a dit \'chaque soir je rentre sans savoir si j\'ai gagné ou perdu\'\' est une citation. Les citations mot pour mot sont de l\'or : elles deviennent ton copywriting, tes arguments de vente, ton empathie prouvée.",
          xp: 5,
        },
        // 12 — MCQ
        {
          type: "mcq",
          question:
            "Tu interviewes quelqu\'un et il dit : \'Honnêtement, je ne sais pas si j\'utiliserais ça régulièrement.\' Que fais-tu ?",
          options: [
            "Tu essaies de le convaincre des avantages de ton idée.",
            "Tu creuses : \'Qu\'est-ce qui ferait que tu l\'utiliserais régulièrement ?\' ou \'Qu\'est-ce qui te freinerait ?\'",
            "Tu concluiras que cette personne n\'est pas dans ta cible et ignores ce signal.",
          ],
          correctIndex: 1,
          explanation:
            "Un doute exprimé est une mine d\'or. Creuser \'qu\'est-ce qui ferait la différence pour toi ?\' révèle les vraies conditions d\'adoption. Peut-être le prix, peut-être la confiance, peut-être un usage différent. Si tu ignores ou si tu convaincs, tu rates l\'apprentissage le plus précieux de l\'entretien.",
          xp: 10,
        },
        // 13 — Reflection template : assemblage (exerciseIndex 13)
        {
          type: "reflection_template",
          intro:
            "Tes 5 interviews sont menées. Voilà ce que tes deux insights clés donnent assemblés — développe librement avec tes notes de terrain.",
          template:
            "Sur mes 5 interviews, le signal le plus fort : {signal_fort}. Ce qui m\'a surpris : {surprise}.",
          variables: ["signal_fort", "surprise"],
          xp: 100,
        },
      ],
    },
  },

  {
    id: 110,
    levelId: 2,
    title: "Synthèse insights & décision",
    description:
      "Qu\'as-tu vraiment appris ? Décide : continuer, ajuster ou pivoter. Documente ton raisonnement — c\'est ta première décision stratégique.",
    xp: 150,
    recapLabel: "✅ Marché validé — ta décision",
    lesson: {
      title: "Décider : continuer, ajuster ou pivoter",
      exercises: [
        // 0 — Info : les 3 issues
        {
          type: "info",
          icon: "🗺️",
          title: "Les 3 issues possibles après la validation terrain",
          content:
            "Issue 1 — Continuer : tes interviews confirment l\'hypothèse principale. Le problème est réel, urgent, et les gens cherchent une solution. Tu avances avec ton idée actuelle.\n\nIssue 2 — Ajuster : le problème est réel mais ta solution initiale est légèrement à côté. Tu gardes la cible et le problème, mais tu modifies l\'approche (canal, format, prix, fonctionnalité).\n\nIssue 3 — Pivoter : les interviews révèlent un problème différent, plus urgent ou plus large, que tu peux aussi résoudre. Tu changes de cap — mais tu conserves tes apprentissages.",
          xp: 5,
        },
        // 1 — Scénario : ajustement basé sur insights (enseigne "ajustement")
        {
          type: "scenario",
          context:
            "Aminata à Abidjan avait prévu de lancer une app mobile de suivi de dépenses pour les ménages. Après 5 interviews, elle apprend que : 1) Le vrai problème n\'est pas \'suivre les dépenses\' mais \'ne pas savoir combien mettre de côté chaque semaine\'. 2) Les ménages n\'ont pas de smartphone à partager facilement. 3) Ils utilisent déjà WhatsApp tous les jours. → Elle ajuste : un bot WhatsApp qui envoie un rappel d\'épargne chaque vendredi soir.",
          question: "Est-ce un pivot ou un ajustement pour Aminata ?",
          options: [
            "Un pivot — elle abandonne son idée initiale et repart de zéro.",
            "Un ajustement — elle conserve le problème (finances familiales) et la cible, mais change le canal et le format.",
            "Un abandon — les ménages ne veulent clairement pas de solution digitale.",
          ],
          correctIndex: 1,
          explanation:
            "C\'est un ajustement : Aminata n\'a pas changé de problème ni de cible. Elle a affiné sa compréhension du vrai problème (épargne, pas suivi) et adapté le canal à la réalité terrain (WhatsApp > app mobile). C\'est exactement le bon usage de la validation terrain — apprendre pour ajuster, pas pour abandonner.",
          xp: 15,
        },
        // 2 — Micro-input : brique "ajustement" (suit le scénario sur ajustement vs pivot)
        {
          type: "micro_input",
          prompt:
            "Suite à tes interviews, que vas-tu GARDER, AJUSTER ou ABANDONNER de ton idée initiale ? Sois précis.",
          placeholder:
            "Ex : Je garde : la cible (commerçants informels d\'Abidjan) et le problème (suivi des ventes). J\'ajuste : le canal (bot WhatsApp au lieu d\'app), le prix (gratuit au lancement). J\'abandonne : la fonctionnalité de prévisions que personne ne m\'a demandée...",
          storageKey: "ajustement",
          xp: 2,
        },
        // 3 — Info : pivot ≠ échec
        {
          type: "info",
          icon: "🔄",
          title: "Pourquoi un pivot n\'est pas un échec",
          content:
            "Instagram était une app de géolocalisation (Burbn) avant de pivoter sur les photos. Slack était un jeu vidéo avant de pivoter sur la messagerie d\'équipe. PayPal a pivoté 3 fois. Chaque pivot conserve les apprentissages : tu ne repars pas de zéro, tu repars avec une carte plus précise du marché. Un pivot au Niveau 2 coûte 2 semaines — un pivot au Niveau 5 coûte 18 mois.",
          xp: 5,
        },
        // 4 — MCQ
        {
          type: "mcq",
          question:
            "Après ses interviews, Kofi réalise que le problème de ses clients n\'est pas \'livraison lente\' mais \'zéro visibilité sur l\'état de la commande\'. Que doit-il faire ?",
          options: [
            "Abandonner son idée de livraison — le problème est différent de ce qu\'il pensait.",
            "Ajuster son positionnement : son vrai avantage devient la transparence du suivi en temps réel.",
            "Continuer comme prévu — la livraison lente et le suivi sont le même problème.",
          ],
          correctIndex: 1,
          explanation:
            "Le problème fondamental est bien lié à la livraison — mais l\'angle précis est différent. Kofi ne pivote pas, il affine. Son message devient : \'Tu sais où est ta commande à tout moment\' plutôt que \'on livre plus vite\'. C\'est un ajustement de positionnement basé sur des données réelles — exactement ce que la validation terrain est censée produire.",
          xp: 10,
        },
        // 5 — True/false
        {
          type: "true_false",
          statement:
            "Si les 5 personnes que tu as interviewées ont des avis différents, ça signifie que ton idée ne tient pas.",
          isTrue: false,
          explanation:
            "Faux. Des avis différents révèlent souvent des segments différents — pas l\'absence de marché. Si 3 personnes disent \'je paierais pour ça maintenant\' et 2 disent \'pas vraiment\', commence par les 3. Ils sont ton SOM de départ. L\'homogénéité de tous tes interlocuteurs n\'est pas requise — la clarté sur qui dit oui et pourquoi, si.",
          xp: 5,
        },
        // 6 — Fill blank
        {
          type: "fill_blank",
          template:
            "Un pivot conserve les {0} acquis et change la {1}. Un abandon arrête tout. Un ajustement garde la direction et modifie les {2}.",
          blanks: ["apprentissages", "stratégie", "moyens"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 7 — Match
        {
          type: "match",
          pairs: [
            { left: "Signal fort × 4 sur 5", right: "Continuer — validation solide" },
            { left: "Bon problème, mauvais canal", right: "Ajuster — changer le format" },
            { left: "Problème différent, même cible", right: "Pivot — garder les apprentissages" },
            { left: "Aucune urgence dans les interviews", right: "Reconsidérer — pas de marché prêt" },
          ],
          xp: 8,
        },
        // 8 — Reorder
        {
          type: "reorder",
          items: [
            "Relire toutes ses notes d\'interviews pour en extraire les récurrences",
            "Identifier les signaux forts et les surprises",
            "Décider : continuer, ajuster ou pivoter",
            "Formuler ce qu\'on garde, change et abandonne",
            "Documenter le raisonnement avant de passer à la construction",
          ],
          xp: 10,
        },
        // 9 — Scenario
        {
          type: "scenario",
          context:
            "Fatou a mené 5 interviews pour son service de traiteur à domicile à Cotonou. Résultats : 4/5 interviewées ont mentionné la même frustration \'je veux cuisiner maison pour mes enfants mais je n\'ai pas le temps en semaine\'. 2/5 ont demandé si Fatou pouvait commencer la semaine prochaine. 1/5 a suggéré un service de \'kits repas\' plutôt que des plats préparés.",
          question: "Que devrait décider Fatou ?",
          options: [
            "Pivoter sur les kits repas — la suggestion est innovante.",
            "Continuer avec les plats préparés en semaine — 4/5 confirment le problème et 2/5 veulent acheter dès maintenant.",
            "Faire les deux services en parallèle pour maximiser les opportunités.",
          ],
          correctIndex: 1,
          explanation:
            "4/5 confirment le problème ET 2/5 expriment une intention immédiate : c\'est une validation solide. La suggestion du kit est intéressante mais non validée — 1 opinion n\'est pas un signal suffisant. Fatou doit d\'abord servir ceux qui veulent acheter maintenant, apprendre de l\'opération, puis envisager d\'élargir.",
          xp: 15,
        },
        // 10 — MCQ
        {
          type: "mcq",
          question:
            "Après 5 interviews, combien de signaux forts sont nécessaires pour avancer avec confiance ?",
          options: [
            "5/5 — unanimité totale seulement.",
            "3/5 minimum, avec des exemples concrets et une urgence exprimée.",
            "1 seul signal fort suffit si la personne est vraiment convaincue.",
          ],
          correctIndex: 1,
          explanation:
            "3 signaux forts sur 5 (60%) est un seuil raisonnable pour continuer. En dessous, considère un ajustement. Au-dessus, tu as une validation solide. \'Signal fort\' = la personne décrit le problème spontanément, avec une frustration récente concrète, pas juste \'c\'est intéressant\'.",
          xp: 10,
        },
        // 11 — Reflection template : assemblage (exerciseIndex 11)
        {
          type: "reflection_template",
          intro:
            "Ta décision est prise, documentée et ancrée dans des données réelles. Voilà ce que donne ta brique assemblée — développe librement.",
          template:
            "Après mes 5 interviews, voici ma décision : {ajustement}. Je continue vers le Niveau 3 avec cette version affinée de mon idée.",
          variables: ["ajustement"],
          xp: 57,
        },
      ],
    },
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
