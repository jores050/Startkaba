import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { levels } from "@/data/levels";

const TEMOIGNAGES = [
  {
    name: "Adjoua N.",
    city: "Abidjan",
    project: "Cosmétiques karité",
    text: "Avant StartKaba, j'avais une idée et beaucoup de doutes. Le niveau 2 m'a forcée à parler à 5 clientes — j'ai pivoté et aujourd'hui je vends.",
    initials: "AN",
  },
  {
    name: "Espoir H.",
    city: "Cotonou",
    project: "Livraison dernière mile",
    text: "Kaba ne te caresse pas dans le sens du poil. Il pose LES questions qui fâchent. C'est exactement ce dont j'avais besoin.",
    initials: "EH",
  },
  {
    name: "Fatou N.",
    city: "Dakar",
    project: "EdTech wolof",
    text: "Les templates OHADA m'ont évité des semaines de recherche juridique. Tout est pensé pour nos réalités, pas copié de la Silicon Valley.",
    initials: "FN",
  },
];

const FONCTIONNALITES = [
  {
    icon: "🤖",
    title: "Coach Kaba IA",
    desc: "Il connaît ton projet, ta ville, et les réalités UEMOA/OHADA. Pas un chatbot générique.",
    color: "bg-primary/10",
  },
  {
    icon: "🎯",
    title: "8 niveaux structurés",
    desc: "Des tâches concrètes, validées par quiz. De l'idée au lancement officiel.",
    color: "bg-green/10",
  },
  {
    icon: "🤝",
    title: "Matching co-fondateurs",
    desc: "Bientôt : trouve ton associé dans ta ville selon vos compétences complémentaires.",
    color: "bg-cta/10",
  },
  {
    icon: "📄",
    title: "Templates locaux",
    desc: "Business plan FCFA, pacte d'associés OHADA, pitch deck. Prêts à l'emploi.",
    color: "bg-primary/10",
  },
  {
    icon: "🏆",
    title: "XP & Badges",
    desc: "Chaque progrès compte. Monte dans le classement de ta ville.",
    color: "bg-green/10",
  },
  {
    icon: "🔔",
    title: "Communauté active",
    desc: "Connecte-toi avec les entrepreneurs de Cotonou, Abidjan, Dakar, Lomé et Bamako.",
    color: "bg-cta/10",
  },
];

const CITIES = ["Cotonou 🇧🇯", "Abidjan 🇨🇮", "Dakar 🇸🇳", "Lomé 🇹🇬", "Bamako 🇲🇱"];

const STATS = [
  { n: "8", label: "niveaux structurés" },
  { n: "40+", label: "tâches concrètes" },
  { n: "5", label: "villes UEMOA" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-app text-ink">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-10 py-4 border-b border-[#E8EAF0] dark:border-[#2A3050] sticky top-0 bg-white/95 dark:bg-[rgba(21,26,46,0.95)] backdrop-blur z-30 shadow-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={32} />
          <span className="font-display text-xl font-extrabold text-[#0722AB] tracking-tight">
            StartKaba
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#4A5280]">
          <Link href="#pourquoi" className="hover:text-[#0722AB] transition-colors">Pourquoi</Link>
          <Link href="#niveaux" className="hover:text-[#0722AB] transition-colors">Parcours</Link>
          <Link href="#fonctionnalites" className="hover:text-[#0722AB] transition-colors">Fonctionnalités</Link>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden sm:flex px-4 py-2 rounded-xl border border-[#E8EAF0] text-[#4A5280] hover:border-[#0722AB] hover:text-[#0722AB] transition-colors text-sm font-medium"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-xl bg-[#F77E2D] text-white font-bold hover:opacity-90 transition-opacity text-sm"
          >
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      {/* Hero — 2 colonnes desktop */}
      <section className="relative overflow-hidden px-4 sm:px-10 py-16 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "url(/patterns/wax-1.svg)", backgroundSize: "80px 80px" }}
        />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Texte */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1A6B00] bg-[#AEFF94]/20 text-[#1A6B00] text-sm font-medium w-fit">
              🌍 Pour les entrepreneurs d&apos;Afrique francophone
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0E2A] leading-tight">
              Transforme ton idée en{" "}
              <span className="text-[#0722AB]">startup réelle</span>,{" "}
              niveau par niveau
            </h1>
            <p className="text-[#4A5280] text-lg leading-relaxed max-w-lg">
              StartKaba te guide à travers 8 niveaux structurés avec des tâches
              concrètes, un coach IA nommé Kaba, et des ressources pensées pour
              l&apos;écosystème UEMOA/OHADA.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-2xl bg-[#F77E2D] text-white font-bold text-base hover:opacity-90 transition-opacity text-center"
              >
                Commencer gratuitement →
              </Link>
              <Link
                href="/parcours"
                className="px-8 py-4 rounded-2xl border border-[#0722AB] text-[#0722AB] font-bold text-base hover:bg-[#0722AB] hover:text-white transition-colors text-center"
              >
                Voir le parcours
              </Link>
            </div>
            <div className="flex items-center gap-4 flex-wrap pt-2">
              {STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="font-display text-2xl font-extrabold text-[#0722AB]">{s.n}</span>
                  <span className="text-[#4A5280] text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visuel — carte niveau animée */}
          <div className="hidden lg:flex flex-col gap-4 items-center">
            <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E8EAF0] shadow-xl p-6 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{ backgroundImage: "url(/patterns/wax-2.svg)", backgroundSize: "60px 60px" }}
              />
              <div className="flex items-center gap-3 mb-5 relative">
                <span className="w-10 h-10 rounded-full bg-[#0722AB] text-white font-bold flex items-center justify-center text-sm">
                  1
                </span>
                <div>
                  <p className="font-display font-bold text-[#0A0E2A]">Valider mon idée</p>
                  <p className="text-[#8892C8] text-sm">Niveau 1 · En cours 🔥</p>
                </div>
                <span className="ml-auto px-2 py-1 rounded-full bg-[#AEFF94]/40 text-[#1A6B00] text-xs font-bold">
                  425 XP
                </span>
              </div>
              <div className="space-y-3 relative">
                {[
                  { label: "Rédiger mon hypothèse de valeur", done: true },
                  { label: "Mener 5 interviews clients", done: true },
                  { label: "Analyser le retour terrain", done: false, active: true },
                  { label: "Valider ou pivoter", done: false },
                ].map((t, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${t.active ? "bg-[#EEF1FF] border border-[#0722AB]/30" : "bg-[#F5F6FA]"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${t.done ? "bg-[#1A6B00] text-white" : t.active ? "bg-[#0722AB] text-white" : "bg-[#E8EAF0] text-[#8892C8]"}`}>
                      {t.done ? "✓" : t.active ? "→" : "·"}
                    </span>
                    <span className={`text-sm ${t.done ? "line-through text-[#8892C8]" : t.active ? "font-semibold text-[#0722AB]" : "text-[#4A5280]"}`}>
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 relative">
                <div className="flex justify-between text-xs text-[#8892C8] mb-1.5">
                  <span>Progression</span>
                  <span className="font-bold text-[#0722AB]">50%</span>
                </div>
                <div className="h-2 rounded-full bg-[#E8EAF0] overflow-hidden">
                  <div className="h-full rounded-full bg-[#0722AB] w-1/2 transition-all" />
                </div>
              </div>
            </div>
            <p className="text-[#8892C8] text-sm text-center">
              🏆 Badge &quot;Validateur&quot; à débloquer
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi StartKaba */}
      <section id="pourquoi" className="px-4 sm:px-10 py-20 bg-[#0722AB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Pourquoi StartKaba ?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              80% des projets meurent entre l&apos;idée et le lancement — pas par manque de talent,
              mais par manque de méthode adaptée au contexte local.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🚫",
                title: "Pas un MOOC générique",
                desc: "Des contenus pensés pour Cotonou, Abidjan et Dakar — pas des slides copiés de la Silicon Valley.",
              },
              {
                icon: "📈",
                title: "Progression visible",
                desc: "XP, badges, niveaux : chaque tâche validée te rapproche concrètement du lancement.",
              },
              {
                icon: "🎯",
                title: "Zéro sélection",
                desc: "Pas d'incubateur, pas de jury. Si tu veux avancer, tu avances. C'est tout.",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <span className="text-3xl mb-4 block">{c.icon}</span>
                <h3 className="font-display text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-5xl font-extrabold text-[#AEFF94]">{s.n}</p>
                <p className="text-white/70 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Les 8 niveaux */}
      <section id="niveaux" className="px-4 sm:px-10 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0E2A] mb-4">
            Le parcours en <span className="text-[#0722AB]">8 niveaux</span>
          </h2>
          <p className="text-[#4A5280] text-lg max-w-xl mx-auto">
            Chaque niveau est une étape concrète. Tu avances à ton rythme, validé par des quiz.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`relative bg-white border rounded-2xl p-5 transition-all ${
                level.id <= 4
                  ? "border-[#E8EAF0] hover:border-[#0722AB] hover:shadow-md"
                  : "border-[#E8EAF0] opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                    level.id <= 4 ? "bg-[#0722AB] text-white" : "bg-[#E8EAF0] text-[#8892C8]"
                  }`}
                >
                  {level.id}
                </span>
                {level.id > 4 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#AEFF94]/30 text-[#1A6B00] text-xs font-medium">
                    Bientôt
                  </span>
                )}
              </div>
              <h3 className="font-display text-base font-bold text-[#0A0E2A] mb-1">
                {level.title}
              </h3>
              <p className="text-[#8892C8] text-sm">{level.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="fonctionnalites" className="px-4 sm:px-10 py-20 bg-white dark:bg-[#151A2E] border-y border-[#E8EAF0] dark:border-[#2A3050]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0E2A] mb-4">
              Tout ce qu&apos;il te faut pour{" "}
              <span className="text-[#1A6B00]">lancer</span>
            </h2>
            <p className="text-[#4A5280] text-lg max-w-xl mx-auto">
              Des outils pensés pour les entrepreneurs africains, pas une copie d&apos;un produit américain.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FONCTIONNALITES.map((f) => (
              <div key={f.title} className="flex gap-4 p-5 rounded-2xl bg-[#F5F6FA] border border-[#E8EAF0] hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center text-2xl shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[#0A0E2A] mb-1">{f.title}</h3>
                  <p className="text-[#4A5280] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="px-4 sm:px-10 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0E2A] mb-4">
            Ils construisent avec StartKaba
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {TEMOIGNAGES.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-[#E8EAF0] rounded-2xl p-6 flex flex-col gap-5 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-1 text-[#F77E2D]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">{s}</span>
                ))}
              </div>
              <p className="text-[#0A0E2A] text-sm leading-relaxed flex-1">
                &laquo; {t.text} &raquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#0722AB] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {t.initials}
                </span>
                <div>
                  <p className="font-semibold text-sm text-[#0A0E2A]">{t.name}</p>
                  <p className="text-[#8892C8] text-xs">
                    {t.project} — {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 sm:px-10 py-24 bg-[#0722AB] text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: "url(/patterns/wax-3.svg)", backgroundSize: "80px 80px" }}
        />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Ton idée mérite mieux qu&apos;un carnet de notes.
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Inscris-toi gratuitement et complète ta première tâche aujourd&apos;hui.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 rounded-2xl bg-[#F77E2D] text-white font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Lancer mon aventure 🚀
          </Link>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {CITIES.map((city) => (
              <span
                key={city}
                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8EAF0] dark:border-[#2A3050] bg-white dark:bg-[#151A2E] px-4 sm:px-10 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={24} />
            <span className="font-display font-extrabold text-[#0722AB]">StartKaba</span>
          </Link>
          <div className="flex gap-6 text-sm text-[#8892C8]">
            <Link href="/parcours" className="hover:text-[#0722AB] transition-colors">Parcours</Link>
            <Link href="/login" className="hover:text-[#0722AB] transition-colors">Connexion</Link>
            <Link href="/signup" className="hover:text-[#0722AB] transition-colors">Inscription</Link>
          </div>
          <p className="text-[#8892C8] text-sm">
            © 2026 StartKaba
          </p>
        </div>
      </footer>
    </main>
  );
}
