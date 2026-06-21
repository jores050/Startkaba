"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Target } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import type { ProjetResponse, ProjetSection, MissionDeliverable } from "@/lib/projet-types";

// ─── Editable reflection card (completed) ─────────────────────────────────────

function EditableCard({ taskId, recapLabel, initialAnswer }: {
  taskId: number;
  recapLabel: string;
  initialAnswer: string;
}) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveEdit() {
    if (!draft.trim()) return;
    setSaving(true);
    await fetch(`/api/tasks/${taskId}/reflection`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: draft }),
    });
    setAnswer(draft);
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="bg-[#EEF1FF] dark:bg-[#1A2040] border border-[#0722AB]/20 dark:border-[#4D6FFF]/20 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">{recapLabel}</span>
        {!editing && (
          <button
            onClick={() => { setDraft(answer); setEditing(true); }}
            className="text-xs text-[#0722AB] hover:underline shrink-0"
          >
            Modifier
          </button>
        )}
      </div>

      {editing ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            autoFocus
            className="w-full px-3 py-2 rounded-xl border-2 border-[#0722AB]/40 bg-white text-[#0A0E2A] text-sm focus:border-[#0722AB] focus:outline-none resize-none leading-relaxed"
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              disabled={saving || !draft.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#0722AB] text-white text-xs font-bold hover:opacity-90 disabled:opacity-40"
            >
              {saving ? "..." : "Sauvegarder"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-[#E8EAF0] text-[#8892C8] text-xs hover:text-[#0A0E2A]"
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm font-medium text-[#0A0E2A] leading-relaxed whitespace-pre-wrap">{answer}</p>
      )}

      {saved && <span className="text-[#1A6B00] text-xs font-medium">✓ Modifié</span>}
    </div>
  );
}

// ─── Grayed card (not completed) ──────────────────────────────────────────────

function LockedCard({ recapLabel, taskTitle, levelId }: {
  recapLabel: string;
  taskTitle: string;
  levelId: number;
}) {
  return (
    <div className="border border-dashed border-[#C8CCDF] rounded-2xl p-4 flex items-center justify-between gap-4 opacity-60">
      <div>
        <span className="text-xs font-bold text-[#8892C8] uppercase tracking-wider">{recapLabel}</span>
        <p className="text-xs text-[#8892C8] mt-0.5">À compléter — {taskTitle}</p>
      </div>
      <Link
        href={`/parcours/${levelId}`}
        className="shrink-0 px-3 py-1.5 rounded-lg bg-[#F0F2FA] text-[#0722AB] text-xs font-semibold hover:bg-[#EEF1FF] transition-colors"
      >
        Commencer →
      </Link>
    </div>
  );
}

// ─── Mission deliverable card ──────────────────────────────────────────────────

function MissionDeliverableCard({ deliverable, levelId }: {
  deliverable: MissionDeliverable;
  levelId: number;
}) {
  const [open, setOpen] = useState(false);

  if (!deliverable.isCompleted) {
    return (
      <div className="border border-dashed border-[#C8CCDF] rounded-2xl p-4 flex items-center justify-between gap-4 opacity-60">
        <div>
          <span className="text-xs font-bold text-[#8892C8] uppercase tracking-wider">{deliverable.recapLabel}</span>
          <p className="text-xs text-[#8892C8] mt-0.5">À compléter — Mission terrain</p>
        </div>
        <Link
          href={`/parcours/${levelId}`}
          className="shrink-0 px-3 py-1.5 rounded-lg bg-[#F0F2FA] text-[#0722AB] text-xs font-semibold hover:bg-[#EEF1FF] transition-colors"
        >
          Commencer →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{deliverable.recapLabel}</span>
        <span className="text-xs text-amber-600 font-semibold">✓ Mission accomplie</span>
      </div>
      {deliverable.notes ? (
        <>
          <p className={`text-sm text-amber-900 leading-relaxed whitespace-pre-wrap ${!open ? "line-clamp-3" : ""}`}>
            {deliverable.notes}
          </p>
          {deliverable.notes.length > 200 && (
            <button
              onClick={() => setOpen(!open)}
              className="text-xs text-amber-600 hover:underline self-start"
            >
              {open ? "Voir moins" : "Voir tout"}
            </button>
          )}
        </>
      ) : (
        <p className="text-xs text-amber-600 italic">Aucune note brute — tes insights sont dans ta réflexion ci-dessous.</p>
      )}
    </div>
  );
}

// ─── Level section ─────────────────────────────────────────────────────────────

function LevelSection({ section }: { section: ProjetSection }) {
  const [open, setOpen] = useState(section.isUnlocked);
  const completedCount = section.reflections.filter((r) => r.isCompleted).length;
  const total = section.reflections.length;
  const missionDeliverables = section.missionDeliverables ?? [];

  return (
    <div className={`bg-white dark:bg-[#151A2E] border rounded-2xl overflow-hidden shadow-sm ${
      section.isUnlocked ? "border-[#E8EAF0]" : "border-[#E8EAF0] opacity-60"
    }`}>
      {/* Section header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F8F9FF] transition-colors"
      >
        <div className="flex items-center gap-3">
          {section.isUnlocked ? (
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              completedCount === total && total > 0
                ? "bg-[#1A6B00] text-white"
                : "bg-[#EEF1FF] text-[#0722AB]"
            }`}>
              {completedCount === total && total > 0 ? "✓" : section.levelId}
            </span>
          ) : (
            <span className="w-7 h-7 rounded-full bg-[#E8EAF0] flex items-center justify-center text-[#8892C8] shrink-0">
              <Lock size={14} strokeWidth={2} />
            </span>
          )}
          <div>
            <p className="font-bold text-[#0A0E2A] text-sm">
              Niveau {section.levelId} — {section.levelTitle}
            </p>
            {section.isUnlocked ? (
              <p className="text-xs text-[#8892C8] mt-0.5">
                {total === 0
                  ? "Aucune section de réflexion"
                  : `${completedCount}/${total} section${total > 1 ? "s" : ""} complétée${completedCount > 1 ? "s" : ""}`}
              </p>
            ) : (
              <p className="text-xs text-[#8892C8] mt-0.5">Niveau verrouillé</p>
            )}
          </div>
        </div>
        <span className="text-[#8892C8] text-sm">{open ? "▾" : "▸"}</span>
      </button>

      {/* Section body */}
      {open && section.isUnlocked && (
        <div className="px-5 pb-5 flex flex-col gap-3 border-t border-[#E8EAF0] pt-4">
          {/* Mission deliverables first */}
          {missionDeliverables.map((d) => (
            <MissionDeliverableCard key={d.taskId} deliverable={d} levelId={section.levelId} />
          ))}
          {total === 0 && missionDeliverables.length === 0 ? (
            <p className="text-sm text-[#8892C8] italic py-2">
              Les sections de réflexion de ce niveau sont en cours de préparation.
            </p>
          ) : (
            section.reflections.map((r) =>
              r.isCompleted && r.answer ? (
                <EditableCard
                  key={r.taskId}
                  taskId={r.taskId}
                  recapLabel={r.recapLabel}
                  initialAnswer={r.answer}
                />
              ) : (
                <LockedCard
                  key={r.taskId}
                  recapLabel={r.recapLabel}
                  taskTitle={r.taskTitle}
                  levelId={section.levelId}
                />
              )
            )
          )}
        </div>
      )}

      {/* Locked level preview */}
      {open && !section.isUnlocked && total > 0 && (
        <div className="px-5 pb-5 border-t border-[#E8EAF0] pt-4 flex flex-col gap-2">
          {section.reflections.map((r) => (
            <div key={r.taskId} className="flex items-center gap-2 opacity-50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8892C8] shrink-0" />
              <span className="text-xs text-[#8892C8]">{r.recapLabel}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-28 bg-[#E8EAF0] rounded-2xl" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-16 bg-[#E8EAF0] rounded-2xl" />
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProjetPage() {
  const { user } = useUser();
  const [data, setData] = useState<ProjetResponse | null>(null);
  const [error, setError] = useState(false);
  const [pdfMsg, setPdfMsg] = useState(false);

  useEffect(() => {
    fetch("/api/user/reflections")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="max-w-2xl">
        <div className="bg-white border border-[#E8EAF0] rounded-2xl p-8 text-center shadow-sm">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-[#4A5280]">Impossible de charger ton projet.</p>
        </div>
      </div>
    );
  }

  const percentage = data
    ? Math.round((data.completedCount / Math.max(data.totalSections, 1)) * 100)
    : 0;

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-6 shadow-sm">
        <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A]">Mon Projet</h1>
        <p className="text-[#8892C8] text-sm mt-1">
          Tout ce que tu as construit, étape par étape.
        </p>

        {data ? (
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#4A5280] font-medium">
                {data.completedCount}/{data.totalSections} sections complétées
              </span>
              <span className="font-bold text-[#0722AB]">{percentage}%</span>
            </div>
            <div className="h-3 rounded-full bg-[#EEF1FF] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0722AB] to-[#4A5EE0] transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
            {data.completedCount === data.totalSections && data.totalSections > 0 && (
              <p className="text-xs text-[#1A6B00] font-semibold mt-2">
                ✓ Toutes les sections sont complétées !
              </p>
            )}
          </div>
        ) : (
          <div className="mt-5 h-3 rounded-full bg-[#E8EAF0] animate-pulse" />
        )}
      </div>

      {/* Ton point de départ — défi initial exprimé à l'onboarding */}
      {user?.initialChallenge && (
        <div className="bg-[#FFF4EC] dark:bg-[#2A1A08] border border-[#F77E2D]/30 rounded-2xl p-5">
          <p className="text-xs font-bold text-[#F77E2D] uppercase tracking-wider mb-1.5">
            <Target size={12} strokeWidth={2} className="inline mr-1 align-[-1px]" />Ton point de départ
          </p>
          <p className="text-sm text-[#0A0E2A] dark:text-[#F5F6FA] leading-relaxed">
            {user.initialChallenge}
          </p>
          <p className="text-xs text-[#8892C8] mt-2">
            Le défi que tu t&apos;es fixé à ton arrivée sur StartKaba.
          </p>
        </div>
      )}

      {/* Level sections */}
      {!data ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {data.sections.map((section) => (
            <LevelSection key={section.levelId} section={section} />
          ))}
        </div>
      )}

      {/* Footer — Export PDF */}
      {data && (
        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-[#0A0E2A] text-sm">Exporter mon projet</p>
            <p className="text-[#8892C8] text-xs mt-0.5">
              Télécharge une synthèse PDF de toutes tes réflexions.
            </p>
          </div>
          <button
            onClick={() => { setPdfMsg(true); setTimeout(() => setPdfMsg(false), 3000); }}
            className="shrink-0 px-4 py-2 rounded-xl border border-[#0722AB] text-[#0722AB] text-sm font-semibold hover:bg-[#EEF1FF] transition-colors"
          >
            {pdfMsg ? "Bientôt disponible 😊" : "Exporter en PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
