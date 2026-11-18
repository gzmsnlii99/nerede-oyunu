"use client";

import { useMemo } from "react";

const COLORS = [
  "#FF6B6B",
  "#FFD93D",
  "#4ECDC4",
  "#A78BFA",
  "#34D399",
  "#F472B6",
  "#60A5FA",
  "#FB923C",
];

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.7,
        duration: 1.9 + Math.random() * 1.5,
        color: COLORS[i % COLORS.length],
        width: 7 + Math.random() * 9,
        height: 10 + Math.random() * 10,
        rotate: Math.random() * 360,
      })),
    [],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece, i) => (
        <span
          key={i}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            background: piece.color,
            width: piece.width,
            height: piece.height,
            transform: `rotate(${piece.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
