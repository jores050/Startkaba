"use client";

import { useEffect, useState } from "react";

interface Props {
  taskId: number;
  recapLabel: string; // ex: "🎯 Ta proposition de valeur"
}

export function ReflectionSummaryCard({ taskId, recapLabel }: Props) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/tasks/${taskId}/reflection`)
      .then((r) => r.json())
      .then((d) => { if (d.answer) setAnswer(d.answer); })
      .catch(() => {});
  }, [taskId]);

  if (!answer) return null;

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
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-4 flex flex-col gap-3">
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
            className="w-full px-3 py-2 rounded-xl border-2 border-[#0722AB]/40 bg-white text-foreground text-sm focus:border-[#0722AB] focus:outline-none resize-none leading-relaxed"
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              disabled={saving || !draft.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#0722AB] text-white text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {saving ? "..." : "Sauvegarder"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-border text-muted text-xs hover:text-foreground transition-colors"
            >
              Annuler
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm font-medium text-foreground leading-relaxed whitespace-pre-wrap">{answer}</p>
      )}

      {saved && <span className="text-green text-xs font-medium">✓ Modifié</span>}
    </div>
  );
}
