"use client";

import { useState, useRef, useEffect } from "react";
import type { Course, CourseStep } from "@/types";

interface CourseModalProps {
  course: Course;
  taskTitle: string;
  onComplete: () => void;
  onSkip: () => void;
}

export function CourseModal({ course, taskTitle, onComplete, onSkip }: CourseModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState("");
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null);
  const [checkRevealed, setCheckRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Touch-swipe support
  const touchStartX = useRef<number | null>(null);

  const step = course.steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === course.steps.length - 1;

  // Reset per-step state when navigating
  useEffect(() => {
    setCheckAnswer(null);
    setCheckRevealed(false);
    contentRef.current?.scrollTo({ top: 0 });
  }, [stepIndex]);

  function canAdvance() {
    if (step.type === "reflection") return reflectionText.trim().length > 0;
    if (step.type === "check") return checkRevealed;
    return true;
  }

  function goNext() {
    if (!canAdvance()) return;
    if (isLast) {
      onComplete();
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 60) {
      if (delta > 0 && canAdvance()) goNext();
      else if (delta < 0 && !isFirst) setStepIndex((i) => i - 1);
    }
    touchStartX.current = null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wide">{taskTitle}</p>
            <p className="text-sm font-semibold text-foreground line-clamp-1">{course.title}</p>
          </div>
          <button
            onClick={onSkip}
            className="text-xs text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-border/60"
          >
            Passer le cours →
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1">
          {course.steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < stepIndex ? "bg-primary" : i === stepIndex ? "bg-primary/60" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted mt-1">
          {stepIndex + 1} / {course.steps.length} · {course.readingTime}
        </p>
      </div>

      {/* Scrollable content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-2"
      >
        <StepContent
          step={step}
          reflectionText={reflectionText}
          setReflectionText={setReflectionText}
          checkAnswer={checkAnswer}
          setCheckAnswer={setCheckAnswer}
          checkRevealed={checkRevealed}
          setCheckRevealed={setCheckRevealed}
        />
      </div>

      {/* Footer nav */}
      <div className="shrink-0 px-4 py-4 border-t border-border flex gap-3">
        {!isFirst && (
          <button
            onClick={() => setStepIndex((i) => i - 1)}
            className="px-4 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-border/50 transition-colors"
          >
            ← Précédent
          </button>
        )}
        <button
          onClick={goNext}
          disabled={!canAdvance()}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
            canAdvance()
              ? isLast
                ? "bg-primary text-white hover:opacity-90"
                : "bg-cta text-white hover:opacity-90"
              : "bg-border text-muted cursor-not-allowed"
          }`}
        >
          {isLast ? "Passer à l'action →" : "Suivant →"}
        </button>
      </div>
    </div>
  );
}

interface StepContentProps {
  step: CourseStep;
  reflectionText: string;
  setReflectionText: (v: string) => void;
  checkAnswer: number | null;
  setCheckAnswer: (v: number | null) => void;
  checkRevealed: boolean;
  setCheckRevealed: (v: boolean) => void;
}

function StepContent({
  step,
  reflectionText,
  setReflectionText,
  checkAnswer,
  setCheckAnswer,
  checkRevealed,
  setCheckRevealed,
}: StepContentProps) {
  if (step.type === "concept") {
    return (
      <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0 mt-0.5">{step.icon}</span>
          <h2 className="font-display text-lg font-bold text-foreground leading-snug">{step.title}</h2>
        </div>
        <RichText content={step.content} />
      </div>
    );
  }

  if (step.type === "example") {
    return (
      <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: "#FFF4EC", border: "1.5px solid #F97316" }}>
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0 mt-0.5">{step.icon}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#F97316" }}>Étude de cas</p>
            <h2 className="font-display text-lg font-bold text-foreground leading-snug mt-0.5">{step.title}</h2>
          </div>
        </div>
        <RichText content={step.content} />
      </div>
    );
  }

  if (step.type === "reflection") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0 mt-0.5">{step.icon}</span>
          <h2 className="font-display text-lg font-bold text-foreground leading-snug">{step.question}</h2>
        </div>
        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          rows={8}
          placeholder={step.placeholder}
          className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed"
        />
        {reflectionText.trim().length === 0 && (
          <p className="text-xs text-muted text-center">Écris ta réflexion pour continuer</p>
        )}
      </div>
    );
  }

  if (step.type === "check") {
    const isCorrect = checkAnswer === step.correctIndex;
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0 mt-0.5">{step.icon}</span>
          <h2 className="font-display text-lg font-bold text-foreground leading-snug">{step.question}</h2>
        </div>
        <div className="flex flex-col gap-2">
          {step.options.map((opt, i) => {
            let cls =
              "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ";
            if (!checkRevealed) {
              cls +=
                checkAnswer === i
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 text-foreground";
            } else {
              if (i === step.correctIndex) cls += "border-green bg-green/10 text-green font-bold";
              else if (i === checkAnswer && !isCorrect) cls += "border-error bg-error/10 text-error";
              else cls += "border-border text-muted";
            }
            return (
              <button
                key={i}
                onClick={() => !checkRevealed && setCheckAnswer(i)}
                className={cls}
                disabled={checkRevealed}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {checkAnswer !== null && !checkRevealed && (
          <button
            onClick={() => setCheckRevealed(true)}
            className="py-3 rounded-xl bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Vérifier ma réponse
          </button>
        )}
        {checkRevealed && (
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              isCorrect ? "bg-green/10 border border-green/30 text-green" : "bg-error/10 border border-error/30 text-error"
            }`}
          >
            <p className="font-bold mb-1">{isCorrect ? "✓ Correct !" : "✗ Pas tout à fait..."}</p>
            <p className="leading-relaxed text-foreground">{step.explanation}</p>
          </div>
        )}
      </div>
    );
  }

  if (step.type === "takeaway") {
    return (
      <div
        className="rounded-2xl px-6 py-8 flex flex-col items-center gap-4 text-center"
        style={{ backgroundColor: "#1A6B00" }}
      >
        <span className="text-4xl">{step.icon}</span>
        <p className="font-display text-lg font-bold text-white leading-relaxed">
          {step.content}
        </p>
      </div>
    );
  }

  return null;
}

function RichText({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="flex flex-col gap-3 text-foreground text-base leading-relaxed">
      {lines.map((line, i) => {
        if (line.trim() === "") return <div key={i} className="h-1" />;
        return (
          <p key={i} className="leading-relaxed">
            <InlineMarkdown text={line} />
          </p>
        );
      })}
    </div>
  );
}

function InlineMarkdown({ text }: { text: string }) {
  // Handle **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="bg-border/50 px-1 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
