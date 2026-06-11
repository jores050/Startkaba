import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url(/patterns/wax-2.svg)", backgroundSize: "80px 80px" }}
      />
      <div className="relative">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Logo size={40} />
          <span className="font-display text-2xl font-bold text-primary">
            StartKaba
          </span>
        </div>
        <p className="font-display text-7xl sm:text-8xl font-bold text-primary">404</p>
        <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-4">
          Cette page n&apos;existe pas (encore)
        </h1>
        <p className="text-muted mt-2 max-w-md mx-auto">
          Comme on dit chez nous : celui qui se perd découvre de nouveaux
          chemins. Mais là, mieux vaut revenir au parcours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
          >
            Retour au dashboard
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Page d&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
