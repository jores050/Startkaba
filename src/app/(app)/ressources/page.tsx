"use client";

import { useState } from "react";
import useSWR from "swr";
import type { Resource } from "@/types";

interface ResourceWithCount extends Resource {
  downloadCount: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const CATEGORY_COLORS: Record<string, string> = {
  Modèle: "bg-primary/10 text-primary",
  Pitch: "bg-cta/10 text-cta",
  Légal: "bg-green-light/30 text-green",
};

export default function RessourcesPage() {
  const { data, mutate } = useSWR<{ resources: ResourceWithCount[] }>(
    "/api/resources",
    fetcher
  );
  const [downloading, setDownloading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-1">
        Ressources
      </h1>
      <p className="text-muted mb-8">
        Templates prêts à l&apos;emploi, adaptés à l&apos;écosystème UEMOA/OHADA.
      </p>

      {error && (
        <p className="text-error text-sm bg-error/10 border border-error/30 rounded-lg px-4 py-2 mb-6">
          {error}
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {(data?.resources ?? []).map((r) => (
          <div
            key={r.id}
            className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">📄</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  CATEGORY_COLORS[r.category] ?? "bg-border text-muted"
                }`}
              >
                {r.category}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-foreground">{r.title}</h3>
              <p className="text-muted text-sm mt-2">{r.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted text-xs">
                ⬇ {r.downloadCount} téléchargement{r.downloadCount > 1 ? "s" : ""}
              </span>
              <button
                onClick={() => download(r.id)}
                disabled={downloading === r.id}
                className="px-4 py-2 rounded-lg bg-cta text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {downloading === r.id ? "..." : "Télécharger"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
