"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { useUser } from "@/hooks/use-user";
import { getLevelById } from "@/data/levels";

interface CoachMsg {
  id: string;
  levelId: number;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: string;
}

interface Quota {
  used: number;
  total: number;
  remaining: number;
  isPremium: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Suggestions rapides contextuelles par niveau
const SUGGESTIONS: Record<number, string[]> = {
  1: ["Comment valider mon idée ?", "Qui est ma cible ?", "Je suis bloqué sur ma proposition de valeur"],
  2: ["Comment trouver des gens à interviewer ?", "Quelles questions poser ?", "Mes interviews ne donnent rien"],
  3: ["Comment remplir mon BMC ?", "Comment fixer mes prix en FCFA ?", "Quelles sources de revenus choisir ?"],
  4: ["Quel type de MVP choisir ?", "Comment trouver mes 10 premiers utilisateurs ?", "Mon MVP ne convainc pas"],
  5: ["Comment me faire connaître sans budget ?", "Quels réseaux sociaux prioriser ?", "Comment créer du bouche-à-oreille ?"],
  6: ["SARL ou SAS en OHADA ?", "Comment obtenir mon RCCM ?", "Combien coûte la création ?"],
  7: ["Bootstrap ou lever des fonds ?", "Comment approcher un business angel ?", "Comment préparer mon pitch ?"],
  8: ["Comment réussir mon lancement ?", "Comment créer du momentum ?", "Et après le lancement, quoi ?"],
};

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-3 text-muted text-sm">
      Kaba réfléchit
      <span className="inline-flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#4D6FFF] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </span>
  );
}

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs text-muted hover:text-primary dark:hover:text-[#4D6FFF] transition-colors mt-1"
      aria-label="Copier la réponse"
    >
      {copied ? "✓ Copié" : "⧉ Copier"}
    </button>
  );
}

function KabaAvatar() {
  return (
    <div className="w-9 h-9 rounded-full bg-primary dark:bg-[#1E2A5E] border-2 border-primary dark:border-[#4D6FFF] text-white flex items-center justify-center text-lg shrink-0 font-bold select-none">
      K
    </div>
  );
}

function Bubble({
  msg,
  copyable = false,
}: {
  msg: { role: string; content: string };
  copyable?: boolean;
}) {
  const isKaba = msg.role === "ASSISTANT";
  return (
    <div className={`flex gap-3 ${isKaba ? "" : "flex-row-reverse"}`}>
      {isKaba && <KabaAvatar />}
      <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col ${isKaba ? "items-start" : "items-end"}`}>
        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
            isKaba
              ? "bg-surface border border-border text-foreground rounded-tl-sm"
              : "bg-primary dark:bg-[#2D4BCC] text-white rounded-tr-sm"
          }`}
        >
          {msg.content}
        </div>
        {isKaba && copyable && <CopyButton content={msg.content} />}
      </div>
    </div>
  );
}

function QuotaBar({ quota }: { quota: Quota }) {
  if (quota.isPremium) {
    return (
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green/10 text-green dark:text-[#4ADE80] dark:bg-[rgba(74,222,128,0.1)] border border-green/20 dark:border-[rgba(74,222,128,0.2)]">
        ✦ Premium — illimité
      </span>
    );
  }
  const pct = quota.total > 0 ? (quota.remaining / quota.total) * 100 : 0;
  const color =
    quota.remaining === 0
      ? "text-error dark:text-[#FF6B6B]"
      : quota.remaining <= 2
      ? "text-cta"
      : "text-primary dark:text-[#4D6FFF]";
  return (
    <div className="flex flex-col items-end gap-1">
      <span className={`text-sm font-medium ${color}`}>
        {quota.remaining > 0
          ? `${quota.remaining} message${quota.remaining > 1 ? "s" : ""} restant${quota.remaining > 1 ? "s" : ""}`
          : "Quota épuisé"}
      </span>
      {quota.total > 0 && (
        <div className="w-24 h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              quota.remaining === 0 ? "bg-error dark:bg-[#FF6B6B]" : quota.remaining <= 2 ? "bg-cta" : "bg-primary dark:bg-[#4D6FFF]"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

function QuotaExhaustedBanner({ levelId }: { levelId: number }) {
  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="bg-error/10 dark:bg-[rgba(255,107,107,0.08)] border border-error/30 dark:border-[rgba(255,107,107,0.25)] rounded-2xl px-5 py-4 text-center">
        <p className="font-display font-bold text-base text-foreground mb-1">Quota Kaba épuisé</p>
        <p className="text-sm text-muted mb-4">
          Tu as utilisé tes messages pour ce plan. Débloque le niveau suivant pour 3 messages de plus, ou passe en Premium pour accéder à Kaba sans limite.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/ressources"
            className="px-4 py-2.5 rounded-xl bg-surface border border-border text-foreground text-sm font-semibold hover:border-primary dark:hover:border-[#4D6FFF] transition-colors"
          >
            Voir les formations du niveau {levelId}
          </Link>
          <Link
            href="/ressources?tab=premium"
            className="px-4 py-2.5 rounded-xl bg-cta text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            ✦ Passer Premium
          </Link>
        </div>
      </div>
    </div>
  );
}

function CoachChat() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const levelId = Number(searchParams.get("niveau")) || user?.currentLevelId || 1;
  const level = getLevelById(levelId);

  const { data, mutate } = useSWR<{ messages: CoachMsg[]; quota: Quota }>(
    `/api/coach/messages?levelId=${levelId}`,
    fetcher
  );

  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [pendingUserMsg, setPendingUserMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages.length, streamText]);

  const quota = data?.quota;
  const quotaExhausted = quota && !quota.isPremium && quota.remaining <= 0;

  async function send(text?: string) {
    const message = (text ?? input).trim();
    if (!message || streaming) return;
    setInput("");
    setError(null);
    setPendingUserMsg(message);
    setStreaming(true);
    setStreamText("");

    try {
      const res = await fetch("/api/coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, levelId }),
      });

      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => null);
        setError(d?.error ?? "Kaba est indisponible pour le moment.");
        setStreaming(false);
        setPendingUserMsg(null);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        for (const evt of events) {
          const typeMatch = evt.match(/^event: (.+)$/m);
          const dataMatch = evt.match(/^data: (.+)$/m);
          if (!typeMatch || !dataMatch) continue;
          const payload = JSON.parse(dataMatch[1]);
          if (typeMatch[1] === "delta") {
            setStreamText((prev) => prev + payload.text);
          } else if (typeMatch[1] === "error") {
            setError(payload.message);
          }
        }
      }
    } catch {
      setError("Kaba est indisponible pour le moment. Réessaie dans quelques minutes.");
    } finally {
      setStreaming(false);
      setStreamText("");
      setPendingUserMsg(null);
      mutate();
    }
  }

  const firstName = user?.fullName?.split(" ")[0] ?? "";

  return (
    <div className="max-w-3xl flex flex-col h-[calc(100vh-7.5rem)] sm:h-[calc(100vh-7rem)]">
      {/* En-tête */}
      <div className="flex items-center justify-between pb-4 border-b border-border flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <KabaAvatar />
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Kaba — ton coach
            </h1>
            <p className="text-muted text-xs">
              Niveau {levelId} — {level?.title}
            </p>
          </div>
        </div>
        {quota && <QuotaBar quota={quota} />}
      </div>

      {/* Zone messages */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4">
        {/* Message de bienvenue à la 1ère ouverture */}
        {data && data.messages.length === 0 && !pendingUserMsg && (
          <Bubble
            copyable={false}
            msg={{
              role: "ASSISTANT",
              content: `Bienvenue ${firstName ? `${firstName} ` : ""}👋🏾 Je suis Kaba, ton coach.\n\nJe connais ton parcours${user?.projectName ? ` et ton projet "${user.projectName}"` : ""} — on est au niveau ${levelId} : ${level?.title}.\n\nComme on dit : si tu veux aller loin, marchons ensemble. Pose-moi ta question, ou choisis une suggestion ci-dessous.`,
            }}
          />
        )}

        {data?.messages.map((m) => (
          <Bubble key={m.id} msg={m} copyable={m.role === "ASSISTANT"} />
        ))}

        {pendingUserMsg && <Bubble msg={{ role: "USER", content: pendingUserMsg }} />}

        {streaming && streamText && (
          <Bubble msg={{ role: "ASSISTANT", content: streamText }} />
        )}
        {streaming && !streamText && (
          <div className="flex gap-3 items-center">
            <KabaAvatar />
            <ThinkingDots />
          </div>
        )}

        {error && (
          <p className="text-error dark:text-[#FF6B6B] text-sm text-center bg-error/10 dark:bg-[rgba(255,107,107,0.08)] border border-error/30 dark:border-[rgba(255,107,107,0.25)] rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Zone saisie */}
      <div className="pt-4 border-t border-border">
        {quotaExhausted ? (
          <QuotaExhaustedBanner levelId={levelId} />
        ) : (
          <>
            {/* Suggestions rapides */}
            {!streaming && (
              <div className="flex gap-2 flex-wrap mb-3">
                {(SUGGESTIONS[levelId] ?? SUGGESTIONS[1]).map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="px-3 py-1.5 rounded-full border border-primary/30 dark:border-[rgba(77,111,255,0.35)] text-primary dark:text-[#4D6FFF] text-xs sm:text-sm hover:bg-primary hover:text-white dark:hover:bg-[#4D6FFF] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Textarea + bouton */}
            <div className="flex gap-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Écris à Kaba... (Entrée pour envoyer, Maj+Entrée pour sauter une ligne)"
                disabled={streaming}
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary dark:focus:border-[#4D6FFF] focus:outline-none transition-colors resize-none overflow-hidden"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <button
                onClick={() => send()}
                disabled={streaming || !input.trim()}
                className="px-5 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
              >
                ↑
              </button>
            </div>
            <p className="text-xs text-muted/60 mt-1.5 text-center">
              Propulsé par Gemini 1.5 Flash · Powered by Google AI
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function CoachPage() {
  return (
    <Suspense fallback={<p className="text-muted">Chargement de Kaba...</p>}>
      <CoachChat />
    </Suspense>
  );
}
