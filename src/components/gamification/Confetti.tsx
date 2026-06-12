"use client";

import { useEffect, useMemo, useState } from "react";

const COLORS = ["#0722AB", "#1A6B00", "#AEFF94", "#F77E2D"];

// Pluie de confettis (niveau complété). Se retire seule après 3,5s.
export function Confetti({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 1.5,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
      })),
    []
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 3800);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div aria-hidden className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-20px] animate-confetti"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
