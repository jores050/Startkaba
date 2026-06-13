"use client";

import { useState } from "react";

interface Props {
  levelId: number;
}

interface AnalysisResult {
  content: string;
  cached: boolean;
}

function KabaAvatar() {
  return (
    <div className="w-10 h-10 rounded-full bg-primary dark:bg-[#1E2A5E] border-2 border-primary dark:border-[#4D6FFF] text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
      K
    </div>
  );
}

export function KabaAnalysis({ levelId }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function fetchAnalysis(regen = false) {
    setState("loading");
    setErrorMsg(null);
    try {
      const url = `/api/coach/analyze-level${regen ? "?regen=1" : ""}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelId }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "Kaba est indisponible pour le moment.");
        setState("error");
        return;
      }
      setResult(data);
      setState("done");
    } catch {
      setErrorMsg("Impossible de contacter Kaba. Vérifie ta connexion.");
      setState("error");
    }
  }

  // Auto-fetch on first render
  if (state === "idle") {
    fetchAnalysis();
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        🔍 L&apos;analyse de Kaba
      </h2>

      <div className="bg-[#EEF1FF] dark:bg-[#1A2040] border border-[#0722AB]/20 dark:border-[rgba(77,111,255,0.25)] rounded-2xl p-5">
        <div className="flex gap-3 items-start">
          <KabaAvatar />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#0722AB] dark:text-[#4D6FFF] text-sm mb-2">Kaba</p>

            {state === "loading" && (
              <div className="flex items-center gap-2 py-2">
                <span className="inline-flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary dark:bg-[#4D6FFF] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
                <span className="text-sm text-muted">Kaba analyse ton travail...</span>
              </div>
            )}

            {state === "done" && result && (
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {result.content}
              </p>
            )}

            {state === "error" && (
              <p className="text-error dark:text-[#FF6B6B] text-sm">
                {errorMsg}
              </p>
            )}
          </div>
        </div>

        {/* Bouton régénérer — affiché une fois l'analyse reçue */}
        {(state === "done" || state === "error") && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => fetchAnalysis(true)}
              className="text-xs text-muted hover:text-primary dark:hover:text-[#4D6FFF] transition-colors"
            >
              ↺ Régénérer l&apos;analyse
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
