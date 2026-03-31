"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isRed = theme === "red";

  return (
    <button
      onClick={() => setTheme(isRed ? "blue" : "red")}
      aria-label={isRed ? "Passer en Blue Team" : "Passer en Red Team"}
      title={isRed ? "Blue Team" : "Red Team"}
      className={`relative flex items-center gap-1.5 h-6 rounded-full px-1 border transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
        isRed
          ? "bg-accent/10 border-accent/30 w-[68px]"
          : "bg-accent/10 border-accent/30 w-[68px]"
      } ${className}`}
    >
      {/* Track labels */}
      <span
        className={`text-[9px] font-bold tracking-wide transition-all duration-300 select-none ${
          !isRed ? "text-accent" : "text-foreground/30"
        }`}
        style={{ minWidth: 20 }}
      >
        BT
      </span>

      {/* Thumb */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-[3px] h-[18px] w-[18px] rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-md"
        style={{
          background: isRed
            ? "rgb(var(--accent-rgb))"
            : "rgb(var(--accent-rgb))",
          left: isRed ? "calc(100% - 22px)" : "3px",
          boxShadow: `0 0 8px rgb(var(--accent-rgb) / 0.6)`,
        }}
      />

      <span
        className={`text-[9px] font-bold tracking-wide transition-all duration-300 select-none ml-auto ${
          isRed ? "text-accent" : "text-foreground/30"
        }`}
        style={{ minWidth: 20, textAlign: "right" }}
      >
        RT
      </span>
    </button>
  );
}
