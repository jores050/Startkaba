"use client";

import { useState } from "react";
import Link from "next/link";

export default function DevenirCoachPage() {
  const [form, setForm] = useState({
    presentation: "",
    expertise: "",
    experience: "",
    mobileMoneyNumber: "",
    mobileMoneyProvider: "Wave",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.presentation.trim() || !form.expertise.trim()) {
      setError("Présentation et expertise sont obligatoires.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/coach/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error);
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Erreur lors de l'envoi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-10 text-center shadow-sm">
          <p className="text-5xl mb-4">🎉</p>
          <h1 className="font-display text-2xl font-bold text-[#0A0E2A] mb-2">
            Demande envoyée !
          </h1>
          <p className="text-[#4A5280] text-sm leading-relaxed mb-6">
            Notre équipe va examiner ton dossier sous 3-5 jours ouvrables. Tu recevras une
            notification dès que ton compte coach sera activé.
          </p>
          <Link
            href="/ressources"
            className="px-5 py-3 rounded-xl bg-[#0722AB] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Retour aux ressources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Link href="/ressources" className="text-xs text-[#8892C8] hover:text-[#0722AB] transition-colors">
          ← Ressources
        </Link>
        <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A] mt-3">
          Devenir coach StartKaba
        </h1>
        <p className="text-[#8892C8] mt-1 text-sm">
          Partage ton expertise avec la communauté d&apos;entrepreneurs africains et génère des revenus.
        </p>
      </div>

      {/* Avantages */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "💰", title: "80% des revenus", desc: "Tu gardes 80% de chaque vente" },
          { icon: "🌍", title: "Audience qualifiée", desc: "Des entrepreneurs motivés en UEMOA" },
          { icon: "📱", title: "Paiement Mobile Money", desc: "Wave, Orange Money, MTN" },
        ].map((item) => (
          <div key={item.title} className="bg-[#F8F9FF] border border-[#E8EAF0] rounded-2xl p-4 text-center">
            <p className="text-2xl mb-2">{item.icon}</p>
            <p className="font-bold text-[#0A0E2A] text-sm">{item.title}</p>
            <p className="text-[#8892C8] text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-[#E8EAF0] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
        <div>
          <label className="block text-sm font-semibold text-[#0A0E2A] mb-1.5">
            Présente-toi <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.presentation}
            onChange={(e) => setForm({ ...form, presentation: e.target.value })}
            rows={3}
            maxLength={500}
            placeholder="Qui es-tu ? Quel est ton parcours entrepreneurial ? Pourquoi veux-tu devenir coach ?"
            className="w-full px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A0E2A] mb-1.5">
            Domaine d&apos;expertise <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.expertise}
            onChange={(e) => setForm({ ...form, expertise: e.target.value })}
            maxLength={200}
            placeholder="Ex : Validation de marché, Business Model Canvas, Financement UEMOA..."
            className="w-full px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A0E2A] mb-1.5">
            Expérience pertinente
          </label>
          <textarea
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            rows={3}
            maxLength={500}
            placeholder="Formations données, entreprises accompagnées, réalisations concrètes..."
            className="w-full px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#0A0E2A] mb-1.5">
            Numéro Mobile Money pour les paiements
          </label>
          <div className="flex gap-3">
            <select
              value={form.mobileMoneyProvider}
              onChange={(e) => setForm({ ...form, mobileMoneyProvider: e.target.value })}
              className="px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] focus:border-[#0722AB] focus:outline-none bg-white"
            >
              <option>Wave</option>
              <option>Orange Money</option>
              <option>MTN MoMo</option>
              <option>Moov Money</option>
            </select>
            <input
              type="tel"
              value={form.mobileMoneyNumber}
              onChange={(e) => setForm({ ...form, mobileMoneyNumber: e.target.value })}
              placeholder="+225 07 00 00 00 00"
              className="flex-1 px-3 py-2 rounded-xl border border-[#E8EAF0] text-sm text-[#0A0E2A] placeholder:text-[#8892C8] focus:border-[#0722AB] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
        >
          {submitting ? "Envoi en cours..." : "Envoyer ma candidature →"}
        </button>
      </form>
    </div>
  );
}
