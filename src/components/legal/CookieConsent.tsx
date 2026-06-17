"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sk_cookie_consent";

// Banner de consentement minimal. Mémorise le choix en localStorage.
// Si refus : on n'active pas les outils de mesure tiers (Sentry/analytics).
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage indisponible (mode privé strict) — on n'affiche rien.
    }
  }, []);

  function decide(choice: "accepted" | "refused") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-[#4A5280] dark:text-[#A0A8C8] leading-relaxed flex-1">
          StartKaba utilise des cookies essentiels pour ton authentification et des outils de
          mesure d&apos;audience.{" "}
          <Link href="/legal/confidentialite" className="text-[#0722AB] dark:text-[#4D6FFF] font-semibold hover:underline whitespace-nowrap">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide("refused")}
            className="px-4 py-2 rounded-xl border border-[#E8EAF0] dark:border-[#2A3050] text-[#8892C8] text-sm font-semibold hover:text-[#0A0E2A] dark:hover:text-white transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={() => decide("accepted")}
            className="px-4 py-2 rounded-xl bg-[#0722AB] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            J&apos;accepte
          </button>
        </div>
      </div>
    </div>
  );
}
