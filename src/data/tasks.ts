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
    taskType: "mission",
    missionCaptureIndexes: [2, 5, 13],
    missionConfig: {
      type: "interviews",
      title: "Mener 5 interviews",
      brief: "Tu viens d'apprendre comment écouter sans biaiser. Maintenant, tu sors du cours et tu rencontres de vraies personnes.",
      icon: "Mic",
      checkpointQuestion: "Tu as mené tes interviews ?",
      checkpointMinLabel: "au moins 3 vraies personnes de ta cible",
      checkpointCta: "✓ Oui, j'ai parlé à au moins 3 personnes",
      briefingPanels: [
        {
          title: "Qui interviewer ?",
          items: [
            "✓ Des personnes qui correspondent à ta persona client",
            "✓ Idéalement des inconnus ou connaissances distantes",
            "✗ Pas des amis ou de la famille",
            "✓ Minimum 3 pour valider, idéal 5",
          ],
        },
        {
          title: "La posture",
          items: [
            "🎙️ Tu parles 10% du temps — tu écoutes 90%",
            "🚫 Ne parle pas de ton idée au début",
            "💬 Commence par la vie de la personne, ses frustrations",
            "🔍 Creuse avec «donne-moi un exemple récent»",
          ],
        },
      ],
      ctaLabel: "J'ai parlé à mes interviewés → Capturer mes insights",
      coachNiveau: 2,
      hasRawNotes: true,
      rawNotesLabel: "Tes notes de terrain",
      rawNotesPlaceholder: "Interview 1 — Amara, 34 ans, Abidjan Plateau\n\n'Chaque semaine je perds au moins 2h à...'\nSignal fort : il a frappé la table en disant 'si quelqu'un résolvait ça, je paierais sans hésiter'\n\nInterview 2 — ...",
      captureFields: [
        {
          id: "signal_fort",
          label: "Quel est le signal le plus fort que tu as entendu dans tes interviews — une vraie réaction émotionnelle, pas une politesse ? (Cite si possible les mots exacts.)",
          type: "texte_moyen",
          placeholder: "Ex : 'Une commerçante m'a dit «je dépense 15 000 FCFA par mois pour corriger les erreurs de mon comptable — si tu fais mieux pour ce prix, je signe aujourd'hui»' ...",
          required: true,
        },
        {
          id: "surprise",
          label: "Qu'est-ce qui t'a le plus surpris dans tes 5 interviews — ce que tu n'attendais pas, que ça soit positif ou négatif ?",
          type: "texte_moyen",
          placeholder: "Ex : je pensais que le prix était le frein principal, mais tous mes interlocuteurs parlaient surtout de la fiabilité et du manque de suivi...",
          required: true,
        },
      ],
      captureXP: 119,
      completeSummary: "5 interviews terrain",
      completeContextLabel: "Retrouve tes notes terrain et tes insights dans la section \"Mon Projet\", sous le Niveau 2.",
    },
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
    recapLabel: "🏗️ Ton Business Model Canvas",
    lesson: {
      title: "Le Business Model Canvas — construis la carte de ton projet",
      exercises: [
        // 0 — Info : les 9 blocs
        {
          type: "info",
          icon: "🏗️",
          title: "Le BMC — la carte de ton business sur une page",
          content: "Le Business Model Canvas résume ton modèle économique en 9 blocs sur une feuille A3. Il remplace 50 pages de business plan par une hypothèse visuelle que tu peux modifier en 5 minutes.\n\nLes 9 blocs : Segments clients (qui exactement ?), Proposition de valeur (quel problème tu résous ?), Canaux (comment tu atteins tes clients ?), Relations clients (comment tu les gardes ?), Sources de revenus (comment tu gagnes de l'argent ?), Ressources clés (ce dont tu as absolument besoin), Activités clés (ce que tu dois faire chaque jour), Partenaires clés (qui t'aide à faire ce que tu ne peux pas seul ?), Structure de coûts (combien ça coûte de fonctionner ?).\n\nLe BMC n'est pas un document figé — c'est une hypothèse que tu vas tester et ajuster.",
          xp: 5,
        },
        // 1 — Scénario : BMC de QuickDeliv illustré (enseigne les 9 blocs)
        {
          type: "scenario",
          context: "Moussa lance QuickDeliv, livraison de repas à Dakar. Son BMC : Segments clients — travailleurs du Plateau 25-45 ans. Proposition de valeur — repas livrés en 30 min sans quitter son bureau. Canaux — WhatsApp Business + groupes Facebook quartier. Relations clients — suivi par message. Sources de revenus — commission 15% par commande. Ressources clés — 8 traiteurs partenaires, livreurs moto. Activités clés — coordination livraisons. Partenaires clés — traiteurs et livreurs indépendants. Structure de coûts — commissions livreurs 60% revenus. Un concurrent vague dit : \"je livre des repas à tout Dakar\".",
          question: "Qu'est-ce qui rend le BMC de Moussa solide par rapport au concurrent vague ?",
          options: [
            "Il cible un segment précis, des canaux concrets et un modèle de revenus simple — chaque bloc découle du précédent",
            "Il a plus de partenaires et de livreurs, ce qui garantit la scalabilité",
            "Il utilise des outils technologiques avancés",
            "Il vise un marché large pour maximiser les opportunités",
          ],
          correctIndex: 0,
          explanation: "Un BMC solide est précis à chaque bloc. \"Tout Dakar\" est une catastrophe — tu ne peux pas gérer les canaux, les partenaires ni les coûts. Un segment clair tire tout le reste du BMC.",
          xp: 15,
        },
        // 2 — Info : segment précis (enseigne segments_bmc)
        {
          type: "info",
          icon: "🎯",
          title: "Segments clients — qui exactement, pas \"tout le monde\"",
          content: "Dans le BMC, \"segments clients\" n'est pas la case pour écrire \"tout le monde\". C'est : qui paie, qui utilise, pourquoi eux ?\n\nUn bon segment répond à 3 questions :\n1. Qui — âge, situation, lieu, revenus\n2. Contexte — dans quelle situation ont-ils ce besoin ?\n3. Décision — qu'est-ce qui les pousse à acheter ?\n\nExemple faible : \"les étudiants\"\nExemple fort : \"étudiants en BTS à Abidjan Cocody, 19-24 ans, sans carte bancaire, qui cherchent des cours de révision avant les examens de juin\"\n\nPlus ton segment est précis, plus les autres blocs du BMC deviennent évidents.",
          xp: 5,
        },
        // 3 — micro_input : brique "segments_bmc"
        {
          type: "micro_input",
          prompt: "Qui est exactement ton segment client principal pour ton BMC ? (âge, situation, lieu, contexte d'achat)",
          placeholder: "Ex : mamans d'enfants scolarisés, 30-45 ans, quartiers Yopougon et Koumassi à Abidjan, qui cherchent un traiteur fiable pour les repas de midi en période scolaire",
          storageKey: "segments_bmc",
          xp: 2,
        },
        // 4 — Scénario : canaux (enseigne canaux_bmc)
        {
          type: "scenario",
          context: "AboSoin, service de soins infirmiers à domicile à Ouagadougou. Aïcha hésite entre 3 canaux pour atteindre les familles de personnes âgées (enfants adultes 35-55 ans). Option A : développer une appli mobile pour 800 000 FCFA. Option B : groupe WhatsApp + bouche-à-oreille dans les associations de retraités (0 FCFA). Option C : démarchage direct dans les cliniques partenaires (0 FCFA). Elle a 3 mois avant d'épuiser ses économies.",
          question: "Quels canaux Aïcha devrait-elle prioriser pour ses 3 premiers mois ?",
          options: [
            "Option A — l'appli mobile est plus professionnelle et scalable",
            "Options B et C — WhatsApp et cliniques : là où le segment existe déjà, sans dépense initiale",
            "Option C uniquement — les cliniques donnent accès direct aux patients",
            "Aucun — il faut d'abord créer une page Facebook professionnelle",
          ],
          correctIndex: 1,
          explanation: "Les canaux doivent être là où ton segment EXISTE déjà. Les familles de personnes âgées sont sur WhatsApp et dans les cliniques — pas sur une appli qu'elles ne connaissent pas. Canaux zero-coût d'abord, canaux payants après validation.",
          xp: 15,
        },
        // 5 — micro_input : brique "canaux_bmc"
        {
          type: "micro_input",
          prompt: "Par quels 2 canaux principaux vas-tu atteindre ton segment ? (canaux que tu peux utiliser dès maintenant)",
          placeholder: "Ex : Canal 1 — groupes WhatsApp des associations de parents d'élèves. Canal 2 — démarchage direct dans les écoles en début de trimestre",
          storageKey: "canaux_bmc",
          xp: 2,
        },
        // 6 — MCQ : structure de coûts
        {
          type: "mcq",
          question: "Dans le BMC, la \"structure de coûts\" représente…",
          options: [
            "La liste exhaustive de tous les coûts imaginables de l'entreprise",
            "Les coûts directement liés aux ressources clés et aux activités clés — ce qu'il faut pour faire fonctionner le modèle",
            "Les salaires uniquement",
            "Le budget marketing annuel",
          ],
          correctIndex: 1,
          explanation: "La structure de coûts découle des ressources et activités clés. Si ton activité clé est \"livraison express\", ton coût principal est \"livreurs + carburant\". Les coûts sans activité correspondante sont des dépenses inutiles.",
          xp: 10,
        },
        // 7 — Vrai/faux : blocs interdépendants
        {
          type: "true_false",
          statement: "On peut remplir un bloc du BMC indépendamment des autres — chaque bloc est autonome.",
          isTrue: false,
          explanation: "Les 9 blocs sont interdépendants. Le segment client détermine les canaux, les canaux influencent les relations clients, les activités clés définissent les ressources et la structure de coûts. Changer un bloc impacte plusieurs autres.",
          xp: 5,
        },
        // 8 — Match : 4 blocs ↔ définitions
        {
          type: "match",
          pairs: [
            { left: "Proposition de valeur", right: "Le problème résolu et comment mieux que les alternatives" },
            { left: "Relations clients", right: "Comment tu acquiers, gardes et fidélises tes clients" },
            { left: "Ressources clés", right: "Les actifs indispensables — humains, financiers, intellectuels, physiques" },
            { left: "Activités clés", right: "Ce que tu dois faire chaque jour pour que le modèle fonctionne" },
          ],
          xp: 8,
        },
        // 9 — Fill blank : proposition de valeur
        {
          type: "fill_blank",
          template: "La proposition de valeur répond à : \"Pourquoi choisir MON produit plutôt que {0} ?\"",
          blanks: ["l'alternative existante (concurrent, bricolage, statu quo)"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 10 — Reorder : ordre logique du BMC
        {
          type: "reorder",
          items: [
            "Segment clients — qui est ton client cible ?",
            "Proposition de valeur — quel problème résous-tu pour ce segment ?",
            "Canaux — comment tu atteins ce segment avec cette valeur ?",
            "Structure de coûts — combien ça coûte de faire tout ça ?",
          ],
          xp: 10,
        },
        // 11 — Reflection template : BMC résumé
        {
          type: "reflection_template",
          intro: "Voilà — tu as défini ton segment et tes canaux. Assemble maintenant ton BMC résumé : complète chaque section avec ce que tu sais aujourd'hui.",
          template: "Mon segment client principal : {segments_bmc}\n\nMes canaux principaux : {canaux_bmc}\n\nMa proposition de valeur pour ce segment :\n[En une phrase : ce que tu fais, pour qui, ce qui te différencie]\n\nMon modèle de revenus :\n[Comment tu gagnes de l'argent avec ce segment via ces canaux]\n\nMes ressources et activités clés :\n[Ce dont tu as absolument besoin pour fonctionner]\n\nMa structure de coûts principale :\n[Les 2-3 postes de coûts incontournables]",
          variables: ["segments_bmc", "canaux_bmc"],
          xp: 65,
        },
      ],
    },
  },
  {
    id: 302,
    levelId: 3,
    title: "Identifie tes 3 sources de revenus potentielles",
    description: "Abonnement, commission, vente directe, freemium, publicité, licence... Laquelle est la plus adaptée à ton marché local ?",
    xp: 100,
    recapLabel: "💰 Tes sources de revenus",
    lesson: {
      title: "Sources de revenus — quel modèle pour ton marché ?",
      exercises: [
        // 0 — Info : les modèles de revenus
        {
          type: "info",
          icon: "💰",
          title: "Les modèles de revenus qui marchent en Afrique de l'Ouest",
          content: "Les 6 modèles les plus adaptés :\n\n1. Vente directe — tu vends un produit ou service à l'acte (le plus simple)\n2. Commission — tu prends un % sur chaque transaction facilitée (Jumia, Wave)\n3. Abonnement — paiement récurrent mensuel ou hebdomadaire (Canal+)\n4. Freemium — version gratuite, premium payante (risqué sans financement)\n5. Marketplace — mets en relation acheteurs et vendeurs, prends une commission\n6. Formation / conseil — monétise ton expertise directement\n\nRéalité terrain : avec Mobile Money (Wave, Orange Money, MTN MoMo), les paiements à l'acte et les micro-abonnements hebdomadaires fonctionnent bien. Les abonnements mensuels longs sont difficiles à collecter.",
          xp: 5,
        },
        // 1 — Scénario : Sama Nettoyage (enseigne modele_revenu)
        {
          type: "scenario",
          context: "Kofi lance Sama Nettoyage, service de ménage à domicile à Accra. Modèle A : abonnement mensuel 150 GHS. Problème : les clients ne connaissent pas Kofi et refusent de s'engager sans avoir testé. Modèle B : paiement à la prestation 35 GHS. Avantage : aucune friction. Problème : revenu variable. Modèle C : première prestation 20 GHS puis abonnement 120 GHS/mois. Avantage : essai sans risque, conversion vers récurrence.",
          question: "Quel modèle Kofi devrait-il adopter pour les 3 premiers mois ?",
          options: [
            "Modèle A — l'abonnement donne de la prévisibilité dès le départ",
            "Modèle B — le paiement à la prestation est le plus simple à vendre",
            "Modèle C — l'essai réduit la friction d'entrée et convertit vers la récurrence",
            "Aucun — il faudrait créer une appli d'abord pour gérer les abonnements",
          ],
          correctIndex: 2,
          explanation: "Kofi n'a pas de réputation — il doit réduire le risque perçu. Un premier paiement bas + conversion vers abonnement est la progression naturelle : acquisition facile, puis fidélisation rentable.",
          xp: 10,
        },
        // 2 — micro_input : brique "modele_revenu"
        {
          type: "micro_input",
          prompt: "Quel modèle de revenu principal vas-tu adopter ? (vente directe, commission, abonnement…) Et sous quelle forme concrète ?",
          placeholder: "Ex : Paiement à la prestation pour les 2 premiers mois, puis migration vers abonnement hebdomadaire à 2 500 FCFA via Orange Money. Première session à prix réduit pour tester.",
          storageKey: "modele_revenu",
          xp: 2,
        },
        // 3 — Info : risque freemium
        {
          type: "info",
          icon: "⚠️",
          title: "Freemium en Afrique — l'erreur qui tue les startups sans financement",
          content: "Le freemium est séduisant. En pratique, il est dangereux sans financement.\n\nLe problème : les utilisateurs gratuits ne se convertissent pas si la valeur premium n'est pas évidente. Tu brûles du temps pour servir des non-payants. Et \"gratuit\" est perçu comme \"pas sérieux\" dans certains contextes.\n\nQuand ça peut marcher : tu as 18 mois de financement minimum, la valeur premium est clairement visible, et tu as un taux de conversion >3%.\n\nSinon : commence par facturer dès le premier client. Gratuit = données, Payant = validation.",
          xp: 5,
        },
        // 4 — MCQ : sans financement
        {
          type: "mcq",
          question: "Tu lances un service de comptabilité en ligne pour PME au Sénégal sans financement. Quel modèle de revenus adopter en priorité ?",
          options: [
            "Freemium — version gratuite pour construire la base d'utilisateurs d'abord",
            "Paiement à l'acte à 15 000 FCFA par déclaration fiscale — on valide que les clients paient avant de construire plus",
            "Publicité — les PME voient des annonces, c'est gratuit pour elles",
            "Licence annuelle à 500 000 FCFA pour maximiser les revenus",
          ],
          correctIndex: 1,
          explanation: "Sans financement : faire payer le plus tôt possible. Un client qui paie 15 000 FCFA valide que le service vaut quelque chose. Des milliers d'utilisateurs gratuits qui ne paient jamais ne prouvent rien.",
          xp: 10,
        },
        // 5 — Scénario : cycles de paiement hebdo vs mensuel
        {
          type: "scenario",
          context: "Fatima vend un abonnement à sa plateforme de cours en ligne au Mali. Ses cibles (lycéens et étudiants) reçoivent de l'argent de leurs parents en début de semaine. En fin de mois, ils sont souvent à court. Test : abonnement mensuel à 5 000 FCFA → taux de renouvellement 23%. Abonnement hebdomadaire à 1 500 FCFA → taux de renouvellement 67%. Total mensuel avec l'hebdo : 6 000 FCFA par client, soit plus qu'avec le mensuel.",
          question: "Quelle leçon Fatima devrait-elle tirer sur les cycles de paiement ?",
          options: [
            "L'abonnement mensuel est plus rentable car le ticket unitaire est plus élevé",
            "Adapter la fréquence de facturation aux cycles de revenus réels des clients augmente conversion ET rétention",
            "Il vaut mieux vendre annuellement pour fidéliser",
            "Le prix hebdomadaire est trop bas pour être pris au sérieux",
          ],
          correctIndex: 1,
          explanation: "En Afrique de l'Ouest, les revenus sont souvent hebdomadaires ou irréguliers. Un abonnement calqué sur ce cycle réduit la barrière à l'entrée ET augmente la rétention. Tu gagnes plus en adaptant le rythme.",
          xp: 10,
        },
        // 6 — Vrai/faux : Mobile Money automatique
        {
          type: "true_false",
          statement: "Wave et Orange Money permettent de mettre en place des abonnements automatiques récurrents sans que le client ait besoin d'agir chaque mois.",
          isTrue: false,
          explanation: "En 2024, les plateformes Mobile Money en Afrique de l'Ouest ne proposent pas toutes de débit automatique. Il faut souvent un rappel actif (WhatsApp, SMS) pour déclencher le paiement. Anticipe cette contrainte dans ton modèle.",
          xp: 5,
        },
        // 7 — Fill blank : règle prix de survie
        {
          type: "fill_blank",
          template: "Avant de lancer, vérifie que ton prix couvre tes {0} et te laisse une {1} suffisante pour continuer à opérer.",
          blanks: ["coûts variables directs", "marge"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 8 — Match : modèles revenus ↔ descriptions
        {
          type: "match",
          pairs: [
            { left: "Commission", right: "Tu facilites une transaction et prends un % (Jumia, Airbnb)" },
            { left: "Abonnement", right: "Le client paie un montant fixe récurrent pour accéder au service" },
            { left: "Vente directe", right: "Tu vends une fois, à un prix fixé, sans engagement futur" },
            { left: "Marketplace", right: "Tu mets en relation offre et demande, les deux côtés te paient" },
          ],
          xp: 8,
        },
        // 9 — Reflection template : sources de revenus
        {
          type: "reflection_template",
          intro: "Ton modèle de revenu est posé. Formalise maintenant tes 3 sources potentielles et explique pourquoi elles correspondent à ton marché.",
          template: "Mon modèle de revenu principal : {modele_revenu}\n\nMes 3 sources de revenus potentielles :\n\n1. [Source principale — celle que tu testes maintenant]\n   Prix : ___  Fréquence : ___  Mode de paiement : ___\n\n2. [Source secondaire — à développer après les premiers clients]\n   Prix : ___  Fréquence : ___\n\n3. [Source future — quand tu as de la traction]\n   Prix : ___  Conditions : ___\n\nPourquoi ce modèle est adapté à mon marché :\n[Explique en 2-3 lignes pourquoi tes clients vont accepter ce mode de paiement]",
          variables: ["modele_revenu"],
          xp: 37,
        },
      ],
    },
  },
  {
    id: 303,
    levelId: 3,
    title: "Calcule ton budget de démarrage minimum",
    description: "En FCFA. Sépare les coûts fixes (loyer, salaires) des coûts variables (production, commissions). Quel est le minimum pour tester en conditions réelles ?",
    xp: 150,
    recapLabel: "💼 Ton budget de démarrage",
    lesson: {
      title: "Budget de démarrage — calcule ton minimum viable",
      exercises: [
        // 0 — Info : coûts fixes vs variables
        {
          type: "info",
          icon: "📊",
          title: "Coûts fixes vs coûts variables — la distinction qui donne le contrôle",
          content: "Coûts fixes : tu les paies que tu aies 0 ou 100 clients. Loyer bureau, abonnement internet, salaire fixe, logiciel SaaS mensuel.\n\nCoûts variables : ils augmentent avec chaque vente. Emballage, livraison, commission livreur, matières premières.\n\nUne startup peut être rentable sur le papier et mourir quand même parce que ses coûts fixes écrasent la marge.\n\nRègle lean de démarrage : maximise les coûts variables, minimise les coûts fixes. Préfère payer un livreur à la course (variable) plutôt que de l'embaucher (fixe). Le coworking à la journée plutôt qu'un bail commercial. Plus tu es flexible, plus tu peux pivoter.",
          xp: 5,
        },
        // 1 — Scénario : budget réel KaraFresh (enseigne couts_fixes)
        {
          type: "scenario",
          context: "Adjoua lance KaraFresh, livraison de légumes frais à Cotonou. Budget 3 mois — Coûts fixes mensuels : WhatsApp Business + data (5 000 FCFA) + stockage frigo chez sa tante (10 000 FCFA) = 15 000 FCFA × 3 = 45 000 FCFA. Coûts variables par commande : légumes (70% prix de vente) + livraison moto (500 FCFA) + sac (200 FCFA). Estimation 150 commandes × 2 500 FCFA coûts = 375 000 FCFA. Marketing initial : photos produits 15 000 FCFA. TOTAL 3 mois : 435 000 FCFA. Adjoua dispose de 600 000 FCFA d'économies.",
          question: "Qu'est-ce que ce budget montre sur la structure de coûts de KaraFresh ?",
          options: [
            "Ses coûts fixes sont trop élevés — elle doit réduire son loyer",
            "Ses coûts variables dominent — sain au démarrage, elle ne dépense que quand elle vend",
            "Elle a mal calculé — les startups ne peuvent pas démarrer avec si peu",
            "Elle devrait investir plus en marketing pour accélérer",
          ],
          correctIndex: 1,
          explanation: "Quand les coûts variables dominent, zéro vente = dépenses minimales (15 000 FCFA/mois de fixes seulement). C'est la structure idéale au démarrage : le risque est limité et proportionnel à l'activité réelle.",
          xp: 15,
        },
        // 2 — micro_input : brique "couts_fixes"
        {
          type: "micro_input",
          prompt: "Quels sont tes 3 coûts fixes mensuels incompressibles pour démarrer ? (en FCFA)",
          placeholder: "Ex : 1) Connexion internet + WhatsApp Business : 8 000 FCFA/mois. 2) Espace stockage chez un proche : 15 000 FCFA/mois. 3) Outil de gestion : 5 000 FCFA/mois. Total fixe mensuel : 28 000 FCFA",
          storageKey: "couts_fixes",
          xp: 2,
        },
        // 3 — Info : budget lean (enseigne budget_minimal)
        {
          type: "info",
          icon: "✂️",
          title: "Le budget lean — les 7 dépenses à éviter avant d'avoir des clients",
          content: "Avant tes 10 premiers clients payants, ces dépenses sont prématurées :\n\n1. Bureau commercial — travaille depuis chez toi ou en coworking à la journée\n2. Employé fixe — commence avec des freelances à la commission\n3. Développement appli sur mesure — utilise WhatsApp, Google Forms, Notion d'abord\n4. Logo et charte pro — Canva suffit pour tester\n5. Stock important — commande au fur et à mesure\n6. Publicité payante — valide d'abord ton offre en organique\n7. Formation non essentielle — apprends en faisant\n\nLa règle : toute dépense avant le premier client doit être justifiée par \"je ne peux pas avoir de clients sans ça\". Sinon, ne dépense pas encore.",
          xp: 5,
        },
        // 4 — Scénario : Ibrahima 2M vs Mariam 80k (enseigne budget_minimal)
        {
          type: "scenario",
          context: "Deux entrepreneurs lancent un service de comptabilité pour artisans à Bamako. Ibrahima : loue un bureau (150k FCFA/mois), développe une appli (800k), imprime 1 000 flyers (120k), achète matériel (500k). 4 mois de préparation = 2,1M FCFA dépensés. Au 5e mois il découvre que les artisans préfèrent WhatsApp à une appli. Mariam : travaille depuis chez elle (0 FCFA), groupe WhatsApp de 15 artisans (0 FCFA), 3 suivis gratuits pour valider (0 FCFA). Semaine 4 : 2 clients payants à 25k FCFA/mois. Budget total mois 1 : 80 000 FCFA. Mois 3 : 8 clients, 200k FCFA de revenus mensuels.",
          question: "Quel est le principe clé que Mariam applique et qu'Ibrahima a ignoré ?",
          options: [
            "Mariam a moins d'ambition — Ibrahima pense grand",
            "Tester avec un investissement minimal avant de dépenser en infrastructure — le budget suit la validation, pas l'inverse",
            "Mariam a de la chance d'avoir des contacts dans son quartier",
            "Ibrahima a tort de développer une appli — il faut toujours commencer par WhatsApp",
          ],
          correctIndex: 1,
          explanation: "Le budget minimum = ce qu'il faut pour avoir tes 3 premiers retours clients, pas pour construire une \"vraie\" entreprise. Mariam a dépensé 80k pour apprendre ce que les artisans veulent. Ibrahima a dépensé 2,1M pour construire ce qu'il croyait qu'ils voulaient.",
          xp: 15,
        },
        // 5 — micro_input : brique "budget_minimal"
        {
          type: "micro_input",
          prompt: "Quel est ton budget minimum pour les 3 premiers mois ? (en FCFA) — calcule : coûts fixes × 3 + coûts variables estimés + marketing initial",
          placeholder: "Ex : Fixes 3 mois : 84 000 FCFA. Variables estimés (50 commandes × 1 500 FCFA) : 75 000 FCFA. Marketing : 20 000 FCFA. TOTAL : 179 000 FCFA. J'ai 250 000 FCFA disponibles.",
          storageKey: "budget_minimal",
          xp: 2,
        },
        // 6 — MCQ : point mort
        {
          type: "mcq",
          question: "Qu'est-ce que le point mort (break-even) pour une startup ?",
          options: [
            "Le moment où l'entreprise a épuisé toutes ses économies",
            "Le niveau de ventes où les revenus couvrent exactement tous les coûts — au-delà, on est rentable",
            "Le nombre de clients minimum pour lever des fonds",
            "La date limite pour lancer avant de perdre son marché",
          ],
          correctIndex: 1,
          explanation: "Point mort = coûts fixes ÷ (prix unitaire – coûts variables unitaires). Exemple : fixes 50k FCFA/mois, prix 5k, coût variable 2k → point mort = 50k ÷ 3k = 17 ventes/mois. En dessous tu perds, au-dessus tu gagnes.",
          xp: 10,
        },
        // 7 — Vrai/faux : gros budget
        {
          type: "true_false",
          statement: "Il vaut mieux avoir un gros budget de démarrage pour maximiser ses chances de succès.",
          isTrue: false,
          explanation: "Les startups qui démarrent avec beaucoup de capital tendent à dépenser inutilement avant de valider leur marché. Un budget contraint force la créativité et la prioritisation. L'argent est utile après la validation — pas avant.",
          xp: 5,
        },
        // 8 — Fill blank : formule point mort
        {
          type: "fill_blank",
          template: "Point mort (en nombre de ventes) = Coûts {0} ÷ (Prix de vente – Coûts {1} unitaires)",
          blanks: ["fixes", "variables"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 9 — Match : coût fixe vs variable
        {
          type: "match",
          pairs: [
            { left: "Loyer mensuel du bureau", right: "Coût fixe" },
            { left: "Commission livreur par course", right: "Coût variable" },
            { left: "Abonnement outil SaaS mensuel", right: "Coût fixe" },
            { left: "Matières premières par produit fabriqué", right: "Coût variable" },
          ],
          xp: 8,
        },
        // 10 — Reorder : ordre pour construire son budget
        {
          type: "reorder",
          items: [
            "Lister tous les coûts fixes incompressibles (ce qu'on paie même sans vente)",
            "Estimer les coûts variables par unité vendue",
            "Calculer le point mort mensuel",
            "Décider du budget de lancement selon ses économies disponibles",
          ],
          xp: 10,
        },
        // 11 — Reflection template : budget de démarrage
        {
          type: "reflection_template",
          intro: "Ton budget de démarrage est maintenant calculé. Voici le livrable complet à conserver comme référence pour tes 3 premiers mois.",
          template: "Mes coûts fixes mensuels : {couts_fixes}\n\nMon budget minimum 3 mois : {budget_minimal}\n\nMes coûts variables par unité vendue :\n- Coût 1 : ___  FCFA\n- Coût 2 : ___  FCFA\n- Total coût variable unitaire : ___  FCFA\n\nMon prix de vente unitaire : ___  FCFA\n\nMon point mort mensuel :\n[Coûts fixes] ÷ ([Prix] – [Coût variable]) = ___ ventes/mois\n\nCe que j'ai décidé de NE PAS dépenser avant mes 10 premiers clients :\n[Liste les dépenses reportées et pourquoi]",
          variables: ["couts_fixes", "budget_minimal"],
          xp: 65,
        },
      ],
    },
  },
  {
    id: 304,
    levelId: 3,
    title: "Définis ta stratégie de pricing",
    description: "Pour le marché local. Ni trop cher (inaccessible), ni trop bas (non crédible). Teste plusieurs niveaux de prix dans tes interviews.",
    xp: 100,
    recapLabel: "🏷️ Ta stratégie de prix",
    lesson: {
      title: "Pricing — trouve le prix juste pour ton marché local",
      exercises: [
        // 0 — Info : 3 méthodes de pricing
        {
          type: "info",
          icon: "🏷️",
          title: "3 méthodes pour fixer ton prix",
          content: "Il n'existe pas UN bon prix — il existe une bonne méthode pour le trouver.\n\nMéthode 1 — Par les coûts : Prix = Coûts variables unitaires + Marge souhaitée. Avantage : tu ne perds jamais d'argent par vente. Limite : ignore ce que le client est prêt à payer.\n\nMéthode 2 — Par le marché : tu regardes tes concurrents et tu te positionnes (moins cher, pareil, premium). Avantage : ancrage réel. Limite : tu assumes que le marché est bien tariffé.\n\nMéthode 3 — Par la valeur perçue : tu factures ce que le client GAGNE (économie de temps, de revenu, de stress). Si ton service fait gagner 200k FCFA, tu peux facturer 30k FCFA.\n\nEn Afrique de l'Ouest : la méthode par les coûts est le plancher, la valeur perçue est le plafond. Le benchmark calibre par rapport aux alternatives.",
          xp: 5,
        },
        // 1 — Scénario : Aminata se sous-estime (enseigne prix_cible)
        {
          type: "scenario",
          context: "Aminata, graphiste freelance à Lomé avec 15 ans d'expérience. Elle fixe son logo à 5 000 FCFA (studio agréé : 40-80k FCFA). Résultat : clients qui marchandent encore à la baisse, perception \"bon marché\", un client a dit \"si c'est aussi peu cher c'est pas sérieux\", elle doit faire 20 logos/mois pour survivre. Elle teste 25 000 FCFA : elle perd 2 prospects sur 3, gagne 1 nouveau qui dit \"avec ce prix je sais que tu es professionnelle\". Elle fait moins de logos mais gagne plus, avec des clients qui respectent son travail.",
          question: "Quelle leçon sur le pricing Aminata a-t-elle apprise ?",
          options: [
            "Il faut toujours fixer son prix en dessous du marché pour avoir plus de clients",
            "Un prix bas peut nuire à la crédibilité autant qu'un prix trop élevé — le prix est un signal de valeur",
            "Il ne faut jamais baisser ses prix même pour des clients difficiles",
            "Le prix le plus haut du marché est toujours le meilleur à adopter",
          ],
          correctIndex: 1,
          explanation: "Le prix est un signal de qualité. Trop bas = pas sérieux. Le bon prix n'est pas le plus bas : c'est celui que ton client-cible peut payer ET qui correspond à la valeur qu'il perçoit.",
          xp: 10,
        },
        // 2 — micro_input : brique "prix_cible"
        {
          type: "micro_input",
          prompt: "Quel est ton prix de vente principal ? Quelle méthode (coûts / marché / valeur perçue) t'a guidé ?",
          placeholder: "Ex : 15 000 FCFA par séance de coaching. Méthode : valeur perçue. Un entrepreneur qui applique mes conseils peut économiser 50k+ FCFA en erreurs. Je facture 30% de cette valeur. Benchmark Abidjan : 20-50k FCFA.",
          storageKey: "prix_cible",
          xp: 2,
        },
        // 3 — Info : pricing psychologique africain (enseigne justification_prix)
        {
          type: "info",
          icon: "🧠",
          title: "Pricing psychologique en Afrique de l'Ouest — 3 réalités",
          content: "1. Les cycles de revenus sont souvent hebdomadaires. Beaucoup de travailleurs informels gèrent leur cash à la semaine. 2 000 FCFA/semaine est souvent plus accessible que 8 000 FCFA/mois — même si c'est pareil annuellement.\n\n2. La négociation est culturelle, pas personnelle. Proposer un prix c'est ouvrir une négociation. Stratégie : fixe un prix légèrement supérieur à ta cible pour absorber la négociation. Ou affiche \"prix fixe\" clairement pour un positionnement premium.\n\n3. Le fractionnement augmente l'accessibilité. 100 000 FCFA d'un coup vs 4 × 25 000 FCFA. Canal+ en Afrique a construit son empire sur ce principe.",
          xp: 5,
        },
        // 4 — Scénario : SoyoSkin cycles (enseigne justification_prix)
        {
          type: "scenario",
          context: "Diallo vend un pack de soins naturels à Conakry, coût de production 45k GNF. Son pack mensuel à 120k GNF ne se vend pas — clients disent \"trop cher d'un coup\". Test 1 : pack hebdo 30k GNF → même refus (le client calcule le mensuel et dit non). Test 2 : pack démarrage 35k GNF + recharge 20k GNF toutes les 2 semaines → 23 ventes en 3 semaines. Test 3 : abonnement mensuel 25k GNF livraison incluse → 8 abonnées fidèles mais revenu mensuel bas. Revenu mensuel Test 2 : 35k + 2×20k = 75k GNF.",
          question: "Quelle approche Diallo devrait adopter pour maximiser à la fois le volume et la marge ?",
          options: [
            "Test 1 — le weekly est le plus simple à gérer",
            "Test 2 — pack starter + recharges : barrière d'entrée basse, récurrence naturelle à 20k GNF toutes les 2 semaines",
            "Test 3 — l'abonnement mensuel fidélise les clients sur le long terme",
            "Baisser encore plus les prix pour accélérer les ventes",
          ],
          correctIndex: 1,
          explanation: "Le pack starter réduit la barrière d'entrée et crée une habitude. La recharge s'intègre naturellement dans le budget. Revenu mensuel réel : 75k GNF — bien supérieur à l'abonnement 25k.",
          xp: 10,
        },
        // 5 — micro_input : brique "justification_prix"
        {
          type: "micro_input",
          prompt: "En une phrase : pourquoi ton client accepterait-il ce prix ? (économie réalisée, valeur obtenue, alternative plus chère…)",
          placeholder: "Ex : Mon client paie 15 000 FCFA pour une consultation qui lui évite 3 mois d'erreurs et une perte potentielle de 100k+ FCFA. Il ne trouverait pas ce niveau d'accompagnement pour moins de 30k FCFA dans un cabinet.",
          storageKey: "justification_prix",
          xp: 2,
        },
        // 6 — MCQ : prix premium justifié
        {
          type: "mcq",
          question: "Tu proposes un logiciel de gestion de stock pour boutiques à Abidjan. Concurrent : 50 000 FCFA/an. Ton produit : même chose mais interface plus simple et support WhatsApp inclus. Quel prix adopter ?",
          options: [
            "35 000 FCFA/an — moins cher que la concurrence pour prendre des parts de marché",
            "50 000 FCFA/an — s'aligner sur le marché",
            "65 000 FCFA/an — premium justifié par le support WhatsApp et l'interface simplifiée",
            "Gratuit la première année pour construire la base d'utilisateurs",
          ],
          correctIndex: 2,
          explanation: "Si ton produit apporte une valeur supérieure (support = économie de temps réelle pour le commerçant), un prix premium est justifié. La condition : être capable de démontrer cette valeur en 30 secondes.",
          xp: 10,
        },
        // 7 — Vrai/faux : baisser le prix toujours bon
        {
          type: "true_false",
          statement: "Baisser son prix est toujours la meilleure stratégie pour gagner des clients quand on démarre.",
          isTrue: false,
          explanation: "Baisser son prix est une stratégie de dernier recours. Si tes clients n'achètent pas, c'est rarement parce que c'est trop cher — c'est souvent parce que la valeur perçue n'est pas claire. Cherche d'abord à mieux communiquer la valeur.",
          xp: 5,
        },
        // 8 — Fill blank : règles d'or du pricing
        {
          type: "fill_blank",
          template: "Ton prix ne doit jamais être inférieur à tes {0} et ne devrait pas dépasser la {1} perçue par ton client.",
          blanks: ["coûts variables", "valeur"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 9 — Match : méthodes pricing ↔ cas d'usage
        {
          type: "match",
          pairs: [
            { left: "Prix par les coûts", right: "Artisan qui veut s'assurer de ne jamais perdre d'argent sur une commande" },
            { left: "Prix par le marché", right: "Entrepreneur entrant sur un marché mature avec des concurrents établis" },
            { left: "Prix par la valeur perçue", right: "Consultant qui fait économiser des centaines de milliers à ses clients" },
            { left: "Pricing fractionné", right: "Service premium avec ticket élevé rendu accessible par paiements échelonnés" },
          ],
          xp: 8,
        },
        // 10 — Reflection template : stratégie de prix
        {
          type: "reflection_template",
          intro: "Ta stratégie de prix est construite. Voici ton livrable complet — prix, justification et adaptation au marché local.",
          template: "Mon prix de vente principal : {prix_cible}\n\nPourquoi mon client accepte ce prix : {justification_prix}\n\nMa méthode de calcul du prix minimum (par les coûts) :\nCoûts variables par vente : ___  FCFA\nMarge souhaitée : ___  %\nPrix minimum : ___  FCFA\n\nAdaptations pour le marché local :\n- Cycles de revenus (hebdo/mensuel/irrégulier) : [décris ton fractionnement éventuel]\n- Ma politique de négociation : [prix fixe / marge de X% / remise premier client]\n\nMon plan de test de prix avec les 5 premiers clients :\n[Comment vas-tu valider que ce prix est le bon ?]",
          variables: ["prix_cible", "justification_prix"],
          xp: 35,
        },
      ],
    },
  },
  {
    id: 305,
    levelId: 3,
    title: "Identifie 3 partenaires clés potentiels",
    description: "Et comment les approcher. Dans le contexte UEMOA, les réseaux de confiance (famille, associations, anciens) sont souvent plus efficaces que les approches formelles.",
    xp: 75,
    recapLabel: "🤝 Tes partenaires clés",
    lesson: {
      title: "Partenaires clés — construis ton réseau stratégique",
      exercises: [
        // 0 — Info : pourquoi un partenaire clé
        {
          type: "info",
          icon: "🤝",
          title: "Pourquoi un partenaire clé — ce que tu ne peux pas faire seul",
          content: "Un partenaire clé te donne accès à quelque chose que tu ne pourrais pas créer seul — ou pas assez vite.\n\nCe qu'un partenaire peut t'apporter :\n- Distribution — accès à une base de clients qu'il a déjà\n- Crédibilité — son nom légitime ton offre\n- Ressources — équipement, locaux, stock\n- Compétence — tech, juridique, logistique\n- Réseau — ses contacts deviennent accessibles\n\nExemple africain : une startup de crédit agricole au Mali qui s'associe avec une coopérative de 500 agriculteurs ne doit pas trouver 500 clients — elle en a déjà 500.\n\nRègle : un vrai partenaire clé est quelqu'un dont l'absence mettrait ton modèle en danger. Si tu peux fonctionner sans lui, c'est un fournisseur, pas un partenaire clé.",
          xp: 5,
        },
        // 1 — Scénario : MakiTech avec vs sans association (enseigne partenaire_cle)
        {
          type: "scenario",
          context: "Koffi lance MakiTech, logiciel de caisse pour commerçants à Lomé. Sans partenaire : 6 semaines de démarchage = 4 clients, taux de refus 85%, raison : \"Je ne te connais pas\". Avec l'Association des Commerçants du Marché d'Assiyéyé : Koffi propose une démo gratuite à tous les membres + 10% de commission par abonnement souscrit. Résultat : présentation à 45 commerçants, 12 clients en 2 semaines, taux de conversion 27%. L'association a apporté : crédibilité immédiate, accès direct au segment, incentive à promouvoir.",
          question: "Qu'est-ce que l'association a apporté que Koffi ne pouvait pas créer seul rapidement ?",
          options: [
            "Un financement pour développer l'application",
            "La confiance préexistante — les commerçants font confiance à l'association, et cette confiance s'est transférée à Koffi",
            "Des locaux pour les formations",
            "Une expertise technique pour améliorer le logiciel",
          ],
          correctIndex: 1,
          explanation: "En Afrique de l'Ouest, la confiance est la monnaie principale. Un partenaire dans un réseau de confiance peut compresser 6 mois d'acquisition client en 2 semaines.",
          xp: 10,
        },
        // 2 — micro_input : brique "partenaire_cle"
        {
          type: "micro_input",
          prompt: "Qui est ton partenaire le plus important pour démarrer ? (organisation, association, entreprise, personne clé)",
          placeholder: "Ex : L'Association des Femmes Entrepreneures de Cotonou (AFEC) — 300 membres correspondant exactement à mon segment. Une recommandation de leur présidente vaut 6 mois de démarchage individuel.",
          storageKey: "partenaire_cle",
          xp: 2,
        },
        // 3 — Info : 4 types de partenaires
        {
          type: "info",
          icon: "🔗",
          title: "Les 4 types de partenaires clés",
          content: "Type 1 — Partenaire de distribution : il a déjà les clients que tu vises. Exemples : associations professionnelles, boutiques partenaires, opérateurs télécom.\n\nType 2 — Partenaire fournisseur : il te fournit des ressources clés que tu ne peux pas produire seul (matières premières, tech, données).\n\nType 3 — Partenaire technologique : il apporte la tech que tu n'as pas. Une startup non-tech s'associe avec un développeur.\n\nType 4 — Partenaire institutionnel : ONG, école, mairie, banque — ils apportent crédibilité et légitimité. Plus lents à convaincre mais très puissants.\n\nEn pratique au démarrage : cherche d'abord un partenaire de distribution. C'est lui qui débloque le plus vite les premiers clients et les premiers revenus.",
          xp: 5,
        },
        // 4 — MCQ : quel partenaire pour une marketplace
        {
          type: "mcq",
          question: "Tu lances une plateforme de mise en relation entre plombiers et particuliers à Abidjan. Quel partenaire t'aiderait le plus à démarrer rapidement ?",
          options: [
            "Une banque locale pour obtenir un financement",
            "Le syndicat des plombiers d'Abidjan — il a un annuaire de 200 plombiers que tu peux intégrer comme prestataires",
            "Une agence de communication pour créer ta marque",
            "Un développeur pour améliorer ton application",
          ],
          correctIndex: 1,
          explanation: "Pour une marketplace, ton premier défi est de remplir les deux côtés (offre ET demande). Le syndicat te donne instantanément l'offre (200 plombiers). Un partenaire qui résout ton problème le plus urgent est toujours le bon premier partenaire.",
          xp: 10,
        },
        // 5 — Scénario : Fatoumata sans argent (enseigne valeur_partenaire)
        {
          type: "scenario",
          context: "Fatoumata vend un kit de jardinage urbain à Dakar. Sans budget pour payer des distributeurs. Elle propose à 5 jardineries : 1) Commission 20% sur chaque vente. 2) Formation gratuite sur le jardinage urbain pour leurs employés. 3) Co-branding \"Disponible chez [Nom]\" sur ses flyers et réseaux. 4) Exclusivité de quartier — une seule jardinerie par zone. Résultat : 3 sur 5 ont dit oui immédiatement. 2 refus : boutiques trop petites pour stocker. Premier mois : 34 kits vendus via les 3 partenaires.",
          question: "Quel est le principe clé de l'approche de Fatoumata ?",
          options: [
            "Elle a proposé une commission élevée pour les convaincre",
            "Elle a créé une proposition où chaque partenaire gagne quelque chose de valeur (argent, formation, visibilité, exclusivité) sans coût fixe pour Fatoumata",
            "Elle a choisi les plus grandes jardineries pour maximiser les ventes",
            "Elle a signé des contrats exclusifs pour les fidéliser",
          ],
          correctIndex: 1,
          explanation: "Convaincre un partenaire sans argent : comprendre ce qu'IL veut. Fatoumata n'a pas demandé une faveur — elle a proposé un échange à valeur mutuelle. C'est ça, un vrai partenariat.",
          xp: 10,
        },
        // 6 — micro_input : brique "valeur_partenaire"
        {
          type: "micro_input",
          prompt: "Qu'est-ce que tu peux offrir en échange à ce partenaire ? (commission, visibilité, formation, exclusivité, co-création…)",
          placeholder: "Ex : Commission de 15% sur chaque client qu'il m'apporte + son logo sur mon site comme \"Partenaire officiel\" + accès gratuit à ma formation pendant 1 an pour ses équipes.",
          storageKey: "valeur_partenaire",
          xp: 2,
        },
        // 7 — Vrai/faux : produit fini avant partenaire
        {
          type: "true_false",
          statement: "Pour approcher un partenaire potentiel, il faut d'abord avoir un produit fini et des clients.",
          isTrue: false,
          explanation: "Les meilleurs partenariats se construisent tôt — souvent avant le produit fini. Un partenaire impliqué dès le début devient un défenseur du projet. Des données de validation client préliminaires suffisent pour convaincre.",
          xp: 5,
        },
        // 8 — Fill blank : règle vrai partenaire clé
        {
          type: "fill_blank",
          template: "Un partenaire clé est quelqu'un dont l'absence rendrait ton {0} impossible. Si tu peux fonctionner facilement sans lui, c'est un {1}, pas un partenaire clé.",
          blanks: ["modèle économique", "fournisseur"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 9 — Reflection template : partenaires clés
        {
          type: "reflection_template",
          intro: "Tes partenaires clés sont identifiés. Voici ton plan d'approche — qui, ce qu'il t'apporte, ce que tu lui offres, comment tu vas le contacter.",
          template: "Mon partenaire le plus important : {partenaire_cle}\n\nCe que je lui offre en échange : {valeur_partenaire}\n\nMes 3 partenaires clés potentiels :\n\n1. [Nom ou type]\n   Type : distribution / fournisseur / tech / institutionnel\n   Ce qu'il m'apporte : ___\n   Ce que je lui offre : ___\n   Comment l'approcher : ___\n\n2. [Nom ou type]\n   Type : ___\n   Ce qu'il m'apporte : ___\n   Ce que je lui offre : ___\n   Comment l'approcher : ___\n\n3. [Nom ou type]\n   Type : ___\n   Ce qu'il m'apporte : ___\n   Ce que je lui offre : ___\n   Comment l'approcher : ___",
          variables: ["partenaire_cle", "valeur_partenaire"],
          xp: 18,
        },
      ],
    },
  },

    // --- Niveau 4 ---
  {
    id: 401,
    levelId: 4,
    title: "Priorise tes fonctionnalités (méthode MoSCoW)",
    description: "Tu ne peux pas tout construire. Le secret d'un MVP, c'est de choisir les 2-3 choses indispensables et d'ignorer le reste — pour l'instant.",
    xp: 100,
    recapLabel: "📋 Tes fonctionnalités prioritaires",
    lesson: {
      title: "MoSCoW — séparer le vital du superflu",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "🎯",
          title: "Qu'est-ce qu'un MVP, vraiment ?",
          content:
            "MVP = Minimum Viable Product = la plus petite version de ton produit qui résout déjà le problème central de ton client. Pas une version bâclée — une version concentrée. Un MVP n'est pas 'ton produit en moins bien', c'est 'ton produit réduit à sa promesse essentielle'. Si tu veux livrer des repas, ton MVP n'a pas besoin d'une app avec paiement intégré, suivi GPS et programme de fidélité. Il a besoin de : prendre une commande, livrer un repas chaud. Le reste attend.",
          xp: 5,
        },
        // 1 — MCQ (enseigne "définition MVP / Must have")
        {
          type: "mcq",
          question: "Awa veut lancer une plateforme de cours particuliers à Abidjan. Quelle est la meilleure définition de son MVP ?",
          options: [
            "Une app complète avec profils de profs, paiement, visio intégrée et notes.",
            "Un groupe WhatsApp où elle met en relation 5 profs et 10 élèves, et encaisse en Mobile Money.",
            "Un site web vitrine qui présente le concept avec un formulaire de contact.",
          ],
          correctIndex: 1,
          explanation:
            "Le MVP d'Awa doit prouver une seule chose : des parents sont prêts à payer pour qu'elle trouve un bon prof à leur enfant. Le groupe WhatsApp fait exactement ça, sans une ligne de code. Le site vitrine ne prouve rien (personne ne paie). L'app complète coûte 6 mois et des millions avant de savoir si le besoin existe.",
          xp: 10,
        },
        // 2 — Info (enseigne MoSCoW)
        {
          type: "info",
          icon: "📊",
          title: "La méthode MoSCoW",
          content:
            "Pour décider quoi construire, classe chaque fonctionnalité en 4 catégories : Must have (sans ça, le produit ne résout pas le problème — vital), Should have (important mais le produit marche sans, au début), Could have (sympa, à ajouter si le temps le permet), Won't have (pas maintenant — volontairement reporté). Ton MVP = uniquement les 'Must have'. Tout le reste est une distraction tant que tu n'as pas validé que les Must have suffisent à convaincre.",
          xp: 5,
        },
        // 3 — Scénario (renforce Must have via cas Kofi)
        {
          type: "scenario",
          context:
            "Kofi lance une app de réservation de coiffeurs à Lomé. Il liste ses idées : (1) réserver un créneau, (2) payer en ligne, (3) voir les photos des coupes, (4) programme de fidélité, (5) notation des coiffeurs, (6) chat avec le coiffeur.",
          question: "Quelle fonctionnalité est le seul vrai 'Must have' pour le MVP de Kofi ?",
          options: [
            "Réserver un créneau — c'est le cœur du problème (éviter d'attendre des heures au salon).",
            "Payer en ligne — utile, mais on peut payer sur place au début.",
            "Le programme de fidélité — ça vient quand on a déjà des clients fidèles.",
          ],
          correctIndex: 0,
          explanation:
            "Le problème que Kofi résout, c'est l'attente. 'Réserver un créneau' résout ça directement. Tout le reste améliore l'expérience mais ne résout pas le problème central. Au lancement, Kofi peut encaisser en espèces ou Mobile Money sur place. Construire d'abord le paiement en ligne, c'est repousser le lancement pour une fonctionnalité secondaire.",
          xp: 10,
        },
        // 4 — Micro-input : brique "must_have" (suit INFO+SCENARIO sur Must have)
        {
          type: "micro_input",
          prompt:
            "Quelle est LA fonctionnalité absolument vitale de ton MVP — celle sans laquelle ton produit ne résout pas le problème central de ton client ?",
          placeholder:
            "Ex : permettre à une commerçante d'enregistrer une vente en 10 secondes par message vocal WhatsApp — sans ça, mon outil de suivi de ventes ne sert à rien...",
          storageKey: "must_have",
          xp: 2,
        },
        // 5 — Vrai/Faux
        {
          type: "true_false",
          statement: "Un bon MVP doit avoir le maximum de fonctionnalités pour impressionner les premiers utilisateurs.",
          isTrue: false,
          explanation:
            "Faux. Un MVP impressionne par sa capacité à résoudre UN problème, pas par sa richesse. Trop de fonctionnalités au départ = développement plus long, plus de bugs, message confus. Les utilisateurs adoptent un outil qui résout bien leur problème principal, pas un couteau suisse qui fait tout à moitié.",
          xp: 5,
        },
        // 6 — Reorder
        {
          type: "reorder",
          items: [
            "Lister toutes les fonctionnalités imaginées pour le produit",
            "Classer chacune en Must / Should / Could / Won't (MoSCoW)",
            "Garder UNIQUEMENT les Must have pour le MVP",
            "Vérifier que ces Must have suffisent à résoudre le problème central",
            "Reporter consciemment tout le reste à plus tard",
          ],
          xp: 8,
        },
        // 7 — Match (enseigne les 4 catégories MoSCoW)
        {
          type: "match",
          pairs: [
            { left: "Must have", right: "Sans ça, le produit ne résout pas le problème" },
            { left: "Should have", right: "Important, mais le produit marche sans au début" },
            { left: "Could have", right: "Sympa, à ajouter si le temps le permet" },
            { left: "Won't have (for now)", right: "Reporté volontairement à plus tard" },
          ],
          xp: 8,
        },
        // 8 — Micro-input : brique "wont_have" (suit le MATCH sur les 4 catégories MoSCoW)
        {
          type: "micro_input",
          prompt:
            "Quelles 2-3 fonctionnalités tu vas volontairement REPORTER (Won't have) pour sortir ton MVP plus vite ? Sois honnête sur ce que tu lâches pour l'instant.",
          placeholder:
            "Ex : je reporte le paiement en ligne (j'encaisse en Mobile Money sur place), le programme de fidélité, et le tableau de bord statistiques — pas vital pour mes 10 premiers clients...",
          storageKey: "wont_have",
          xp: 2,
        },
        // 9 — Reflection template : assemblage MoSCoW
        {
          type: "reflection_template",
          intro:
            "Tu sais maintenant ce que tu construis — et ce que tu ne construis pas encore. Voilà ta feuille de route MVP assemblée.",
          template:
            "Le cœur de mon MVP (Must have) : {must_have}.\n\nCe que je reporte volontairement pour aller plus vite (Won't have) : {wont_have}.\n\nMon principe : sortir vite la plus petite version qui résout déjà le problème central.",
          variables: ["must_have", "wont_have"],
          xp: 45,
        },
      ],
    },
  },

  {
    id: 402,
    levelId: 4,
    title: "Choisis ton format MVP",
    description: "Pas besoin de coder. Le meilleur MVP est souvent celui que tu peux lancer cette semaine, avec les outils que tu maîtrises déjà.",
    xp: 125,
    recapLabel: "🔧 Ton format MVP",
    lesson: {
      title: "Les formats MVP — du plus simple au plus complexe",
      exercises: [
        // 0 — Info
        {
          type: "info",
          icon: "📱",
          title: "Tu n'as (souvent) pas besoin de coder",
          content:
            "La plus grande erreur des entrepreneurs débutants : croire qu'il faut une app pour lancer. Faux. Les MVP les plus malins utilisent des outils existants : WhatsApp Business, un Google Form, une page Notion, un compte Instagram. Ces outils sont gratuits, instantanés, et tes clients les utilisent déjà. Coder vient après — quand tu as prouvé que les gens veulent ton service et que les outils manuels ne suffisent plus à suivre la demande.",
          xp: 5,
        },
        // 1 — Info (enseigne les 5 formats)
        {
          type: "info",
          icon: "🛠️",
          title: "Les 5 formats MVP les plus accessibles",
          content:
            "1. Landing page : une page qui décrit ton offre + un bouton 'Je veux' → tu mesures l'intérêt avant de construire. 2. Service manuel (concierge) : tu fais le travail à la main, sans automatisation, pour tes premiers clients. 3. WhatsApp Business : catalogue, commandes, paiement Mobile Money — pour la plupart des commerces. 4. No-code (Glide, Tally, Softr, Bubble) : une vraie app sans coder, en quelques jours. 5. MVP 'Magicien d'Oz' : le client croit que c'est automatique, mais c'est toi derrière qui fais tout manuellement.",
          xp: 5,
        },
        // 2 — Scénario (enseigne WhatsApp Business via cas Fatou)
        {
          type: "scenario",
          context:
            "Fatou veut lancer un service de livraison de paniers de légumes frais à Cotonou. Elle hésite : (A) développer une app de commande (700 000 FCFA, 2 mois), (B) un compte WhatsApp Business avec catalogue photo, commande par message, paiement Mobile Money, livraison le samedi.",
          question: "Quel format MVP Fatou devrait-elle choisir pour démarrer ?",
          options: [
            "WhatsApp Business — elle peut lancer ce week-end, sans dépense, avec un canal que ses clientes utilisent déjà.",
            "L'app — c'est plus professionnel et ça impressionnera les investisseurs.",
            "Attendre d'avoir économisé assez pour faire les deux en même temps.",
          ],
          correctIndex: 0,
          explanation:
            "WhatsApp Business permet à Fatou de tester son vrai problème (est-ce que des gens commandent et paient des paniers ?) en quelques jours, gratuitement. Si elle a 30 commandes le premier mois, ALORS l'app devient un investissement justifié. Construire l'app d'abord, c'est risquer 700 000 FCFA sur une hypothèse non validée.",
          xp: 10,
        },
        // 3 — MCQ (enseigne landing page)
        {
          type: "mcq",
          question: "Dans quel cas une landing page est-elle le MVP le plus pertinent ?",
          options: [
            "Quand tu veux encaisser tes premiers paiements immédiatement.",
            "Quand tu veux mesurer l'intérêt pour une offre AVANT de la construire (combien de gens cliquent 'Je veux').",
            "Quand tu as déjà 100 clients et besoin de les gérer.",
          ],
          correctIndex: 1,
          explanation:
            "Une landing page teste la demande : tu décris ton offre, tu mets un bouton d'action, et tu mesures combien de personnes s'inscrivent ou laissent leur contact. C'est parfait pour valider l'intérêt avant de construire quoi que ce soit. Si personne ne clique, tu as économisé des mois.",
          xp: 10,
        },
        // 4 — Info (enseigne le MVP concierge)
        {
          type: "info",
          icon: "🤝",
          title: "Le MVP 'Concierge' : fais tout à la main d'abord",
          content:
            "Avant d'automatiser, fais le travail manuellement pour tes 5-10 premiers clients. Tu veux lancer un service de mise en relation artisans-clients ? Pour tes 10 premiers clients, prends les demandes par WhatsApp, appelle toi-même les artisans, organise tout à la main. C'est épuisant — et c'est le but. Tu apprends exactement où sont les frictions, ce que les clients demandent vraiment, et ce qu'il faudra automatiser en priorité. Airbnb, DoorDash — beaucoup ont commencé 100% manuel.",
          xp: 5,
        },
        // 5 — Micro-input : brique "format_mvp" (suit les INFO sur 5 formats + scénario WhatsApp)
        {
          type: "micro_input",
          prompt:
            "Quel format MVP choisis-tu pour démarrer (landing, WhatsApp Business, service manuel, no-code, Magicien d'Oz) ? Et pourquoi ce format est le plus rapide pour TOI ?",
          placeholder:
            "Ex : WhatsApp Business, parce que mes clientes commerçantes y sont déjà toute la journée, je peux mettre mon catalogue en photos et prendre les commandes sans rien coder ni dépenser...",
          storageKey: "format_mvp",
          xp: 2,
        },
        // 6 — Vrai/Faux
        {
          type: "true_false",
          statement: "Si mon MVP n'est pas une vraie application mobile, les gens ne me prendront pas au sérieux.",
          isTrue: false,
          explanation:
            "Faux. Ce qui te rend sérieux, c'est de résoudre vraiment le problème de ton client, pas le support technique utilisé. Une commerçante qui reçoit ses légumes frais livrés à l'heure via WhatsApp se fiche complètement que ce ne soit 'qu'un WhatsApp'. La technologie impressionne les ingénieurs ; le résultat impressionne les clients.",
          xp: 5,
        },
        // 7 — Compléter
        {
          type: "fill_blank",
          template: "Le meilleur format MVP n'est pas le plus {0} — c'est le plus {1} à lancer avec ce que tu maîtrises déjà.",
          blanks: ["sophistiqué", "rapide"],
          isOpenAnswer: false,
          xp: 8,
        },
        // 8 — Scénario (enseigne approche progressive via cas Issiaka)
        {
          type: "scenario",
          context:
            "Issiaka à Bamako veut lancer un outil de gestion de tontine numérique. Il sait coder un peu. Il hésite entre : (A) passer 3 mois à coder l'app parfaite seul, (B) utiliser un Google Sheet partagé + un groupe WhatsApp pour gérer les 3 premières tontines manuellement, puis coder ce qui marche.",
          question: "Quelle approche réduit le mieux son risque ?",
          options: [
            "Google Sheet + WhatsApp d'abord — il valide le besoin réel et apprend les vraies règles des tontines avant de coder.",
            "Coder l'app parfaite — comme ça c'est prêt quand les clients arrivent.",
            "Abandonner s'il ne peut pas coder l'app complète tout de suite.",
          ],
          correctIndex: 0,
          explanation:
            "Les tontines ont des règles sociales subtiles qu'Issiaka ne découvrira qu'en gérant de vraies tontines. S'il code 3 mois en isolation, il construira probablement les mauvaises fonctionnalités. Avec Sheet + WhatsApp, il gère 3 tontines réelles, apprend les vrais besoins, et code ensuite un outil qui colle à la réalité. Le code n'est pas le risque — construire la mauvaise chose l'est.",
          xp: 15,
        },
        // 9 — Micro-input : brique "premier_pas_mvp" (suit le scénario sur approche progressive)
        {
          type: "micro_input",
          prompt:
            "Quel est le tout premier pas concret que tu peux faire CETTE SEMAINE pour mettre ton MVP en ligne ? (créer le compte WhatsApp Business, monter la landing, écrire le premier post...)",
          placeholder:
            "Ex : créer mon compte WhatsApp Business, prendre 8 photos de mes produits, écrire mon catalogue avec les prix, et envoyer le lien à 15 contacts ce samedi...",
          storageKey: "premier_pas_mvp",
          xp: 2,
        },
        // 10 — Reflection template : format + premier pas
        {
          type: "reflection_template",
          intro:
            "Tu as choisi ton format et ton premier pas. C'est ça, le passage de 'je réfléchis' à 'je construis'. Voilà ta décision assemblée.",
          template:
            "Mon format MVP : {format_mvp}.\n\nMon tout premier pas cette semaine : {premier_pas_mvp}.\n\nJe sors la version la plus simple possible — et j'améliore avec les vrais retours.",
          variables: ["format_mvp", "premier_pas_mvp"],
          xp: 58,
        },
      ],
    },
  },

  {
    id: 403,
    levelId: 4,
    taskType: "mission",
    missionCaptureIndexes: [5, 6, 7, 8, 9],
    missionConfig: {
      type: "build",
      title: "Construis et publie ton MVP",
      brief: "Tu as appris à choisir ton format et à accepter l'imperfection. Maintenant, sors-le. Reviens ici quand ton MVP est EN LIGNE et accessible par au moins une vraie personne.",
      icon: "Rocket",
      checkpointQuestion: "Ton MVP est en ligne ?",
      checkpointMinLabel: "accessible par au moins une vraie personne",
      checkpointCta: "✓ Oui, mon MVP est en ligne et accessible",
      ctaLabel: "Mon MVP est en ligne → Capturer mes données",
      coachNiveau: 4,
      hasRawNotes: false,
      captureFields: [
        {
          id: "lien_mvp",
          label: "Le lien ou le point d'accès public de ton MVP",
          type: "texte_court",
          placeholder: "wa.me/229XXXXXXXX, monsite.com, instagram.com/...",
          required: true,
        },
        {
          id: "format_utilise",
          label: "Quel format as-tu finalement utilisé ?",
          type: "texte_court",
          placeholder: "WhatsApp Business, landing Tally, compte Instagram...",
          required: true,
        },
        {
          id: "ce_qui_marche",
          label: "Qu'est-ce qui fonctionne déjà ?",
          type: "texte_moyen",
          placeholder: "On peut voir le catalogue, commander par message, je reçois les commandes...",
          required: true,
        },
        {
          id: "ce_qui_manque",
          label: "Qu'est-ce qui ne marche pas encore / que tu amélioreras ?",
          type: "texte_moyen",
          placeholder: "Pas encore de paiement intégré, photos à refaire, délai de réponse à réduire...",
          required: true,
        },
      ],
      captureXP: 215,
      completeSummary: "MVP publié",
      completeContextLabel: "Retrouve le lien de ton MVP et tes notes dans la section \"Mon Projet\", sous le Niveau 4.",
    },
    title: "Construis et publie ton MVP",
    description: "Le moment de vérité. Tu vas sortir ton MVP dans le monde réel — pas parfait, juste réel.",
    xp: 250,
    recapLabel: "🚀 Ton MVP publié",
    lesson: {
      title: "Publier — done is better than perfect",
      exercises: [
        // 0 — Info (phase apprentissage)
        {
          type: "info",
          icon: "🔥",
          title: "\"Done is better than perfect\"",
          content:
            "Ton MVP sera imparfait. C'est normal — c'est même le but. Reid Hoffman (fondateur de LinkedIn) dit : 'Si tu n'as pas honte de la première version de ton produit, tu l'as lancée trop tard.' La honte est le signe que tu as lancé assez tôt pour apprendre vite. Chaque jour passé à 'peaufiner' en secret est un jour sans données réelles. Publie, puis améliore avec les vrais retours.",
          xp: 5,
        },
        // 1 — Scénario (phase apprentissage)
        {
          type: "scenario",
          context:
            "Bintou a monté son catalogue WhatsApp Business de plats préparés à Dakar. Elle hésite à le partager : 'Mes photos ne sont pas pro, je n'ai que 6 plats, mon logo est fait sur Canva.' Elle veut attendre d'avoir 20 plats et des photos de pro.",
          question: "Que devrait faire Bintou ?",
          options: [
            "Publier maintenant avec ses 6 plats — elle apprendra quels plats se vendent avant d'investir dans plus.",
            "Attendre d'avoir 20 plats et des photos pro pour faire bonne impression.",
            "Attendre d'avoir économisé pour une vraie app de commande.",
          ],
          correctIndex: 0,
          explanation:
            "Si Bintou publie ses 6 plats maintenant, elle découvrira en 2 semaines lesquels se vendent — peut-être que 2 plats font 80% des commandes. Elle concentrera alors ses efforts sur ce qui marche. Attendre 20 plats, c'est investir dans 14 plats dont elle ignore s'ils intéressent quelqu'un. Le marché lui dira quoi améliorer — mais seulement si elle publie.",
          xp: 15,
        },
        // 2 — Info (phase apprentissage)
        {
          type: "info",
          icon: "✅",
          title: "Ta checklist de publication minimale",
          content:
            "Avant de partager ton MVP, vérifie juste l'essentiel : (1) un client peut-il comprendre ce que tu offres en 10 secondes ? (2) peut-il passer à l'action (commander, s'inscrire, te contacter) ? (3) peux-tu honorer cette action (livrer, répondre, fournir) ? Si ces 3 cases sont cochées, c'est suffisant pour lancer. Le reste s'améliore en marchant.",
          xp: 5,
        },
        // 3 — Vrai/Faux (phase apprentissage)
        {
          type: "true_false",
          statement: "Il vaut mieux lancer ton MVP auprès d'inconnus que de tes proches, pour avoir des retours honnêtes.",
          isTrue: true,
          explanation:
            "Vrai pour les retours, avec une nuance. Tes proches sont parfaits pour t'aider à démarrer (premiers tests, encouragement), mais ils mentiront sur la qualité pour ne pas te blesser. Pour savoir si ton MVP tient vraiment, il te faut des inconnus de ta cible. Les deux sont utiles : les proches pour amorcer, les inconnus pour la vérité.",
          xp: 5,
        },
        // 4 — Micro-input : engagement publication (phase apprentissage — engagement daté)
        {
          type: "micro_input",
          prompt:
            "Quelle est ta date limite pour publier ton MVP ? Engage-toi sur un jour précis. (Un engagement daté multiplie tes chances de passer à l'action.)",
          placeholder:
            "Ex : je publie mon catalogue WhatsApp et je l'envoie à mes 15 premiers contacts au plus tard ce samedi 21 juin...",
          storageKey: "engagement_publication",
          xp: 5,
        },
        // 5 — Micro-input CAPTURE : lien_mvp
        {
          type: "micro_input",
          prompt: "Le lien ou le point d'accès public de ton MVP",
          placeholder: "wa.me/229XXXXXXXX, monsite.com, instagram.com/...",
          storageKey: "lien_mvp",
          xp: 2,
        },
        // 6 — Micro-input CAPTURE : format_utilise
        {
          type: "micro_input",
          prompt: "Quel format as-tu finalement utilisé ?",
          placeholder: "WhatsApp Business, landing Tally, compte Instagram...",
          storageKey: "format_utilise",
          xp: 2,
        },
        // 7 — Micro-input CAPTURE : ce_qui_marche
        {
          type: "micro_input",
          prompt: "Qu'est-ce qui fonctionne déjà ?",
          placeholder: "On peut voir le catalogue, commander par message, je reçois les commandes...",
          storageKey: "ce_qui_marche",
          xp: 2,
        },
        // 8 — Micro-input CAPTURE : ce_qui_manque
        {
          type: "micro_input",
          prompt: "Qu'est-ce qui ne marche pas encore / que tu amélioreras ?",
          placeholder: "Pas encore de paiement intégré, photos à refaire, délai de réponse à réduire...",
          storageKey: "ce_qui_manque",
          xp: 2,
        },
        // 9 — Reflection template CAPTURE
        {
          type: "reflection_template",
          intro:
            "Ton MVP existe dans le monde réel. Tu n'es plus quelqu'un 'qui a une idée' — tu es quelqu'un 'qui a lancé'. Voilà ton livrable assemblé.",
          template:
            "Mon MVP est en ligne : {lien_mvp}\n\nFormat utilisé : {format_utilise}\n\nCe qui marche déjà : {ce_qui_marche}\n\nCe que je vais améliorer : {ce_qui_manque}",
          variables: ["lien_mvp", "format_utilise", "ce_qui_marche", "ce_qui_manque"],
          xp: 55,
        },
      ],
    },
  },

  {
    id: 404,
    levelId: 4,
    taskType: "mission",
    missionCaptureIndexes: [4, 5, 6],
    missionConfig: {
      type: "outreach",
      title: "Acquiers tes 10 premiers utilisateurs",
      brief: "Va chercher tes 10 premiers utilisateurs un par un, personnellement. Écris à chacun. Rends-leur un service exceptionnel. Reviens capturer tes apprentissages.",
      icon: "Users",
      checkpointQuestion: "Tu as contacté tes premiers utilisateurs ?",
      checkpointMinLabel: "au moins 5 personnes de ta cible",
      checkpointCta: "✓ Oui, j'ai contacté mes premiers utilisateurs",
      ctaLabel: "J'ai commencé mon outreach → Capturer mes insights",
      coachNiveau: 4,
      hasRawNotes: true,
      rawNotesLabel: "Tes notes de contact terrain (optionnel)",
      rawNotesPlaceholder: "Contact 1 — Awa, via WhatsApp direct\nRéaction : intéressée, a demandé quand c'est dispo\nA essayé : oui, a commandé le lendemain\n\nContact 2 — Kofi, groupe quartier\nRéaction : sceptique sur le prix\nA essayé : non, a dit qu'il verrait...",
      captureFields: [
        {
          id: "message_approche",
          label: "Le message exact que tu as envoyé à tes premiers utilisateurs potentiels",
          type: "texte_moyen",
          placeholder: "Salut Awa, tu me disais que tu perdais un temps fou à noter tes ventes le soir. J'ai créé un petit outil WhatsApp où tu enregistres une vente en 10 secondes par message vocal. Tu veux l'essayer gratuitement cette semaine ?",
          required: true,
        },
        {
          id: "approche_apprentissage",
          label: "Qu'as-tu appris sur ta façon d'approcher tes premiers utilisateurs ?",
          type: "texte_moyen",
          placeholder: "J'ai découvert que le message personnel fonctionnait mieux que le message générique, et que mentionner un problème précis de la personne multipliait les réponses...",
          required: true,
        },
      ],
      captureXP: 165,
      completeSummary: "10 premiers utilisateurs contactés",
      completeContextLabel: "Retrouve tes notes de contact dans la section \"Mon Projet\", sous le Niveau 4.",
    },
    title: "Acquiers tes 10 premiers utilisateurs",
    description: "Un MVP sans utilisateurs, c'est un journal intime. Va chercher tes 10 premiers — un par un, à la main.",
    xp: 200,
    recapLabel: "👥 Tes 10 premiers utilisateurs",
    lesson: {
      title: "Outreach — do things that don't scale",
      exercises: [
        // 0 — Info (phase apprentissage)
        {
          type: "info",
          icon: "🎯",
          title: "\"Do things that don't scale\"",
          content:
            "Paul Graham (Y Combinator) a une règle célèbre : au début, fais des choses qui ne passent pas à l'échelle. N'essaie pas de 'lancer une campagne marketing'. Va chercher tes 10 premiers utilisateurs un par un, personnellement. Écris à chacun individuellement. Rends-leur un service exceptionnel. Ces 10 personnes, traitées comme des rois, deviendront tes ambassadeurs. Le marketing de masse vient bien plus tard — d'abord, le contact humain direct.",
          xp: 5,
        },
        // 1 — Scénario (phase apprentissage)
        {
          type: "scenario",
          context:
            "Yao a publié son MVP (app no-code de mise en relation avec des plombiers à Abidjan). Pour trouver ses premiers utilisateurs, il hésite : (A) payer 50 000 FCFA de pub Facebook, (B) écrire personnellement à 30 personnes de son réseau qui ont récemment cherché un plombier, et leur proposer de tester gratuitement.",
          question: "Quelle approche est la meilleure pour ses 10 premiers utilisateurs ?",
          options: [
            "Écrire personnellement aux 30 personnes — contact direct, taux de réponse élevé, vrais retours.",
            "La pub Facebook — ça touche plus de monde d'un coup.",
            "Attendre que le bouche-à-oreille se fasse naturellement.",
          ],
          correctIndex: 0,
          explanation:
            "La pub Facebook enverra du trafic froid vers un MVP non éprouvé — taux de conversion proche de zéro, argent gaspillé. Écrire à 30 personnes qui ont un besoin réel et une relation avec Yao donnera 10 testeurs engagés qui lui feront des retours précieux. 10 utilisateurs qui parlent vraiment avec toi valent mieux que 1000 visiteurs anonymes.",
          xp: 10,
        },
        // 2 — Info (phase apprentissage)
        {
          type: "info",
          icon: "🗺️",
          title: "Où trouver tes 10 premiers (contexte africain)",
          content:
            "Tes premiers utilisateurs sont plus proches que tu crois : ton réseau WhatsApp direct, les groupes WhatsApp de quartier/métier/association, ta communauté religieuse (mosquée, église), les marchés et lieux physiques où ta cible se trouve, les anciens camarades d'école, ta famille élargie. Le canal le plus puissant en Afrique de l'Ouest reste la recommandation personnelle : une personne de confiance qui te présente à 3 autres vaut 100 pubs.",
          xp: 5,
        },
        // 3 — MCQ (enseigne comment aborder un utilisateur)
        {
          type: "mcq",
          question: "Comment aborder un premier utilisateur potentiel pour maximiser tes chances ?",
          options: [
            "'Salut, j'ai lancé une super app, tu peux la partager à tout le monde ?'",
            "'Salut [prénom], je me souviens que tu galérais avec [problème précis]. J'ai créé un truc qui pourrait t'aider, tu veux l'essayer gratuitement ?'",
            "'Bonjour, je lance ma startup, soutiens-moi en t'inscrivant stp.'",
          ],
          correctIndex: 1,
          explanation:
            "L'option B marche parce qu'elle est personnelle, rappelle un problème réel de la personne, et offre une valeur (essai gratuit) sans demander d'effort. Les options A et C demandent une faveur sans offrir de valeur — c'est de la charge, pas une proposition. Parle du problème de l'autre, pas de ta startup.",
          xp: 10,
        },
        // 4 — Micro-input CAPTURE : message_approche (suit MCQ sur comment aborder)
        {
          type: "micro_input",
          prompt:
            "Le message exact que tu as envoyé à tes premiers utilisateurs potentiels (personnalisé, centré sur LEUR problème, avec une offre claire)",
          placeholder:
            "Salut Awa, tu me disais que tu perdais un temps fou à noter tes ventes le soir. J'ai créé un petit outil WhatsApp où tu enregistres une vente en 10 secondes par message vocal. Tu veux l'essayer gratuitement cette semaine ?",
          storageKey: "message_approche",
          xp: 5,
        },
        // 5 — Micro-input CAPTURE : approche_apprentissage
        {
          type: "micro_input",
          prompt: "Qu'as-tu appris sur ta façon d'approcher tes premiers utilisateurs ?",
          placeholder: "J'ai découvert que le message personnel fonctionnait mieux que le message générique, et que mentionner un problème précis de la personne multipliait les réponses...",
          storageKey: "approche_apprentissage",
          xp: 2,
        },
        // 6 — Reflection template CAPTURE
        {
          type: "reflection_template",
          intro:
            "Tu as tes premiers utilisateurs réels. Regarde qui a accroché, qui a résisté, et pourquoi. C'est de l'or pour la suite.",
          template:
            "Mon message d'approche :\n{message_approche}\n\nCe que j'ai appris sur ma façon d'approcher mes premiers utilisateurs :\n{approche_apprentissage}\n\n(Mes contacts détaillés sont dans mes notes de terrain.)",
          variables: ["message_approche", "approche_apprentissage"],
          xp: 53,
        },
      ],
    },
  },

  {
    id: 405,
    levelId: 4,
    taskType: "mission",
    missionCaptureIndexes: [5, 6, 7],
    missionConfig: {
      type: "field_research",
      title: "Collecte les retours & Build-Measure-Learn",
      brief: "Tes premiers utilisateurs ont essayé. Maintenant écoute-les vraiment : que garder, que jeter, que changer ? Reviens avec au moins 3 retours structurés.",
      icon: "RefreshCw",
      checkpointQuestion: "Tu as collecté tes premiers retours ?",
      checkpointMinLabel: "au moins 3 retours de vrais utilisateurs",
      checkpointCta: "✓ Oui, j'ai collecté mes premiers retours",
      ctaLabel: "J'ai mes retours → Synthétiser mes apprentissages",
      coachNiveau: 4,
      hasRawNotes: true,
      rawNotesLabel: "Tes retours terrain détaillés (optionnel)",
      rawNotesPlaceholder: "Retour 1 — Fatou\nA aimé : la rapidité de réponse\nA frustré : le paiement avant livraison\nRecommenderait : oui, à ses collègues commerçantes\n\nRetour 2 — ...",
      captureFields: [
        {
          id: "feedback_synthese",
          label: "Synthèse des retours qui reviennent le plus souvent (signal vs bruit)",
          type: "texte_moyen",
          placeholder: "3 personnes sur 5 mentionnent le même frein : le paiement avant livraison. 4 sur 5 ont aimé la rapidité de réponse. Un retour isolé sur la couleur du logo — je l'ignore...",
          required: true,
        },
        {
          id: "decision_iteration",
          label: "Ta décision pour la prochaine version : que gardes-tu, changes-tu, ajoutes-tu ?",
          type: "texte_moyen",
          placeholder: "Je GARDE : la commande par message vocal (tout le monde adore). Je CHANGE : le paiement après livraison, pas avant. J'AJOUTE : un rappel automatique chaque soir parce que 6/8 oublient d'ouvrir l'outil...",
          required: true,
        },
      ],
      captureXP: 115,
      completeSummary: "rapport Build-Measure-Learn",
      completeContextLabel: "Retrouve ton rapport BML dans la section \"Mon Projet\", sous le Niveau 4.",
    },
    title: "Collecte les retours & rapport Build-Measure-Learn",
    description: "Tes premiers utilisateurs ont essayé. Maintenant écoute-les vraiment : que garder, que jeter, que changer ?",
    xp: 150,
    recapLabel: "🔄 Ton rapport Build-Measure-Learn",
    lesson: {
      title: "Build-Measure-Learn — boucler pour apprendre",
      exercises: [
        // 0 — Info (phase apprentissage)
        {
          type: "info",
          icon: "🔁",
          title: "La boucle Build-Measure-Learn",
          content:
            "Eric Ries (Lean Startup) résume toute l'aventure entrepreneuriale en une boucle : Build (construis le MVP) → Measure (mesure comment les gens l'utilisent) → Learn (apprends et décide quoi changer) → et tu recommences. Tu viens de faire Build (403) et le début de Measure (404). Maintenant tu boucles : tu collectes les retours, tu en tires des apprentissages, et tu décides de ta prochaine version. Cette boucle, répétée vite et souvent, est le moteur de toute startup qui réussit.",
          xp: 5,
        },
        // 1 — Scénario (phase apprentissage)
        {
          type: "scenario",
          context:
            "Aminata a fait essayer son bot WhatsApp de suivi de dépenses à 8 personnes. Retours : 6 disent 'c'est pratique mais je ne pense pas à l'ouvrir le soir'. 1 dit 'j'adore, je l'utilise tous les jours'. 1 dit 'trop compliqué'.",
          question: "Quel est l'apprentissage le plus important pour Aminata ?",
          options: [
            "Le vrai problème n'est pas l'outil mais l'habitude — il faut un rappel/déclencheur pour qu'on pense à l'utiliser.",
            "L'outil est trop compliqué — il faut tout simplifier.",
            "1 personne l'adore, donc le produit est validé.",
          ],
          correctIndex: 0,
          explanation:
            "Le signal dominant (6/8) n'est pas 'c'est mauvais' mais 'j'oublie de l'utiliser'. C'est un problème d'habitude, pas de fonctionnalité. Aminata devrait ajouter un rappel automatique (ex : message chaque soir à 20h). Si elle avait écouté seulement la personne qui trouve ça 'compliqué', elle aurait simplifié un outil qui n'a pas de problème de complexité. Écouter le pattern dominant, pas le retour le plus fort en émotion.",
          xp: 10,
        },
        // 2 — Info (phase apprentissage)
        {
          type: "info",
          icon: "📡",
          title: "Sépare le signal du bruit",
          content:
            "Tous les retours ne se valent pas. Le signal : un pattern qui revient chez plusieurs utilisateurs ('3 personnes sur 5 veulent payer après la livraison, pas avant'). Le bruit : une demande isolée, une préférence personnelle, un cas particulier. Règle : un retour qui revient 3+ fois = signal à traiter. Un retour unique = à noter, mais pas à prioriser. Ne refais pas tout ton produit pour plaire à une seule personne.",
          xp: 5,
        },
        // 3 — MCQ (enseigne ajustement post-retours)
        {
          type: "mcq",
          question: "Après avoir collecté les retours, tu réalises que ton hypothèse de départ était partiellement fausse. Que fais-tu ?",
          options: [
            "Tu ignores les retours qui contredisent ton idée initiale — tu y crois.",
            "Tu ajustes ta prochaine version en fonction des patterns réels, même si ça remet en cause ton idée de départ.",
            "Tu abandonnes le projet puisque tu t'étais trompé.",
          ],
          correctIndex: 1,
          explanation:
            "Se tromper sur une hypothèse n'est pas un échec — c'est le but de la boucle. Les retours qui contredisent ton idée sont les plus précieux : ils t'évitent de construire dans la mauvaise direction. Tu n'abandonnes pas et tu n'ignores pas la réalité. Tu ajustes — c'est exactement ce que la boucle Build-Measure-Learn est censée produire.",
          xp: 10,
        },
        // 4 — Vrai/Faux (phase apprentissage)
        {
          type: "true_false",
          statement: "Si mes premiers utilisateurs ne sont pas tous enthousiastes, mon MVP est un échec.",
          isTrue: false,
          explanation:
            "Faux. Un MVP n'est pas censé plaire à tout le monde — il est censé t'apprendre quelque chose. Même des retours tièdes ou négatifs sont des succès s'ils te disent quoi améliorer. L'échec, ce n'est pas un MVP imparfait ; c'est un MVP dont tu n'apprends rien parce que tu n'as pas vraiment écouté. Le but du MVP, c'est l'apprentissage, pas l'applaudissement.",
          xp: 5,
        },
        // 5 — Micro-input CAPTURE : feedback_synthese
        {
          type: "micro_input",
          prompt: "Synthèse des retours qui reviennent le plus souvent (signal vs bruit)",
          placeholder: "3 personnes sur 5 mentionnent le même frein : le paiement avant livraison. 4 sur 5 ont aimé la rapidité de réponse...",
          storageKey: "feedback_synthese",
          xp: 2,
        },
        // 6 — Micro-input CAPTURE : decision_iteration (suit MCQ sur ajustement post-retours)
        {
          type: "micro_input",
          prompt: "Ta décision pour la prochaine version : que gardes-tu, changes-tu, ajoutes-tu ?",
          placeholder: "Je GARDE : la commande par message vocal (tout le monde adore). Je CHANGE : le paiement après livraison. J'AJOUTE : un rappel automatique chaque soir...",
          storageKey: "decision_iteration",
          xp: 2,
        },
        // 7 — Reflection template CAPTURE
        {
          type: "reflection_template",
          intro:
            "Tu as bouclé ta première boucle Build-Measure-Learn. C'est le rythme cardiaque de toute startup. Voilà ton rapport assemblé.",
          template:
            "RAPPORT BUILD-MEASURE-LEARN — Mon MVP\n\nSynthèse des retours terrain :\n{feedback_synthese}\n\nMa décision pour la prochaine version :\n{decision_iteration}\n\nProchaine boucle : je construis cette version améliorée et je remesure.",
          variables: ["feedback_synthese", "decision_iteration"],
          xp: 58,
        },
      ],
    },
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
