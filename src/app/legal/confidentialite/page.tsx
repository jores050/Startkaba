import Link from "next/link";

export const metadata = { title: "Politique de Confidentialité — StartKaba" };

export default function ConfidentialitePage() {
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A] mb-2">
        Politique de Confidentialité
      </h1>
      <p className="text-sm text-[#8892C8] mb-8">Dernière mise à jour : 17 juin 2026</p>

      <p className="text-[#4A5280] leading-relaxed mb-3">
        Ta confiance compte. Cette page explique quelles données on collecte, pourquoi, avec qui
        elles sont partagées et quels sont tes droits. On applique les principes du RGPD, adaptés au
        contexte de l&apos;Afrique de l&apos;Ouest.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">1. Données collectées</h2>
      <ul className="list-disc pl-5 text-[#4A5280] leading-relaxed mb-3 space-y-1">
        <li><strong>Compte</strong> : nom complet, adresse email, ville.</li>
        <li><strong>Profil projet</strong> : nom du projet, secteur, stade, défi initial.</li>
        <li><strong>Parcours</strong> : tes réflexions, briques, notes de terrain, progression et XP.</li>
        <li><strong>Échanges</strong> : tes messages avec le coach Kaba et dans la communauté.</li>
        <li><strong>Techniques</strong> : cookies essentiels (authentification) et données de mesure d&apos;audience.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">2. Finalités</h2>
      <ul className="list-disc pl-5 text-[#4A5280] leading-relaxed mb-3 space-y-1">
        <li>Te faire avancer dans ton parcours pédagogique et sauvegarder ton travail.</li>
        <li>Personnaliser les réponses du coach Kaba en fonction de ton projet et de ta ville.</li>
        <li>Animer la communauté et la mise en relation entre entrepreneurs.</li>
        <li>Sécuriser ton compte et améliorer le service.</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">3. Sous-traitants</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Pour fonctionner, StartKaba s&apos;appuie sur des prestataires de confiance, qui peuvent
        traiter certaines données pour notre compte :
      </p>
      <ul className="list-disc pl-5 text-[#4A5280] leading-relaxed mb-3 space-y-1">
        <li><strong>Supabase</strong> — base de données et authentification.</li>
        <li><strong>Google (Gemini)</strong> — moteur du coach IA Kaba.</li>
        <li><strong>Resend</strong> — envoi des emails transactionnels.</li>
        <li><strong>Vercel</strong> — hébergement de l&apos;application.</li>
        <li><strong>Sentry</strong> — détection d&apos;erreurs techniques (activé uniquement si tu acceptes les cookies de mesure).</li>
      </ul>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">4. Conservation</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Tes données sont conservées tant que ton compte est actif. Tu peux demander leur suppression
        à tout moment ; elles sont alors effacées dans un délai raisonnable, sauf obligation légale
        de conservation.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">5. Tes droits</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Tu disposes d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité
        de tes données. Une partie de ces données est directement consultable et modifiable depuis
        ton espace (« Mon Projet », ton profil). Pour exercer tes autres droits, écris au délégué à
        la protection des données :{" "}
        <a href="mailto:joresgerys@gmail.com" className="text-[#0722AB] hover:underline">
          joresgerys@gmail.com
        </a>
        .
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">6. Cookies</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        On utilise des cookies essentiels (indispensables à ton authentification) et, si tu les
        acceptes, des outils de mesure d&apos;audience. Tu peux refuser les cookies non essentiels
        via le bandeau de consentement ; dans ce cas, les outils de mesure tiers ne sont pas activés.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">7. Contact</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Pour toute question relative à tes données, consulte aussi nos{" "}
        <Link href="/legal/mentions" className="text-[#0722AB] hover:underline">mentions légales</Link>{" "}
        ou écris-nous à{" "}
        <a href="mailto:joresgerys@gmail.com" className="text-[#0722AB] hover:underline">joresgerys@gmail.com</a>.
      </p>
    </>
  );
}
