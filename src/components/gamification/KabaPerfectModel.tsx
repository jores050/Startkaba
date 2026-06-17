"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import type { KabaCorrection } from "@/lib/kaba/review-types";

interface Props {
  levelId: number;
}

function KabaAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-primary dark:bg-[#1E2A5E] border-2 border-primary dark:border-[#4D6FFF] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
      K
    </div>
  );
}

// "Parfait mon modèle en un clic" — Kaba réécrit les réflexions du niveau
// et affiche, pour chacune, le texte corrigé + un commentaire des changements.
export function KabaPerfectModel({ levelId }: Props) {
  const { mutate } = useSWRConfig();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [corrections, setCorrections] = useState<KabaCorrection[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/kaba/perfect-level-reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niveau: levelId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.corrections) {
        setError(data?.error ?? "Kaba n'a pas pu peaufiner ton modèle. Réessaie.");
        setState("error");
        return;
      }
      setCorrections(data.corrections as KabaCorrection[]);
      setState("done");
      // Les cards du récap lisent /api/reflections → on revalide pour afficher le texte corrigé.
      mutate("/api/reflections");
    } catch {
      setError("Erreur réseau. Réessaie.");
      setState("error");
    }
  }

  const changedCount = corrections.filter((c) => c.changed).length;

  return (
    <section className="mb-8">
      <div className="bg-gradient-to-br from-[#EEF1FF] to-[#F5F0FF] dark:from-[#1A2040] dark:to-[#201A40] border border-[#0722AB]/20 dark:border-[rgba(77,111,255,0.25)] rounded-2xl p-5">
        {/* ── État initial : proposition ──────────────────────────────── */}
        {state === "idle" && (
          <div className="flex gap-3 items-start">
            <KabaAvatar />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#0722AB] dark:text-[#4D6FFF] text-sm mb-1">Kaba peut aller plus loin</p>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                Tu veux que je peaufine ton modèle&nbsp;? En un clic, je corrige tes formulations
                (jargon, cible trop large, fonctionnalité vs bénéfice…) et je t&apos;explique chaque
                changement. Ton idée reste la tienne.
              </p>
              <button
                onClick={run}
                className="px-5 py-2.5 rounded-xl bg-[#0722AB] text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                ✨ Laisse Kaba parfaire mon modèle
              </button>
            </div>
          </div>
        )}

        {/* ── Chargement ──────────────────────────────────────────────── */}
        {state === "loading" && (
          <div className="flex gap-3 items-center">
            <KabaAvatar />
            <div className="flex items-center gap-2 py-1">
              <span className="inline-flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary dark:bg-[#4D6FFF] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
              <span className="text-sm text-muted">Kaba peaufine ton modèle…</span>
            </div>
          </div>
        )}

        {/* ── Erreur ──────────────────────────────────────────────────── */}
        {state === "error" && (
          <div className="flex gap-3 items-start">
            <KabaAvatar />
            <div className="flex-1">
              <p className="text-sm text-[#DC2626] mb-3">{error}</p>
              <button
                onClick={run}
                className="px-4 py-2 rounded-xl border border-[#0722AB] text-[#0722AB] dark:text-[#4D6FFF] dark:border-[#4D6FFF] text-sm font-semibold hover:bg-[#EEF1FF] dark:hover:bg-[#1E2A5E] transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* ── Résultat : corrections appliquées ───────────────────────── */}
        {state === "done" && (
          <div className="flex gap-3 items-start">
            <KabaAvatar />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#0722AB] dark:text-[#4D6FFF] text-sm mb-1">
                {changedCount > 0 ? "C'est peaufiné !" : "Ton modèle était déjà solide"}
              </p>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                {changedCount > 0
                  ? `J'ai retravaillé ${changedCount} ${changedCount > 1 ? "réflexions" : "réflexion"} et appliqué les corrections à ton projet. Voici ce que j'ai changé :`
                  : "Je n'ai trouvé que des détails à lisser. Voici le détail :"}
              </p>

              <div className="flex flex-col gap-3">
                {corrections.map((c) => (
                  <div
                    key={c.taskId}
                    className="bg-surface border border-border rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[#0722AB] dark:text-[#4D6FFF] uppercase tracking-wide">
                        {c.label}
                      </span>
                      {c.changed ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#AEFF94]/30 text-[#1A6B00] dark:bg-[#1A6B00]/30 dark:text-[#AEFF94]">
                          Corrigé
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-border text-muted">
                          Inchangé
                        </span>
                      )}
                    </div>

                    {c.changed && (
                      <p className="text-xs text-muted line-through leading-relaxed mb-1.5">
                        {c.before}
                      </p>
                    )}
                    <p className="text-sm text-foreground leading-relaxed bg-background rounded-lg px-3 py-2 border border-border/60">
                      {c.after}
                    </p>

                    {/* Commentaire de Kaba */}
                    <div className="flex gap-2 mt-2.5">
                      <span className="text-sm shrink-0">💬</span>
                      <p className="text-xs text-[#4A5280] dark:text-[#A8B0D8] leading-relaxed italic">
                        {c.commentaire}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {changedCount > 0 && (
                <p className="text-xs text-muted mt-3">
                  ✓ Tes réflexions corrigées sont enregistrées dans «&nbsp;Mon Projet&nbsp;».
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
