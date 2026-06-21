"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Target, ClipboardList, FileText, PenLine, Flame } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";
import type { Lesson, MissionConfig } from "@/types";
import type { MissionStatus } from "@/types";
import { LessonPlayer } from "./LessonPlayer";

// ─── Types ────────────────────────────────────────────────────────────────────

type MissionPhase =
  | "learning"    // Phase A : exercices pédagogiques (LessonPlayer filtré)
  | "briefing"    // Phase B : écran mission terrain
  | "checkpoint"  // Phase C entrée : confirmation terrain effectué
  | "capturing"   // Phase C : capture des données terrain
  | "complete";   // Résultat final

interface MissionResult {
  xpEarned: number;
  badgesUnlocked: { id: number; name: string; icon: string; description: string }[];
}

interface MissionPlayerProps {
  lesson: Lesson;
  taskId: number;
  taskTitle: string;
  missionStatus: MissionStatus | null;
  missionCaptureIndexes: number[];
  missionConfig: MissionConfig;
  onClose: () => void;
  onComplete: (result: { xpEarned: number; badgesUnlocked: MissionResult["badgesUnlocked"] }) => void;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MissionPlayer({
  lesson,
  taskId,
  taskTitle,
  missionStatus,
  missionCaptureIndexes,
  missionConfig,
  onClose,
  onComplete,
}: MissionPlayerProps) {
  const initialPhase: MissionPhase = (() => {
    if (!missionStatus || missionStatus === "LEARNING") return "learning";
    if (missionStatus === "MISSION_IN_PROGRESS") return "briefing";
    if (missionStatus === "CAPTURING") return "checkpoint";
    return "briefing";
  })();

  const [phase, setPhase] = useState<MissionPhase>(initialPhase);
  const [guide, setGuide] = useState<{ question_1: string | null; question_2: string | null } | null>(null);
  const [loadingBriefing, setLoadingBriefing] = useState(false);
  const [result, setResult] = useState<MissionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Capture state: dynamic keys per captureField + __rawNotes__ + __reflection__
  const [captureValues, setCaptureValues] = useState<Record<string, string>>({});
  // 0 = rawNotes (if hasRawNotes), 1..n = captureFields[n-1], last = reflection
  const [captureStep, setCaptureStep] = useState(0);

  const learningXpRef = useRef(0);

  // ─── Derived capture counts ───────────────────────────────────────────────

  const rawNotesOffset = missionConfig.hasRawNotes ? 1 : 0;
  const totalSteps = rawNotesOffset + missionConfig.captureFields.length + 1; // +1 reflection
  const reflectionStepIndex = totalSteps - 1;
  const reflectionExIdx = missionCaptureIndexes[missionCaptureIndexes.length - 1];
  const reflectionEx = lesson.exercises[reflectionExIdx];

  // ─── Learning lesson (Phase A) ────────────────────────────────────────────

  const learningLesson: Lesson = {
    title: lesson.title,
    exercises: lesson.exercises.filter((_, i) => !missionCaptureIndexes.includes(i)),
  };

  // ─── Template assembly ────────────────────────────────────────────────────

  const assembleTemplate = useCallback((values: Record<string, string>): string => {
    if (reflectionEx?.type !== "reflection_template") return "";
    return Object.entries(values).reduce(
      (tmpl, [key, val]) => {
        if (key.startsWith("__")) return tmpl;
        return tmpl.split(`{${key}}`).join(val || `[${key}]`);
      },
      reflectionEx.template
    );
  }, [reflectionEx]);

  // ─── Phase transitions ────────────────────────────────────────────────────

  const handleLearningComplete = useCallback(async (xpEarned: number) => {
    learningXpRef.current = xpEarned;
    setLoadingBriefing(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}/mission/start`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok && missionConfig.type === "interviews") {
        setGuide(data?.guide ?? null);
      }
    } catch {
      // guide stays null — briefing shows without guide
    } finally {
      setLoadingBriefing(false);
      setPhase("briefing");
    }
  }, [taskId, missionConfig.type]);

  const fetchGuide = useCallback(async () => {
    if (missionConfig.type !== "interviews" || guide) return;
    setLoadingBriefing(true);
    try {
      const res = await fetch(`/api/tasks/108/micro-inputs`);
      const data = await res.json().catch(() => null);
      setGuide({ question_1: data?.inputs?.question_1 ?? null, question_2: data?.inputs?.question_2 ?? null });
    } catch {
      // ignore
    } finally {
      setLoadingBriefing(false);
    }
  }, [guide, missionConfig.type]);

  const didFetchRef = useRef(false);
  if (initialPhase === "briefing" && !didFetchRef.current && !guide && missionConfig.type === "interviews") {
    didFetchRef.current = true;
    fetchGuide();
  }

  const handleCaptureDone = useCallback(async () => {
    setSubmitting(true);
    setApiError(null);

    const reflectionText = captureValues.__reflection__ ?? assembleTemplate(captureValues);
    const microInputs = missionConfig.captureFields.map(f => ({
      storageKey: f.id,
      value: captureValues[f.id] ?? "",
    }));
    const rawNotes = captureValues.__rawNotes__ ?? "";

    try {
      const res = await fetch(`/api/tasks/${taskId}/mission/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xpEarned: learningXpRef.current + missionConfig.captureXP,
          interviewNotes: rawNotes,
          microInputs,
          reflections: reflectionText.trim()
            ? [{ exerciseIndex: reflectionExIdx, answer: reflectionText }]
            : [],
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setApiError(data?.error ?? "Erreur serveur");
      } else {
        setResult(data);
        setPhase("complete");
      }
    } catch {
      setApiError("Erreur réseau");
    } finally {
      setSubmitting(false);
    }
  }, [captureValues, missionConfig, taskId, reflectionExIdx, assembleTemplate]);

  // ─── Render : Phase A ─────────────────────────────────────────────────────

  if (phase === "learning") {
    return (
      <LessonPlayer
        lesson={learningLesson}
        taskId={taskId}
        taskTitle={taskTitle}
        onClose={onClose}
        onLearningPhaseComplete={(xp) => handleLearningComplete(xp)}
      />
    );
  }

  // ─── Render : Phase B — briefing ──────────────────────────────────────────

  if (phase === "briefing") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={onClose} className="text-muted hover:text-foreground p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-sm text-muted">{taskTitle}</span>
          </div>

          {/* Mission card */}
          <div className="bg-[#0722AB] rounded-2xl p-6 text-white mb-5 relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: "url(/patterns/wax-2.svg)", backgroundSize: "60px 60px" }} />
            <div className="relative">
              <p className="text-xs font-bold tracking-widest uppercase text-[#8896F0] mb-2 flex items-center gap-1"><Target size={12} strokeWidth={2} />Ta mission terrain</p>
              <h1 className="font-display text-2xl font-extrabold mb-3">{missionConfig.title}</h1>
              <p className="text-sm text-[#C8D0FF] leading-relaxed">{missionConfig.brief}</p>
            </div>
          </div>

          {/* Briefing panels (optionnel — surtout pour les interviews) */}
          {missionConfig.briefingPanels && (
            <div className="flex flex-col gap-4 mb-4">
              {missionConfig.briefingPanels.map((panel, i) => (
                <div key={i} className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
                  <h2 className="font-bold text-foreground">{panel.title}</h2>
                  <ul className="text-sm text-muted flex flex-col gap-1.5">
                    {panel.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Guide d'entretien (uniquement pour les missions "interviews") */}
          {missionConfig.type === "interviews" && (
            <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList size={18} strokeWidth={2} className="text-[#0722AB] shrink-0" />
                <h2 className="font-bold text-[#0722AB] text-sm">Ton guide d&apos;entretien (Tâche 108)</h2>
              </div>
              {loadingBriefing ? (
                <p className="text-sm text-muted animate-pulse">Chargement du guide...</p>
              ) : guide?.question_1 || guide?.question_2 ? (
                <div className="flex flex-col gap-2">
                  {guide.question_1 && (
                    <div className="bg-white rounded-xl px-4 py-2.5">
                      <p className="text-xs font-bold text-[#0722AB] mb-1">Question 1</p>
                      <p className="text-sm text-foreground">{guide.question_1}</p>
                    </div>
                  )}
                  {guide.question_2 && (
                    <div className="bg-white rounded-xl px-4 py-2.5">
                      <p className="text-xs font-bold text-[#0722AB] mb-1">Question 2</p>
                      <p className="text-sm text-foreground">{guide.question_2}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted italic">
                  Complète d&apos;abord la Tâche 108 pour voir ton guide d&apos;entretien.
                </p>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => setPhase("checkpoint")}
              className="w-full py-4 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {missionConfig.ctaLabel}
            </button>

            <Link
              href={`/coach?niveau=${missionConfig.coachNiveau}&msg=${encodeURIComponent("Comment aborder cette mission ?")}`}
              className="w-full py-3 rounded-xl border-2 border-[#0722AB] text-[#0722AB] font-semibold text-sm text-center hover:bg-[#EEF1FF] transition-colors"
            >
              🤖 Demander conseil à Kaba
            </Link>

            <button
              onClick={onClose}
              className="w-full py-3 text-muted text-sm hover:text-foreground transition-colors"
            >
              Fermer — je reviens après ma mission
            </button>

            <p className="text-center text-xs text-muted mt-1">
              Tu peux quitter et revenir ici. Ta progression est sauvegardée.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render : checkpoint ──────────────────────────────────────────────────

  if (phase === "checkpoint") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => setPhase("briefing")} className="text-muted hover:text-foreground p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 15L8 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-sm text-muted">Point de contrôle</span>
          </div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4"><Target size={56} strokeWidth={1.5} className="text-muted" /></div>
            <h1 className="font-display text-2xl font-extrabold text-foreground mb-3">
              {missionConfig.checkpointQuestion}
            </h1>
            <p className="text-muted text-sm">
              Pour continuer, tu dois avoir accompli ta mission avec {missionConfig.checkpointMinLabel}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCaptureStep(0); setPhase("capturing"); }}
              className="w-full py-4 rounded-xl bg-[#1A6B00] text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              {missionConfig.checkpointCta}
            </button>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-amber-800 mb-2">Pas encore ?</p>
              <p className="text-sm text-amber-700 mb-3">
                Ta mission est enregistrée, reviens quand tu es prêt.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl border border-amber-400 text-amber-800 text-sm font-semibold hover:bg-amber-100 transition-colors"
              >
                Fermer — je reviens bientôt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render : Phase C — capturing ─────────────────────────────────────────

  if (phase === "capturing") {
    const isRawNotesStep = missionConfig.hasRawNotes && captureStep === 0;
    const fieldIndex = captureStep - rawNotesOffset;
    const isReflectionStep = captureStep === reflectionStepIndex;
    const isFieldStep = !isRawNotesStep && !isReflectionStep;
    const currentField = isFieldStep ? missionConfig.captureFields[fieldIndex] : null;
    const isCurrentFieldFilled = currentField ? !!captureValues[currentField.id]?.trim() : false;

    const goNext = () => {
      if (captureStep === reflectionStepIndex - 1) {
        // Pré-remplir le template avant d'afficher l'étape reflection
        const assembled = assembleTemplate(captureValues);
        setCaptureValues(v => ({ ...v, __reflection__: assembled }));
      }
      setCaptureStep(s => s + 1);
    };

    const goPrev = () => {
      if (captureStep === 0) {
        setPhase("checkpoint");
      } else {
        setCaptureStep(s => s - 1);
      }
    };

    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button onClick={goPrev} className="text-muted hover:text-foreground p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 15L8 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-sm text-muted font-medium">Phase C — Capture terrain</span>
            <span className="text-xs font-bold text-[#0722AB]">
              {captureStep + 1}/{totalSteps}
            </span>
          </div>

          {/* Barre de progression */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`flex-1 h-2 rounded-full transition-all ${
                i === captureStep ? "bg-[#0722AB]" : i < captureStep ? "bg-[#1A6B00]" : "bg-border"
              }`} />
            ))}
          </div>

          {/* Étape : notes brutes */}
          {isRawNotesStep && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                  <FileText size={12} strokeWidth={2} />{missionConfig.rawNotesLabel ?? "Notes brutes"} (optionnel)
                </p>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Tes notes de terrain</h2>
                <p className="text-sm text-muted">
                  Colle ici tes notes détaillées — elles seront sauvegardées dans &ldquo;Mon Projet&rdquo;.
                </p>
              </div>
              <textarea
                value={captureValues.__rawNotes__ ?? ""}
                onChange={e => setCaptureValues(v => ({ ...v, __rawNotes__: e.target.value }))}
                rows={10}
                placeholder={missionConfig.rawNotesPlaceholder ?? ""}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed"
              />
              <button
                onClick={goNext}
                className="w-full py-3 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity"
              >
                {captureValues.__rawNotes__?.trim() ? "Continuer →" : "Passer (sans notes détaillées) →"}
              </button>
            </div>
          )}

          {/* Étape : champ de capture */}
          {isFieldStep && currentField && (
            <div className="flex flex-col gap-5">
              <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <PenLine size={18} strokeWidth={2} className="text-[#0722AB] shrink-0" />
                  <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Ta brique terrain</span>
                </div>
                <p className="font-display text-base font-bold text-foreground leading-snug mb-3">
                  {currentField.label}
                </p>
                {currentField.type === "texte_court" ? (
                  <input
                    type="text"
                    value={captureValues[currentField.id] ?? ""}
                    onChange={e => setCaptureValues(v => ({ ...v, [currentField.id]: e.target.value }))}
                    placeholder={currentField.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#0722AB]/30 bg-white text-foreground text-sm placeholder:text-muted/50 focus:border-[#0722AB] focus:outline-none transition-colors"
                  />
                ) : (
                  <textarea
                    value={captureValues[currentField.id] ?? ""}
                    onChange={e => setCaptureValues(v => ({ ...v, [currentField.id]: e.target.value }))}
                    rows={4}
                    placeholder={currentField.placeholder}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#0722AB]/30 bg-white text-foreground text-sm placeholder:text-muted/50 focus:border-[#0722AB] focus:outline-none transition-colors resize-none"
                  />
                )}
              </div>
              <button
                disabled={currentField.required && !isCurrentFieldFilled}
                onClick={goNext}
                className="w-full py-3 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isCurrentFieldFilled
                  ? "Continuer →"
                  : currentField.required
                    ? "Remplis ce champ d'abord"
                    : "Passer →"}
              </button>
            </div>
          )}

          {/* Étape : reflection template */}
          {isReflectionStep && (
            <div className="flex flex-col gap-5">
              <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={18} strokeWidth={2} className="text-[#0722AB] shrink-0" />
                  <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Assemblage final</span>
                </div>
                {reflectionEx?.type === "reflection_template" && (
                  <p className="text-sm text-foreground leading-relaxed">{reflectionEx.intro}</p>
                )}
              </div>
              <textarea
                value={captureValues.__reflection__ ?? ""}
                onChange={e => setCaptureValues(v => ({ ...v, __reflection__: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#0722AB]/40 bg-[#EEF1FF]/30 text-foreground text-sm font-medium focus:border-[#0722AB] focus:outline-none transition-colors resize-none leading-relaxed"
              />
              <p className="text-xs text-muted text-center">✓ Édite si tu veux peaufiner</p>

              {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

              <button
                disabled={submitting || !captureValues.__reflection__?.trim()}
                onClick={handleCaptureDone}
                className="w-full py-4 rounded-xl bg-[#1A6B00] text-white font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Enregistrement..." : "Terminer ma mission ✓"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Render : complete ────────────────────────────────────────────────────

  if (phase === "complete") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-4 animate-badge-pop"><IconBadge iconKey={missionConfig.icon} size={56} strokeWidth={1.5} className="text-primary" /></div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Mission accomplie !</h2>
          <p className="text-muted mb-6">
            {missionConfig.completeSummary} · {result?.xpEarned ?? 0} XP gagnés
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-5 mb-6">
            <p className="text-3xl font-bold text-primary">+{result?.xpEarned ?? 0} XP</p>
            <p className="text-sm text-muted mt-1">ajoutés à ton profil</p>
          </div>

          {result?.badgesUnlocked && result.badgesUnlocked.length > 0 && (
            <div className="flex flex-col gap-2 mb-6">
              {result.badgesUnlocked.map(b => (
                <div key={b.id} className="bg-surface border border-border rounded-xl px-4 py-3 flex items-center gap-3">
                  <IconBadge iconKey={b.icon} size={22} strokeWidth={2} className="text-foreground shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-sm text-foreground">{b.name}</p>
                    <p className="text-xs text-muted">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-4 mb-6 text-left">
            <p className="text-xs font-bold text-[#0722AB] mb-2 flex items-center gap-1"><IconBadge iconKey={missionConfig.icon} size={14} strokeWidth={2} className="text-[#0722AB]" />Tes données sont dans Mon Projet</p>
            <p className="text-sm text-muted">{missionConfig.completeContextLabel}</p>
          </div>

          <button
            onClick={() => {
              if (result && onComplete) {
                onComplete({ xpEarned: result.xpEarned, badgesUnlocked: result.badgesUnlocked });
              } else {
                onClose();
              }
            }}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base hover:opacity-90 transition-opacity"
          >
            Retour au parcours
          </button>
        </div>
      </div>
    );
  }

  return null;
}
