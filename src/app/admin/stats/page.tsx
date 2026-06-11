"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Stats {
  usersPerLevel: { levelId: number; count: number }[];
  weeklyRetention: number[];
  avgXp: number;
  signupsThisWeek: number;
}

export default function AdminStatsPage() {
  const { data } = useSWR<Stats>("/api/admin/stats", fetcher);

  const maxUsers = Math.max(1, ...(data?.usersPerLevel.map((l) => l.count) ?? [1]));

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">
        Statistiques
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progression par niveau */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-foreground mb-4">
            Utilisateurs par niveau
          </h2>
          <div className="flex flex-col gap-3">
            {(data?.usersPerLevel ?? []).map((l) => (
              <div key={l.levelId} className="flex items-center gap-3">
                <span className="w-16 text-sm text-muted shrink-0">
                  Niveau {l.levelId}
                </span>
                <div className="flex-1 h-6 bg-green-light/30 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-lg transition-all"
                    style={{ width: `${(l.count / maxUsers) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm font-semibold text-foreground text-right">
                  {l.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rétention hebdomadaire */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-foreground mb-4">
            Rétention hebdomadaire
          </h2>
          <div className="flex items-end gap-2 h-44">
            {(data?.weeklyRetention ?? []).map((pct, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-green">{pct}%</span>
                <div
                  className="w-full bg-green rounded-t-lg transition-all"
                  style={{ height: `${pct}%` }}
                />
                <span className="text-xs text-muted">S{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs */}
        <div className="bg-surface border border-border rounded-2xl p-6 text-center">
          <p className="font-display text-4xl font-bold text-green">
            {data?.avgXp ?? "—"}
          </p>
          <p className="text-muted text-sm mt-2">XP moyen par utilisateur</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6 text-center">
          <p className="font-display text-4xl font-bold text-cta">
            {data?.signupsThisWeek ?? "—"}
          </p>
          <p className="text-muted text-sm mt-2">Inscriptions cette semaine</p>
        </div>
      </div>
    </div>
  );
}
