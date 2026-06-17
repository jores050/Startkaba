"use client";

interface Props {
  city: string;
  onSelect: (city: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const VILLES = [
  { value: "COTONOU", label: "Cotonou", flag: "🇧🇯" },
  { value: "ABIDJAN", label: "Abidjan", flag: "🇨🇮" },
  { value: "DAKAR", label: "Dakar", flag: "🇸🇳" },
  { value: "LOME", label: "Lomé", flag: "🇹🇬" },
  { value: "BAMAKO", label: "Bamako", flag: "🇲🇱" },
  { value: "OTHER", label: "Autre ville", flag: "🌍" },
];

export function StepCity({ city, onSelect, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col">
      <h2 className="font-display text-2xl font-extrabold text-[#0A0E2A] mb-1">Ta ville</h2>
      <p className="text-[#8892C8] text-sm mb-6">Pour adapter les exemples et la communauté à ton terrain.</p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {VILLES.map((v) => (
          <button
            key={v.value}
            onClick={() => onSelect(v.value)}
            className={`flex flex-col items-center justify-center gap-1.5 py-6 rounded-2xl border transition-all ${
              city === v.value
                ? "border-[#0722AB] bg-[#EEF1FF] text-[#0722AB]"
                : "border-[#E8EAF0] text-[#4A5280] hover:border-[#0722AB]/50"
            }`}
          >
            <span className="text-3xl">{v.flag}</span>
            <span className="text-sm font-semibold">{v.label}</span>
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
          disabled={!city}
          className="flex-1 py-3 rounded-2xl bg-[#0722AB] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuer →
        </button>
      </div>
    </div>
  );
}
