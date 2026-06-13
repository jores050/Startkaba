"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/use-user";

const ITEMS = [
  {
    href: "/dashboard",
    label: "Accueil",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="2" fill="currentColor" />
        <rect x="12" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="2" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.35" />
      </svg>
    ),
  },
  {
    href: "/parcours",
    label: "Parcours",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 6v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/coach",
    label: "Kaba",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2C11 2 4 5.5 4 12a7 7 0 0014 0C18 5.5 11 2 11 2z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    href: "/profil",
    label: "Profil",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3.5 20c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#151A2E] border-t border-border dark:border-[#2A3050] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex justify-around py-2">
        {ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-0.5 px-4 py-1.5"
            >
              <span className={active ? "text-primary" : "text-muted"}>{item.icon}</span>
              <span
                className={`text-xs font-semibold ${
                  active ? "text-primary" : "text-muted"
                }`}
              >
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
              {item.href === "/parcours" && user && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-cta rounded-full border-2 border-white dark:border-[#151A2E] text-xs font-bold text-white flex items-center justify-center">
                  {user.currentLevelId}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
