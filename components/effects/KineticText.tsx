"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface KineticTextProps {
  children: ReactNode;
  className?: string;
}

export function KineticText({ children, className = "" }: KineticTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      const mouseX = e.clientX - x;
      const mouseY = e.clientY - y;
      setTransform(
        `rotateX(${mouseY * -0.04}deg) rotateY(${mouseX * 0.04}deg)`
      );
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <span
      ref={ref}
      className={`kinetic-text inline-block transition-transform duration-100 ease-out cursor-default ${className}`}
      style={{ transform }}
    >
      {children}
    </span>
  );
}
