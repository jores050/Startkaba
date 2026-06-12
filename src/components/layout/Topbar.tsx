"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { NotificationBell } from "./NotificationBell";
import { SignOutButton } from "./SignOutButton";
import { SECONDARY_MOBILE_NAV } from "@/lib/nav";

function greeting(): { text: string; emoji: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return { text: "Bonjour", emoji: "☀️" };
  if (h >= 12 && h < 18) return { text: "Bon après-midi", emoji: "🌤️" };
  return { text: "Bonsoir", emoji: "🌙" };
}

// Hamburger mobile : liens secondaires (le reste vit dans la bottom nav)
function SecondaryMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative md:hidden" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Plus d'options"
        className="w-[34px] h-[34px] rounded-lg bg-app border border-border flex flex-col items-center justify-center gap-[3px]"
      >
        <span className="w-4 h-0.5 bg-mid rounded" />
        <span className="w-4 h-0.5 bg-mid rounded" />
        <span className="w-4 h-0.5 bg-mid rounded" />
      </button>
      {open && (
        <div className="absolute left-0 top-11 w-56 bg-white border border-border rounded-2xl shadow-xl z-50 p-2">
          {SECONDARY_MOBILE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-sm text-mid hover:text-primary hover:bg-primary-light transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-border mt-1 pt-1">
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
}

export function Topbar() {
  const { user } = useUser();
  const g = greeting();
  const firstName = user?.fullName?.split(" ")[0] ?? "";
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="bg-white border-b border-border px-4 sm:px-7 h-[60px] flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <SecondaryMenu />
        <div>
          <p className="font-display font-extrabold text-ink leading-tight">
            {g.text} {firstName} {g.emoji}
          </p>
          <p className="text-xs text-muted capitalize">{today}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {(user?.stats?.streakDays ?? 0) > 0 && (
          <span className="flex items-center gap-1.5 bg-cta-bg border border-cta/20 rounded-full px-3 py-1 text-xs font-bold text-cta">
            🔥 {user!.stats.streakDays} jours
          </span>
        )}
        <NotificationBell />
      </div>
    </header>
  );
}
