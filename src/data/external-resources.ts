// Outils externes gratuits recommandés, organisés par niveau.

export interface ExternalResource {
  name: string;
  url: string;
  description: string;
  levelIds: number[];
}

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  {
    name: "Notion",
    url: "https://www.notion.so",
    description: "Organise tes idées, tes interviews et ton plan d'action.",
    levelIds: [1, 2],
  },
  {
    name: "Google Forms",
    url: "https://forms.google.com",
    description: "Crée des sondages gratuits pour valider ton marché.",
    levelIds: [2],
  },
  {
    name: "Canva",
    url: "https://www.canva.com",
    description: "Logos, visuels réseaux sociaux et pitch decks gratuits.",
    levelIds: [3, 4, 5],
  },
  {
    name: "Figma",
    url: "https://www.figma.com",
    description: "Maquette ton app ou ton site avant de coder.",
    levelIds: [4],
  },
  {
    name: "Wave Business",
    url: "https://www.wave.com",
    description: "Encaisse tes premiers paiements Mobile Money sans frais cachés.",
    levelIds: [4, 5],
  },
  {
    name: "WhatsApp Business",
    url: "https://business.whatsapp.com",
    description: "Catalogue produits et réponses automatiques pour vendre.",
    levelIds: [4, 5],
  },
  {
    name: "Carte-One (OHADA)",
    url: "https://www.ohada.org",
    description: "Textes officiels OHADA pour structurer ta société.",
    levelIds: [6],
  },
];

export function getExternalByLevel(levelId: number): ExternalResource[] {
  return EXTERNAL_RESOURCES.filter((r) => r.levelIds.includes(levelId));
}
