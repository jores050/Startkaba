"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "./SignOutButton";
import { NAV_ITEMS } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      >
        <span className="w-6 h-0.5 bg-foreground rounded" />
        <span className="w-6 h-0.5 bg-foreground rounded" />
        <span className="w-6 h-0.5 bg-foreground rounded" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <nav
            className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-surface border-r border-border p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xl font-bold text-primary">
                StartKaba
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="w-9 h-9 rounded-full text-2xl text-muted hover:text-foreground"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    pathname.startsWith(item.href)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <SignOutButton />
          </nav>
        </div>
      )}
    </div>
  );
}
