"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { StepWelcome } from "@/components/onboarding/StepWelcome";
import { StepProject } from "@/components/onboarding/StepProject";
import { StepCity } from "@/components/onboarding/StepCity";
import { StepChallenge } from "@/components/onboarding/StepChallenge";

const SKIP_KEY = "sk_onboarding_skipped";

interface OnboardingData {
  projectName: string;
  sector: string;
  stage: string;
  city: string;
  initialChallenge: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, mutate } = useUser();
  const firstName = user?.fullName?.split(" ")[0] ?? "toi";

  const [step, setStep] = useState(0); // 0 = welcome, 1-3 = steps
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    projectName: user?.projectName ?? "",
    sector: "",
    stage: "",
    city: user?.city ?? "",
    initialChallenge: "",
  });

  function patch(p: Partial<OnboardingData>) {
    setData((d) => ({ ...d, ...p }));
  }

  function skip() {
    try {
      localStorage.setItem(SKIP_KEY, "1");
    } catch {
      // ignore
    }
    router.replace("/dashboard");
  }

  async function finish() {
    setSubmitting(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: data.projectName,
          sector: data.sector || undefined,
          stage: data.stage || undefined,
          city: data.city || undefined,
          initialChallenge: data.initialChallenge,
        }),
      });
      try {
        localStorage.removeItem(SKIP_KEY);
      } catch {
        // ignore
      }
      await mutate();
      setDone(true);
      setTimeout(() => router.replace("/dashboard"), 1800);
    } catch {
      setSubmitting(false);
    }
  }

  // Écran de fin
  if (done) {
    return (
      <main className="min-h-screen bg-app text-ink flex items-center justify-center px-4">
        <div className="text-center">
          <span className="text-6xl block mb-4 animate-badge-pop">🎉</span>
          <h1 className="font-display text-2xl font-extrabold text-[#0A0E2A] mb-2">
            Bienvenue, {firstName}.
          </h1>
          <p className="text-[#4A5280]">Kaba est prêt à t&apos;accompagner.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-app text-ink flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Stepper (masqué sur l'écran de bienvenue) */}
        {step > 0 && (
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-[#0722AB]" : "bg-[#E8EAF0]"
                }`}
              />
            ))}
            <span className="text-xs font-bold text-[#8892C8] ml-2 shrink-0">{step}/3</span>
          </div>
        )}

        <div className="bg-white dark:bg-[#151A2E] border border-[#E8EAF0] dark:border-[#2A3050] rounded-3xl p-7 shadow-sm">
          {step === 0 && (
            <StepWelcome firstName={firstName} onStart={() => setStep(1)} onSkip={skip} />
          )}
          {step === 1 && (
            <StepProject
              projectName={data.projectName}
              sector={data.sector}
              stage={data.stage}
              onChange={patch}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <StepCity
              city={data.city}
              onSelect={(city) => patch({ city })}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepChallenge
              challenge={data.initialChallenge}
              onChange={(initialChallenge) => patch({ initialChallenge })}
              onFinish={finish}
              onBack={() => setStep(2)}
              submitting={submitting}
            />
          )}
        </div>
      </div>
    </main>
  );
}
