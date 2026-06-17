"use client";

import { Logo } from "@/components/layout/Logo";

interface Props {
  firstName: string;
  onStart: () => void;
  onSkip: () => void;
}

export function StepWelcome({ firstName, onStart, onSkip }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#0722AB] flex items-center justify-center mb-6 shadow-lg">
        <Logo size={44} />
      </div>
      <h1 className="font-display text-3xl font-extrabold text-[#0A0E2A] mb-3">
        Bienvenue sur StartKaba, {firstName} 👋
      </h1>
      <p className="text-[#4A5280] text-base leading-relaxed max-w-md mb-8">
        4 questions courtes pour que je puisse vraiment t&apos;accompagner. Pas d&apos;évaluation,
        pas de jugement — juste pour mieux te servir.
      </p>
      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 rounded-2xl bg-[#0722AB] text-white font-bold text-base hover:opacity-90 transition-opacity"
      >
        Commencer
      </button>
      <button
        onClick={onSkip}
        className="mt-4 text-sm text-[#8892C8] hover:text-[#0722AB] transition-colors"
      >
        Passer pour l&apos;instant
      </button>
    </div>
  );
}
