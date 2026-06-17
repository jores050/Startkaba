"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

const SKIP_KEY = "sk_onboarding_skipped";

// Redirige vers /onboarding si l'utilisateur n'a pas terminé son accueil.
// Respecte le choix "Passer pour l'instant" (localStorage) — on ne force pas.
export function OnboardingGate() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    if (user.onboardingCompleted) return;
    let skipped = false;
    try {
      skipped = localStorage.getItem(SKIP_KEY) === "1";
    } catch {
      // localStorage indisponible — on ne force pas.
      skipped = true;
    }
    if (!skipped) router.replace("/onboarding");
  }, [user, router]);

  return null;
}
