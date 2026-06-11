"use client";

import { useEffect } from "react";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onDone: () => void;
  duration?: number;
}

const VARIANTS: Record<ToastVariant, string> = {
  success: "bg-green text-white",
  error: "bg-error text-white",
  info: "bg-primary text-white",
};

// Toast générique — pour les toasts XP/badges gamifiés, voir
// components/gamification/XpToast.tsx.
export function Toast({ message, variant = "info", onDone, duration = 3500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <div
      className={`animate-toast fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-lg font-medium ${VARIANTS[variant]}`}
    >
      {message}
    </div>
  );
}
