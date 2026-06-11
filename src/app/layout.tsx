import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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
    <html lang="fr" className={montserrat.variable}>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
