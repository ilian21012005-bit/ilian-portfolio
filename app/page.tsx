"use client";

import { motion } from "framer-motion";
import { User, Wrench, FolderGit2, Cpu, GraduationCap, Heart, Mail } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";

const cardClass =
  "rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-tech-blue/30 hover:bg-white/[0.04] transition-all duration-300 text-center group flex flex-col items-center gap-3 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]";

export default function Home() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <HeroSection />

        {/* Liens rapides vers les pages */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-0.5 rounded-full bg-tech-blue/60 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-foreground"
              >
                Explorer
              </motion.h2>
              <span className="w-12 h-0.5 rounded-full bg-tech-blue/60 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <Link href="/a-propos" className={cardClass}>
                <User className="w-8 h-8 text-tech-blue/90 group-hover:text-tech-blue" />
                <span className="text-tech-blue font-medium group-hover:underline block">À propos</span>
                <span className="text-sm text-foreground/70">Qui je suis</span>
              </Link>
              <Link href="/arsenal" className={cardClass}>
                <Wrench className="w-8 h-8 text-tech-blue/90 group-hover:text-tech-blue" />
                <span className="text-tech-blue font-medium group-hover:underline block">Arsenal</span>
                <span className="text-sm text-foreground/70">Compétences</span>
              </Link>
              <Link href="/projets" className={cardClass}>
                <FolderGit2 className="w-8 h-8 text-tech-blue/90 group-hover:text-tech-blue" />
                <span className="text-tech-blue font-medium group-hover:underline block">Projets</span>
                <span className="text-sm text-foreground/70">{PROJECTS.length} réalisations</span>
              </Link>
              <Link href="/simulateur" className={cardClass}>
                <Cpu className="w-8 h-8 text-tech-blue/90 group-hover:text-tech-blue" />
                <span className="text-tech-blue font-medium group-hover:underline block">Simulateur</span>
                <span className="text-sm text-foreground/70">Démo réseau</span>
              </Link>
              <Link href="/parcours" className={`${cardClass} md:col-span-2`}>
                <GraduationCap className="w-8 h-8 text-tech-blue/90 group-hover:text-tech-blue" />
                <span className="text-tech-blue font-medium group-hover:underline block">Parcours</span>
                <span className="text-sm text-foreground/70">Pro & scolaire</span>
              </Link>
              <Link href="/interets" className={cardClass}>
                <Heart className="w-8 h-8 text-tech-blue/90 group-hover:text-tech-blue" />
                <span className="text-tech-blue font-medium group-hover:underline block">Intérêts</span>
                <span className="text-sm text-foreground/70">Passions</span>
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl p-7 border-2 border-accent-violet/40 bg-accent-violet/10 hover:bg-accent-violet/20 hover:border-accent-violet/60 transition-all duration-300 text-center group flex flex-col items-center gap-3 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(139,92,246,0.15)]"
              >
                <Mail className="w-9 h-9 text-accent-violet" />
                <span className="text-accent-violet font-semibold group-hover:underline block">Contact</span>
                <span className="text-sm text-foreground/80">Stage Avril 2026</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
