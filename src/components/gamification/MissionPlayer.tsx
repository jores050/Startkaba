"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Lesson } from "@/types";
import type { MissionStatus } from "@/types";
import { LessonPlayer } from "./LessonPlayer";

// ─── Types ────────────────────────────────────────────────────────────────────

type MissionPhase =
  | "learning"       // Phase A : exercices pédagogiques (LessonPlayer filtré)
  | "briefing"       // Phase B : écran mission terrain
  | "checkpoint"     // Phase C entrée : "As-tu parlé à 3+ personnes ?"
  | "capturing"      // Phase C : capture des données terrain
  | "complete";      // Résultat final

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
  onClose: () => void;
  onComplete: (result: { xpEarned: number; badgesUnlocked: MissionResult["badgesUnlocked"] }) => void;
}

// ─── Capture step state ───────────────────────────────────────────────────────

interface CaptureState {
  rawNotes: string;
  signalFort: string;
  surprise: string;
  reflection: string;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MissionPlayer({
  lesson,
  taskId,
  taskTitle,
  missionStatus,
  missionCaptureIndexes,
  onClose,
  onComplete,
}: MissionPlayerProps) {
  // Determine starting phase based on current missionStatus
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

  // Capture form state
  const [capture, setCapture] = useState<CaptureState>({
    rawNotes: "",
    signalFort: "",
    surprise: "",
    reflection: "",
  });
  const [captureStep, setCaptureStep] = useState<"notes" | "signal" | "surprise" | "reflection">("notes");

  // Accumulated XP from learning phase
  const learningXpRef = useRef(0);

  // ─── Build filtered lesson for Phase A ────────────────────────────────────

  const learningLesson: Lesson = {
    title: lesson.title,
    exercises: lesson.exercises.filter((_, i) => !missionCaptureIndexes.includes(i)),
  };

  // ─── Phase transitions ────────────────────────────────────────────────────

  const handleLearningComplete = useCallback(async (xpEarned: number) => {
    learningXpRef.current = xpEarned;
    setLoadingBriefing(true);
    try {
      const res = await fetch(`/api/tasks/${taskId}/mission/start`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok) setGuide(data?.guide ?? null);
    } catch {
      // guide will be null — briefing shows without guide
    } finally {
      setLoadingBriefing(false);
      setPhase("briefing");
    }
  }, [taskId]);

  const handleBriefingStart = useCallback(async () => {
    if (!guide) {
      setLoadingBriefing(true);
      try {
        const res = await fetch(`/api/tasks/108/micro-inputs`);
        const data = await res.json().catch(() => null);
        setGuide({ question_1: data?.inputs?.question_1 ?? null, question_2: data?.inputs?.question_2 ?? null });
      } catch {
        // ignore — guide stays null
      } finally {
        setLoadingBriefing(false);
      }
    }
  }, [guide]);

  // Fetch guide on mount if in briefing phase directly
  const didFetchRef = useRef(false);
  if (initialPhase === "briefing" && !didFetchRef.current && !guide) {
    didFetchRef.current = true;
    handleBriefingStart();
  }

  const handleCaptureDone = useCallback(async () => {
    setSubmitting(true);
    setApiError(null);

    // Get reflection_template exercise to compute the assembled text
    const reflectionEx = lesson.exercises[missionCaptureIndexes[missionCaptureIndexes.length - 1]];
    const reflectionAnswer = reflectionEx?.type === "reflection_template"
      ? capture.reflection
      : capture.reflection;

    const reflectionExIdx = missionCaptureIndexes[missionCaptureIndexes.length - 1];

    try {
      const res = await fetch(`/api/tasks/${taskId}/mission/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          xpEarned: learningXpRef.current + 119, // 2+2+100+10+5 capture XP ≈ 119 (fixed for simplicity)
          interviewNotes: capture.rawNotes,
          microInputs: [
            { storageKey: "signal_fort", value: capture.signalFort },
            { storageKey: "surprise", value: capture.surprise },
          ],
          reflections: reflectionAnswer.trim()
            ? [{ exerciseIndex: reflectionExIdx, answer: reflectionAnswer }]
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
  }, [capture, lesson.exercises, missionCaptureIndexes, taskId]);

  // ─── Render phases ─────────────────────────────────────────────────────────

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
              <p className="text-xs font-bold tracking-widest uppercase text-[#8896F0] mb-2">🎯 Ta mission terrain</p>
              <h1 className="font-display text-2xl font-extrabold mb-3">Mener 5 interviews</h1>
              <p className="text-sm text-[#C8D0FF] leading-relaxed">
                Tu viens d&apos;apprendre comment écouter sans biaiser. Maintenant, tu sors du cours et tu rencontres de vraies personnes.
              </p>
            </div>
          </div>

          {/* Briefing details */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
              <h2 className="font-bold text-foreground">Qui interviewer ?</h2>
              <ul className="text-sm text-muted flex flex-col gap-1.5">
                <li>✓ Des personnes qui correspondent à ta persona client</li>
                <li>✓ Idéalement des inconnus ou connaissances distantes</li>
                <li>✗ Pas des amis ou de la famille</li>
                <li>✓ Minimum 3 pour valider, idéal 5</li>
              </ul>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
              <h2 className="font-bold text-foreground">La posture</h2>
              <ul className="text-sm text-muted flex flex-col gap-1.5">
                <li>🎙️ Tu parles 10% du temps — tu écoutes 90%</li>
                <li>🚫 Ne parle pas de ton idée au début</li>
                <li>💬 Commence par la vie de la personne, ses frustrations</li>
                <li>🔍 Creuse avec &ldquo;donne-moi un exemple récent&rdquo;</li>
              </ul>
            </div>

            {/* Interview guide */}
            <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📋</span>
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
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setPhase("checkpoint")}
              className="w-full py-4 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity"
            >
              J&apos;ai parlé à mes interviewés → Capturer mes insights
            </button>

            <Link
              href={`/coach?niveau=2&msg=${encodeURIComponent("Comment aborder un inconnu pour une interview ?")}`}
              className="w-full py-3 rounded-xl border-2 border-[#0722AB] text-[#0722AB] font-semibold text-sm text-center hover:bg-[#EEF1FF] transition-colors"
            >
              🤖 Demander conseil à Kaba
            </Link>

            <button
              onClick={onClose}
              className="w-full py-3 text-muted text-sm hover:text-foreground transition-colors"
            >
              Fermer — je reviens après mes interviews
            </button>

            <p className="text-center text-xs text-muted mt-1">
              Tu peux quitter et revenir ici des jours plus tard. Ta progression est sauvegardée.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            <span className="text-6xl block mb-4">🎯</span>
            <h1 className="font-display text-2xl font-extrabold text-foreground mb-3">
              Tu as mené tes interviews ?
            </h1>
            <p className="text-muted text-sm">
              Pour continuer, tu dois avoir parlé à au moins 3 vraies personnes de ta cible.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setCaptureStep("notes"); setPhase("capturing"); }}
              className="w-full py-4 rounded-xl bg-[#1A6B00] text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              ✓ Oui, j&apos;ai parlé à au moins 3 personnes
            </button>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
              <p className="text-sm font-semibold text-amber-800 mb-2">Pas encore ?</p>
              <p className="text-sm text-amber-700 mb-3">
                C&apos;est normal — les interviews prennent du temps. Ta mission est enregistrée, reviens quand tu es prêt.
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

  if (phase === "capturing") {
    const signalFortEx = lesson.exercises[missionCaptureIndexes[0]];
    const surpriseEx = lesson.exercises[missionCaptureIndexes[1]];
    const reflectionEx = lesson.exercises[missionCaptureIndexes[2]];

    // Build pre-filled reflection template
    const assembledReflection = reflectionEx?.type === "reflection_template"
      ? reflectionEx.template
        .replace("{signal_fort}", capture.signalFort || "[signal fort]")
        .replace("{surprise}", capture.surprise || "[surprise]")
      : "";

    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button onClick={() => setPhase("checkpoint")} className="text-muted hover:text-foreground p-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 15L8 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <span className="text-sm text-muted font-medium">Phase C — Capture terrain</span>
            <span className="text-xs font-bold text-[#0722AB]">
              {captureStep === "notes" ? "1/4" : captureStep === "signal" ? "2/4" : captureStep === "surprise" ? "3/4" : "4/4"}
            </span>
          </div>

          {/* Progress */}
          <div className="flex gap-1 mb-6">
            {(["notes", "signal", "surprise", "reflection"] as const).map((step) => (
              <div key={step} className={`flex-1 h-2 rounded-full transition-all ${
                step === captureStep ? "bg-[#0722AB]" :
                ["notes", "signal", "surprise", "reflection"].indexOf(step) < ["notes", "signal", "surprise", "reflection"].indexOf(captureStep) ? "bg-[#1A6B00]" :
                "bg-border"
              }`} />
            ))}
          </div>

          {/* Step : raw notes */}
          {captureStep === "notes" && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">📝 Notes brutes (optionnel)</p>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Tes notes de terrain</h2>
                <p className="text-sm text-muted">
                  Colle ici tes notes brutes d&apos;interviews — mots exacts, citations, observations. Elles seront sauvegardées dans &ldquo;Mon Projet&rdquo;.
                </p>
              </div>
              <textarea
                value={capture.rawNotes}
                onChange={e => setCapture(c => ({ ...c, rawNotes: e.target.value }))}
                rows={10}
                placeholder="Interview 1 — Amara, 34 ans, Abidjan Plateau &#10;&#10;'Chaque semaine je perds au moins 2h à...' &#10;Signal fort : il a frappé la table en disant 'si quelqu'un résolvait ça, je paierais sans hésiter' &#10;&#10;Interview 2 — ..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-foreground text-sm placeholder:text-muted/40 focus:border-primary focus:outline-none transition-colors resize-none leading-relaxed"
              />
              <button
                onClick={() => setCaptureStep("signal")}
                className="w-full py-3 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity"
              >
                {capture.rawNotes.trim() ? "Continuer →" : "Passer (sans notes brutes) →"}
              </button>
            </div>
          )}

          {/* Step : signal fort */}
          {captureStep === "signal" && signalFortEx?.type === "micro_input" && (
            <div className="flex flex-col gap-5">
              <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">✏️</span>
                  <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Ta brique terrain</span>
                </div>
                <p className="font-display text-base font-bold text-foreground leading-snug mb-3">
                  {signalFortEx.prompt}
                </p>
                <textarea
                  value={capture.signalFort}
                  onChange={e => setCapture(c => ({ ...c, signalFort: e.target.value }))}
                  rows={4}
                  placeholder={signalFortEx.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#0722AB]/30 bg-white text-foreground text-sm placeholder:text-muted/50 focus:border-[#0722AB] focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                disabled={!capture.signalFort.trim()}
                onClick={() => setCaptureStep("surprise")}
                className="w-full py-3 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {capture.signalFort.trim() ? "Continuer →" : "Décris ton signal fort d'abord"}
              </button>
            </div>
          )}

          {/* Step : surprise */}
          {captureStep === "surprise" && surpriseEx?.type === "micro_input" && (
            <div className="flex flex-col gap-5">
              <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">✏️</span>
                  <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Ta brique terrain</span>
                </div>
                <p className="font-display text-base font-bold text-foreground leading-snug mb-3">
                  {surpriseEx.prompt}
                </p>
                <textarea
                  value={capture.surprise}
                  onChange={e => setCapture(c => ({ ...c, surprise: e.target.value }))}
                  rows={4}
                  placeholder={surpriseEx.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#0722AB]/30 bg-white text-foreground text-sm placeholder:text-muted/50 focus:border-[#0722AB] focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                disabled={!capture.surprise.trim()}
                onClick={() => {
                  // Pre-fill reflection with assembled template
                  setCapture(c => ({
                    ...c,
                    reflection: reflectionEx?.type === "reflection_template"
                      ? reflectionEx.template
                        .replace("{signal_fort}", c.signalFort)
                        .replace("{surprise}", c.surprise)
                      : "",
                  }));
                  setCaptureStep("reflection");
                }}
                className="w-full py-3 rounded-xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {capture.surprise.trim() ? "Continuer →" : "Décris ta surprise d'abord"}
              </button>
            </div>
          )}

          {/* Step : reflection template */}
          {captureStep === "reflection" && (
            <div className="flex flex-col gap-5">
              <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-xs font-bold text-[#0722AB] uppercase tracking-wider">Assemblage final</span>
                </div>
                {reflectionEx?.type === "reflection_template" && (
                  <p className="text-sm text-foreground leading-relaxed">{reflectionEx.intro}</p>
                )}
              </div>
              <textarea
                value={capture.reflection || assembledReflection}
                onChange={e => setCapture(c => ({ ...c, reflection: e.target.value }))}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#0722AB]/40 bg-[#EEF1FF]/30 text-foreground text-sm font-medium focus:border-[#0722AB] focus:outline-none transition-colors resize-none leading-relaxed"
              />
              <p className="text-xs text-muted text-center">✓ Édite si tu veux peaufiner</p>

              {apiError && <p className="text-error text-sm text-center">{apiError}</p>}

              <button
                disabled={submitting || !(capture.reflection || assembledReflection).trim()}
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

  if (phase === "complete") {
    return (
      <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <span className="text-6xl mb-4 animate-badge-pop block">🎤</span>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Mission accomplie !</h2>
          <p className="text-muted mb-6">
            5 interviews terrain · {result?.xpEarned ?? 0} XP gagnés
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-5 mb-6">
            <p className="text-3xl font-bold text-primary">+{result?.xpEarned ?? 0} XP</p>
            <p className="text-sm text-muted mt-1">ajoutés à ton profil</p>
          </div>

          {result?.badgesUnlocked && result.badgesUnlocked.length > 0 && (
            <div className="flex flex-col gap-2 mb-6">
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

          <div className="bg-[#EEF1FF] border border-[#0722AB]/20 rounded-2xl p-4 mb-6 text-left">
            <p className="text-xs font-bold text-[#0722AB] mb-2">🎤 Tes insights sont dans Mon Projet</p>
            <p className="text-sm text-muted">Retrouve tes notes terrain et tes insights dans la section &ldquo;Mon Projet&rdquo;, sous le Niveau 2.</p>
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
