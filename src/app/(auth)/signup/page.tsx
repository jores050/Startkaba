import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { SignupForm } from "@/components/forms/SignupForm";
import { GoogleButton } from "@/components/forms/GoogleButton";

export const metadata = { title: "Inscription — StartKaba" };

const NIVEAUX = [
  { n: 1, title: "Valider mon idée" },
  { n: 2, title: "Étudier le marché" },
  { n: 3, title: "Construire mon modèle" },
  { n: 4, title: "Lancer mon MVP" },
  { n: 5, title: "Marketing & acquisition" },
  { n: 6, title: "Structure juridique" },
  { n: 7, title: "Financement" },
  { n: 8, title: "Lancement officiel 🚀" },
];

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#F5F6FA] flex">
      {/* Colonne gauche — visuel */}
      <div className="hidden lg:flex w-[44%] bg-[#0722AB] flex-col justify-between p-12 relative overflow-hidden shrink-0">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{ backgroundImage: "url(/patterns/wax-2.svg)", backgroundSize: "80px 80px" }}
        />
        <Link href="/" className="relative flex items-center gap-2.5">
          <Logo size={32} />
          <span className="font-display text-xl font-extrabold text-white tracking-tight">
            StartKaba
          </span>
        </Link>

        <div className="relative">
          <p className="text-white/60 text-sm font-bold tracking-widest uppercase mb-5">
            Ton parcours
          </p>
          <div className="space-y-2 mb-10">
            {NIVEAUX.map((l, i) => (
              <div key={l.n} className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i < 4 ? "bg-[#AEFF94] text-[#1A6B00]" : "bg-white/15 text-white/40"
                  }`}
                >
                  {l.n}
                </span>
                <span className={`text-sm font-medium ${i < 4 ? "text-white" : "text-white/40"}`}>
                  {l.title}
                </span>
              </div>
            ))}
          </div>
          <blockquote className="border-l-2 border-[#F77E2D] pl-4">
            <p className="text-white/80 text-base leading-relaxed italic">
              &ldquo;La meilleure façon de prédire l&apos;avenir, c&apos;est de le créer.&rdquo;
            </p>
            <footer className="text-white/50 text-sm mt-2">— Aliko Dangote</footer>
          </blockquote>
        </div>

        <p className="relative text-white/40 text-sm">
          © 2026 StartKaba
        </p>
      </div>

      {/* Colonne droite — formulaire */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo mobile uniquement */}
          <Link href="/" className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <Logo size={28} />
            <span className="font-display text-xl font-extrabold text-[#0722AB]">StartKaba</span>
          </Link>

          <div className="bg-white border border-[#E8EAF0] rounded-3xl p-8 shadow-sm">
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold text-[#0A0E2A] mb-1">
                Lance ton aventure 🚀
              </h1>
              <p className="text-[#8892C8] text-sm">
                De l&apos;idée au lancement, niveau par niveau.
              </p>
            </div>

            <SignupForm />

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#E8EAF0]" />
              <span className="text-[#8892C8] text-sm">ou</span>
              <div className="flex-1 h-px bg-[#E8EAF0]" />
            </div>

            <GoogleButton />
          </div>

          <p className="text-center text-[#8892C8] text-sm mt-6">
            Déjà un compte ?{" "}
            <Link href="/login" className="text-[#0722AB] font-semibold hover:underline">
              Connecte-toi
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
