"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { NetworkSimulator } from "@/components/network-sim";
import Link from "next/link";
import { Cpu, Terminal } from "lucide-react";

export default function SimulateurPage() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <PageHeader
          title="Simulateur réseau"
          subtitle="Démo interactive — explore la topologie et les commandes."
        />
        {/* Bloc intro unifié, style carte */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 py-8 md:py-10"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:border-tech-blue/20 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-tech-blue/15 border border-tech-blue/25">
                  <Cpu className="w-6 h-6 text-tech-blue" />
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/10 border border-white/10">
                  <Terminal className="w-6 h-6 text-foreground/70" />
                </div>
              </div>
              <div className="space-y-3 min-w-0">
                <p className="text-foreground/85 text-base md:text-lg leading-relaxed">
                  Petit réseau simulé : <span className="text-foreground font-medium">postes (PC)</span> et{" "}
                  <span className="text-foreground font-medium">routeurs</span> reliés par des sous-réseaux.
                  Clique sur une machine pour ouvrir son terminal et taper des commandes{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-tech-blue font-mono text-sm">ip</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-tech-blue font-mono text-sm">dhclient</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-tech-blue font-mono text-sm">ping</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-tech-blue font-mono text-sm">save</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-tech-blue font-mono text-sm">reboot</code>.
                </p>
                <p className="text-foreground/55 text-sm">
                  Objectif : configurer les interfaces, obtenir une adresse ou faire du routage, puis tester la connectivité avec <code className="font-mono text-foreground/70">ping</code>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        <NetworkSimulator />
        <div className="max-w-4xl mx-auto px-6 mt-8 flex justify-center pb-12">
          <Link href="/arsenal" className="text-tech-blue hover:underline font-medium">
            Voir mes compétences systèmes & réseaux →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
