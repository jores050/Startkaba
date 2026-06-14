import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config({ path: ".env.local" });

const connectionString = process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"]!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SEED_MENTORS = [
  {
    name: "Fatoumata Diallo",
    title: "Experte Marketing Digital & E-commerce",
    expertise: ["Marketing digital", "E-commerce", "Réseaux sociaux", "Brand strategy"],
    bio: "10 ans d'expérience en marketing digital en Afrique de l'Ouest. Ancienne directrice marketing chez Jumia Sénégal. J'accompagne les startups early-stage pour leur acquisition client à faible coût, avec des stratégies adaptées aux marchés UEMOA (Mobile Money, WhatsApp Business, bouche-à-oreille digital).",
    contactMethod: "WHATSAPP" as const,
    contactValue: "+221701234567",
    availability: "Mer-Ven 18h-20h, Sam 10h-12h",
    city: "DAKAR" as const,
    status: "APPROVED" as const,
  },
  {
    name: "Me Kouamé Assouman",
    title: "Avocat d'affaires — Droit OHADA & Startups",
    expertise: ["Droit OHADA", "Création d'entreprise", "Contrats commerciaux", "Levée de fonds"],
    bio: "Avocat inscrit au barreau d'Abidjan, spécialisé en droit des affaires OHADA et en accompagnement juridique des startups. Je conseille sur la structuration légale (SARL, SAS OHADA), les contrats co-fondateurs, la propriété intellectuelle et la levée de fonds (term sheets, pactes d'actionnaires).",
    contactMethod: "EMAIL" as const,
    contactValue: "k.assouman@juridique-ci.com",
    availability: "Lun-Mer 17h30-19h",
    city: "ABIDJAN" as const,
    status: "APPROVED" as const,
  },
  {
    name: "Issiaka Traoré",
    title: "Investisseur & Expert Levée de Fonds",
    expertise: ["Levée de fonds", "Pitch deck", "Modèle financier", "Impact investing"],
    bio: "Partner chez un fonds d'investissement panafricain, j'ai accompagné plus de 30 startups dans leur levée de fonds (seed à Série A). Je connais les attentes des investisseurs locaux (fonds UEMOA, DFI) et internationaux. J'aide à construire des business plans crédibles et des pitches percutants adaptés aux réalités africaines.",
    contactMethod: "CALENDLY" as const,
    contactValue: "https://calendly.com/issiaka-traore",
    availability: "Sur rendez-vous via Calendly",
    city: "ABIDJAN" as const,
    status: "APPROVED" as const,
  },
  {
    name: "Aminata Kouyaté",
    title: "Product Manager — Fintech & Mobile Money",
    expertise: ["Product management", "Fintech", "Mobile Money", "UX Design", "Développement produit"],
    bio: "PM chez une fintech malienne avec 7 ans d'expérience sur les produits Mobile Money (Orange Money, Wave, Moov). J'aide les entrepreneurs à transformer leur idée en produit viable, à définir leur MVP et à itérer rapidement avec peu de ressources. Spécialiste des paiements digitaux en zone UEMOA.",
    contactMethod: "WHATSAPP" as const,
    contactValue: "+22376543210",
    availability: "Lun-Jeu 19h-21h",
    city: "BAMAKO" as const,
    status: "APPROVED" as const,
  },
];

const SEED_GROUPS = [
  // Villes
  { name: "Entrepreneurs d'Abidjan", type: "CITY" as const, cityOrLevel: "Abidjan", description: "Le groupe des entrepreneurs basés à Abidjan. Échanges, bons plans locaux, et entraide." },
  { name: "Entrepreneurs de Dakar", type: "CITY" as const, cityOrLevel: "Dakar", description: "La communauté des bâtisseurs dakarois. Networking, ressources et opportunités au Sénégal." },
  { name: "Entrepreneurs de Cotonou", type: "CITY" as const, cityOrLevel: "Cotonou", description: "Entrepreneurs béninois : partagez vos expériences et trouvez des partenaires locaux." },
  { name: "Entrepreneurs de Lomé", type: "CITY" as const, cityOrLevel: "Lomé", description: "La scène entrepreneuriale togolaise en action. Rencontres et collaborations à Lomé." },
  { name: "Entrepreneurs de Bamako", type: "CITY" as const, cityOrLevel: "Bamako", description: "La communauté des entrepreneurs maliens. Idées, défis et succès partagés ensemble." },
  // Niveaux
  { name: "Niveau 1 — Valider mon idée", type: "LEVEL" as const, cityOrLevel: "1", description: "Tu démarres ? Ce groupe est fait pour toi. Partage tes doutes, tes hypothèses et tes premières découvertes." },
  { name: "Niveau 2 — Comprendre mon marché", type: "LEVEL" as const, cityOrLevel: "2", description: "On creuse le marché ensemble : cibles, concurrents, opportunités. Partage tes recherches terrain." },
  { name: "Niveau 3 — Construire mon offre", type: "LEVEL" as const, cityOrLevel: "3", description: "Tu construis ton produit ou service. Retours, pivots, et itérations bienvenus ici." },
  { name: "Niveau 4 — Mes premiers clients", type: "LEVEL" as const, cityOrLevel: "4", description: "Conquête des premiers clients : prospection, closing, pricing. Partageons nos méthodes." },
  { name: "Niveau 5 — Traction & croissance", type: "LEVEL" as const, cityOrLevel: "5", description: "Tu as des clients, maintenant tu accélères. Discutons acquisition, rétention et métriques." },
  { name: "Niveau 6 — Modèle économique", type: "LEVEL" as const, cityOrLevel: "6", description: "On optimise la rentabilité : unit economics, pricing, canaux. Échanges sur les chiffres qui comptent." },
  { name: "Niveau 7 — Équipe & organisation", type: "LEVEL" as const, cityOrLevel: "7", description: "Recruter, déléguer, structurer. Ce groupe est pour ceux qui construisent une équipe." },
  { name: "Niveau 8 — Financement & levée", type: "LEVEL" as const, cityOrLevel: "8", description: "Prêt à lever des fonds ? Discutons bootstrapping, investisseurs, pitch et term sheets." },
];

const SEED_GROUP_POSTS: Array<{ groupName: string; content: string }> = [
  { groupName: "Entrepreneurs d'Abidjan", content: "Bienvenue à tous les entrepreneurs d'Abidjan ! 🌟 Présentez-vous en quelques mots : votre projet, votre secteur, et ce qui vous a poussé à entreprendre. Je commence : je développe une app de livraison de repas locaux ciblant les quartiers de Yopougon et Cocody." },
  { groupName: "Entrepreneurs d'Abidjan", content: "Question pratique : quelqu'un a une recommandation pour un expert-comptable à Abidjan qui connaît bien les startups OHADA ? Besoin d'aide pour ma déclaration de TVA et la constitution d'une SARL." },
  { groupName: "Entrepreneurs de Dakar", content: "🇸🇳 Groupe lancé ! Entrepreneurs dakarois, ce groupe est votre espace. Partagez vos ressources, vos contacts, et vos expériences sur le marché sénégalais." },
  { groupName: "Entrepreneurs de Cotonou", content: "Bonjour à tous ! Ce groupe est l'endroit idéal pour construire notre réseau local. Qui veut organiser un premier meet-up physique à Cotonou ce mois-ci ?" },
  { groupName: "Entrepreneurs de Lomé", content: "La communauté togolaise grandit ! Partageons nos expériences sur le marché local. Quelqu'un a déjà travaillé avec les fonds d'appui à l'entrepreneuriat au Togo ?" },
  { groupName: "Entrepreneurs de Bamako", content: "Bienvenue ! Partagez vos projets et vos défis du marché malien. Ensemble, on est plus forts. 🤝" },
  { groupName: "Niveau 1 — Valider mon idée", content: "Je travaille sur une idée d'application de covoiturage pour les zones périurbaines de Dakar. J'ai fait 10 interviews terrain cette semaine : 8/10 personnes trouvent les transports en commun trop aléatoires. Est-ce que ça vous semble suffisant pour valider l'hypothèse problème ?" },
  { groupName: "Niveau 1 — Valider mon idée", content: "Erreur classique que j'ai faite au niveau 1 : demander aux gens 'est-ce que tu utiliserais mon app ?' au lieu de 'raconte-moi la dernière fois que tu as eu ce problème'. La différence est énorme dans les réponses ! 💡" },
  { groupName: "Niveau 2 — Comprendre mon marché", content: "Comment vous calculez la taille de votre marché adressable quand il n'y a pas de données officielles pour votre secteur en Afrique de l'Ouest ? Je cherche la méthode bottom-up mais les données manquent..." },
  { groupName: "Niveau 3 — Construire mon offre", content: "Petit retour d'expérience : j'ai lancé mon MVP il y a 3 semaines. La version 1 était trop complète (trop de fonctionnalités). La v2 que je teste maintenant est ultra-réduite à 1 seule fonctionnalité — et les premiers retours sont bien meilleurs. Moins c'est vraiment plus au début." },
  { groupName: "Niveau 4 — Mes premiers clients", content: "Question sur la prospection : quelle approche marche le mieux pour vous pour décrocher vos premiers clients B2B ? Appels à froid ? LinkedIn ? Réseau personnel ? Je teste tout en ce moment." },
  { groupName: "Niveau 5 — Traction & croissance", content: "On a atteint 100 clients payants ce mois ! 🎉 Retour : le canal qui a le mieux marché pour nous c'est WhatsApp Business avec des groupes de communautés locales, pas du tout les réseaux sociaux classiques. Les coûts d'acquisition sont 5x inférieurs." },
  { groupName: "Niveau 6 — Modèle économique", content: "Question sur le pricing : on hésite entre abonnement mensuel vs commission par transaction pour notre plateforme. Quelqu'un a des retours sur ce qui fonctionne mieux sur les marchés UEMOA ?" },
];

const SEED_HELP_REQUESTS = [
  {
    title: "Comment valider une idée dans un marché informel ?",
    description: "Je veux lancer une solution pour les commerçants du marché central de Lomé, mais la plupart n'ont pas de smartphone ou refusent de répondre à mes questions. Comment faire des interviews terrain dans ce contexte ? J'ai essayé de passer par un intermédiaire (quelqu'un qu'ils connaissent) mais les réponses sont biaisées.",
    levelTag: 1,
  },
  {
    title: "Quelle structure juridique choisir pour un projet à deux co-fondateurs ?",
    description: "Nous sommes deux co-fondateurs (Côte d'Ivoire + Sénégal) et on veut créer une structure commune. On hésite entre une SARL ivoirienne avec un représentant au Sénégal, deux entités séparées, ou une holding. Budget limité, on cherche la solution la plus simple et la moins coûteuse pour démarrer. Quelqu'un a déjà navigué cette situation ?",
    levelTag: 2,
  },
  {
    title: "Comment fixer mon prix quand les concurrents sont informels ?",
    description: "Je vends un service de comptabilité simplifiée pour PME à Abidjan. Mon concurrent principal, c'est le comptable informel à 15 000 FCFA/mois. Moi, j'ai une app + un suivi humain et je veux facturer 45 000 FCFA/mois. Les clients comparent toujours avec l'option informelle. Comment justifier mon prix et convaincre sur la valeur ajoutée ?",
    levelTag: 4,
  },
];

async function main() {
  // Seed mentors (upsert par nom pour idempotence)
  let seededMentors = 0;
  for (const mentor of SEED_MENTORS) {
    const existing = await prisma.mentor.findFirst({ where: { name: mentor.name } });
    if (!existing) {
      await prisma.mentor.create({ data: mentor });
      seededMentors++;
    }
  }
  console.log(`Seed mentors: ${seededMentors} insérés (${SEED_MENTORS.length - seededMentors} déjà présents).`);

  // Seed groupes
  let seededGroups = 0;
  for (const group of SEED_GROUPS) {
    const existing = await prisma.group.findFirst({ where: { name: group.name } });
    if (!existing) {
      await prisma.group.create({ data: group });
      seededGroups++;
    }
  }
  console.log(`Seed groupes: ${seededGroups} insérés (${SEED_GROUPS.length - seededGroups} déjà présents).`);

  // Seed posts de groupes
  let seededPosts = 0;
  for (const post of SEED_GROUP_POSTS) {
    const group = await prisma.group.findFirst({ where: { name: post.groupName } });
    if (!group) continue;
    const existing = await prisma.groupPost.findFirst({ where: { groupId: group.id, content: post.content } });
    if (!existing) {
      const firstUser = await prisma.userProfile.findFirst();
      if (firstUser) {
        await prisma.groupPost.create({ data: { groupId: group.id, userId: firstUser.id, content: post.content } });
        seededPosts++;
      }
    }
  }
  console.log(`Seed posts groupes: ${seededPosts} insérés.`);

  // Seed help requests
  let seededHelp = 0;
  for (const req of SEED_HELP_REQUESTS) {
    const existing = await prisma.helpRequest.findFirst({ where: { title: req.title } });
    if (!existing) {
      const firstUser = await prisma.userProfile.findFirst();
      if (firstUser) {
        await prisma.helpRequest.create({ data: { userId: firstUser.id, ...req } });
        seededHelp++;
      }
    }
  }
  console.log(`Seed help requests: ${seededHelp} insérés (${SEED_HELP_REQUESTS.length - seededHelp} déjà présents).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
