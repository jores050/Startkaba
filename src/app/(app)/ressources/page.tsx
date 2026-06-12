"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import type { Resource } from "@/types";
import { useUser } from "@/hooks/use-user";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { EXTERNAL_RESOURCES } from "@/data/external-resources";

interface ResourceWithCount extends Resource {
  downloadCount: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

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

export default function RessourcesPage() {
  const { user } = useUser();
  const { data, mutate } = useSWR<{ resources: ResourceWithCount[] }>(
    "/api/resources",
    fetcher
  );
  const [downloading, setDownloading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [preview, setPreview] = useState<ResourceWithCount | null>(null);

  useEffect(() => setFavorites(loadFavorites()), []);

  function toggleFavorite(id: number) {
    const next = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }

  async function download(id: number) {
    setDownloading(id);
    setError(null);
    try {
      const res = await fetch(`/api/resources/${id}/download`);
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error);
      window.open(d.url, "_blank");
      mutate();
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Téléchargement impossible.");
    } finally {
      setDownloading(null);
    }
  }

  const currentLevelId = user?.currentLevelId ?? 1;
  const all = data?.resources ?? [];
  const sorted = [...all].sort((a, b) => {
    const favDiff = Number(favorites.includes(b.id)) - Number(favorites.includes(a.id));
    if (favDiff !== 0) return favDiff;
    return (
      Number((b.levelId ?? 99) <= currentLevelId) -
      Number((a.levelId ?? 99) <= currentLevelId)
    );
  });
  const recommended = all.filter(
    (r) => r.levelId === currentLevelId || r.levelId === currentLevelId + 1
  );
  const externalForLevel = EXTERNAL_RESOURCES.filter((r) =>
    r.levelIds.includes(currentLevelId)
  );
  const externalOthers = EXTERNAL_RESOURCES.filter(
    (r) => !r.levelIds.includes(currentLevelId)
  );

  const isLoading = !data;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">
          Ressources
        </h1>
        <p className="text-[#8892C8] mt-1 text-sm">
          Templates et outils adaptés à l&apos;écosystème UEMOA/OHADA.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Recommandés */}
      {!isLoading && recommended.length > 0 && (
        <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-[#0722AB] font-semibold text-sm">
              Recommandé pour ton niveau {currentLevelId}
            </p>
            <p className="text-[#4A5280] text-xs mt-0.5">
              {recommended.map((r) => r.title).join(" · ")}
            </p>
          </div>
        </div>
      )}

      {/* Grille templates */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {sorted.map((r) => {
            const isFav = favorites.includes(r.id);
            const isRec =
              r.levelId === currentLevelId || r.levelId === currentLevelId + 1;
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
                    onClick={() => download(r.id)}
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

      {/* Outils externes */}
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold text-[#0A0E2A] mb-1">
          Outils externes gratuits
        </h2>
        <p className="text-[#8892C8] text-sm mb-6">
          Sélectionnés pour ton niveau, tous gratuits pour démarrer.
        </p>
      </div>
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
                <p className="text-[#8892C8] text-xs mt-1">
                  Niveaux {tool.levelIds.join(", ")}
                </p>
              </div>
              <span className="text-[#8892C8] text-sm shrink-0">↗</span>
            </a>
          );
        })}
      </div>

      {/* Modal aperçu */}
      {preview && (
        <Modal onClose={() => setPreview(null)} maxWidth="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-[#0A0E2A]">
              {preview.title}
            </h2>
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
              download(preview.id);
              setPreview(null);
            }}
            full
            className="mt-4"
          >
            Télécharger le template complet
          </Button>
        </Modal>
      )}
    </div>
  );
}
