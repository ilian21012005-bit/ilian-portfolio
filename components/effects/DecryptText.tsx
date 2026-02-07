"use client";

import { useCallback, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

interface DecryptTextProps {
  children: string;
  className?: string;
}

export function DecryptText({ children, className = "" }: DecryptTextProps) {
  const [display, setDisplay] = useState(children);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    const target = children;
    intervalRef.current = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((_, i) =>
            i < iteration ? target[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      if (iteration >= target.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      iteration += 1 / 2;
    }, 25);
  }, [children]);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`cursor-pointer inline-block hover:text-tech-blue transition-colors ${className}`}
    >
      {display}
    </span>
  );
}
