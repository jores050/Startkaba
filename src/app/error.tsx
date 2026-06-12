"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // En dev, les chunks sont compilés à la demande. Si le chunk de la page
  // n'est pas encore prêt au moment de la navigation (race condition), on
  // force un rechargement complet pour laisser Next.js le compiler.
  useEffect(() => {
    if (
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk")
    ) {
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-sm border border-border text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-ink mb-2">Une erreur est survenue</h2>
        <p className="text-mid text-sm mb-6">
          {error.message || "Quelque chose s'est mal passé. Réessaie."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition"
          >
            Réessayer
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-app text-mid rounded-lg font-semibold text-sm hover:bg-border transition"
          >
            Retour au dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
