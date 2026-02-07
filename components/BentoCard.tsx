"use client";

import { motion } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "special";
  className?: string;
}

export function BentoCard({ children, size = "medium", className = "" }: BentoCardProps) {
  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-1 md:row-span-2",
    large: "md:col-span-2 md:row-span-2",
    special: "md:col-span-1 md:row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass glass-hover rounded-2xl p-6 border border-white/10 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
