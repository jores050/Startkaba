"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import type { Mentor } from "@/types";

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");

  async function load() {
    const res = await fetch("/api/admin/mentors").catch(() => null);
    if (res?.ok) {
      const d = await res.json();
      setMentors(Array.isArray(d) ? d : []);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: "APPROVED" | "REJECTED") {
    setUpdating(id);
    await fetch(`/api/admin/mentors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load();
  }

  const filtered = filter === "ALL" ? mentors : mentors.filter((m) => m.status === filter);

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A] mb-6">
        Gestion des mentors
      </h1>

      <div className="flex gap-2 mb-6">
        {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === f
                ? "bg-[#0722AB] text-white"
                : "bg-white border border-[#E8EAF0] text-[#8892C8] hover:text-[#0A0E2A]"
            }`}
          >
            {f === "ALL" ? "Tous" : f === "PENDING" ? "En attente" : f === "APPROVED" ? "Approuvés" : "Refusés"}
            {f === "PENDING" && mentors.filter((m) => m.status === "PENDING").length > 0 && (
              <span className="ml-1 text-orange-500">
                ({mentors.filter((m) => m.status === "PENDING").length})
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 rounded-2xl bg-[#F8F9FF] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-[#8892C8]">Aucun mentor dans cette catégorie.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-[#E8EAF0] rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <Avatar fullName={mentor.name} avatarUrl={mentor.avatarUrl} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-bold text-[#0A0E2A]">{mentor.name}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        mentor.status === "APPROVED"
                          ? "bg-[#F0FAF0] text-[#1A6B00]"
                          : mentor.status === "REJECTED"
                          ? "bg-red-50 text-red-600"
                          : "bg-[#FFF4EC] text-[#F77E2D]"
                      }`}
                    >
                      {mentor.status === "APPROVED" ? "Approuvé" : mentor.status === "REJECTED" ? "Refusé" : "En attente"}
                    </span>
                  </div>
                  <p className="text-[#8892C8] text-sm">{mentor.title}</p>
                  <p className="text-[#8892C8] text-xs mt-0.5">
                    📍 {mentor.city} · {mentor.contactMethod}: {mentor.contactValue}
                  </p>
                  <p className="text-[#4A5280] text-sm mt-2 line-clamp-2">{mentor.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mentor.expertise.map((e) => (
                      <span key={e} className="px-2 py-0.5 rounded-full bg-[#EEF1FF] text-[#0722AB] text-xs">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                {mentor.status === "PENDING" && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => updateStatus(mentor.id, "APPROVED")}
                      disabled={updating === mentor.id}
                      className="px-4 py-2 rounded-xl bg-[#0722AB] text-white text-sm font-bold hover:opacity-90 disabled:opacity-50"
                    >
                      ✓ Approuver
                    </button>
                    <button
                      onClick={() => updateStatus(mentor.id, "REJECTED")}
                      disabled={updating === mentor.id}
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 disabled:opacity-50"
                    >
                      ✕ Refuser
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
