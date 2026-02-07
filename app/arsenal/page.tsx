"use client";

import { motion } from "framer-motion";
import {
  Server,
  Code2,
  Users,
  Shield,
  Database,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionWrapper } from "@/components/SectionWrapper";
import { TiltCard3d } from "@/components/TiltCard3d";
import Link from "next/link";

export default function ArsenalPage() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <PageHeader title="Arsenal" subtitle="Compétences techniques et domaines de maîtrise." />
        <SectionWrapper id="skills" className="bg-white/[0.01]" withGrid={false} size="compact">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Cadre commun : bordure, ombre, accent gauche */}
              <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                <span className="w-1 shrink-0 bg-tech-blue/60 rounded-l-2xl" aria-hidden />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-tech-blue/20 w-fit shrink-0">
                        <Server className="w-7 h-7 text-tech-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Systèmes & Réseaux</h3>
                      <p className="text-foreground/80 text-sm mb-3">
                        Architecture des ordinateurs et des réseaux, administration Linux/Windows, programmation système. Virtualisation, services réseaux, routage, VLAN, pare-feu. Analyse Wireshark, simulation Marionnet, réseaux avancés.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Linux", "Windows", "Virtualisation", "Docker", "Routage", "VLAN", "Wireshark", "Marionnet", "Programmation système", "SSH", "iptables"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard3d>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                <span className="w-1 shrink-0 bg-success-green/60 rounded-l-2xl" aria-hidden />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-success-green/20 w-fit shrink-0">
                        <Database className="w-7 h-7 text-success-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Base de données</h3>
                      <p className="text-foreground/80 text-sm mb-3">
                        Modélisation relationnelle, SQL, exploitation et création de BDD. Intégration SQL dans un langage de programmation (requêtes, scripts).
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["MySQL", "PostgreSQL", "SQL", "Modélisation", "UML", "Requêtes", "Exploitation BDD"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard3d>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                <span className="w-1 shrink-0 bg-tech-blue/60 rounded-l-2xl" aria-hidden />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-tech-blue/20 w-fit shrink-0">
                        <Code2 className="w-7 h-7 text-tech-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Développement</h3>
                      <p className="text-foreground/80 text-sm mb-3">
                        Programmation orientée objet, IHM, qualité de développement. Développement web, conception et architecture logicielle, analyse. En BUT : compléments web sémantique, développement Android, automates et langages.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Java", "PHP", "JavaScript", "C", "C++", "Python", "POO", "MVC", "IHM", "API REST", "Android", "Architecture logicielle"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard3d>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                <span className="w-1 shrink-0 bg-success-green/60 rounded-l-2xl" aria-hidden />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-success-green/20 w-fit shrink-0">
                        <Users className="w-7 h-7 text-success-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Qualités & Projet</h3>
                      <p className="text-foreground/80 text-sm mb-3">
                        Gestion de projet et des organisations, management des SI. Communication professionnelle, PPP, droit des contrats et du numérique. Travail d&apos;équipe, rigueur, autonomie.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Gestion de projet", "Communication", "Travail d'équipe", "PPP", "Droit du numérique"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard3d>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                <span className="w-1 shrink-0 bg-tech-blue/60 rounded-l-2xl" aria-hidden />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-tech-blue/20 w-fit shrink-0">
                        <Shield className="w-7 h-7 text-tech-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Cybersécurité</h3>
                      <p className="text-foreground/80 text-sm mb-3">
                        Cryptographie et sécurité, sécurité système et réseau (BUT 2). Pare-feu, sécurisation des services, bonnes pratiques.
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Cryptographie", "Sécurité réseau", "Sécurité système", "Pare-feu", "Bonnes pratiques"].map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard3d>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/projets" className="text-tech-blue hover:underline font-medium">
                Voir les projets →
              </Link>
              <Link href="/contact" className="text-foreground/80 hover:text-tech-blue transition-colors">
                Contact
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
      <Footer />
    </main>
  );
}
