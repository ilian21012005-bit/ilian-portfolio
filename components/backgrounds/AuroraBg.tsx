"use client";

import { useEffect, useState } from "react";

function getCssRgb(varName: string, fallback: string): [number, number, number] {
  if (typeof window === "undefined") return fallback.split(" ").map(Number) as [number, number, number];
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
  const parts = raw.split(/\s+/).map(Number);
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

function lerpColor(c1: [number, number, number], c2: [number, number, number], t: number): string {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function AuroraBg() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [colors, setColors] = useState({ c1: "rgb(139,0,0)", c2: "rgb(220,20,60)", c3: "rgb(139,0,0)" });

  useEffect(() => {
    const computeColors = (progress: number) => {
      const accent = getCssRgb("--accent-rgb", "220 20 60");
      const secondary = getCssRgb("--accent-secondary-rgb", "139 0 0");
      const tertiary = getCssRgb("--accent-tertiary-rgb", "255 0 0");
      return {
        c1: lerpColor(secondary, tertiary, progress),
        c2: lerpColor(accent, accent, progress),
        c3: lerpColor(secondary, secondary, progress),
      };
    };

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = Math.max(0, scrollHeight - clientHeight);
      const progress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;
      setScrollProgress(progress);
      setColors(computeColors(progress));
    };

    const onThemeChange = () => {
      setColors(computeColors(scrollProgress));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden>
      <div
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[80px] opacity-60 animate-aurora-1 transition-colors duration-500"
        style={{ background: colors.c1 }}
      />
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[80px] opacity-60 animate-aurora-2 transition-colors duration-500"
        style={{ background: colors.c2 }}
      />
      <div
        className="absolute bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full blur-[80px] opacity-50 animate-aurora-3 transition-colors duration-500"
        style={{ background: colors.c3 }}
      />
    </div>
  );
}
