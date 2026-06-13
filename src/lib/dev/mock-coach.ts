// Messages Kaba mockés — singleton globalThis (cf. mock-progress.ts).

export interface CoachMsg {
  id: string;
  levelId: number;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

const globalForMock = globalThis as unknown as { mockCoachMessages?: CoachMsg[] };

const seed: CoachMsg[] = [
  {
    id: "cm-1",
    levelId: 2,
    role: "USER",
    content: "Kaba, comment je trouve des gens à interviewer pour mon projet ?",
    createdAt: "2026-05-12T09:00:00.000Z",
  },
  {
    id: "cm-2",
    levelId: 2,
    role: "ASSISTANT",
    content:
      "Bonne question, Aïcha. Avant de chercher loin, regarde autour de toi : qui, dans ton entourage à Abidjan, achète déjà des légumes frais pour son restaurant ou son maquis ? Le marché d'Adjamé, les restauratrices de ta commune, les groupes WhatsApp de ton quartier — c'est là que sont tes premières interviews.\n\nUne chose à garder en tête : tu ne cherches pas des gens qui te diront que ton idée est bonne. Tu cherches des gens qui te raconteront comment ils achètent aujourd'hui. Qui as-tu déjà identifié dans ton réseau direct ?",
    createdAt: "2026-05-12T09:00:30.000Z",
  },
];

export const mockCoachMessages: CoachMsg[] =
  globalForMock.mockCoachMessages ?? seed;
globalForMock.mockCoachMessages = mockCoachMessages;

let counter = 100;
export function addMockMessage(
  levelId: number,
  role: "USER" | "ASSISTANT",
  content: string
): CoachMsg {
  const msg: CoachMsg = {
    id: `cm-${++counter}-${Date.now()}`,
    levelId,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
  mockCoachMessages.push(msg);
  return msg;
}

// Réponse Kaba simulée pour le dev local (GEMINI_API_KEY non configurée).
const PROVERBES = [
  "C'est au bout de l'ancienne corde qu'on tisse la nouvelle.",
  "Si tu veux aller vite, marche seul ; si tu veux aller loin, marchons ensemble.",
  "La pluie ne tombe pas sur un seul toit.",
  "Petit à petit, l'oiseau fait son nid.",
  "Celui qui rame dans le sens du courant fait rire les crocodiles.",
];

const EXEMPLES = [
  "Regarde Wave au Sénégal : ils n'ont pas inventé le Mobile Money, ils ont juste rendu les frais transparents — et tout le marché a suivi.",
  "Shola Akinlade a commencé Paystack en résolvant SON propre problème de paiement. Pas en rêvant grand, en réglant petit.",
  "Tony Elumelu le répète : l'Afrique n'a pas besoin d'aide, elle a besoin d'entrepreneurs disciplinés. La discipline, c'est tes tâches du niveau en cours.",
  "Gozem a démarré au Togo avec quelques motos. Ils ont validé une ville avant d'en ouvrir dix.",
];

export function mockKabaReply(userMessage: string, levelId: number): string {
  const p = PROVERBES[userMessage.length % PROVERBES.length];
  const e = EXEMPLES[(userMessage.length + levelId) % EXEMPLES.length];
  return (
    `Je t'entends. « ${userMessage.slice(0, 80)}${userMessage.length > 80 ? "..." : ""} » — ` +
    `c'est une vraie question d'entrepreneur.\n\n` +
    `Comme on dit chez nous : ${p} ` +
    `Avant de chercher une réponse toute faite, regarde ce que ton niveau ${levelId} t'a déjà appris.\n\n` +
    `${e}\n\n` +
    `Dis-moi : qu'est-ce que tu as déjà essayé concrètement, et qu'est-ce qui t'a surpris dans le résultat ?\n\n` +
    `*(Réponse simulée — configure GEMINI_API_KEY sur aistudio.google.com pour parler au vrai Kaba.)*`
  );
}
