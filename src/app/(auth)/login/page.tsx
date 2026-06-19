import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/components/forms/LoginForm";
import { GoogleButton } from "@/components/forms/GoogleButton";

export const metadata = { title: "Connexion — StartKaba" };

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { reset?: string };
}) {
  const resetDone = searchParams?.reset === "success";
  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      {/* Colonne gauche — visuel */}
      <div className="hidden lg:flex w-[44%] bg-[#0722AB] flex-col justify-between p-12 relative overflow-hidden shrink-0">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{ backgroundImage: "url(/patterns/wax-1.svg)", backgroundSize: "80px 80px" }}
        />
        <Link href="/" className="relative flex items-center gap-2.5">
          <Logo size={32} />
          <span className="font-display text-xl font-extrabold text-white tracking-tight">
            StartKaba
          </span>
        </Link>

        <div className="relative">
          {/* Mini parcours visuel */}
          <div className="space-y-3 mb-10">
            {[
              { n: 1, title: "Valider mon idée", done: true },
              { n: 2, title: "Étudier le marché", done: true },
              { n: 3, title: "Construire mon modèle", active: true },
              { n: 4, title: "Lancer mon MVP", done: false },
            ].map((l) => (
              <div
                key={l.n}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                  l.done
                    ? "bg-white/10"
                    : l.active
                      ? "bg-white/20 border border-white/30"
                      : "bg-white/5"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    l.done
                      ? "bg-[#AEFF94] text-[#1A6B00]"
                      : l.active
                        ? "bg-white text-[#0722AB]"
                        : "bg-white/20 text-white/50"
                  }`}
                >
                  {l.done ? "✓" : l.n}
                </span>
                <span className={`text-sm font-medium ${l.done || l.active ? "text-white" : "text-white/40"}`}>
                  {l.title}
                </span>
                {l.active && (
                  <span className="ml-auto text-xs text-[#AEFF94] font-bold">En cours</span>
                )}
              </div>
            ))}
          </div>
          <blockquote className="border-l-2 border-[#AEFF94] pl-4">
            <p className="text-white/80 text-lg leading-relaxed italic">
              &ldquo;Si tu veux aller loin, marchons ensemble.&rdquo;
            </p>
            <footer className="text-white/50 text-sm mt-2">— Proverbe africain</footer>
          </blockquote>
        </div>

        <p className="relative text-white/40 text-sm">
          © 2026 StartKaba
        </p>
      </div>

      {/* Colonne droite — formulaire */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo mobile uniquement */}
          <Link href="/" className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <Logo size={28} />
            <span className="font-display text-xl font-extrabold text-[#0722AB]">StartKaba</span>
          </Link>

          <div className="bg-white border border-[#E8EAF0] rounded-3xl p-8 shadow-sm">
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-[#0A0E2A] mb-1">
                Bon retour 👋🏾
              </h1>
              <p className="text-[#8892C8] text-sm">
                Ton parcours t&apos;attend là où tu l&apos;as laissé.
              </p>
            </div>

            {resetDone && (
              <p className="text-[#1A6B00] text-sm text-center bg-green/10 border border-green/30 rounded-lg px-4 py-2 mb-5">
                ✓ Mot de passe mis à jour. Connecte-toi avec ton nouveau mot de passe.
              </p>
            )}

            <LoginForm />

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#E8EAF0]" />
              <span className="text-[#8892C8] text-sm">ou</span>
              <div className="flex-1 h-px bg-[#E8EAF0]" />
            </div>

            <GoogleButton />
          </div>

          <p className="text-center text-[#8892C8] text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-[#0722AB] font-semibold hover:underline">
              Inscris-toi gratuitement
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
