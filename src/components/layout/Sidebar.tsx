"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { MAIN_NAV, CONTENT_NAV } from "@/lib/nav";
import { getXpProgress } from "@/lib/utils/xp";
import { CITIES } from "@/lib/validations/auth";
import { SignOutButton } from "./SignOutButton";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

const ICONS: Record<string, React.ReactNode> = {
  "/dashboard": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  "/parcours": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4.5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "/coach": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <path
        d="M8 1.5C8 1.5 2.5 4.5 2.5 9a5.5 5.5 0 0011 0C13.5 4.5 8 1.5 8 1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  ),
  "/ressources": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <path d="M3.5 1.5h6L13 5v9.5H3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9.5 1.5V5H13M6 7.5h4M6 10h4M6 12.5h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "/classement": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <path
        d="M8 2l1.8 3.6L14 6.3l-3 2.9.7 4.1L8 11.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "/profil": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "/communaute": (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

function NavLink({
  href,
  label,
  pathname,
  pill,
}: {
  href: string;
  label: string;
  pathname: string;
  pill?: string;
}) {
  const active = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
        active
          ? "bg-white/15 text-white font-bold"
          : "text-white/60 font-medium hover:bg-white/10 hover:text-white"
      }`}
    >
      {ICONS[href]}
      {label}
      {pill && (
        <span className="ml-auto bg-cta text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {pill}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const cityLabel = user
    ? (CITIES.find((c) => c.value === user.city)?.label ?? user.city).replace(/ 🇧🇯|🇨🇮|🇸🇳|🇹🇬|🇲🇱/g, "")
    : "";
  const xp = user ? getXpProgress(user.totalXp, user.currentLevelId) : null;

  return (
    <aside className="hidden md:flex w-60 bg-primary fixed top-0 left-0 bottom-0 flex-col z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2.5">
        <div className="w-[34px] h-[34px] bg-cta rounded-lg flex items-center justify-center shrink-0">
          <svg viewBox="0 0 18 18" fill="none" className="w-[18px] h-[18px]">
            <path
              d="M9 2v10M9 2L5.5 5.5M9 2l3.5 3.5"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="4" y="8" width="3.5" height="6" rx="1" fill="white" opacity="0.7" />
            <rect x="10.5" y="6" width="3.5" height="8" rx="1" fill="white" />
          </svg>
        </div>
        <span className="font-display text-xl font-extrabold text-white tracking-tight">
          StartKaba
        </span>
      </div>

      {/* Utilisateur */}
      <div className="px-5 py-4 flex items-center gap-2.5 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-cta flex items-center justify-center text-xs font-bold text-white shrink-0">
          {user ? initials(user.fullName) : "··"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">
            {user?.fullName ?? "Chargement..."}
          </p>
          <p className="text-xs text-white/50 mt-0.5">📍 {cityLabel}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-white/30 px-3 pt-3 pb-1">
          Menu
        </p>
        {MAIN_NAV.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            pathname={pathname}
            pill={item.href === "/parcours" && user ? `Niv.${user.currentLevelId}` : undefined}
          />
        ))}
        <p className="text-xs font-bold tracking-widest uppercase text-white/30 px-3 pt-3 pb-1">
          Contenu
        </p>
        {CONTENT_NAV.map((item) => (
          <NavLink key={item.href} {...item} pathname={pathname} />
        ))}
        <div className="mt-2 [&_button]:text-white/50 [&_button:hover]:text-white [&_button:hover]:bg-white/10">
          <SignOutButton />
        </div>
      </nav>

      {/* XP mini */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/10 rounded-xl p-3.5">
          <div className="flex justify-between text-xs text-white/50 mb-2">
            <span>XP Total</span>
            <span className="font-bold text-white">
              {user?.totalXp?.toLocaleString("fr-FR") ?? "—"} XP
            </span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cta to-[#FFAB5E]"
              style={{ width: `${xp?.percentage ?? 0}%` }}
            />
          </div>
          <p className="text-xs text-white/30 mt-1.5">
            {user && xp
              ? `Niv.${user.currentLevelId} · ${Math.max(0, xp.needed - xp.current)} XP pour débloquer`
              : ""}
          </p>
        </div>
      </div>
    </aside>
  );
}
