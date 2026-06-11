"use client";

import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminPage() {
  const { data } = useSWR("/api/admin/stats", fetcher);

  const cards = [
    { label: "Inscriptions aujourd'hui", value: data?.signupsToday, color: "text-primary" },
    { label: "Messages Kaba aujourd'hui", value: data?.kabaMessagesToday, color: "text-cta" },
    { label: "Badges gagnés aujourd'hui", value: data?.badgesEarnedToday, color: "text-green" },
    { label: "Utilisateurs total", value: data?.totalUsers, color: "text-foreground" },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-surface border border-border rounded-2xl p-6 text-center">
            <p className={`font-display text-4xl font-bold ${c.color}`}>
              {c.value ?? "—"}
            </p>
            <p className="text-muted text-sm mt-2">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <Link href="/admin/users" className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-opacity">
          Gérer les utilisateurs
        </Link>
        <Link href="/admin/stats" className="px-4 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
          Voir les statistiques
        </Link>
      </div>
    </div>
  );
}
