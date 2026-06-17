import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/legal/CookieConsent";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StartKaba — De l'idée au lancement",
  description:
    "La plateforme gamifiée pour les entrepreneurs d'Afrique francophone. Parcours structuré en 8 niveaux, IA coach Kaba, ressources OHADA/UEMOA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={montserrat.variable} suppressHydrationWarning>
      <body className="antialiased bg-app text-ink">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
