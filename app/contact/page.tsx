"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { ContactCLI } from "@/components/ContactCLI";

export default function ContactPage() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <PageHeader title="Contact" subtitle="Disponible pour un stage Avril — Juillet 2026." />
        <footer className="relative py-24 px-6 border-t border-white/10 overflow-hidden bg-gradient-to-b from-transparent to-tech-blue/[0.02]">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent 0px, transparent 39px, rgba(59, 130, 246, 0.5) 39px, rgba(59, 130, 246, 0.5) 40px),
                repeating-linear-gradient(90deg, transparent 0px, transparent 39px, rgba(59, 130, 246, 0.5) 39px, rgba(59, 130, 246, 0.5) 40px)
              `,
            }}
          />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-success-green/40 bg-success-green/10 shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-2.5 w-2.5" title="Disponible pour Avril 2026">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-green" />
                </span>
                <span className="text-sm text-success-green font-medium">Disponible pour stage Avril 2026</span>
              </div>
            </motion.div>
            <ContactCLI />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-foreground/50 mt-8"
            >
              Stage recherché : Avril — Juillet 2026 • Systèmes, Réseaux ou Développement
            </motion.p>
          </div>
        </footer>
      </div>
      <Footer />
    </main>
  );
}
