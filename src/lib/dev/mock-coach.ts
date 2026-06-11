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

// Réponse Kaba simulée pour le dev local (API Anthropic non disponible).
export function mockKabaReply(userMessage: string, levelId: number): string {
  return (
    `Je t'entends. « ${userMessage.slice(0, 80)}${userMessage.length > 80 ? "..." : ""} » — ` +
    `c'est une vraie question d'entrepreneur.\n\n` +
    `Comme on dit chez nous : c'est au bout de l'ancienne corde qu'on tisse la nouvelle. ` +
    `Avant de chercher une réponse toute faite, regarde ce que ton niveau ${levelId} t'a déjà appris. ` +
    `Les réponses durables viennent du terrain, pas des théories.\n\n` +
    `Dis-moi : qu'est-ce que tu as déjà essayé concrètement, et qu'est-ce qui t'a surpris dans le résultat ?\n\n` +
    `*(Réponse simulée — connecte une vraie clé Anthropic pour parler au vrai Kaba.)*`
  );
}
