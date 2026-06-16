"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useLevelDetail } from "@/hooks/use-progress";
import { getBadgeById } from "@/data/badges";
import { getLevelById } from "@/data/levels";
import { LEVEL_KABA_MESSAGES, LEVEL_RECAP_CARDS } from "@/data/level-meta";
import { Confetti } from "@/components/gamification/Confetti";
import { KabaVerdictSummary } from "@/components/gamification/KabaVerdictSummary";
import type { ReflectionWithMeta } from "@/app/api/reflections/route";
import type { StaticProduct } from "@/data/products";

// ─── XP Counter animation ─────────────────────────────────────────────────────

function XpCounter({ target }: { target: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayed(target);
        clearInterval(timer);
      } else {
        setDisplayed(Math.round(current));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{displayed}</span>;
}

// ─── Reflection card ──────────────────────────────────────────────────────────

interface ReflectionCardProps {
  icon: string;
  title: string;
  answer: string | null;
  index: number;
}

function ReflectionCard({ icon, title, answer, index }: ReflectionCardProps) {
  return (
    <div
      className="bg-surface border border-border rounded-2xl p-5 opacity-0 animate-card-in"
      style={{ animationDelay: `${0.3 + index * 0.12}s`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      </div>
      {answer ? (
        <p className="text-foreground text-sm leading-relaxed bg-background rounded-xl px-4 py-3 border border-border/60">
          {answer}
        </p>
      ) : (
        <p className="text-muted text-sm italic">
          Non complété — tu peux y revenir depuis le parcours.
        </p>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

// ─── Cross-sell card ──────────────────────────────────────────────────────────

function CrossSellCard({ product }: { product: StaticProduct & { isPurchased: boolean } }) {
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(product.isPurchased);
  const [showModal, setShowModal] = useState(false);

  async function confirm() {
    setPurchasing(true);
    try {
      const res = await fetch(`/api/products/${product.id}/purchase`, { method: "POST" });
      if (res.ok) {
        setPurchased(true);
        setShowModal(false);
      }
    } finally {
      setPurchasing(false);
    }
  }

  if (purchased) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-[#FFF4EC] to-[#FFF9F5] border border-[#F77E2D]/30 rounded-2xl p-5 flex gap-4 items-center">
        <div className="w-14 h-14 rounded-2xl bg-[#F77E2D]/10 flex items-center justify-center text-3xl shrink-0">
          {["🎯", "📐", "🏗️", "🚀", "📣", "⚖️", "💰", "🎊"][(product.levelTag ?? 1) - 1] ?? "📘"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#F77E2D] uppercase tracking-wide mb-1">
            Va plus loin
          </p>
          <p className="font-bold text-[#0A0E2A] text-sm leading-snug">{product.title}</p>
          <p className="text-[#8892C8] text-xs mt-0.5">
            Tu as compris le concept. Approfondis avec cette formation exclusive.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#F77E2D] text-white text-xs font-bold hover:opacity-90 transition-opacity"
        >
          {product.priceCFA.toLocaleString("fr-FR")} FCFA
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-[#FFF4EC] text-[#F77E2D] text-xs font-bold">Mode test</span>
              <span className="text-xs text-[#8892C8]">Paiement simulé</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#0A0E2A] mb-2">{product.title}</h3>
            <div className="bg-[#F8F9FF] rounded-xl p-3 mb-4 flex justify-between items-center">
              <span className="text-[#4A5280] text-sm">Montant</span>
              <span className="font-display font-extrabold text-[#0722AB] text-xl">
                {product.priceCFA.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-[#E8EAF0] text-[#8892C8] text-sm hover:text-[#0A0E2A]">
                Annuler
              </button>
              <button onClick={confirm} disabled={purchasing} className="flex-1 py-2.5 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50">
                {purchasing ? "..." : "Confirmer →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function RecapPage() {
  const params = useParams<{ niveau: string }>();
  const levelId = Number(params.niveau);
  const { level, isLoading } = useLevelDetail(levelId);
  const [confetti, setConfetti] = useState(true);

  const { data: reflections } = useSWR<ReflectionWithMeta[]>("/api/reflections", fetcher);
  const { data: productsData } = useSWR<{ products: (StaticProduct & { isPurchased: boolean })[] }>(
    "/api/products",
    fetcher
  );

  const levelData = getLevelById(levelId);
  const nextLevelId = levelId < 8 ? levelId + 1 : null;
  const nextLevelData = nextLevelId ? getLevelById(nextLevelId) : null;
  const badges = (levelData?.badgeIds ?? [])
    .map(getBadgeById)
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const recapCards = LEVEL_RECAP_CARDS[levelId] ?? [];
  const kabaMessage = LEVEL_KABA_MESSAGES[levelId] ?? `Tu viens de compléter le Niveau ${levelId}. Continue sur cette lancée !`;

  // Formation cross-sell pour ce niveau
  const crossSellProduct = productsData?.products.find(
    (p) => p.category === "FORMATION_NIVEAU" && p.levelTag === levelId
  ) ?? null;

  // Build reflection lookup: taskId → answer
  const reflectionByTask = new Map<number, string>();
  if (reflections) {
    for (const r of reflections) {
      if (r.levelId === levelId) {
        reflectionByTask.set(r.taskId, r.answer);
      }
    }
  }

  if (!Number.isInteger(levelId) || levelId < 1 || levelId > 8) {
    return <p className="text-muted p-8">Niveau introuvable.</p>;
  }

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-border/40 rounded-2xl w-2/3 mx-auto" />
          <div className="h-6 bg-border/40 rounded-xl w-1/2 mx-auto" />
          <div className="h-40 bg-border/40 rounded-2xl" />
        </div>
      </div>
    );
  }

  const completed = level?.status === "COMPLETED";

  if (!completed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <span className="text-5xl block mb-4">🔒</span>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Récap pas encore disponible
        </h1>
        <p className="text-muted mb-6">
          Complète toutes les tâches du niveau {levelId} pour débloquer ton récapitulatif.
        </p>
        <Link
          href={`/parcours/${levelId}`}
          className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity"
        >
          Reprendre le niveau
        </Link>
      </div>
    );
  }

  return (
    <>
      {confetti && <Confetti onDone={() => setConfetti(false)} />}

      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* ── Hero header ────────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden mb-6 mt-2">
          <div className="bg-[#0722AB] px-6 py-8 text-center text-white">
            <div className="text-5xl mb-3 animate-badge-pop">🎊</div>
            <h1 className="font-display text-3xl font-extrabold mb-1">
              Niveau {levelId} complété !
            </h1>
            {levelData && (
              <p className="text-white/70 text-sm italic mb-4">{levelData.title}</p>
            )}

            {/* Badge(s) */}
            {badges.map((b) => (
              <div
                key={b.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-4"
              >
                <span className="text-2xl">{b.icon}</span>
                <span className="font-bold text-sm">{b.name}</span>
              </div>
            ))}

            {/* XP counter */}
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-display text-4xl font-extrabold text-[#AEFF94]">
                +<XpCounter target={level?.earnedXp ?? 0} /> XP
              </span>
            </div>

            {/* Next level badge */}
            {nextLevelData && (
              <p className="mt-3 text-sm text-white/80 font-semibold">
                🔓 Niveau {nextLevelId} débloqué — {nextLevelData.title}
              </p>
            )}
          </div>
        </div>

        {/* ── Ce que tu as construit ─────────────────────────────────── */}
        {recapCards.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Ce que tu as construit
            </h2>
            <div className="flex flex-col gap-3">
              {recapCards.map((card, i) => (
                <ReflectionCard
                  key={card.taskId}
                  icon={card.icon}
                  title={card.title}
                  answer={reflectionByTask.get(card.taskId) ?? null}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Analyse Kaba (résumé de la Passe Kaba) ─────────────────── */}
        {recapCards.length > 0 && <KabaVerdictSummary levelId={levelId} />}

        {/* ── Cross-sell formation ───────────────────────────────────── */}
        {crossSellProduct && !crossSellProduct.isPurchased && (
          <section className="mb-8">
            <CrossSellCard product={crossSellProduct} />
          </section>
        )}

        {/* ── Message de Kaba ────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5 flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#0722AB] flex items-center justify-center text-white text-lg font-bold">
              K
            </div>
            <div>
              <p className="font-semibold text-[#0722AB] text-sm mb-1">Kaba</p>
              <p className="text-foreground text-sm leading-relaxed">{kabaMessage}</p>
            </div>
          </div>
        </section>

        {/* ── Actions ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {nextLevelId ? (
            <Link
              href={`/parcours/${nextLevelId}`}
              className="w-full text-center px-6 py-4 rounded-2xl bg-cta text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              Continuer vers Niveau {nextLevelId} →
            </Link>
          ) : (
            <Link
              href="/parcours"
              className="w-full text-center px-6 py-4 rounded-2xl bg-cta text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              Voir mon parcours complet →
            </Link>
          )}
          <Link
            href="/projet"
            className="w-full text-center px-6 py-3 rounded-2xl border border-[#0722AB] text-[#0722AB] font-semibold text-sm hover:bg-[#EEF1FF] transition-colors"
          >
            Voir mon projet complet
          </Link>
          <button
            disabled
            className="w-full text-center px-6 py-3 rounded-2xl text-muted text-sm cursor-not-allowed"
          >
            Partager ma progression (bientôt)
          </button>
        </div>

        {/* ── Lien retour discret ────────────────────────────────────── */}
        <div className="mt-8 text-center">
          <Link href={`/parcours/${levelId}`} className="text-muted text-xs hover:text-primary transition-colors">
            ← Retour au niveau {levelId}
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-card-in {
          animation: cardIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
