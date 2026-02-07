"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: "blue" | "green";
  center?: boolean;
  compact?: boolean;
  tight?: boolean;
}

export function SectionHeader({ title, subtitle, accent = "blue", center = false, compact = false, tight = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${compact ? "mb-6" : tight ? "mb-6" : "mb-12"} ${center ? "text-center" : ""}`}
    >
      <div className={`flex items-center gap-3 ${tight ? "mb-2" : "mb-3"} ${center ? "justify-center" : ""}`}>
        <span
          className={`w-12 h-0.5 shrink-0 rounded-full ${accent === "blue" ? "bg-tech-blue shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-success-green shadow-[0_0_8px_rgba(16,185,129,0.4)]"}`}
        />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className={`text-foreground/75 max-w-2xl ${center ? "mx-auto" : ""}`} style={center ? {} : { paddingLeft: "3.5rem" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
