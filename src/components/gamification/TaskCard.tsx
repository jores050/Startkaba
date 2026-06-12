"use client";

import { useEffect, useState } from "react";
import type { TaskWithProgress } from "@/hooks/use-progress";
import { QuizModal, type QuizResult } from "./QuizModal";
import { LessonPlayer } from "./LessonPlayer";
import { Button } from "@/components/ui/Button";

// ─── Notes personnelles ────────────────────────────────────────────────────────

function TaskNotes({ taskId }: { taskId: number }) {
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/tasks/${taskId}/notes`)
      .then((r) => r.json())
      .then((d) => {
        setNote(d.note ?? "");
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [taskId]);

  async function save() {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/tasks/${taskId}/notes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!loaded) return <p className="text-muted text-xs">Chargement des notes...</p>;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        maxLength={2000}
        placeholder="Tes idées, tes apprentissages, tes liens utiles pour cette tâche..."
        className="px-3 py-2 rounded-xl bg-background border border-border text-foreground text-sm placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors w-full"
      />
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          onClick={save}
          loading={saving}
          loadingText="..."
          className="!px-3 !py-1.5 text-xs"
        >
          Enregistrer
        </Button>
        {saved && <span className="text-green text-xs font-medium">✓ Note enregistrée</span>}
      </div>
    </div>
  );
}

// ─── Reflection sauvegardée ────────────────────────────────────────────────────

function TaskReflectionBlock({ taskId, recapLabel }: { taskId: number; recapLabel: string }) {
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
        <div className="flex items-center gap-2">
          <span className="text-base">🎯</span>
          <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">{recapLabel}</span>
        </div>
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
            rows={4}
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
        <p className="text-sm font-medium text-foreground leading-relaxed">{answer}</p>
      )}

      {saved && <span className="text-green text-xs font-medium">✓ Modifié</span>}
    </div>
  );
}

// ─── TaskCard ──────────────────────────────────────────────────────────────────

interface TaskCardProps {
  task: TaskWithProgress;
  index: number;
  onStart: (taskId: number) => Promise<{ ok: boolean; error?: string }>;
  onQuizCompleted: (result: QuizResult) => void;
}

export function TaskCard({ task, index, onStart, onQuizCompleted }: TaskCardProps) {
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  // Détermine si la leçon contient un reflection_template
  const hasReflectionTemplate = task.lesson?.exercises.some(
    (ex) => ex.type === "reflection_template"
  ) ?? false;

  async function handleStart() {
    setStarting(true);
    setError(null);
    const result = await onStart(task.id);
    setStarting(false);
    if (!result.ok) {
      setError(result.error ?? "Erreur");
      return;
    }
    if (task.lesson) setCourseOpen(true);
  }

  return (
    <div
      className={`bg-surface border rounded-2xl p-6 flex flex-col gap-3 ${
        task.status === "COMPLETED" ? "border-green" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              task.status === "COMPLETED"
                ? "bg-green text-white"
                : task.status === "IN_PROGRESS"
                  ? "bg-cta text-white"
                  : "bg-border text-muted"
            }`}
          >
            {task.status === "COMPLETED" ? "✓" : index}
          </span>
          <div>
            <h3 className="font-semibold text-foreground">{task.title}</h3>
            <p className="text-muted text-sm mt-1">{task.description}</p>
          </div>
        </div>
        <span className="shrink-0 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
          +{task.xp} XP
        </span>
      </div>

      <div className="flex items-center gap-4 pl-11">
        {task.status === "NOT_STARTED" && (
          <button
            onClick={handleStart}
            disabled={starting}
            className="px-4 py-2 rounded-lg bg-cta text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {starting ? "..." : "Commencer"}
          </button>
        )}
        {task.status === "IN_PROGRESS" && (
          <>
            <span className="inline-flex items-center gap-2 text-cta font-medium text-sm">
              🔥 En cours
            </span>
            {task.lesson ? (
              <button
                onClick={() => setCourseOpen(true)}
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Reprendre la leçon →
              </button>
            ) : task.quizQuestionCount > 0 ? (
              <button
                onClick={() => setQuizOpen(true)}
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Répondre au quiz ({task.quizQuestionCount} question
                {task.quizQuestionCount > 1 ? "s" : ""})
              </button>
            ) : null}
          </>
        )}
        {task.status === "COMPLETED" && (
          <span className="inline-flex items-center gap-3 text-sm">
            <span className="text-green font-semibold">✓ Complété</span>
            <span className="text-muted">·</span>
            <span className="text-green font-semibold">+{task.xpEarned} XP</span>
          </span>
        )}
      </div>

      {error && <p className="text-error text-sm pl-11">{error}</p>}

      {/* Reflection sauvegardée — affichée si tâche complétée avec reflection_template */}
      {task.status === "COMPLETED" && hasReflectionTemplate && (
        <div className="pl-0 sm:pl-11">
          <TaskReflectionBlock
            taskId={task.id}
            recapLabel={task.recapLabel ?? "Ta réflexion"}
          />
        </div>
      )}

      {/* Notes personnelles */}
      <div className="pl-0 sm:pl-11">
        <button
          onClick={() => setNotesOpen(!notesOpen)}
          className="text-xs text-muted hover:text-primary transition-colors"
        >
          {notesOpen ? "▾" : "▸"} Notes personnelles
        </button>
        {notesOpen && (
          <div className="mt-2">
            <TaskNotes taskId={task.id} />
          </div>
        )}
      </div>

      {courseOpen && task.lesson && (
        <LessonPlayer
          lesson={task.lesson}
          taskId={task.id}
          taskTitle={task.title}
          onClose={() => setCourseOpen(false)}
          onComplete={(r) => {
            setCourseOpen(false);
            onQuizCompleted({ passed: true, score: 100, xpEarned: r.xpEarned, badgesUnlocked: r.badgesUnlocked });
          }}
        />
      )}

      {quizOpen && (
        <QuizModal
          taskId={task.id}
          onClose={() => setQuizOpen(false)}
          onCompleted={onQuizCompleted}
        />
      )}
    </div>
  );
}
