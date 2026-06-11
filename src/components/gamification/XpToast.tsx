"use client";

import { useEffect } from "react";

export interface ToastData {
  id: number;
  type: "xp" | "badge";
  xp?: number;
  badgeName?: string;
  badgeIcon?: string;
}

interface XpToastProps {
  toast: ToastData;
  onDone: (id: number) => void;
}

// Toast "+150 XP" ou "Badge débloqué" — apparaît puis disparaît après 3,5s.
export function XpToast({ toast, onDone }: XpToastProps) {
  useEffect(() => {
    const t = setTimeout(() => onDone(toast.id), 3600);
    return () => clearTimeout(t);
  }, [toast.id, onDone]);

  if (toast.type === "xp") {
    return (
      <div className="animate-toast pointer-events-none flex items-center gap-2 px-5 py-3 rounded-2xl bg-green text-white font-display font-bold text-lg shadow-lg">
        ⚡ +{toast.xp} XP
      </div>
    );
  }

  return (
    <div className="animate-toast pointer-events-none flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary text-white shadow-lg">
      <span className="animate-badge-pop text-3xl">{toast.badgeIcon}</span>
      <span>
        <span className="block text-xs opacity-80">Badge débloqué !</span>
        <span className="font-display font-bold">{toast.badgeName}</span>
      </span>
    </div>
  );
}

// Conteneur fixe en bas à droite pour empiler les toasts.
export function ToastStack({
  toasts,
  onDone,
}: {
  toasts: ToastData[];
  onDone: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {toasts.map((t) => (
        <XpToast key={t.id} toast={t} onDone={onDone} />
      ))}
    </div>
  );
}
