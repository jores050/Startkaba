"use client";

import { useState } from "react";
import useSWR from "swr";
import type { AdminUser } from "@/lib/dev/mock-admin";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminUsersPage() {
  const [q, setQ] = useState("");
  const { data, mutate } = useSWR<{ users: AdminUser[] }>(
    `/api/admin/users?q=${encodeURIComponent(q)}`,
    fetcher
  );

  async function act(userId: string, action: string) {
    if (
      action === "reset-progress" &&
      !window.confirm("Réinitialiser la progression de cet utilisateur ?")
    ) {
      return;
    }
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });
    mutate();
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-3xl font-extrabold text-foreground mb-6">
        Utilisateurs
      </h1>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher par nom ou email..."
        className="w-full max-w-md px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors mb-6"
      />

      <div className="bg-surface border border-border rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted text-left border-b border-border">
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Ville</th>
              <th className="px-4 py-3 font-medium text-right">Niveau</th>
              <th className="px-4 py-3 font-medium text-right">XP</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(data?.users ?? []).map((u) => (
              <tr
                key={u.id}
                className={`border-b border-border/50 last:border-0 ${
                  u.disabled ? "opacity-40" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium">
                  {u.fullName}
                  {u.isAdmin && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                      admin
                    </span>
                  )}
                  {u.disabled && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-error/10 text-error text-xs">
                      désactivé
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{u.email}</td>
                <td className="px-4 py-3 text-muted">{u.city}</td>
                <td className="px-4 py-3 text-right text-primary font-semibold">
                  {u.currentLevelId}
                </td>
                <td className="px-4 py-3 text-right text-green font-semibold">
                  {u.totalXp}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.subscriptionStatus === "PREMIUM"
                        ? "bg-cta/10 text-cta"
                        : "bg-border text-muted"
                    }`}
                  >
                    {u.subscriptionStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => act(u.id, "toggle-disabled")}
                      className="text-xs px-2 py-1 rounded border border-border hover:border-error hover:text-error transition-colors"
                    >
                      {u.disabled ? "Réactiver" : "Désactiver"}
                    </button>
                    <button
                      onClick={() => act(u.id, "reset-progress")}
                      className="text-xs px-2 py-1 rounded border border-border hover:border-cta hover:text-cta transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
