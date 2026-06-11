export default function CommunautePage() {
  return (
    <div className="max-w-lg">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">
        Communauté
      </h1>
      <p className="text-muted mb-8">
        Le matching co-fondateurs sera disponible dès 500 entrepreneurs actifs sur la plateforme.
      </p>
      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <p className="text-foreground font-semibold mb-4">
          Tu veux être parmi les premiers ?
        </p>
        <p className="text-muted text-sm">
          Liste d&apos;attente — à implémenter (Phase 2)
        </p>
      </div>
    </div>
  );
}
