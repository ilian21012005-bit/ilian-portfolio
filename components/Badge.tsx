"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "tech" | "success" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-foreground border-white/20",
    tech: "bg-crimson/20 text-crimson border-crimson/40",
    success: "bg-dark-red/20 text-dark-red border-dark-red/40",
    outline: "bg-transparent text-foreground border-white/30",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
