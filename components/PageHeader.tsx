"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      {/* Fond subtil : dégradé + lueur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
        }}
      />
      <div className="absolute top-0 right-0 w-[40%] h-full max-h-64 bg-gradient-to-bl from-tech-blue/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-px bg-gradient-to-r from-tech-blue/40 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-accent-violet transition-colors w-fit rounded-full px-4 py-2 -ml-2 hover:bg-white/[0.04] border border-transparent hover:border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
              Accueil
            </Link>
          </motion.div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="w-1.5 h-8 md:h-10 rounded-full bg-tech-blue shadow-[0_0_12px_rgba(59,130,246,0.5)] shrink-0" />
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              {title}
            </h1>
          </div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-foreground/75 text-lg md:text-xl max-w-2xl pl-5 md:pl-6 border-l-2 border-white/10 ml-0.5"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
