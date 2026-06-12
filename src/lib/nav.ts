// Structure de navigation StartKaba.
// Desktop : sidebar complète (MAIN + CONTENT).
// Mobile : bottom nav (4 onglets) + le reste via le menu hamburger.

export const MAIN_NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/parcours", label: "Parcours" },
  { href: "/coach", label: "Coach Kaba" },
];

export const CONTENT_NAV = [
  { href: "/ressources", label: "Ressources" },
  { href: "/classement", label: "Classement" },
  { href: "/profil", label: "Profil" },
  { href: "/communaute", label: "Communauté" },
];

// Liens secondaires accessibles via le hamburger sur mobile
export const SECONDARY_MOBILE_NAV = [
  { href: "/ressources", label: "Ressources" },
  { href: "/classement", label: "Classement" },
  { href: "/badges", label: "Mes Badges" },
  { href: "/communaute", label: "Communauté" },
];

// Compat : liste complète (drawer mobile)
export const NAV_ITEMS = [...MAIN_NAV, ...CONTENT_NAV];
