"use client";

interface Props {
  challenge: string;
  onChange: (value: string) => void;
  onFinish: () => void;
  onBack: () => void;
  submitting: boolean;
}

const MAX = 280;

export function StepChallenge({ challenge, onChange, onFinish, onBack, submitting }: Props) {
  return (
    <div className="flex flex-col">
      <h2 className="font-display text-2xl font-extrabold text-[#0A0E2A] mb-1">Ton premier défi</h2>
      <p className="text-[#8892C8] text-sm mb-6">
        Si tu pouvais résoudre un seul truc cette semaine pour ton projet, ce serait quoi ?
      </p>

      <textarea
        value={challenge}
        onChange={(e) => onChange(e.target.value.slice(0, MAX))}
        rows={4}
        placeholder="Ex : trouver mes 3 premiers clients à Akpakpa"
        className="w-full px-4 py-3 rounded-xl border border-[#E8EAF0] bg-white dark:bg-[#151A2E] text-[#0A0E2A] text-sm placeholder:text-[#8892C8]/60 focus:border-[#0722AB] focus:outline-none transition-colors resize-none leading-relaxed"
      />
      <div className="flex justify-between items-center mt-1.5 mb-2">
        <p className="text-xs text-[#8892C8]">Pas grave si ce n&apos;est pas parfait — tu pourras le faire évoluer.</p>
        <span className="text-xs text-[#8892C8] shrink-0">{challenge.length}/{MAX}</span>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          disabled={submitting}
          className="px-5 py-3 rounded-2xl border border-[#E8EAF0] text-[#8892C8] font-semibold text-sm hover:text-[#0A0E2A] transition-colors disabled:opacity-50"
        >
          Retour
        </button>
        <button
          onClick={onFinish}
          disabled={submitting}
          className="flex-1 py-3 rounded-2xl bg-[#1A6B00] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Enregistrement..." : "Terminer"}
        </button>
      </div>
    </div>
  );
}
