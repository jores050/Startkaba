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
    subtitle: "Marketing digital africain, sans budget, réseaux de confiance.",
    description:
      "Un bon produit sans clients, c'est un secret bien gardé. Ce niveau t'apprend à acquérir tes premiers clients avec les outils que tu as déjà : WhatsApp, ton réseau, ta crédibilité personnelle. Pas besoin de budget publicitaire — besoin de méthode.",
    tasks: tasks.filter((t) => t.levelId === 5),
    badgeIds: [12, 13],
    totalXp: 625,
  },
  {
    id: 6,
    title: "Structurer légalement",
    subtitle: "OHADA, RCCM, fiscalité UEMOA — protège ce que tu bâtis.",
    description:
      "L'informel a ses limites : pas de contrats, pas de financement, pas d'appels d'offres. Ce niveau te guide pas à pas dans la formalisation de ton entreprise selon le droit OHADA, avec les spécificités de chaque pays d'Afrique de l'Ouest.",
    tasks: tasks.filter((t) => t.levelId === 6),
    badgeIds: [14, 15],
    totalXp: 575,
  },
  {
    id: 7,
    title: "Lever des fonds",
    subtitle: "Bootstrap d'abord, pitch ensuite — garde le contrôle.",
    description:
      "Financer son entreprise ne signifie pas forcément lever des fonds auprès d'investisseurs étrangers. Ce niveau t'apprend à identifier les bonnes sources selon ta phase, à calculer ton besoin réel et à pitcher avec un deck professionnel ancré dans la réalité africaine.",
    tasks: tasks.filter((t) => t.levelId === 7),
    badgeIds: [16, 17],
    totalXp: 750,
  },
  {
    id: 8,
    title: "Lancer officiellement",
    subtitle: "Jour J : go-to-market, premier cercle, métriques post-lancement.",
    description:
      "Le lancement n'est pas une fin — c'est le début de l'apprentissage accéléré. Ce niveau te prépare à organiser un lancement structuré, à mobiliser ton réseau pour créer une vague initiale, et à mesurer ce qui compte vraiment dans les 30 premiers jours.",
    tasks: tasks.filter((t) => t.levelId === 8),
    badgeIds: [18, 19],
    totalXp: 825,
  },
];

export function getLevelById(id: number): Level | undefined {
  return levels.find((l) => l.id === id);
}
