import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Footer } from "@/components/layout/Footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-app text-ink">
      {/* Header */}
      <header className="border-b border-[#E8EAF0] dark:border-[#2A3050] bg-white dark:bg-[#151A2E] px-4 sm:px-10 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={26} />
            <span className="font-display font-extrabold text-[#0722AB]">StartKaba</span>
          </Link>
          <Link href="/" className="text-sm text-[#8892C8] hover:text-[#0722AB] transition-colors">
            ← Accueil
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <main className="flex-1 px-4 sm:px-6 py-10">
        <article className="max-w-3xl mx-auto">{children}</article>
      </main>

      <Footer />
    </div>
  );
}
