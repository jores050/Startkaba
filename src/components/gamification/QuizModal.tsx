"use client";

import { useState } from "react";
import { getTaskById } from "@/data/tasks";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export interface QuizResult {
  passed: boolean;
  score: number;
  xpEarned: number;
  badgesUnlocked: { id: number; name: string; icon: string; description: string }[];
}

interface QuizModalProps {
  taskId: number;
  onClose: () => void;
  onCompleted: (result: QuizResult) => void;
}

export function QuizModal({ taskId, onClose, onCompleted }: QuizModalProps) {
  const task = getTaskById(taskId);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  if (!task) return null;

  const allAnswered = task.quiz.every((q) => answers[q.id] !== undefined);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    const res = await fetch(`/api/tasks/${taskId}/submit-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: Object.entries(answers).map(([questionId, selectedIndex]) => ({
          questionId: Number(questionId),
          selectedIndex,
        })),
      }),
    });
    setSubmitting(false);

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      setError(data?.error ?? "Erreur lors de la soumission");
      return;
    }
    setResult(data);
    if (data.passed) onCompleted(data);
  }

  return (
    <Modal onClose={onClose}>
        {!result ? (
          <>
            <h2 className="font-display text-xl font-bold text-foreground mb-1">
              Quiz de validation
            </h2>
            <p className="text-muted text-sm mb-6">
              {task.title} — réussite à 60% minimum
            </p>

            <div className="flex flex-col gap-6">
              {task.quiz.map((q, qi) => (
                <fieldset key={q.id}>
                  <legend className="font-semibold text-foreground mb-3">
                    {qi + 1}. {q.question}
                  </legend>
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt, oi) => (
                      <label
                        key={oi}
                        className={`px-4 py-3 rounded-xl border cursor-pointer transition-colors text-sm ${
                          answers[q.id] === oi
                            ? "border-primary bg-primary/5 text-primary font-medium"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          className="sr-only"
                          checked={answers[q.id] === oi}
                          onChange={() => setAnswers({ ...answers, [q.id]: oi })}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>

            {error && (
              <p className="text-error text-sm bg-error/10 border border-error/30 rounded-lg px-4 py-2 mt-4">
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={onClose}>
                Annuler
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!allAnswered}
                loading={submitting}
                loadingText="Validation..."
                className="flex-1"
              >
                Valider mes réponses
              </Button>
            </div>
          </>
        ) : result.passed ? (
          <div className="text-center py-4">
            <span className="text-5xl block mb-4 animate-badge-pop">🎉</span>
            <h2 className="font-display text-2xl font-bold text-green mb-2">
              Quiz réussi — {result.score}% !
            </h2>
            <p className="text-foreground mb-1">
              Tu gagnes{" "}
              <span className="font-bold text-green">+{result.xpEarned} XP</span>
            </p>
            {result.badgesUnlocked.length > 0 && (
              <div className="mt-4 flex flex-col gap-2">
                {result.badgesUnlocked.map((b) => (
                  <p key={b.id} className="text-primary font-semibold">
                    {b.icon} Badge débloqué : {b.name}
                  </p>
                ))}
              </div>
            )}
            <Button onClick={onClose} className="mt-6">
              Continuer
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-5xl block mb-4">😅</span>
            <h2 className="font-display text-2xl font-bold text-error mb-2">
              {result.score}% — pas encore...
            </h2>
            <p className="text-muted mb-2">
              Il faut au moins 60%. Relis la tâche et retente dans 5 minutes.
            </p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Fermer
            </Button>
          </div>
        )}
    </Modal>
  );
}
