"use client";

import { useEffect, useState } from "react";

// Couleurs en haut de page (scroll = 0)
const COLORS_TOP = {
  blob1: "#4f46e5", // indigo
  blob2: "#0ea5e9", // cyan
  blob3: "#10b981", // emerald
};

// Couleurs en bas de page (scroll = 1)
const COLORS_BOTTOM = {
  blob1: "#8b5cf6", // violet
  blob2: "#3b82f6", // tech blue
  blob3: "#14b8a6", // teal
};

function lerpColor(hex1: string, hex2: string, t: number): string {
  const parse = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r1, g1, b1] = parse(hex1);
  const [r2, g2, b2] = parse(hex2);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function AuroraBg() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const progress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const c1 = lerpColor(COLORS_TOP.blob1, COLORS_BOTTOM.blob1, scrollProgress);
  const c2 = lerpColor(COLORS_TOP.blob2, COLORS_BOTTOM.blob2, scrollProgress);
  const c3 = lerpColor(COLORS_TOP.blob3, COLORS_BOTTOM.blob3, scrollProgress);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
      {/* Blob 1 - haut gauche */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-60 animate-aurora-1 transition-colors duration-300"
        style={{ background: c1 }}
      />
      {/* Blob 2 - bas droite */}
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-60 animate-aurora-2 transition-colors duration-300"
        style={{ background: c2 }}
      />
      {/* Blob 3 - centre bas gauche */}
      <div
        className="absolute bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[80px] opacity-50 animate-aurora-3 transition-colors duration-300"
        style={{ background: c3 }}
      />
    </div>
  );
}
