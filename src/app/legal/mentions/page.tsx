export const metadata = { title: "Mentions Légales — StartKaba" };

export default function MentionsPage() {
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A] mb-2">
        Mentions Légales
      </h1>
      <p className="text-sm text-[#8892C8] mb-8">Dernière mise à jour : 17 juin 2026</p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">Éditeur</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        StartKaba — plateforme de formation pour les entrepreneurs d&apos;Afrique de l&apos;Ouest.
        <br />
        Contact :{" "}
        <a href="mailto:joresgerys@gmail.com" className="text-[#0722AB] hover:underline">
          joresgerys@gmail.com
        </a>
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">Responsable de la publication</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Jores Gerys, fondateur de StartKaba.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">Hébergement</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Le site est hébergé par Vercel Inc., San Francisco, Californie, États-Unis —{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#0722AB] hover:underline">
          vercel.com
        </a>
        . La base de données et l&apos;authentification sont assurées par Supabase.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">Propriété intellectuelle</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        L&apos;ensemble des contenus de StartKaba (textes pédagogiques, marques, logo, code, design)
        est protégé. Toute reproduction ou réutilisation non autorisée est interdite.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">Données personnelles</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Le traitement de tes données est détaillé dans notre Politique de confidentialité. Tu
        disposes de droits d&apos;accès, de rectification et de suppression que tu peux exercer à
        l&apos;adresse{" "}
        <a href="mailto:joresgerys@gmail.com" className="text-[#0722AB] hover:underline">
          joresgerys@gmail.com
        </a>
        .
      </p>
    </>
  );
}
