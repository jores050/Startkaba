import type { Resource } from "@/types";

export const resources: Resource[] = [
  {
    id: 1,
    title: "Business Plan UEMOA",
    description:
      "Modèle de business plan complet adapté au marché UEMOA : projections en FCFA, sources de financement locales, conformité OHADA.",
    category: "Modèle",
    fileKey: "templates/business-plan-uemoa.pdf",
    levelId: 3,
  },
  {
    id: 2,
    title: "Pitch Deck StartKaba",
    description:
      "Trame de pitch deck en 12 slides pour présenter ton projet à des investisseurs ou des partenaires d'Afrique de l'Ouest.",
    category: "Pitch",
    fileKey: "templates/pitch-deck-startkaba.pdf",
    levelId: 4,
  },
  {
    id: 3,
    title: "Contrat Co-fondateur OHADA",
    description:
      "Modèle de pacte d'associés conforme au droit OHADA : répartition du capital, vesting, clauses de sortie.",
    category: "Légal",
    fileKey: "templates/contrat-cofondateur-ohada.pdf",
    levelId: 6,
  },
];

export function getResourceById(id: number): Resource | undefined {
  return resources.find((r) => r.id === id);
}
