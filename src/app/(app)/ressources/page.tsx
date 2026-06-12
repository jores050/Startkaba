"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import type { Resource } from "@/types";
import type { StaticProduct } from "@/data/products";
import { useUser } from "@/hooks/use-user";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EXTERNAL_RESOURCES } from "@/data/external-resources";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ResourceWithCount extends Resource {
  downloadCount: number;
}

interface ProductWithStatus extends StaticProduct {
  isPurchased: boolean;
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { bg: string; text: string; icon: string }> = {
  Modèle: { bg: "bg-[#EEF1FF]", text: "text-[#0722AB]", icon: "📊" },
  Pitch: { bg: "bg-[#FFF4EC]", text: "text-[#F77E2D]", icon: "🎤" },
  Légal: { bg: "bg-[#F0FAF0]", text: "text-[#1A6B00]", icon: "⚖️" },
};

const FAVORITES_KEY = "startkaba-favorites";

function loadFavorites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-[#E8EAF0] ${className}`} />;
}

// ─── Modal achat mock ─────────────────────────────────────────────────────────

function PurchaseModal({
  product,
  onClose,
  onConfirm,
  loading,
}: {
  product: ProductWithStatus;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <Modal onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded-full bg-[#FFF4EC] text-[#F77E2D] text-xs font-bold">
              Mode test
            </span>
            <span className="text-xs text-[#8892C8]">Aucun vrai paiement effectué</span>
          </div>
          <h2 className="font-display text-xl font-bold text-[#0A0E2A]">{product.title}</h2>
          {product.levelTag && (
            <p className="text-sm text-[#8892C8] mt-1">Niveau {product.levelTag}</p>
          )}
        </div>

        <div className="bg-[#F8F9FF] border border-[#E8EAF0] rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-[#4A5280] text-sm">Montant simulé</span>
            <span className="font-display font-extrabold text-[#0722AB] text-2xl">
              {product.priceCFA.toLocaleString("fr-FR")} FCFA
            </span>
          </div>
        </div>

        <p className="text-xs text-[#8892C8] text-center">
          🔒 Paiement simulé — aucune carte ni Mobile Money requis dans cette version.
          <br />
          L&apos;intégration Fedapay sera activée prochainement.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-[#E8EAF0] text-[#8892C8] text-sm font-semibold hover:text-[#0A0E2A] transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Traitement..." : "Confirmer l'achat →"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Formation card ───────────────────────────────────────────────────────────

function FormationCard({
  product,
  onBuy,
  onDownload,
  buying,
}: {
  product: ProductWithStatus;
  onBuy: (p: ProductWithStatus) => void;
  onDownload: (id: string) => void;
  buying: boolean;
}) {
  return (
    <div className="bg-white border border-[#E8EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-br from-[#EEF1FF] to-[#D5DAF7] flex items-center justify-center relative">
        <span className="text-5xl">{product.levelTag ? ["🎯", "📐", "🏗️", "🚀", "📣", "⚖️", "💰", "🎊"][product.levelTag - 1] ?? "📘" : "📘"}</span>
        {product.levelTag && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#0722AB] text-white text-xs font-bold">
            Niv. {product.levelTag}
          </span>
        )}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#F77E2D] text-white text-xs font-bold">
          Premium
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex-1">
          <h3 className="font-display font-bold text-[#0A0E2A] text-sm leading-tight">
            {product.title}
          </h3>
          <p className="text-[#8892C8] text-xs mt-1 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display font-extrabold text-[#0722AB]">
            {product.priceCFA.toLocaleString("fr-FR")} FCFA
          </span>
          <span className="text-[#8892C8] text-xs">
            ⬇ {product.downloadsCount}
          </span>
        </div>

        {product.isPurchased ? (
          <button
            onClick={() => onDownload(product.id)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#F0FAF0] text-[#1A6B00] text-sm font-bold hover:bg-[#DCFADC] transition-colors border border-[#1A6B00]/20"
          >
            ✓ Télécharger
          </button>
        ) : (
          <button
            onClick={() => onBuy(product)}
            disabled={buying}
            className="w-full px-4 py-2.5 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {buying ? "..." : `Débloquer — ${product.priceCFA.toLocaleString("fr-FR")} FCFA`}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RessourcesPage() {
  const { user } = useUser();
  const { data: resourcesData, mutate: mutateResources } = useSWR<{
    resources: ResourceWithCount[];
  }>("/api/resources", fetcher);
  const { data: productsData, mutate: mutateProducts } = useSWR<{
    products: ProductWithStatus[];
  }>("/api/products", fetcher);

  const [downloading, setDownloading] = useState<number | null>(null);
  const [downloadingProduct, setDownloadingProduct] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [preview, setPreview] = useState<ResourceWithCount | null>(null);
  const [purchaseTarget, setPurchaseTarget] = useState<ProductWithStatus | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => setFavorites(loadFavorites()), []);

  function toggleFavorite(id: number) {
    const next = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }

  async function downloadResource(id: number) {
    setDownloading(id);
    setError(null);
    try {
      const res = await fetch(`/api/resources/${id}/download`);
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error);
      window.open(d.url, "_blank");
      mutateResources();
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Téléchargement impossible.");
    } finally {
      setDownloading(null);
    }
  }

  async function downloadProduct(id: string) {
    setDownloadingProduct(id);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}/download`);
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error);
      window.open(d.url, "_blank");
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Téléchargement impossible.");
    } finally {
      setDownloadingProduct(null);
    }
  }

  async function confirmPurchase() {
    if (!purchaseTarget) return;
    setPurchasing(true);
    try {
      const res = await fetch(`/api/products/${purchaseTarget.id}/purchase`, {
        method: "POST",
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error);
      await mutateProducts();
      setPurchaseTarget(null);
      setSuccessMsg(`✓ "${purchaseTarget.title}" débloqué ! Tu peux maintenant le télécharger.`);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Erreur lors de l'achat.");
      setPurchaseTarget(null);
    } finally {
      setPurchasing(false);
    }
  }

  const currentLevelId = user?.currentLevelId ?? 1;
  const allResources = resourcesData?.resources ?? [];
  const allProducts = productsData?.products ?? [];
  const formations = allProducts.filter((p) => p.category === "FORMATION_NIVEAU");
  const coachFormations = allProducts.filter(
    (p) => p.category === "FORMATION_COACH"
  );

  // Recommandés : templates au niveau actuel + formation du niveau actuel
  const recommendedResources = allResources.filter(
    (r) => r.levelId === currentLevelId || r.levelId === currentLevelId + 1
  );
  const recommendedFormation = formations.find((f) => f.levelTag === currentLevelId);

  const sortedResources = [...allResources].sort((a, b) => {
    const favDiff = Number(favorites.includes(b.id)) - Number(favorites.includes(a.id));
    if (favDiff !== 0) return favDiff;
    return (
      Number((b.levelId ?? 99) <= currentLevelId) -
      Number((a.levelId ?? 99) <= currentLevelId)
    );
  });

  const externalForLevel = EXTERNAL_RESOURCES.filter((r) =>
    r.levelIds.includes(currentLevelId)
  );
  const externalOthers = EXTERNAL_RESOURCES.filter(
    (r) => !r.levelIds.includes(currentLevelId)
  );

  const isLoadingResources = !resourcesData;
  const isLoadingProducts = !productsData;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">Ressources</h1>
        <p className="text-[#8892C8] mt-1 text-sm">
          Templates, formations et outils adaptés à l&apos;écosystème UEMOA/OHADA.
        </p>
      </div>

      {/* Notifications */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6 text-red-600 text-sm">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-[#F0FAF0] border border-[#1A6B00]/30 rounded-2xl px-4 py-3 mb-6 text-[#1A6B00] text-sm font-semibold">
          {successMsg}
        </div>
      )}

      {/* ── Section Recommandés ─────────────────────────────────────────── */}
      {!isLoadingResources && !isLoadingProducts && (recommendedResources.length > 0 || recommendedFormation) && (
        <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl shrink-0">⭐</span>
          <div className="flex-1 min-w-0">
            <p className="text-[#0722AB] font-semibold text-sm mb-1">
              Recommandés pour ton niveau {currentLevelId}
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendedResources.map((r) => (
                <span key={r.id} className="px-2 py-0.5 rounded-full bg-white/70 text-[#0722AB] text-xs font-medium">
                  📄 {r.title}
                </span>
              ))}
              {recommendedFormation && !recommendedFormation.isPurchased && (
                <button
                  onClick={() => setPurchaseTarget(recommendedFormation)}
                  className="px-2 py-0.5 rounded-full bg-[#F77E2D] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  🎓 {recommendedFormation.title} — {recommendedFormation.priceCFA.toLocaleString("fr-FR")} FCFA
                </button>
              )}
              {recommendedFormation?.isPurchased && (
                <span className="px-2 py-0.5 rounded-full bg-[#F0FAF0] text-[#1A6B00] text-xs font-medium">
                  ✓ {recommendedFormation.title}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Section Templates gratuits ──────────────────────────────────── */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-1">Templates gratuits</h2>
        <p className="text-[#8892C8] text-sm mb-5">Télécharge directement — aucun paiement requis.</p>

        {isLoadingResources ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedResources.map((r) => {
              const isFav = favorites.includes(r.id);
              const isRec = r.levelId === currentLevelId || r.levelId === currentLevelId + 1;
              const catMeta = CATEGORY_META[r.category] ?? {
                bg: "bg-[#F5F6FA]",
                text: "text-[#4A5280]",
                icon: "📄",
              };
              return (
                <div
                  key={r.id}
                  className={`bg-white border rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-all ${
                    isRec ? "border-[#0722AB]/30" : "border-[#E8EAF0] hover:border-[#0722AB]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-12 h-12 rounded-2xl ${catMeta.bg} flex items-center justify-center text-2xl shrink-0`}>
                      {catMeta.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${catMeta.bg} ${catMeta.text}`}>
                        {r.category}
                      </span>
                      <button
                        onClick={() => toggleFavorite(r.id)}
                        aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                        className={`text-lg transition-all hover:scale-110 ${isFav ? "opacity-100" : "grayscale opacity-30 hover:opacity-70"}`}
                      >
                        ⭐
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-[#0A0E2A] mb-1">{r.title}</h3>
                    <p className="text-[#8892C8] text-sm leading-relaxed">{r.description}</p>
                  </div>
                  <p className="text-[#8892C8] text-xs">
                    ⬇ {r.downloadCount} téléchargement{r.downloadCount > 1 ? "s" : ""}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPreview(r)}
                      className="!px-3 !py-2 text-sm flex-1"
                    >
                      Aperçu
                    </Button>
                    <Button
                      onClick={() => downloadResource(r.id)}
                      loading={downloading === r.id}
                      loadingText="..."
                      className="!px-3 !py-2 text-sm flex-1"
                    >
                      Télécharger
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Section Formations StartKaba par niveau ─────────────────────── */}
      <div className="mb-10">
        <div className="flex items-end justify-between gap-4 mb-1">
          <h2 className="font-display text-xl font-bold text-[#0A0E2A]">Formations StartKaba</h2>
          <Link href="/mes-achats" className="text-xs text-[#0722AB] font-semibold hover:underline shrink-0">
            Mes achats →
          </Link>
        </div>
        <p className="text-[#8892C8] text-sm mb-5">
          Approfondis chaque niveau avec du contenu exclusif.
        </p>

        {isLoadingProducts ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-80" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {formations.map((p) => (
              <FormationCard
                key={p.id}
                product={p}
                onBuy={setPurchaseTarget}
                onDownload={downloadProduct}
                buying={downloadingProduct === p.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Section Marketplace Coachs ──────────────────────────────────── */}
      <div className="mb-10">
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-1">Marketplace Coachs</h2>
        <p className="text-[#8892C8] text-sm mb-5">
          Formations par des experts entrepreneuriaux africains.
        </p>

        {coachFormations.length === 0 ? (
          <div className="bg-white border border-dashed border-[#C8CCDF] rounded-2xl p-8 text-center">
            <p className="text-3xl mb-3">🌍</p>
            <p className="font-semibold text-[#4A5280] mb-1">
              Bientôt : des formations par des experts africains
            </p>
            <p className="text-[#8892C8] text-sm mb-4">
              Des coachs spécialisés en entrepreneuriat UEMOA vont bientôt partager leur expertise.
            </p>
            <Link
              href="/devenir-coach"
              className="inline-flex items-center gap-1 text-[#0722AB] text-sm font-semibold hover:underline"
            >
              Devenir coach et vendre tes formations →
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coachFormations.map((p) => (
              <FormationCard
                key={p.id}
                product={p}
                onBuy={setPurchaseTarget}
                onDownload={downloadProduct}
                buying={downloadingProduct === p.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Section Outils externes ─────────────────────────────────────── */}
      <div>
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-1">Outils externes gratuits</h2>
        <p className="text-[#8892C8] text-sm mb-5">
          Sélectionnés pour ton niveau, tous gratuits pour démarrer.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[...externalForLevel, ...externalOthers].map((tool) => {
            const forNow = tool.levelIds.includes(currentLevelId);
            return (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-md ${
                  forNow
                    ? "border-[#1A6B00]/30 bg-[#F0FAF0]"
                    : "border-[#E8EAF0] bg-white hover:border-[#0722AB]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${forNow ? "bg-[#AEFF94]/40" : "bg-[#F5F6FA]"}`}>
                  🔗
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-[#0A0E2A] text-sm">{tool.name}</p>
                    {forNow && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1A6B00] text-white text-xs font-bold">
                        Ton niveau
                      </span>
                    )}
                  </div>
                  <p className="text-[#8892C8] text-xs mt-0.5 leading-relaxed">{tool.description}</p>
                  <p className="text-[#8892C8] text-xs mt-1">Niveaux {tool.levelIds.join(", ")}</p>
                </div>
                <span className="text-[#8892C8] text-sm shrink-0">↗</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Modal aperçu template */}
      {preview && (
        <Modal onClose={() => setPreview(null)} maxWidth="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-[#0A0E2A]">{preview.title}</h2>
            <button
              onClick={() => setPreview(null)}
              className="text-[#8892C8] hover:text-[#0A0E2A] text-2xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F6FA]"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          <iframe
            src={`/${preview.fileKey}#page=1`}
            title={`Aperçu de ${preview.title}`}
            className="w-full h-[50vh] rounded-xl border border-[#E8EAF0] bg-white"
          />
          <Button
            onClick={() => {
              downloadResource(preview.id);
              setPreview(null);
            }}
            full
            className="mt-4"
          >
            Télécharger le template complet
          </Button>
        </Modal>
      )}

      {/* Modal achat mock */}
      {purchaseTarget && (
        <PurchaseModal
          product={purchaseTarget}
          onClose={() => setPurchaseTarget(null)}
          onConfirm={confirmPurchase}
          loading={purchasing}
        />
      )}
    </div>
  );
}
