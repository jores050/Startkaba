// Mock data pour /communaute en dev local (pas de session Supabase réelle).
import type { Mentor, CommunityProfile, ConnectionRequest } from "@/types";

// ── Mentors seed (3-4 profils crédibles UEMOA) ───────────────────────────────

export const MOCK_MENTORS: Mentor[] = [
  {
    id: "mentor-001",
    userId: null,
    name: "Fatoumata Diallo",
    title: "Experte Marketing Digital & E-commerce",
    expertise: ["Marketing digital", "E-commerce", "Réseaux sociaux", "Brand strategy"],
    bio: "10 ans d'expérience en marketing digital en Afrique de l'Ouest. Ancienne directrice marketing chez Jumia Sénégal. J'accompagne les startups early-stage pour leur acquisition client à faible coût, avec des stratégies adaptées aux marchés UEMOA (Mobile Money, WhatsApp Business, bouche-à-oreille digital).",
    avatarUrl: null,
    contactMethod: "WHATSAPP",
    contactValue: "+221701234567",
    availability: "Mer-Ven 18h-20h, Sam 10h-12h",
    city: "DAKAR",
    status: "APPROVED",
    createdAt: "2026-01-15T08:00:00.000Z",
  },
  {
    id: "mentor-002",
    userId: null,
    name: "Me Kouamé Assouman",
    title: "Avocat d'affaires — Droit OHADA & Startups",
    expertise: ["Droit OHADA", "Création d'entreprise", "Contrats commerciaux", "Levée de fonds"],
    bio: "Avocat inscrit au barreau d'Abidjan, spécialisé en droit des affaires OHADA et en accompagnement juridique des startups. Je conseille sur la structuration légale (SARL, SAS OHADA), les contrats co-fondateurs, la propriété intellectuelle et la levée de fonds (term sheets, pactes d'actionnaires).",
    avatarUrl: null,
    contactMethod: "EMAIL",
    contactValue: "k.assouman@juridique-ci.com",
    availability: "Lun-Mer 17h30-19h",
    city: "ABIDJAN",
    status: "APPROVED",
    createdAt: "2026-01-20T08:00:00.000Z",
  },
  {
    id: "mentor-003",
    userId: null,
    name: "Issiaka Traoré",
    title: "Investisseur & Expert Levée de Fonds",
    expertise: ["Levée de fonds", "Pitch deck", "Modèle financier", "Impact investing"],
    bio: "Partner chez un fonds d'investissement panafricain, j'ai accompagné plus de 30 startups dans leur levée de fonds (seed à Série A). Je connais les attentes des investisseurs locaux (fonds UEMOA, DFI) et internationaux. J'aide à construire des business plans crédibles et des pitches percutants adaptés aux réalités africaines.",
    avatarUrl: null,
    contactMethod: "CALENDLY",
    contactValue: "https://calendly.com/issiaka-traore",
    availability: "Sur rendez-vous via Calendly",
    city: "ABIDJAN",
    status: "APPROVED",
    createdAt: "2026-02-01T08:00:00.000Z",
  },
  {
    id: "mentor-004",
    userId: null,
    name: "Aminata Kouyaté",
    title: "Product Manager — Fintech & Mobile Money",
    expertise: ["Product management", "Fintech", "Mobile Money", "UX Design", "Développement produit"],
    bio: "PM chez une fintech malienne avec 7 ans d'expérience sur les produits Mobile Money (Orange Money, Wave, Moov). J'aide les entrepreneurs à transformer leur idée en produit viable, à définir leur MVP et à itérer rapidement avec peu de ressources. Spécialiste des paiements digitaux en zone UEMOA.",
    avatarUrl: null,
    contactMethod: "WHATSAPP",
    contactValue: "+22376543210",
    availability: "Lun-Jeu 19h-21h",
    city: "BAMAKO",
    status: "APPROVED",
    createdAt: "2026-02-10T08:00:00.000Z",
  },
];

// ── Profils ouverts à la connexion (co-fondateurs) ───────────────────────────

export const MOCK_COMMUNITY_PROFILES: CommunityProfile[] = [
  {
    id: "profile-001",
    fullName: "Kwame Mensah",
    avatarUrl: null,
    city: "ABIDJAN",
    projectName: "AgriConnect",
    projectDescription: "Mise en relation directe entre agriculteurs et acheteurs en Côte d'Ivoire.",
    skills: ["Agronomie", "Gestion de projet", "Terrain"],
    currentLevelId: 2,
    lookingFor: ["Développeur mobile", "Expert marketing digital"],
    publicBio: "Agriculteur reconverti en entrepreneur, je veux digitaliser la chaîne d'approvisionnement agricole.",
  },
  {
    id: "profile-002",
    fullName: "Mariam Traoré",
    avatarUrl: null,
    city: "BAMAKO",
    projectName: "SantéConnect",
    projectDescription: "Téléconsultation médicale accessible par USSD et WhatsApp pour les zones rurales.",
    skills: ["Médecine", "Santé publique", "Relations communautaires"],
    currentLevelId: 3,
    lookingFor: ["Co-fondateur technique", "Expert produit", "Levée de fonds"],
    publicBio: "Médecin engagée pour l'accès aux soins en Afrique de l'Ouest, je cherche à scaler une solution déjà testée sur 200 patients.",
  },
  {
    id: "profile-003",
    fullName: "Olivier Dakpogan",
    avatarUrl: null,
    city: "COTONOU",
    projectName: "EduTech Bénin",
    projectDescription: "Plateforme de tutorat scolaire par SMS et WhatsApp pour les lycéens béninois.",
    skills: ["Éducation", "Pédagogie", "Community management"],
    currentLevelId: 1,
    lookingFor: ["Développeur web", "Commercial", "Associé marketing"],
    publicBio: "Enseignant passionné, j'ai construit un premier prototype qui touche 150 lycéens. Je cherche un partenaire tech pour la V2.",
  },
];

// ── Mock connexions ───────────────────────────────────────────────────────────

const globalForCommunity = globalThis as unknown as {
  mockConnections?: ConnectionRequest[];
};

export const mockConnections: ConnectionRequest[] =
  globalForCommunity.mockConnections ?? [];
globalForCommunity.mockConnections = mockConnections;

export function addMockConnection(conn: ConnectionRequest) {
  const i = mockConnections.findIndex(
    (c) => c.fromUserId === conn.fromUserId && c.toUserId === conn.toUserId
  );
  if (i >= 0) mockConnections[i] = conn;
  else mockConnections.push(conn);
}

export function updateMockConnectionStatus(
  id: string,
  status: ConnectionRequest["status"]
) {
  const conn = mockConnections.find((c) => c.id === id);
  if (conn) conn.status = status;
}
