"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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

function KabaAvatar() {
  return (
    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-lg shrink-0">
      🤖
    </div>
  );
}

function Bubble({ msg }: { msg: { role: string; content: string } }) {
  const isKaba = msg.role === "ASSISTANT";
  return (
    <div className={`flex gap-3 ${isKaba ? "" : "flex-row-reverse"}`}>
      {isKaba && <KabaAvatar />}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm leading-relaxed ${
          isKaba
            ? "bg-surface border border-border text-foreground rounded-tl-sm"
            : "bg-primary text-white rounded-tr-sm"
        }`}
      >
        {msg.content}
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages.length, streamText]);

  const quota = data?.quota;
  const quotaExhausted = quota && !quota.isPremium && quota.remaining <= 0;

  async function send() {
    const message = input.trim();
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

  return (
    <div className="max-w-3xl flex flex-col h-[calc(100vh-4rem)]">
      {/* En-tête */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <KabaAvatar />
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Kaba — ton coach
            </h1>
            <p className="text-muted text-sm">
              Niveau {levelId} — {level?.title}
            </p>
          </div>
        </div>
        {quota && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              quota.isPremium
                ? "bg-green-light/30 text-green"
                : quota.remaining > 0
                  ? "bg-primary/10 text-primary"
                  : "bg-error/10 text-error"
            }`}
          >
            {quota.isPremium
              ? "Premium — illimité"
              : `${quota.remaining}/${quota.total} messages restants`}
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4">
        {(!data || data.messages.length === 0) && !pendingUserMsg && (
          <div className="text-center text-muted py-12">
            <span className="text-4xl block mb-3">🤖</span>
            <p>
              Pose ta première question à Kaba sur le niveau {levelId}.
              <br />
              Il connaît ton projet et ton parcours.
            </p>
          </div>
        )}
        {data?.messages.map((m) => <Bubble key={m.id} msg={m} />)}
        {pendingUserMsg && <Bubble msg={{ role: "USER", content: pendingUserMsg }} />}
        {streaming && streamText && (
          <Bubble msg={{ role: "ASSISTANT", content: streamText }} />
        )}
        {streaming && !streamText && (
          <div className="flex gap-3">
            <KabaAvatar />
            <span className="text-muted text-sm py-3 animate-pulse">
              Kaba réfléchit...
            </span>
          </div>
        )}
        {error && (
          <p className="text-error text-sm text-center bg-error/10 border border-error/30 rounded-lg px-4 py-3">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Saisie */}
      <div className="pt-4 border-t border-border">
        {quotaExhausted ? (
          <p className="text-center text-muted text-sm py-2">
            Quota épuisé pour ce plan — débloque le niveau suivant pour 3 messages
            de plus, ou passe en <span className="text-cta font-semibold">Premium</span>.
          </p>
        ) : (
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Écris à Kaba..."
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none transition-colors resize-none"
            />
            <button
              onClick={send}
              disabled={streaming || !input.trim()}
              className="px-6 py-3 rounded-xl bg-cta text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
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
