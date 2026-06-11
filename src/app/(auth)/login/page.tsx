import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";
import { GoogleButton } from "@/components/forms/GoogleButton";

export const metadata = { title: "Connexion — StartKaba" };

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Motif décoratif */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #0722AB 2px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-md relative">
        <Link
          href="/"
          className="block text-center font-display text-3xl font-bold text-primary mb-8"
        >
          StartKaba
        </Link>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-lg">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Bon retour 👋🏾
          </h1>
          <p className="text-muted mb-8">
            Ton parcours t&apos;attend là où tu l&apos;as laissé.
          </p>

          <LoginForm />

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted text-sm">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <GoogleButton />
        </div>

        <p className="text-center text-muted mt-6">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Inscris-toi gratuitement
          </Link>
        </p>
      </div>
    </main>
  );
}
