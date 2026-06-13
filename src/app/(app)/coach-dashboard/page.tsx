"use client";

import { useState } from "react";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CoachDashboardPage() {
  const { user, isLoading } = useUser();
  const { data } = useSWR("/api/coach/dashboard", fetcher);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priceCFA: "" });
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-[#E8EAF0] rounded-2xl max-w-2xl" />;
  }

  const isCoach = user?.role === "COACH" || user?.isAdmin;

  if (!isCoach) {
    return (
      <div className="max-w-xl">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-8 text-center shadow-sm">
          <p className="text-4xl mb-3">🔒</p>
          <p className="font-bold text-[#0A0E2A] mb-2">Espace réservé aux coachs</p>
          <p className="text-[#8892C8] text-sm mb-5">
            Dépose ta candidature pour devenir coach StartKaba et vendre tes formations.
          </p>
          <a
            href="/devenir-coach"
            className="px-5 py-3 rounded-xl bg-[#0722AB] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Devenir coach →
          </a>
        </div>
      </div>
    );
  }

  async function submitProduct(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/coach/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, priceCFA: Number(form.priceCFA) }),
      });
      setSaved(true);
      setShowNewProduct(false);
      setForm({ title: "", description: "", priceCFA: "" });
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSubmitting(false);
    }
  }

  const stats = data?.stats ?? { totalSales: 0, totalRevenue: 0, pendingPayout: 0 };
  const products = data?.products ?? [];

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">Dashboard Coach</h1>
        <p className="text-[#8892C8] mt-1 text-sm">Gère tes formations et suis tes revenus.</p>
      </div>

      {saved && (
        <div className="bg-[#F0FAF0] border border-[#1A6B00]/30 rounded-2xl px-4 py-3 text-[#1A6B00] text-sm font-semibold">
          ✓ Formation soumise — en attente de validation par l&apos;équipe StartKaba.
        </div>
      )}

      {/* Stats revenus */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Ventes totales", value: stats.totalSales, suffix: "" },
          { label: "Revenus totaux", value: stats.totalRevenue, suffix: " FCFA" },
          { label: "En attente", value: stats.pendingPayout, suffix: " FCFA" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E8EAF0] rounded-2xl p-4 text-center shadow-sm">
            <p className="font-display text-2xl font-extrabold text-[#0722AB]">
              {s.value.toLocaleString("fr-FR")}{s.suffix}
            </p>
            <p className="text-[#8892C8] text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mes formations */}
      <div className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-[#0A0E2A]">Mes formations</h2>
          <button
            onClick={() => setShowNewProduct(!showNewProduct)}
            className="px-4 py-2 rounded-xl bg-[#F77E2D] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            + Nouveau produit
          </button>
        </div>

        {showNewProduct && (
          <form onSubmit={submitProduct} className="bg-[#F8F9FF] border border-[#E8EAF0] rounded-2xl p-4 mb-5 flex flex-col gap-4">
            <p className="text-xs font-bold text-[#0722AB] uppercase tracking-wide">Nouveau produit (DRAFT)</p>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Titre de la formation"
              required
              className="px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none"
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description de la formation..."
              rows={3}
              required
              className="px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none resize-none"
            />
            <input
              type="number"
              value={form.priceCFA}
              onChange={(e) => setForm({ ...form, priceCFA: e.target.value })}
              placeholder="Prix en FCFA"
              min={0}
              required
              className="px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-[#0722AB] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "..." : "Soumettre pour validation"}
              </button>
              <button
                type="button"
                onClick={() => setShowNewProduct(false)}
                className="px-4 py-2 rounded-xl border border-[#E8EAF0] text-[#8892C8] text-sm hover:text-[#0A0E2A]"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {products.length === 0 ? (
          <p className="text-[#8892C8] text-sm text-center py-4">
            Aucune formation pour l&apos;instant. Crée ton premier produit !
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((p: { id: string; title: string; status: string; priceCFA: number; downloadsCount: number }) => (
              <div key={p.id} className="flex items-center justify-between gap-4 p-3 bg-[#F8F9FF] rounded-xl">
                <div>
                  <p className="font-semibold text-[#0A0E2A] text-sm">{p.title}</p>
                  <p className="text-[#8892C8] text-xs mt-0.5">
                    {p.priceCFA.toLocaleString("fr-FR")} FCFA · {p.downloadsCount} ventes
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  p.status === "PUBLISHED"
                    ? "bg-[#F0FAF0] text-[#1A6B00]"
                    : "bg-[#FFF4EC] text-[#F77E2D]"
                }`}>
                  {p.status === "PUBLISHED" ? "Publié" : "En révision"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
