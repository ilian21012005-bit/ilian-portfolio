"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  index?: number;
  isLast?: boolean;
  /** "formation" = vert, "experience" = bleu */
  variant?: "formation" | "experience";
}

const variantClasses = {
  formation: {
    line: "from-success-green/40",
    iconBorder: "border-success-green/50",
    iconBg: "bg-success-green",
    iconGlow: "bg-success-green",
    gradient: "from-success-green/60 to-success-green/10",
    borderHover: "group-hover:border-success-green/40",
    shadow: "shadow-success-green/15",
    shadowHover: "group-hover:shadow-success-green/25",
    badge: "bg-success-green/15 text-success-green border-success-green/30",
    subtitle: "text-success-green",
  },
  experience: {
    line: "from-tech-blue/40",
    iconBorder: "border-tech-blue/50",
    iconBg: "bg-tech-blue",
    iconGlow: "bg-tech-blue",
    gradient: "from-tech-blue/60 to-tech-blue/10",
    borderHover: "group-hover:border-tech-blue/40",
    shadow: "shadow-tech-blue/15",
    shadowHover: "group-hover:shadow-tech-blue/25",
    badge: "bg-tech-blue/15 text-tech-blue border-tech-blue/30",
    subtitle: "text-tech-blue",
  },
};

export function TimelineItem({
  title,
  subtitle,
  period,
  description,
  index = 0,
  isLast = false,
  variant = "experience",
}: TimelineItemProps) {
  const c = variantClasses[variant];
  const Icon = variant === "formation" ? GraduationCap : Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 pl-6 sm:pl-8"
    >
      {/* Ligne verticale */}
      {!isLast && (
        <div className={`absolute left-[15px] sm:left-[19px] top-14 bottom-0 w-px bg-gradient-to-b ${c.line} to-transparent`} />
      )}

      {/* Point + icône */}
      <div className="absolute left-0 top-5 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 ${c.iconBorder} flex items-center justify-center shadow-lg backdrop-blur-sm ${variant === "formation" ? "bg-success-green" : "bg-tech-blue"}`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#050505]" strokeWidth={2.5} />
          <div className={`absolute inset-0 rounded-xl ${c.iconGlow} opacity-30 blur-md -z-10`} />
        </motion.div>
      </div>

      {/* Carte */}
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={`group flex-1 pb-10 sm:pb-12 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent transition-all duration-300 ${c.borderHover} shadow-xl ${c.shadow} ${c.shadowHover}`}
      >
        {/* Bande latérale accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${c.gradient}`} />

        <div className="pl-5 pr-5 pt-5 pb-4 sm:pl-6 sm:pr-6 sm:pt-6">
          {/* Badge période */}
          <span className={`inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold tracking-wider border ${c.badge}`}>
            {period}
          </span>

          {/* Titre */}
          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-3 tracking-tight">
            {title}
          </h3>

          {/* Sous-titre (lieu / rôle) */}
          <p className={`text-sm font-medium ${c.subtitle} mt-1`}>
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
