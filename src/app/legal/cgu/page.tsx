import Link from "next/link";

export const metadata = { title: "Conditions Générales d'Utilisation — StartKaba" };

export default function CguPage() {
  return (
    <>
      <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A] mb-2">
        Conditions Générales d&apos;Utilisation
      </h1>
      <p className="text-sm text-[#8892C8] mb-8">Dernière mise à jour : 17 juin 2026</p>

      <p className="text-[#4A5280] leading-relaxed mb-3">
        Bienvenue sur StartKaba. En créant un compte et en utilisant la plateforme, tu acceptes
        les présentes conditions. On les a écrites simplement, sans jargon inutile — lis-les, elles
        te concernent.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">1. Le service</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        StartKaba est une plateforme de formation gamifiée qui accompagne les entrepreneurs
        d&apos;Afrique de l&apos;Ouest, de l&apos;idée jusqu&apos;au lancement, à travers un
        parcours structuré en 8 niveaux, un coach IA (Kaba), des ressources adaptées au contexte
        UEMOA/OHADA et une communauté. Le service est accessible en ligne, sans garantie de
        disponibilité permanente.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">2. Inscription</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        L&apos;inscription requiert une adresse email valide (ou un compte Google) et l&apos;acceptation
        des présentes conditions ainsi que de la{" "}
        <Link href="/legal/confidentialite" className="text-[#0722AB] hover:underline">
          Politique de confidentialité
        </Link>
        . Tu es responsable de la confidentialité de tes identifiants et de toute activité réalisée
        depuis ton compte. Tu t&apos;engages à fournir des informations exactes.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">3. Comportement en communauté</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Les espaces communautaires (groupes, demandes d&apos;aide, mise en relation) reposent sur le
        respect mutuel. Sont interdits : le harcèlement, les propos haineux ou discriminatoires, le
        spam, la sollicitation commerciale non désirée, le partage de contenus illégaux ou la
        publication d&apos;informations trompeuses. StartKaba peut modérer, suspendre ou supprimer
        tout compte qui ne respecte pas ces règles, sans préavis en cas de manquement grave.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">4. Ton contenu</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Les réflexions, briques, notes de terrain et autres contenus que tu produis dans ton
        parcours restent ta propriété. Tu accordes à StartKaba une licence limitée pour les stocker
        et te les restituer dans le cadre du service (par exemple « Mon Projet », l&apos;analyse de
        Kaba). StartKaba ne revend pas et ne publie pas ton contenu sans ton accord.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">5. Propriété intellectuelle</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Le contenu pédagogique, les marques, le code et le design de StartKaba sont protégés. Tu
        peux les utiliser pour ton usage personnel d&apos;apprentissage, mais pas les reproduire,
        revendre ou redistribuer sans autorisation écrite.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">6. Coach IA Kaba</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Kaba est un assistant basé sur l&apos;intelligence artificielle. Ses réponses sont des
        suggestions pédagogiques, pas des conseils juridiques, fiscaux ou financiers professionnels.
        Pour toute décision engageante (création de société, contrats, fiscalité), consulte un
        professionnel qualifié.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">7. Limitation de responsabilité</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        StartKaba fournit un outil d&apos;accompagnement et de formation. La réussite d&apos;un projet
        entrepreneurial dépend de nombreux facteurs indépendants de la plateforme. StartKaba ne
        saurait être tenue responsable des décisions prises ni des résultats obtenus à partir des
        contenus, des suggestions de Kaba ou des échanges communautaires.
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">8. Droit applicable et litiges</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Les présentes conditions sont régies par le droit béninois et, le cas échéant, par les actes
        uniformes de l&apos;OHADA. En cas de différend, les parties s&apos;efforceront de trouver une
        solution amiable avant toute action. À défaut, le litige sera porté devant les juridictions
        compétentes de Cotonou (Bénin).
      </p>

      <h2 className="font-display text-xl font-bold text-[#0A0E2A] mt-8 mb-3">9. Évolution des conditions</h2>
      <p className="text-[#4A5280] leading-relaxed mb-3">
        Ces conditions peuvent évoluer. En cas de changement important, tu en seras informé. Pour
        toute question :{" "}
        <a href="mailto:joresgerys@gmail.com" className="text-[#0722AB] hover:underline">
          joresgerys@gmail.com
        </a>
        .
      </p>
    </>
  );
}
