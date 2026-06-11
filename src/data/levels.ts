import type { Level } from "@/types";
import { tasks } from "./tasks";

export const levels: Level[] = [
  {
    id: 1,
    title: "Clarifier ton Idée",
    subtitle: "Tu as une idée, mais est-elle vraiment la tienne ?",
    description:
      "Est-ce qu'elle résout un vrai problème ? Ce niveau t'aide à passer d'une intuition vague à une proposition de valeur claire et ancrée dans une réalité concrète.",
    tasks: tasks.filter((t) => t.levelId === 1),
    badgeIds: [2],
    totalXp: 425,
  },
  {
    id: 2,
    title: "Valider ton Marché",
    subtitle: "Une idée sans marché reste un rêve.",
    description:
      "Parle à de vraies personnes. Comprends leur problème avant de construire ta solution. Ce niveau t'apprend à valider par la preuve, pas par l'intuition.",
    tasks: tasks.filter((t) => t.levelId === 2),
    badgeIds: [3, 4],
    totalXp: 625,
  },
  {
    id: 3,
    title: "Construire ton Modèle",
    subtitle: "Le Business Model Canvas en version Afrique de l'Ouest.",
    description:
      "Un bon modèle économique n'est pas une théorie — c'est une hypothèse que tu vas tester. Construis le tien en tenant compte des réalités locales : Mobile Money, informalité, réseaux de confiance.",
    tasks: tasks.filter((t) => t.levelId === 3),
    badgeIds: [5, 6],
    totalXp: 575,
  },
  {
    id: 4,
    title: "Créer ton MVP",
    subtitle: "Le plus vite possible entre le monde et ton idée.",
    description:
      "Un MVP n'est pas un produit à moitié fait — c'est le minimum pour apprendre le maximum. Lance vite, apprends vite, ajuste vite.",
    tasks: tasks.filter((t) => t.levelId === 4),
    badgeIds: [7, 8, 9],
    totalXp: 825,
  },
  {
    id: 5,
    title: "Acquérir tes clients",
    subtitle: "Marketing digital, réseaux sociaux, bouche-à-oreille",
    description: "Niveau Phase 2 — contenu à venir.",
    tasks: [],
    badgeIds: [],
    totalXp: 0,
  },
  {
    id: 6,
    title: "Structurer légalement",
    subtitle: "OHADA, SARL/SAS, RCCM, fiscalité UEMOA",
    description: "Niveau Phase 2 — contenu à venir.",
    tasks: [],
    badgeIds: [],
    totalXp: 0,
  },
  {
    id: 7,
    title: "Lever des fonds",
    subtitle: "Bootstrap, love money, angels africains, impact investing",
    description: "Niveau Phase 2 — contenu à venir.",
    tasks: [],
    badgeIds: [],
    totalXp: 0,
  },
  {
    id: 8,
    title: "Lancer officiellement",
    subtitle: "Go-to-market, PR, communauté, scaling",
    description: "Niveau Phase 2 — contenu à venir.",
    tasks: [],
    badgeIds: [],
    totalXp: 0,
  },
];

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}
