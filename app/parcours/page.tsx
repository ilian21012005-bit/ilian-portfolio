"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { SectionWrapper } from "@/components/SectionWrapper";
import Link from "next/link";
import { Briefcase, GraduationCap } from "lucide-react";

export default function ParcoursPage() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <PageHeader title="Parcours" subtitle="Pro & formation." />
        <SectionWrapper id="parcours">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Link
                href="/parcours-pro"
                className="group rounded-2xl p-8 border border-white/10 bg-white/[0.02] hover:border-tech-blue/30 hover:bg-white/[0.04] transition-all flex flex-col items-center gap-4 text-center"
              >
                <div className="p-4 rounded-2xl bg-tech-blue/20 group-hover:bg-tech-blue/30 transition-colors">
                  <Briefcase className="w-10 h-10 text-tech-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Parcours professionnel</h2>
                  <p className="text-sm text-foreground/60">Expériences travail, stages</p>
                </div>
              </Link>
              <Link
                href="/parcours-scolaire"
                className="group rounded-2xl p-8 border border-white/10 bg-white/[0.02] hover:border-success-green/30 hover:bg-white/[0.04] transition-all flex flex-col items-center gap-4 text-center"
              >
                <div className="p-4 rounded-2xl bg-success-green/20 group-hover:bg-success-green/30 transition-colors">
                  <GraduationCap className="w-10 h-10 text-success-green" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">Parcours scolaire</h2>
                  <p className="text-sm text-foreground/60">Formation académique</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
      <Footer />
    </main>
  );
}
