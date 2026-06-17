"use client";

interface Props {
  projectName: string;
  sector: string;
  stage: string;
  onChange: (patch: { projectName?: string; sector?: string; stage?: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const SECTEURS = [
  { value: "commerce", label: "Commerce" },
  { value: "services", label: "Services" },
  { value: "agriculture", label: "Agriculture" },
  { value: "tech", label: "Tech" },
  { value: "education", label: "Éducation" },
  { value: "sante", label: "Santé" },
  { value: "autre", label: "Autre" },
];

const STAGES = [
  { value: "idee", emoji: "💡", label: "J'ai juste une idée" },
  { value: "test", emoji: "🧪", label: "J'ai commencé à tester" },
  { value: "premiers_clients", emoji: "🤝", label: "J'ai déjà des clients" },
];

export function StepProject({ projectName, sector, stage, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col">
      <h2 className="font-display text-2xl font-extrabold text-[#0A0E2A] mb-1">Ton projet</h2>
      <p className="text-[#8892C8] text-sm mb-6">Dis-m&apos;en un peu plus sur ce que tu construis.</p>

      <label className="text-sm font-semibold text-[#4A5280] mb-1.5">Nom du projet</label>
      <input
        value={projectName}
        onChange={(e) => onChange({ projectName: e.target.value })}
        maxLength={120}
        placeholder="Ex : Ma boutique de pagnes"
        className="w-full px-4 py-3 rounded-xl border border-[#E8EAF0] bg-white dark:bg-[#151A2E] text-[#0A0E2A] text-sm placeholder:text-[#8892C8]/60 focus:border-[#0722AB] focus:outline-none transition-colors mb-5"
      />

      <label className="text-sm font-semibold text-[#4A5280] mb-1.5">Secteur</label>
      <div className="flex flex-wrap gap-2 mb-5">
        {SECTEURS.map((s) => (
          <button
            key={s.value}
            onClick={() => onChange({ sector: s.value })}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              sector === s.value
                ? "border-[#0722AB] bg-[#EEF1FF] text-[#0722AB]"
                : "border-[#E8EAF0] text-[#4A5280] hover:border-[#0722AB]/50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <label className="text-sm font-semibold text-[#4A5280] mb-1.5">Où en es-tu ?</label>
      <div className="flex flex-col gap-2 mb-8">
        {STAGES.map((s) => (
          <button
            key={s.value}
            onClick={() => onChange({ stage: s.value })}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border text-left transition-all ${
              stage === s.value
                ? "border-[#0722AB] bg-[#EEF1FF] text-[#0722AB]"
                : "border-[#E8EAF0] text-[#4A5280] hover:border-[#0722AB]/50"
            }`}
          >
            <span className="text-xl">{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-2xl border border-[#E8EAF0] text-[#8892C8] font-semibold text-sm hover:text-[#0A0E2A] transition-colors"
        >
          Retour
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-2xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}
