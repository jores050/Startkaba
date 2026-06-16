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

// Détecte les pièges classiques et renvoie une critique ferme (mode challenger).
// En dev sans clé API, ça reproduit le comportement attendu du vrai Kaba.
function detectChallenges(message: string): string[] {
  const lower = message.toLowerCase();
  const out: string[] = [];

  // Cause racine circulaire
  if (
    /il n'existe pas|il n'y a pas (d'|de )|manque (d'|de )(plateforme|application|app|outil|solution)|aucune (plateforme|application|app)/.test(lower)
  ) {
    out.push(
      "Premier défaut, et c'est le plus grave : tu dis qu'il « n'existe pas de solution comme la tienne ». C'est exactement le piège enseigné dans la Tâche 103 — tu pars de TA solution, pas du problème vécu par le client. Quel est ce qu'il VIT au quotidien avant que tu arrives ?"
    );
  }

  // Persona mélangée / trop large
  if (
    /étudiants?\s+(ou|et)\s+salariés?|18\s*(à|-)\s*(45|50|55|60)|tout le monde|jeunes? (et|ou) adultes?/.test(lower)
  ) {
    out.push(
      "Deuxième problème : ta cible mélange deux personas distincts. « Étudiants ou salariés de 18 à 45 ans », ce n'est pas une cible, c'est un annuaire. Le Niveau 1 t'a enseigné qu'une persona trop large = un message qui ne résonne pour personne. Choisis-en UNE."
    );
  }

  // Jargon non passé au test Grand-mère
  const jargon = ["startup", "mvp", "scaling", "kpi", "roi", "b2b", "b2c", "levée de fonds", "growth hacking"];
  const hits = jargon.filter((w) => lower.includes(w));
  if (hits.length > 0) {
    out.push(
      `Et le test Grand-mère ne passe pas : « ${hits.join(", ")} » ne parle à personne hors du milieu. Reformule en mots du quotidien — ta grand-mère doit comprendre ce que tu fais.`
    );
  }

  return out;
}

export function mockKabaReply(userMessage: string, levelId: number): string {
  const challenges = detectChallenges(userMessage);

  if (challenges.length > 0) {
    return (
      `Je vais être direct avec toi — un ami qui ne dit que ce qu'on veut entendre n'est pas un ami.\n\n` +
      challenges.join("\n\n") +
      `\n\nCeci dit, le fait que tu poses tes idées par écrit est déjà un vrai pas — beaucoup restent dans le flou.\n\n` +
      `Tu veux réécrire maintenant, ou on en discute avant ?\n\n` +
      `*(Réponse simulée — configure GEMINI_API_KEY pour parler au vrai Kaba.)*`
    );
  }

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
