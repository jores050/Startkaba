"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", background: "#F5F6FA" }}>
        <div style={{ maxWidth: 480, margin: "4rem auto", background: "#fff", borderRadius: 12, padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h2 style={{ color: "#0722AB", marginBottom: "0.5rem" }}>Une erreur est survenue</h2>
          <p style={{ color: "#4A5280", marginBottom: "1.5rem" }}>
            {error.message || "Erreur inattendue. Réessaie ou recharge la page."}
          </p>
          <button
            onClick={reset}
            style={{ background: "#0722AB", color: "#fff", border: "none", borderRadius: 8, padding: "0.75rem 1.5rem", cursor: "pointer", fontWeight: 600 }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
