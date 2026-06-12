"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Lesson, Exercise } from "@/types";

// ─── Types internes ───────────────────────────────────────────────────────────

interface LessonResult {
  xpEarned: number;
  badgesUnlocked: { id: number; name: string; icon: string; description: string }[];
}

interface XpPopup {
  id: number;
  amount: number;
}

const MAX_HEARTS = 3;

// ─── Réactions de la mascotte Kaba ───────────────────────────────────────────

const KABA_CORRECT = [
  "Excellent ! 🎯",
  "C'est ça ! 🔥",
  "Parfait !",
  "Tu maîtrises ! ✨",
  "Bien joué ! 💪",
];
const KABA_WRONG = [
  "Pas tout à fait... Lis l'explication !",
  "Presque ! Retiens bien ça.",
  "Bonne tentative. L'explication t'aidera.",
  "On y retourne avec ça en tête.",
];
const KABA_INFO = [
  "Lis bien, ça compte ! 📚",
  "Chaque concept est important. 💡",
  "Prends le temps d'assimiler.",
];

function rnd<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Composant principal ──────────────────────────────────────────────────────

interface LessonPlayerProps {
  lesson: Lesson;
  taskId: number;
  taskTitle: string;
  onClose: () => void;
  onComplete?: (result: { xpEarned: number; badgesUnlocked: LessonResult["badgesUnlocked"] }) => void;
}

export function LessonPlayer({ lesson, taskId, taskTitle, onClose, onComplete }: LessonPlayerProps) {
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [totalXp, setTotalXp] = useState(0);
  const [phase, setPhase] = useState<"answering" | "feedback" | "dead" | "complete">("answering");
  const [lastCorrect, setLastCorrect] = useState(false);
  const [kabaMsg, setKabaMsg] = useState("");
  const [xpPopups, setXpPopups] = useState<XpPopup[]>([]);
  const [result, setResult] = useState<LessonResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const popupIdRef = useRef(0);

  // per-exercise state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textInputs, setTextInputs] = useState<string[]>([]);
  const [matchSelected, setMatchSelected] = useState<number | null>(null);
  const [matchDone, setMatchDone] = useState<{ l: number; r: number }[]>([]);
  const [reorderItems, setReorderItems] = useState<string[]>([]);
  const [reorderChecked, setReorderChecked] = useState(false);
  const [shuffledMatchRight, setShuffledMatchRight] = useState<string[]>([]);

  const exercise = lesson.exercises[idx];
  const isLast = idx === lesson.exercises.length - 1;

  // Reset per-exercise state
  useEffect(() => {
    setSelectedOption(null);
    setTextInputs([]);
    setMatchSelected(null);
    setMatchDone([]);
    setReorderChecked(false);
    if (exercise.type === "fill_blank") {
      setTextInputs(new Array(exercise.blanks.length).fill(""));
    }
    if (exercise.type === "reorder") {
      setReorderItems(shuffleArray([...exercise.items]));
    }
    if (exercise.type === "match") {
      setShuffledMatchRight(shuffleArray(exercise.pairs.map(p => p.right)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // ─── Swipe mobile ───────────────────────────────────────────────────────────

  const touchStartX = useRef<number | null>(null);
  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(delta) > 70 && delta > 0 && phase === "feedback") goNext();
  }

  // ─── Logique de réponse ─────────────────────────────────────────────────────

  function showXpPopup(amount: number) {
    const id = ++popupIdRef.current;
    setXpPopups(p => [...p, { id, amount }]);
    setTimeout(() => setXpPopups(p => p.filter(x => x.id !== id)), 1400);
  }

  function handleCorrect(xp: number) {
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setLastCorrect(true);
    setKabaMsg(rnd(KABA_CORRECT));
    setPhase("feedback");
  }

  function handleWrong() {
    const newHearts = hearts - 1;
    setHearts(newHearts);
    setLastCorrect(false);
    setKabaMsg(rnd(KABA_WRONG));
    setPhase(newHearts <= 0 ? "dead" : "feedback");
  }

  function handleInfoContinue() {
    const xp = (exercise as { xp: number }).xp;
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setKabaMsg(rnd(KABA_INFO));
    setPhase("feedback");
  }

  function handleReflectionContinue() {
    const xp = (exercise as { xp: number }).xp;
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setLastCorrect(true);
    setKabaMsg("Bien réfléchi ! Chaque réflexion renforce ta vision. 💭");
    setPhase("feedback");
  }

  function handleMcqSubmit() {
    if (exercise.type !== "mcq" && exercise.type !== "scenario") return;
    if (selectedOption === null) return;
    if (selectedOption === exercise.correctIndex) handleCorrect(exercise.xp);
    else handleWrong();
  }

  function handleTrueFalseSubmit(answer: boolean) {
    if (exercise.type !== "true_false") return;
    if (answer === exercise.isTrue) handleCorrect(exercise.xp);
    else handleWrong();
  }

  function handleFillBlankSubmit() {
    if (exercise.type !== "fill_blank") return;
    if (exercise.isOpenAnswer) { handleReflectionContinue(); return; }
    const allCorrect = exercise.blanks.every(
      (b, i) => (textInputs[i] ?? "").trim().toLowerCase() === b.toLowerCase()
    );
    if (allCorrect) handleCorrect(exercise.xp);
    else handleWrong();
  }

  function handleMatchPick(side: "left" | "right", idx: number) {
    if (exercise.type !== "match") return;
    if (phase !== "answering") return;
    // Already matched?
    if (matchDone.some(p => side === "left" ? p.l === idx : p.r === idx)) return;

    if (side === "left") {
      setMatchSelected(idx);
    } else {
      if (matchSelected === null) return;
      const leftIdx = matchSelected;
      setMatchSelected(null);
      // Check if correct pair using the same shuffled order shown in UI
      const pair = exercise.pairs[leftIdx];
      const rightItem = shuffledMatchRight[idx];
      if (pair.right === rightItem) {
        const newDone = [...matchDone, { l: leftIdx, r: idx }];
        setMatchDone(newDone);
        if (newDone.length === exercise.pairs.length) {
          handleCorrect(exercise.xp);
        }
      } else {
        handleWrong();
      }
    }
  }

  function handleReorderCheck() {
    if (exercise.type !== "reorder") return;
    const correct = exercise.items.every((item, i) => reorderItems[i] === item);
    setReorderChecked(true);
    if (correct) handleCorrect(exercise.xp);
    else handleWrong();
  }

  function goNext() {
    if (phase === "dead") {
      // restart
      setIdx(0);
      setHearts(MAX_HEARTS);
      setTotalXp(0);
      setPhase("answering");
      return;
    }
    if (isLast) {
      completeLessonApi();
      return;
    }
    setIdx(i => i + 1);
    setPhase("answering");
  }

  const completeLessonApi = useCallback(async () => {
    setSubmitting(true);
    setPhase("complete");
    try {
      const res = await fetch(`/api/tasks/${taskId}/complete-lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xpEarned: totalXp }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setApiError(data?.error ?? "Erreur serveur");
      } else {
        setResult(data);
      }
    } catch {
      setApiError("Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId, totalXp]);

  // ─── Rendu ──────────────────────────────────────────────────────────────────

  if (phase === "complete") {
    return <CompletionScreen
      result={result}
      totalXp={totalXp}
      submitting={submitting}
      apiError={apiError}
      onClose={() => {
        if (result && onComplete) {
          onComplete({ xpEarned: result.xpEarned, badgesUnlocked: result.badgesUnlocked });
        } else {
          onClose();
        }
      }}
      exerciseCount={lesson.exercises.length}
    />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="shrink-0 px-4 pt-safe pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={onClose} className="text-muted hover:text-foreground shrink-0 p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-sm text-muted truncate">{taskTitle}</span>
          </div>
          {/* Hearts */}
          <div className="flex gap-1 shrink-0">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <span key={i} className={`text-lg transition-all ${i < hearts ? "" : "opacity-20 grayscale"}`}>❤️</span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1">
          {lesson.exercises.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i < idx ? "bg-primary" : i === idx ? "bg-primary/50" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* XP counter */}
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted">{idx + 1} / {lesson.exercises.length}</span>
          <span className="text-xs font-bold text-primary">⚡ {totalXp} XP</span>
        </div>
      </div>

      {/* Exercise content */}
      <div className="flex-1 overflow-y-auto px-4 py-2 relative">
        {/* XP popups */}
        {xpPopups.map(p => (
          <div key={p.id} className="absolute top-2 right-6 pointer-events-none z-10 animate-xp-float">
            <span className="text-primary font-bold text-sm">+{p.amount} XP</span>
          </div>
        ))}

        <ExerciseRenderer
          exercise={exercise}
          phase={phase}
          lastCorrect={lastCorrect}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          textInputs={textInputs}
          setTextInputs={setTextInputs}
          matchSelected={matchSelected}
          matchDone={matchDone}
          shuffledMatchRight={shuffledMatchRight}
          handleMatchPick={handleMatchPick}
          reorderItems={reorderItems}
          setReorderItems={setReorderItems}
          reorderChecked={reorderChecked}
          onTrueFalseSubmit={handleTrueFalseSubmit}
        />
      </div>

      {/* Kaba mascot + feedback bar */}
      {phase !== "answering" && (
        <div
          className={`shrink-0 px-4 py-4 border-t transition-colors ${
            phase === "dead"
              ? "bg-error/10 border-error/30"
              : lastCorrect
              ? "bg-green/10 border-green/30"
              : "bg-error/10 border-error/30"
          }`}
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">
              {phase === "dead" ? "💔" : lastCorrect ? "✅" : "❌"}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm mb-1 ${
                phase === "dead" ? "text-error" : lastCorrect ? "text-green" : "text-error"
              }`}>
                {phase === "dead" ? "Plus de cœurs !" : kabaMsg}
              </p>
              {!lastCorrect && phase !== "dead" && exercise.type !== "info" && exercise.type !== "reflection" && (
                <p className="text-foreground text-sm leading-relaxed">
                  {getExplanation(exercise)}
                </p>
              )}
              {phase === "dead" && (
                <p className="text-muted text-sm">Recommence depuis le début pour garder tes XP.</p>
              )}
            </div>
          </div>
          <button
            onClick={goNext}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 ${
              phase === "dead"
                ? "bg-error text-white"
                : lastCorrect
                ? "bg-green text-white"
                : "bg-primary text-white"
            }`}
          >
            {phase === "dead" ? "Recommencer la leçon" : isLast ? "Terminer la leçon →" : "Continuer →"}
          </button>
        </div>
      )}

      {/* Action button when answering */}
      {phase === "answering" && (
        <ActionBar
          exercise={exercise}
          selectedOption={selectedOption}
          textInputs={textInputs}
          reorderChecked={reorderChecked}
          onInfoContinue={handleInfoContinue}
          onMcqSubmit={handleMcqSubmit}
          onFillBlankSubmit={handleFillBlankSubmit}
          onReorderCheck={handleReorderCheck}
          onReflectionContinue={handleReflectionContinue}
        />
      )}
    </div>
  );
}

// ─── Écran de fin ─────────────────────────────────────────────────────────────

function CompletionScreen({
  result,
  totalXp,
  submitting,
  apiError,
  onClose,
  exerciseCount,
}: {
  result: LessonResult | null;
  totalXp: number;
  submitting: boolean;
  apiError: string | null;
  onClose: () => void;
  exerciseCount: number;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 text-center">
      <span className="text-6xl mb-4 animate-badge-pop">🏆</span>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">Leçon terminée !</h2>
      <p className="text-muted mb-6">{exerciseCount} exercices · {totalXp} XP gagnés</p>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-5 mb-6">
        <p className="text-3xl font-bold text-primary">+{totalXp} XP</p>
        <p className="text-sm text-muted mt-1">ajoutés à ton profil</p>
      </div>

      {result?.badgesUnlocked && result.badgesUnlocked.length > 0 && (
        <div className="flex flex-col gap-2 mb-6 w-full">
          {result.badgesUnlocked.map(b => (
            <div key={b.id} className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-2xl">{b.icon}</span>
              <div className="text-left">
                <p className="font-bold text-sm text-foreground">{b.name}</p>
                <p className="text-xs text-muted">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {apiError && (
        <p className="text-error text-sm mb-4">{apiError}</p>
      )}

      <button
        onClick={onClose}
        disabled={submitting}
        className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? "Enregistrement..." : "Retour au parcours"}
      </button>
    </div>
  );
}

// ─── Rendu par type d'exercice ────────────────────────────────────────────────

interface ExerciseRendererProps {
  exercise: Exercise;
  phase: "answering" | "feedback" | "dead";
  lastCorrect: boolean;
  selectedOption: number | null;
  setSelectedOption: (v: number | null) => void;
  textInputs: string[];
  setTextInputs: (v: string[]) => void;
  matchSelected: number | null;
  matchDone: { l: number; r: number }[];
  shuffledMatchRight: string[];
  handleMatchPick: (side: "left" | "right", idx: number) => void;
  reorderItems: string[];
  setReorderItems: (v: string[]) => void;
  reorderChecked: boolean;
  onTrueFalseSubmit: (v: boolean) => void;
}

function ExerciseRenderer(props: ExerciseRendererProps) {
  const { exercise, phase } = props;
  const answered = phase !== "answering";

  if (exercise.type === "info") {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 mt-2">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0">{exercise.icon}</span>
          <h2 className="font-display text-lg font-bold text-foreground leading-snug">{exercise.title}</h2>
        </div>
        <p className="text-foreground text-base leading-relaxed">{exercise.content}</p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-2 text-xs text-primary font-medium">
          +{exercise.xp} XP pour ce concept
        </div>
      </div>
    );
  }

  if (exercise.type === "mcq" || exercise.type === "scenario") {
    return (
      <div className="flex flex-col gap-4 mt-2">
        {exercise.type === "scenario" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-foreground leading-relaxed">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">📋 Situation</p>
            {exercise.context}
          </div>
        )}
        <h2 className="font-display text-base font-bold text-foreground leading-snug">{exercise.question}</h2>
        <div className="flex flex-col gap-2">
          {exercise.options.map((opt, i) => {
            let cls = "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ";
            if (!answered) {
              cls += props.selectedOption === i
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 text-foreground";
            } else {
              if (i === exercise.correctIndex) cls += "border-green bg-green/10 text-green font-bold";
              else if (i === props.selectedOption && i !== exercise.correctIndex) cls += "border-error bg-error/10 text-error";
              else cls += "border-border text-muted";
            }
            return (
              <button key={i} disabled={answered} onClick={() => props.setSelectedOption(i)} className={cls}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (exercise.type === "true_false") {
    return (
      <div className="flex flex-col gap-6 mt-2">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Vrai ou faux ?</p>
          <p className="font-display text-lg font-bold text-foreground leading-snug">{exercise.statement}</p>
        </div>
        <div className="flex gap-3">
          {([true, false] as const).map(v => (
            <button
              key={String(v)}
              disabled={answered}
              onClick={() => {
                if (!answered) {
                  props.setSelectedOption(v ? 1 : 0);
                  props.onTrueFalseSubmit(v);
                }
              }}
              className={`flex-1 py-5 rounded-2xl text-base font-bold border-2 transition-all ${
                !answered
                  ? "border-border hover:border-primary text-foreground hover:bg-primary/5"
                  : v === exercise.isTrue
                  ? "border-green bg-green/10 text-green"
                  : props.selectedOption === (v ? 1 : 0) && v !== exercise.isTrue
                  ? "border-error bg-error/10 text-error"
                  : "border-border text-muted"
              }`}
            >
              {v ? "✓ Vrai" : "✗ Faux"}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (exercise.type === "fill_blank") {
    const parts = exercise.template.split(/\{(\d+)\}/);
    return (
      <div className="flex flex-col gap-4 mt-2">
        <p className="font-display text-base font-bold text-foreground">Complète la phrase :</p>
        <div className="bg-surface border border-border rounded-2xl p-5 text-base leading-loose text-foreground flex flex-wrap items-center gap-1">
          {parts.map((part, i) => {
            if (/^\d+$/.test(part)) {
              const blankIdx = parseInt(part);
              const isCorrect = answered && (props.textInputs[blankIdx] ?? "").trim().toLowerCase() === exercise.blanks[blankIdx].toLowerCase();
              const isWrong = answered && !isCorrect;
              return (
                <input
                  key={i}
                  value={props.textInputs[blankIdx] ?? ""}
                  onChange={e => {
                    const next = [...props.textInputs];
                    next[blankIdx] = e.target.value;
                    props.setTextInputs(next);
                  }}
                  disabled={answered}
                  placeholder="..."
                  className={`inline-block px-2 py-0.5 rounded-lg border text-center font-bold text-sm transition-colors min-w-[80px] max-w-[140px] ${
                    !answered ? "border-primary bg-primary/5 focus:outline-none focus:border-primary" :
                    isCorrect ? "border-green bg-green/10 text-green" :
                    "border-error bg-error/10 text-error"
                  }`}
                />
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </div>
        {answered && !exercise.isOpenAnswer && (
          <div className="text-sm text-muted">
            Réponses : {exercise.blanks.join(", ")}
          </div>
        )}
      </div>
    );
  }

  if (exercise.type === "match") {
    const rightItems = props.shuffledMatchRight;
    return (
      <div className="flex flex-col gap-4 mt-2">
        <p className="font-display text-base font-bold text-foreground">Associe chaque élément :</p>
        <p className="text-sm text-muted">Clique un élément à gauche, puis son correspondant à droite.</p>
        <div className="grid grid-cols-2 gap-3">
          {/* Left column */}
          <div className="flex flex-col gap-2">
            {exercise.pairs.map((pair, i) => {
              const isDone = props.matchDone.some(p => p.l === i);
              return (
                <button
                  key={i}
                  disabled={isDone || answered}
                  onClick={() => props.handleMatchPick("left", i)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                    isDone ? "border-green bg-green/10 text-green" :
                    props.matchSelected === i ? "border-primary bg-primary/10 text-primary" :
                    "border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {pair.left}
                </button>
              );
            })}
          </div>
          {/* Right column (shuffled) */}
          <div className="flex flex-col gap-2">
            {rightItems.map((item, i) => {
              const matchedPair = props.matchDone.find(p => p.r === i);
              const isDone = !!matchedPair;
              return (
                <button
                  key={i}
                  disabled={isDone || answered || props.matchSelected === null}
                  onClick={() => props.handleMatchPick("right", i)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                    isDone ? "border-green bg-green/10 text-green" :
                    props.matchSelected !== null ? "border-primary/30 hover:border-primary text-foreground" :
                    "border-border text-muted"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (exercise.type === "reorder") {
    return (
      <div className="flex flex-col gap-4 mt-2">
        <p className="font-display text-base font-bold text-foreground">Remets ces éléments dans le bon ordre :</p>
        <div className="flex flex-col gap-2">
          {props.reorderItems.map((item, i) => {
            const correctPos = exercise.items.indexOf(item);
            const isCorrect = props.reorderChecked && correctPos === i;
            const isWrong = props.reorderChecked && correctPos !== i;
            return (
              <div key={item} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all ${
                isCorrect ? "border-green bg-green/10" :
                isWrong ? "border-error bg-error/10" :
                "border-border bg-surface"
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isCorrect ? "bg-green text-white" : isWrong ? "bg-error text-white" : "bg-border text-muted"
                }`}>{i + 1}</span>
                <span className="flex-1 text-foreground">{item}</span>
                {!answered && (
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={i === 0}
                      onClick={() => {
                        const next = [...props.reorderItems];
                        [next[i - 1], next[i]] = [next[i], next[i - 1]];
                        props.setReorderItems(next);
                      }}
                      className="text-muted hover:text-primary disabled:opacity-20 text-xs px-1"
                    >▲</button>
                    <button
                      disabled={i === props.reorderItems.length - 1}
                      onClick={() => {
                        const next = [...props.reorderItems];
                        [next[i + 1], next[i]] = [next[i], next[i + 1]];
                        props.setReorderItems(next);
                      }}
                      className="text-muted hover:text-primary disabled:opacity-20 text-xs px-1"
                    >▼</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (exercise.type === "reflection") {
    return (
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0">{exercise.icon}</span>
          <h2 className="font-display text-base font-bold text-foreground leading-snug">{exercise.question}</h2>
        </div>
        <textarea
          value={props.textInputs[0] ?? ""}
          onChange={e => props.setTextInputs([e.target.value])}
          disabled={answered}
          rows={7}
          placeholder={exercise.placeholder}
          className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted/50 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed"
        />
        <p className="text-xs text-muted text-center">
          {(props.textInputs[0] ?? "").trim().length === 0
            ? "Écris ta réflexion pour continuer (+{xp} XP)".replace("{xp}", String(exercise.xp))
            : "✓ Prêt à continuer"}
        </p>
      </div>
    );
  }

  return null;
}

// ─── Barre d'action ───────────────────────────────────────────────────────────

function ActionBar({
  exercise, selectedOption, textInputs, reorderChecked,
  onInfoContinue, onMcqSubmit, onFillBlankSubmit,
  onReorderCheck, onReflectionContinue,
}: {
  exercise: Exercise;
  selectedOption: number | null;
  textInputs: string[];
  reorderChecked: boolean;
  onInfoContinue: () => void;
  onMcqSubmit: () => void;
  onFillBlankSubmit: () => void;
  onReorderCheck: () => void;
  onReflectionContinue: () => void;
}) {
  if (exercise.type === "info") {
    return (
      <div className="shrink-0 px-4 py-4 border-t border-border">
        <button onClick={onInfoContinue} className="w-full py-3 rounded-xl bg-cta text-white font-bold text-sm hover:opacity-90 transition-opacity">
          Continuer →
        </button>
      </div>
    );
  }

  if (exercise.type === "reflection") {
    const hasText = (textInputs[0] ?? "").trim().length > 0;
    return (
      <div className="shrink-0 px-4 py-4 border-t border-border">
        <button
          disabled={!hasText}
          onClick={onReflectionContinue}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-cta text-white hover:opacity-90"
        >
          {hasText ? "Continuer →" : "Écris ta réflexion d'abord"}
        </button>
      </div>
    );
  }

  if (exercise.type === "mcq" || exercise.type === "scenario") {
    return (
      <div className="shrink-0 px-4 py-4 border-t border-border">
        <button
          disabled={selectedOption === null}
          onClick={onMcqSubmit}
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {selectedOption === null ? "Choisis une réponse" : "Vérifier →"}
        </button>
      </div>
    );
  }

  if (exercise.type === "true_false") {
    return null; // buttons are in ExerciseRenderer, submit on click
  }

  if (exercise.type === "fill_blank") {
    const allFilled = exercise.isOpenAnswer
      ? true
      : textInputs.every(t => t.trim().length > 0);
    return (
      <div className="shrink-0 px-4 py-4 border-t border-border">
        <button
          disabled={!allFilled}
          onClick={onFillBlankSubmit}
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {allFilled ? "Vérifier →" : "Remplis tous les champs"}
        </button>
      </div>
    );
  }

  if (exercise.type === "match") {
    return null; // auto-validates
  }

  if (exercise.type === "reorder") {
    return (
      <div className="shrink-0 px-4 py-4 border-t border-border">
        <button
          disabled={reorderChecked}
          onClick={onReorderCheck}
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Vérifier l'ordre →
        </button>
      </div>
    );
  }

  return null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getExplanation(exercise: Exercise): string {
  if (exercise.type === "mcq" || exercise.type === "scenario" || exercise.type === "true_false") {
    return exercise.explanation;
  }
  if (exercise.type === "fill_blank" && !exercise.isOpenAnswer) {
    return `Les bonnes réponses : ${exercise.blanks.join(", ")}`;
  }
  return "";
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

