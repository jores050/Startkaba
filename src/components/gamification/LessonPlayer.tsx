"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Lesson, Exercise } from "@/types";
import { checkReflectionQuality } from "@/lib/quality/check-reflection";
import { QualityChecklist } from "@/components/exercises/QualityChecklist";

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
  // For mission Phase A: called instead of the API when last exercise is done
  onLearningPhaseComplete?: (xpEarned: number, microInputs: Map<string, string>) => void;
}

export function LessonPlayer({ lesson, taskId, taskTitle, onClose, onComplete, onLearningPhaseComplete }: LessonPlayerProps) {
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
  // Accumulate reflection answers: exerciseIndex → answer text
  const reflectionsRef = useRef<Map<number, string>>(new Map());
  // Accumulate micro_input answers: storageKey → value
  const microInputsRef = useRef<Map<string, string>>(new Map());
  // Ref-based XP tracker — source of truth pour l'API (évite stale closure sur totalXp state)
  const earnedXpRef = useRef(0);
  // self_check checklist state: checkboxId → checked
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

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
    if (exercise.type === "self_check") {
      setChecklistState({});
    }
    if (exercise.type === "reflection_template") {
      const assembled = exercise.template.replace(
        /\{(\w+)\}/g,
        (_, key) => microInputsRef.current.get(key) ?? `[${key}]`
      );
      setTextInputs([assembled]);
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
    earnedXpRef.current += xp;
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
    earnedXpRef.current += xp;
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setLastCorrect(true);
    setKabaMsg(rnd(KABA_INFO));
    setPhase("feedback");
  }

  function handleReflectionContinue() {
    const xp = (exercise as { xp: number }).xp;
    earnedXpRef.current += xp;
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setLastCorrect(true);
    setKabaMsg("Bien réfléchi ! Chaque réflexion renforce ta vision. 💭");
    const answer = (textInputs[0] ?? "").trim();
    if (answer) reflectionsRef.current.set(idx, answer);
    setPhase("feedback");
  }

  function handleMicroInputSubmit() {
    if (exercise.type !== "micro_input") return;
    const value = (textInputs[0] ?? "").trim();
    if (!value) return;
    microInputsRef.current.set(exercise.storageKey, value);
    const xp = exercise.xp;
    earnedXpRef.current += xp;
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setLastCorrect(true);
    setKabaMsg("Brique ajoutée ! ✏️ On continue à construire.");
    setPhase("feedback");
  }

  function handleSelfCheckContinue() {
    if (exercise.type !== "self_check") return;
    const allChecked = exercise.checklist.every(c => checklistState[c.id]);
    setLastCorrect(true);
    setKabaMsg(
      allChecked
        ? "Parfait, ta grand-mère comprendrait ! 🎉"
        : "Pas de souci — tu peux modifier ta phrase avant de passer à la suite. 💪"
    );
    setPhase("feedback");
  }

  function handleReflectionTemplateContinue() {
    if (exercise.type !== "reflection_template") return;
    const xp = exercise.xp;
    earnedXpRef.current += xp;
    setTotalXp(t => t + xp);
    showXpPopup(xp);
    setLastCorrect(true);
    setKabaMsg("Ta proposition de valeur est posée. 🔥");
    const answer = (textInputs[0] ?? "").trim();
    if (answer) reflectionsRef.current.set(idx, answer);
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
      earnedXpRef.current = 0;
      setPhase("answering");
      return;
    }
    if (isLast) {
      if (onLearningPhaseComplete) {
        onLearningPhaseComplete(earnedXpRef.current, microInputsRef.current);
      } else {
        completeLessonApi();
      }
      return;
    }
    setIdx(i => i + 1);
    setPhase("answering");
  }

  const completeLessonApi = useCallback(async () => {
    setSubmitting(true);
    setPhase("complete");
    const reflections = Array.from(reflectionsRef.current.entries()).map(
      ([exerciseIndex, answer]) => ({ exerciseIndex, answer })
    );
    const microInputs = Array.from(microInputsRef.current.entries()).map(
      ([storageKey, value]) => ({ storageKey, value })
    );
    try {
      const res = await fetch(`/api/tasks/${taskId}/complete-lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xpEarned: earnedXpRef.current, reflections, microInputs }),
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
  }, [taskId]);

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

  const feedbackColorCls =
    phase === "dead"  ? "bg-error/10 border-error/30"
    : lastCorrect     ? "bg-green/10 border-green/30"
    :                   "bg-error/10 border-error/30";

  return (
    // Full-screen overlay — scrollable, no forced height on children
    <div
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-xl mx-auto px-4">

        {/* Header */}
        <div className="pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <button onClick={onClose} className="text-muted hover:text-foreground shrink-0 p-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <span className="text-sm text-muted truncate">{taskTitle}</span>
            </div>
            <div className="flex gap-1 shrink-0">
              {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                <span key={i} className={`text-lg transition-all ${i < hearts ? "" : "opacity-20 grayscale"}`}>❤️</span>
              ))}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            {lesson.exercises.map((ex, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  isMicroInput(ex) ? "flex-[0.4] h-1.5" : "flex-1 h-2"
                } ${
                  i < idx ? (isMicroInput(ex) ? "bg-[#0722AB]/60" : "bg-primary") :
                  i === idx ? (isMicroInput(ex) ? "bg-[#0722AB]/30" : "bg-primary/50") :
                  "bg-border"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted">{idx + 1} / {lesson.exercises.length}</span>
            <span className="text-xs font-bold text-primary">⚡ {totalXp} XP</span>
          </div>
        </div>

        {/* Exercise — natural height, no stretching */}
        <div className="py-2 relative">
          {xpPopups.map(p => (
            <div key={p.id} className="absolute top-2 right-0 pointer-events-none z-10 animate-xp-float">
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
            checklistState={checklistState}
            setChecklistState={setChecklistState}
          />
        </div>

        {/* Feedback — immediately after content, no gap */}
        {phase !== "answering" && (
          <div className={`mt-6 rounded-2xl border p-4 transition-colors ${feedbackColorCls}`}>
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
                {!lastCorrect && phase !== "dead" && exercise.type !== "info" && exercise.type !== "reflection" && exercise.type !== "reflection_template" && exercise.type !== "micro_input" && exercise.type !== "self_check" && (
                  <p className="text-foreground text-sm leading-relaxed">{getExplanation(exercise)}</p>
                )}
                {phase === "dead" && (
                  <p className="text-muted text-sm">Recommence depuis le début pour garder tes XP.</p>
                )}
              </div>
            </div>
            <button
              onClick={goNext}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 ${
                phase === "dead" ? "bg-error text-white"
                : lastCorrect   ? "bg-green text-white"
                :                 "bg-primary text-white"
              }`}
            >
              {phase === "dead" ? "Recommencer la leçon" : isLast ? "Terminer la leçon →" : "Continuer →"}
            </button>
          </div>
        )}

        {/* Action bar — immediately after content */}
        {phase === "answering" && (
          <div className="mt-6 pb-8">
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
              onMicroInputSubmit={handleMicroInputSubmit}
              onReflectionTemplateContinue={handleReflectionTemplateContinue}
              onSelfCheckContinue={handleSelfCheckContinue}
            />
          </div>
        )}

      </div>
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
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
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
  checklistState: Record<string, boolean>;
  setChecklistState: (v: Record<string, boolean>) => void;
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
            ? `Écris ta réflexion pour continuer (+${exercise.xp} XP)`
            : "✓ Prêt à continuer"}
        </p>
      </div>
    );
  }

  if (exercise.type === "micro_input") {
    return (
      <div className="flex flex-col gap-3 mt-2">
        <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✏️</span>
            <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Ta brique</span>
          </div>
          <p className="font-display text-sm font-bold text-foreground leading-snug mb-3">{exercise.prompt}</p>
          <input
            type="text"
            value={props.textInputs[0] ?? ""}
            onChange={e => props.setTextInputs([e.target.value])}
            disabled={answered}
            placeholder={exercise.placeholder}
            className="w-full px-3 py-2.5 rounded-xl border border-[#0722AB]/30 bg-white text-foreground text-sm placeholder:text-muted/50 focus:border-[#0722AB] focus:outline-none transition-colors"
          />
        </div>
        {answered && (
          <div className="bg-[#EEF1FF] rounded-xl px-4 py-2 text-sm text-[#0722AB] font-medium">
            ✓ Brique enregistrée : &ldquo;{props.textInputs[0]}&rdquo;
          </div>
        )}
      </div>
    );
  }

  if (exercise.type === "self_check") {
    const allChecked = exercise.checklist.every(c => props.checklistState[c.id]);
    const checkedCount = exercise.checklist.filter(c => props.checklistState[c.id]).length;
    return (
      <div className="flex flex-col gap-4 mt-2">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h2 className="font-display text-base font-bold text-foreground mb-2">{exercise.title}</h2>
          <p className="text-sm text-foreground leading-relaxed">{exercise.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          {exercise.checklist.map(item => (
            <label
              key={item.id}
              className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all select-none ${
                answered
                  ? props.checklistState[item.id]
                    ? "border-green bg-green/10"
                    : "border-border bg-surface opacity-60"
                  : props.checklistState[item.id]
                  ? "border-green bg-green/10"
                  : "border-border bg-surface hover:border-green/50"
              }`}
            >
              <input
                type="checkbox"
                disabled={answered}
                checked={!!props.checklistState[item.id]}
                onChange={e => {
                  if (answered) return;
                  props.setChecklistState({ ...props.checklistState, [item.id]: e.target.checked });
                }}
                className="mt-0.5 w-4 h-4 accent-green shrink-0"
              />
              <span className="text-sm text-foreground leading-snug">{item.label}</span>
            </label>
          ))}
        </div>
        {!answered && (
          <p className="text-xs text-muted text-center">
            {allChecked
              ? "✓ Ta grand-mère approuve ! Tu peux continuer."
              : `${checkedCount}/${exercise.checklist.length} critères cochés — continue quand tu es prêt`}
          </p>
        )}
      </div>
    );
  }

  if (exercise.type === "reflection_template") {
    const value = props.textInputs[0] ?? "";
    const flags = !answered ? checkReflectionQuality(value, { exerciseType: "reflection_template" }) : [];
    return (
      <div className="flex flex-col gap-4 mt-2">
        <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🔥</span>
            <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Assemblage final</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{exercise.intro}</p>
        </div>
        <textarea
          value={value}
          onChange={e => props.setTextInputs([e.target.value])}
          disabled={answered}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border-2 border-[#0722AB]/40 bg-[#EEF1FF]/30 text-foreground text-sm font-medium focus:border-[#0722AB] focus:outline-none transition-colors resize-none leading-relaxed"
        />
        {flags.length > 0 && <QualityChecklist flags={flags} />}
        <p className="text-xs text-muted text-center">
          {value.trim().length === 0 ? "Le texte sera pré-rempli avec tes briques" : "✓ Édite si tu veux peaufiner"}
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
  onMicroInputSubmit, onReflectionTemplateContinue, onSelfCheckContinue,
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
  onMicroInputSubmit: () => void;
  onReflectionTemplateContinue: () => void;
  onSelfCheckContinue: () => void;
}) {
  if (exercise.type === "info") {
    return (
      <button onClick={onInfoContinue} className="w-full py-3 rounded-xl bg-cta text-white font-bold text-sm hover:opacity-90 transition-opacity">
        Continuer →
      </button>
    );
  }

  if (exercise.type === "reflection") {
    const hasText = (textInputs[0] ?? "").trim().length > 0;
    return (
      <button
        disabled={!hasText}
        onClick={onReflectionContinue}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-cta text-white hover:opacity-90"
      >
        {hasText ? "Continuer →" : "Écris ta réflexion d'abord"}
      </button>
    );
  }

  if (exercise.type === "micro_input") {
    const hasText = (textInputs[0] ?? "").trim().length > 0;
    return (
      <button
        disabled={!hasText}
        onClick={onMicroInputSubmit}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-[#0722AB] text-white hover:opacity-90"
      >
        {hasText ? "Valider cette brique →" : "Écris ta réponse d'abord"}
      </button>
    );
  }

  if (exercise.type === "reflection_template") {
    const hasText = (textInputs[0] ?? "").trim().length > 0;
    return (
      <button
        disabled={!hasText}
        onClick={onReflectionTemplateContinue}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-cta text-white hover:opacity-90"
      >
        {hasText ? "Valider ma proposition de valeur →" : "Le template sera pré-rempli"}
      </button>
    );
  }

  if (exercise.type === "mcq" || exercise.type === "scenario") {
    return (
      <button
        disabled={selectedOption === null}
        onClick={onMcqSubmit}
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {selectedOption === null ? "Choisis une réponse" : "Vérifier →"}
      </button>
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
      <button
        disabled={!allFilled}
        onClick={onFillBlankSubmit}
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {allFilled ? "Vérifier →" : "Remplis tous les champs"}
      </button>
    );
  }

  if (exercise.type === "match") {
    return null; // auto-validates
  }

  if (exercise.type === "reorder") {
    return (
      <button
        disabled={reorderChecked}
        onClick={onReorderCheck}
        className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        Vérifier l&apos;ordre →
      </button>
    );
  }

  if (exercise.type === "self_check") {
    // Toujours accessible — auto-évaluation non bloquante
    return (
      <button
        onClick={onSelfCheckContinue}
        className="w-full py-3 rounded-xl bg-cta text-white font-bold text-sm hover:opacity-90 transition-opacity"
      >
        Continuer →
      </button>
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

// La barre de progression doit refléter les micro_inputs avec un style différent.
// (utilisé dans le header — les segments micro_input sont plus fins)
function isMicroInput(exercise: Exercise): boolean {
  return exercise.type === "micro_input" || exercise.type === "self_check";
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

