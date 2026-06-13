"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`w-8 h-8 rounded-lg ${className}`} />;
  }

  const isDark = resolvedTheme === "dark";

  function cycle() {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  }

  return (
    <button
      onClick={cycle}
      aria-label={`Thème actuel : ${theme}. Changer`}
      title={theme === "system" ? "Automatique (système)" : theme === "dark" ? "Mode nuit" : "Mode jour"}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 ${className}`}
    >
      {theme === "system" ? (
        <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 text-white/60">
          <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      ) : isDark ? (
        <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 text-white/70">
          <path
            d="M15 10.5A6 6 0 018.5 3a6 6 0 100 12 6 6 0 006.5-4.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 text-white/70">
          <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.36 13.36l1.42 1.42M3.22 14.78l1.41-1.41M13.36 4.64l1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
