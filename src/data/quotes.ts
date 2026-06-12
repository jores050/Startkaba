// Citations d'entrepreneurs africains — une par jour (rotation sur le jour de l'année).

export interface Quote {
  text: string;
  author: string;
  role: string;
}

export const QUOTES: Quote[] = [
  {
    text: "L'Afrique n'a pas besoin de charité, elle a besoin d'investissements et d'entrepreneurs.",
    author: "Tony Elumelu",
    role: "Fondateur, Heirs Holdings & UBA",
  },
  {
    text: "Chaque grand rêve commence par un rêveur qui a décidé d'agir.",
    author: "Aliko Dangote",
    role: "Fondateur, Dangote Group",
  },
  {
    text: "Ne demande pas la permission d'innover. Commence là où tu es, avec ce que tu as.",
    author: "Strive Masiyiwa",
    role: "Fondateur, Econet",
  },
  {
    text: "Le plus grand risque en Afrique, c'est de ne pas y investir.",
    author: "Rebecca Enonchong",
    role: "Fondatrice, AppsTech",
  },
  {
    text: "Nous avons construit Paystack en résolvant un problème que nous vivions nous-mêmes chaque jour.",
    author: "Shola Akinlade",
    role: "Co-fondateur, Paystack",
  },
  {
    text: "L'argent mobile a réussi en Afrique parce qu'il répondait à un vrai besoin, pas à une mode.",
    author: "Drew Durbin",
    role: "Co-fondateur, Wave",
  },
  {
    text: "Sois tellement bon qu'ils ne puissent pas t'ignorer — même quand tu viens de Lomé ou de Cotonou.",
    author: "Raphael Dana",
    role: "Co-fondateur, Gozem",
  },
];

export function getQuoteOfTheDay(date = new Date()): Quote {
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date.getTime() - start.getTime()) / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
}
