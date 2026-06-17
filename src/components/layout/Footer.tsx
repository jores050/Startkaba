import Link from "next/link";
import { Logo } from "./Logo";

const CONTACT_EMAIL = "joresgerys@gmail.com";

// Footer global — liens légaux. Intégré sur la landing publique et dans l'app.
export function Footer() {
  return (
    <footer className="border-t border-[#E8EAF0] dark:border-[#2A3050] bg-white dark:bg-[#151A2E] px-4 sm:px-10 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={24} />
          <span className="font-display font-extrabold text-[#0722AB]">StartKaba</span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#8892C8]">
          <Link href="/legal/cgu" className="hover:text-[#0722AB] transition-colors">CGU</Link>
          <Link href="/legal/confidentialite" className="hover:text-[#0722AB] transition-colors">Confidentialité</Link>
          <Link href="/legal/mentions" className="hover:text-[#0722AB] transition-colors">Mentions légales</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#0722AB] transition-colors">Contact</a>
        </nav>

        <p className="text-[#8892C8] text-sm whitespace-nowrap">© 2026 StartKaba</p>
      </div>
    </footer>
  );
}
