"use client";

import type { ButtonHTMLAttributes } from "react";

type Variant = "cta" | "primary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  loadingText?: string;
  full?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  cta: "bg-cta text-white font-bold hover:opacity-90",
  primary: "bg-primary text-white font-semibold hover:opacity-90",
  outline:
    "border border-primary text-primary font-semibold hover:bg-primary hover:text-white",
  ghost: "border border-border text-muted hover:text-foreground",
  danger: "border border-border text-muted hover:border-error hover:text-error",
};

export function Button({
  variant = "cta",
  loading = false,
  loadingText,
  full = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${
        VARIANTS[variant]
      } ${full ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
        />
      )}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
