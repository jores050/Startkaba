"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useLevelDetail } from "@/hooks/use-progress";
import { KabaPassScreen } from "@/components/gamification/KabaPassScreen";
import type { KabaReview } from "@/lib/kaba/review-types";

export default function PasseKabaPage() {
  const params = useParams<{ niveau: string }>();
  const searchParams = useSearchParams();
  const levelId = Number(params.niveau);
  const readOnly = searchParams.get("readonly") === "1";

  const { level, isLoading: levelLoading } = useLevelDetail(levelId);
  const [review, setReview] = useState<KabaReview | null>(null);
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!Number.isInteger(levelId)) return;
    let cancelled = false;
    setState("loading");
    fetch("/api/kaba/analyze-level-reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ niveau: levelId }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.review) {
          setReview(d.review);
          setState("done");
        } else {
          setState("error");
        }
      })
      .catch(() => !cancelled && setState("error"));
    return () => {
      cancelled = true;
    };
  }, [levelId]);

  if (!Number.isInteger(levelId) || levelId < 1 || levelId > 8) {
    return <p className="text-muted p-8">Niveau introuvable.</p>;
  }

  // Garde-fou : le niveau doit être complété (sauf en lecture seule depuis le récap).
  if (!levelLoading && !readOnly && level && level.status !== "COMPLETED") {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <span className="text-5xl block mb-4">🔒</span>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Passe Kaba pas encore disponible
        </h1>
        <p className="text-muted mb-6">
          Termine toutes les tâches du Niveau {levelId} pour que Kaba analyse ton travail.
        </p>
        <Link
          href={`/parcours/${levelId}`}
          className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
        >
          Reprendre le niveau
        </Link>
      </div>
    );
  }

  if (state === "loading" || levelLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex gap-1.5 mb-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-[#4D6FFF] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-muted">Kaba relit attentivement ton Niveau {levelId}...</p>
      </div>
    );
  }

  if (state === "error" || !review) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <span className="text-4xl block mb-3">😕</span>
        <p className="text-muted mb-6">Kaba n&apos;a pas pu analyser ton niveau pour le moment.</p>
        <Link
          href={`/parcours/${levelId}/recap`}
          className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
        >
          Continuer vers le récap →
        </Link>
      </div>
    );
  }

  return <KabaPassScreen levelId={levelId} review={review} readOnly={readOnly} />;
}
