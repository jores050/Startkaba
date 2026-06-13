import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function main() {
  // Seed mentors (upsert par nom pour idempotence)
  let seeded = 0;
  for (const mentor of SEED_MENTORS) {
    const existing = await prisma.mentor.findFirst({ where: { name: mentor.name } });
    if (!existing) {
      await prisma.mentor.create({ data: mentor });
      seeded++;
    }
  }
  console.log(`Seed mentors: ${seeded} insérés (${SEED_MENTORS.length - seeded} déjà présents).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
