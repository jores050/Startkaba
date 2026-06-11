import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { levels } from "@/data/levels";

const TEMOIGNAGES = [
  {
    name: "Adjoua N.",
    city: "Abidjan",
    project: "Cosmétiques karité",
    text: "Avant StartKaba, j'avais une idée et beaucoup de doutes. Le niveau 2 m'a forcée à parler à 5 clientes — j'ai pivoté et aujourd'hui je vends.",
  },
  {
    name: "Espoir H.",
    city: "Cotonou",
    project: "Livraison dernière mile",
    text: "Kaba ne te caresse pas dans le sens du poil. Il pose LES questions qui fâchent. C'est exactement ce dont j'avais besoin.",
  },
  {
    name: "Fatou N.",
    city: "Dakar",
    project: "EdTech wolof",
    text: "Les templates OHADA m'ont évité des semaines de recherche juridique. Tout est pensé pour nos réalités, pas copié de la Silicon Valley.",
  },
];

const FONCTIONNALITES = [
  { icon: "🎯", title: "Parcours en 8 niveaux", desc: "Des tâches concrètes, validées par quiz. Pas de théorie inutile." },
  { icon: "🤖", title: "Kaba, coach IA", desc: "Il connaît ton projet, ta ville, et les réalités UEMOA/OHADA." },
  { icon: "🏆", title: "XP & badges", desc: "Chaque progrès compte. Monte dans le classement de ta ville." },
  { icon: "📄", title: "Templates locaux", desc: "Business plan FCFA, pacte d'associés OHADA, pitch deck." },
  { icon: "🔔", title: "Suivi & rappels", desc: "Notifications de progression pour garder le rythme." },
  { icon: "🤝", title: "Communauté", desc: "Bientôt : matching co-fondateurs dans ta ville." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-30">
        <span className="flex items-center gap-2">
          <Logo size={32} />
          <span className="font-display text-xl sm:text-2xl font-bold text-primary">
            StartKaba
          </span>
        </span>
        <div className="flex gap-2 sm:gap-4">
          <Link
            href="/login"
            className="px-3 sm:px-4 py-2 rounded-lg border border-border text-foreground hover:border-primary transition-colors text-sm sm:text-base"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="px-3 sm:px-4 py-2 rounded-lg bg-cta text-white font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Commencer
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16 sm:py-24 gap-6 sm:gap-8">
        <div className="inline-block px-4 py-1 rounded-full border border-green bg-green-light/30 text-green text-sm font-medium">
          Pour les entrepreneurs d&apos;Afrique francophone 🌍
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold max-w-3xl leading-tight">
          De l&apos;idée au{" "}
          <span className="text-primary">lancement officiel</span>
        </h1>
        <p className="text-muted text-lg sm:text-xl max-w-2xl">
          StartKaba te guide à travers 8 niveaux structurés avec des tâches
          concrètes, un coach IA nommé Kaba, et des ressources pensées pour
          l&apos;écosystème UEMOA/OHADA.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-xl bg-cta text-white font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Commencer — c&apos;est gratuit
          </Link>
          <Link
            href="/parcours"
            className="px-8 py-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Découvrir le parcours
          </Link>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="px-4 sm:px-8 py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Pourquoi StartKaba ?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-12">
            80% des projets meurent entre l&apos;idée et le lancement — pas par
            manque de talent, mais par manque de méthode. StartKaba transforme
            le chaos du démarrage en un parcours clair, étape par étape.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { n: "8", label: "niveaux structurés, de l'idée au lancement" },
              { n: "40+", label: "tâches concrètes validées par quiz" },
              { n: "5", label: "villes : Cotonou, Abidjan, Dakar, Lomé, Bamako" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl font-bold text-green-light">
                  {s.n}
                </p>
                <p className="text-white/80 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 niveaux */}
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          Le parcours en <span className="text-primary">8 niveaux</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-surface border border-border rounded-2xl p-5 hover:border-green hover:shadow-md transition-all"
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm mb-3 ${
                  level.id <= 4 ? "bg-primary text-white" : "bg-border text-muted"
                }`}
              >
                {level.id}
              </span>
              <h3 className="font-display font-bold text-foreground">
                {level.title}
              </h3>
              <p className="text-muted text-sm mt-1">{level.subtitle}</p>
              {level.id > 4 && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-green-light/30 text-green text-xs font-medium">
                  Bientôt
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="px-4 sm:px-8 py-16 bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            Tout ce qu&apos;il te faut pour{" "}
            <span className="text-green">lancer</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FONCTIONNALITES.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="text-3xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-muted text-sm mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
          Ils construisent avec StartKaba
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TEMOIGNAGES.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4"
            >
              <p className="text-foreground text-sm leading-relaxed flex-1">
                « {t.text} »
              </p>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-muted text-xs">
                    {t.project} — {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 sm:px-8 py-20 bg-green text-white text-center">
        <h2 className="font-display text-3xl sm:text-5xl font-bold max-w-2xl mx-auto leading-tight">
          Ton idée mérite mieux qu&apos;un carnet de notes.
        </h2>
        <p className="text-white/80 text-lg mt-4 max-w-xl mx-auto">
          Inscris-toi gratuitement et complète ta première tâche aujourd&apos;hui.
        </p>
        <Link
          href="/signup"
          className="inline-block mt-8 px-10 py-4 rounded-xl bg-cta text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Lancer mon aventure 🚀
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-8 py-8 text-center text-muted text-sm">
        <span className="inline-flex items-center gap-2 mb-2">
          <Logo size={20} />
          <span className="font-display font-bold text-primary">StartKaba</span>
        </span>
        <p>© 2026 StartKaba — Construit pour les entrepreneurs d&apos;Afrique de l&apos;Ouest</p>
      </footer>
    </main>
  );
}
