"use client";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`glitch-text-root relative inline-block ${className}`} data-text={children}>
      {children}
    </span>
  );
}
