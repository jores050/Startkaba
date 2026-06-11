"use client";

import { useState } from "react";
import useSWR from "swr";

interface Entry {
  id: string;
  rank: number;
  fullName: string;
  city: string;
  totalXp: number;
  currentLevelId: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const CITY_FILTERS = [
  { value: "", label: "Global" },
  { value: "COTONOU", label: "Cotonou" },
  { value: "ABIDJAN", label: "Abidjan" },
  { value: "DAKAR", label: "Dakar" },
  { value: "LOME", label: "Lomé" },
  { value: "BAMAKO", label: "Bamako" },
];

const CITY_LABELS: Record<string, string> = {
  COTONOU: "Cotonou",
  ABIDJAN: "Abidjan",
  DAKAR: "Dakar",
  LOME: "Lomé",
  BAMAKO: "Bamako",
  OTHER: "Autre",
};

export function Leaderboard({ defaultCity = "" }: { defaultCity?: string }) {
  const [city, setCity] = useState(defaultCity);
  const { data } = useSWR<{ entries: Entry[]; me: Entry | null }>(
    `/api/leaderboard?city=${city}&limit=10`,
    fetcher
  );

  const meInTop = data?.me && data.entries.some((e) => e.id === data.me!.id);

  return (
    <div className="bg-surface border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-display text-lg font-bold text-foreground">
          🏆 Classement
        </h2>
        <div className="flex gap-1 flex-wrap">
          {CITY_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setCity(f.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                city === f.value
                  ? "bg-primary text-white"
                  : "bg-primary/5 text-muted hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted text-left border-b border-border">
            <th className="py-2 pr-2 font-medium">#</th>
            <th className="py-2 pr-2 font-medium">Nom</th>
            <th className="py-2 pr-2 font-medium">Ville</th>
            <th className="py-2 pr-2 font-medium text-right">XP</th>
            <th className="py-2 font-medium text-right">Niveau</th>
          </tr>
        </thead>
        <tbody>
          {(data?.entries ?? []).map((e) => {
            const isMe = data?.me?.id === e.id;
            return (
              <tr
                key={e.id}
                className={`border-b border-border/50 ${
                  isMe ? "bg-green-light/20 font-semibold" : ""
                }`}
              >
                <td className="py-2 pr-2">
                  {e.rank <= 3 ? ["🥇", "🥈", "🥉"][e.rank - 1] : e.rank}
                </td>
                <td className="py-2 pr-2">
                  {e.fullName}
                  {isMe && <span className="text-green ml-1">(toi)</span>}
                </td>
                <td className="py-2 pr-2 text-muted">
                  {CITY_LABELS[e.city] ?? e.city}
                </td>
                <td className="py-2 pr-2 text-right text-green font-semibold">
                  {e.totalXp}
                </td>
                <td className="py-2 text-right text-primary font-semibold">
                  {e.currentLevelId}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {data?.me && !meInTop && (
        <p className="text-muted text-sm mt-3">
          Ta position : <span className="text-primary font-bold">#{data.me.rank}</span>{" "}
          avec <span className="text-green font-semibold">{data.me.totalXp} XP</span>
        </p>
      )}
    </div>
  );
}
