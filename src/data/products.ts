// Produits statiques — compatibles avec le schéma Prisma Product.
// En dev, ces données sont utilisées directement (pas de DB).
// En prod, elles servent de seed initial ou sont gérées via admin.

export type ProductCategory = "TEMPLATE_GRATUIT" | "FORMATION_NIVEAU" | "FORMATION_COACH";
export type OwnerType = "STARTKABA" | "COACH";
export type ProductStatus = "DRAFT" | "PUBLISHED";

export interface StaticProduct {
  id: string;
  ownerType: OwnerType;
  coachId?: string;
  title: string;
  description: string;
  category: ProductCategory;
  priceCFA: number;
  levelTag?: number;
  fileUrl: string;
  coverImageUrl?: string;
  status: ProductStatus;
  downloadsCount: number;
  createdAt: string;
}

export const PRODUCTS: StaticProduct[] = [
  // ── Formations premium StartKaba (FORMATION_NIVEAU) ─────────────────────
  {
    id: "prod-formation-1",
    ownerType: "STARTKABA",
    title: "Masterclass : Formuler ton idée pour le marché africain",
    description:
      "45 minutes de contenu approfondi pour passer d'une idée floue à une proposition de valeur béton. Inclut : 3 études de cas d'entrepreneurs d'Abidjan, Dakar et Cotonou, une méthode de validation en 48h et un workbook PDF interactif.",
    category: "FORMATION_NIVEAU",
    priceCFA: 1500,
    levelTag: 1,
    fileUrl: "/formations/masterclass-idee-niveau1.pdf",
    coverImageUrl: undefined,
    status: "PUBLISHED",
    downloadsCount: 47,
    createdAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "prod-formation-3",
    ownerType: "STARTKABA",
    title: "Business Model Canvas UEMOA — Atelier pratique",
    description:
      "Construis ton BMC adapté aux réalités ouest-africaines : Mobile Money, économie informelle, réseaux de confiance. Inclut les 9 blocs commentés avec des exemples locaux et une session Q&A enregistrée.",
    category: "FORMATION_NIVEAU",
    priceCFA: 2500,
    levelTag: 3,
    fileUrl: "/formations/bmc-uemoa-niveau3.pdf",
    coverImageUrl: undefined,
    status: "PUBLISHED",
    downloadsCount: 32,
    createdAt: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "prod-formation-4",
    ownerType: "STARTKABA",
    title: "Lancer ton MVP en 2 semaines — Sans coder",
    description:
      "De l'idée au premier utilisateur payant en 14 jours. Méthodes no-code adaptées au contexte africain (Glide, WhatsApp Business, Wave). Inclut un planning détaillé semaine par semaine et une checklist pré-lancement.",
    category: "FORMATION_NIVEAU",
    priceCFA: 3000,
    levelTag: 4,
    fileUrl: "/formations/mvp-2semaines-niveau4.pdf",
    coverImageUrl: undefined,
    status: "PUBLISHED",
    downloadsCount: 28,
    createdAt: "2026-02-15T00:00:00.000Z",
  },
];

export function getProductById(id: string): StaticProduct | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): StaticProduct[] {
  return PRODUCTS.filter((p) => p.category === category && p.status === "PUBLISHED");
}

export function getProductByLevel(levelTag: number): StaticProduct | undefined {
  return PRODUCTS.find(
    (p) => p.category === "FORMATION_NIVEAU" && p.levelTag === levelTag && p.status === "PUBLISHED"
  );
}
