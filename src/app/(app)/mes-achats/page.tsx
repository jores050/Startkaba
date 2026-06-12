"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import type { StaticProduct } from "@/data/products";
import type { PaymentStatus } from "@/lib/dev/mock-purchases";

interface PurchaseWithProduct {
  id: string;
  productId: string;
  priceCFA: number;
  paymentStatus: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  product: StaticProduct | null;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const STATUS_LABELS: Record<PaymentStatus, { label: string; color: string }> = {
  MOCK_PAID: { label: "✓ Simulé", color: "text-[#1A6B00] bg-[#F0FAF0]" },
  PAID: { label: "✓ Payé", color: "text-[#1A6B00] bg-[#F0FAF0]" },
  PENDING: { label: "En attente", color: "text-[#F77E2D] bg-[#FFF4EC]" },
};

export default function MesAchatsPage() {
  const { data, isLoading } = useSWR<{ purchases: PurchaseWithProduct[] }>(
    "/api/user/purchases",
    fetcher
  );
  const [downloading, setDownloading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function download(productId: string) {
    setDownloading(productId);
    setError(null);
    try {
      const res = await fetch(`/api/products/${productId}/download`);
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error);
      window.open(d.url, "_blank");
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Téléchargement impossible.");
    } finally {
      setDownloading(null);
    }
  }

  const purchases = data?.purchases ?? [];

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">Mes achats</h1>
          <p className="text-[#8892C8] mt-1 text-sm">Historique de tes formations débloquées.</p>
        </div>
        <Link
          href="/ressources"
          className="px-4 py-2 rounded-xl border border-[#0722AB] text-[#0722AB] text-sm font-semibold hover:bg-[#EEF1FF] transition-colors shrink-0"
        >
          ← Ressources
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6 text-red-600 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-[#E8EAF0] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : purchases.length === 0 ? (
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-10 text-center shadow-sm">
          <p className="text-4xl mb-3">🛒</p>
          <p className="font-semibold text-[#4A5280] mb-1">Aucun achat pour l&apos;instant</p>
          <p className="text-[#8892C8] text-sm mb-5">
            Explore les formations StartKaba pour aller plus loin dans chaque niveau.
          </p>
          <Link
            href="/ressources"
            className="px-5 py-2.5 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Voir les formations →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {purchases.map((p) => {
            const statusMeta = STATUS_LABELS[p.paymentStatus] ?? STATUS_LABELS.PENDING;
            return (
              <div
                key={p.id}
                className="bg-white border border-[#E8EAF0] rounded-2xl p-5 flex items-center gap-4 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EEF1FF] to-[#D5DAF7] flex items-center justify-center text-2xl shrink-0">
                  {p.product?.levelTag
                    ? ["🎯", "📐", "🏗️", "🚀", "📣", "⚖️", "💰", "🎊"][p.product.levelTag - 1] ?? "📘"
                    : "📘"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0A0E2A] text-sm truncate">
                    {p.product?.title ?? p.productId}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusMeta.color}`}>
                      {statusMeta.label}
                    </span>
                    <span className="text-[#8892C8] text-xs">
                      {p.priceCFA.toLocaleString("fr-FR")} FCFA
                    </span>
                    {p.paidAt && (
                      <span className="text-[#8892C8] text-xs">
                        · {new Date(p.paidAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
                {(p.paymentStatus === "PAID" || p.paymentStatus === "MOCK_PAID") && (
                  <button
                    onClick={() => download(p.productId)}
                    disabled={downloading === p.productId}
                    className="shrink-0 px-4 py-2 rounded-xl bg-[#0722AB] text-white text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {downloading === p.productId ? "..." : "Télécharger"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
