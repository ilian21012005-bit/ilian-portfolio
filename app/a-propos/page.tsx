"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { PageLayout } from "@/components/PageLayout";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionWrapper } from "@/components/SectionWrapper";
import Link from "next/link";

export default function AProposPage() {
  return (
    <PageLayout>
        <PageHeader title="À propos" subtitle="Passionné par l'architecture logicielle et la cybersécurité." />
        <SectionWrapper id="about" size="compact">
          <div className="max-w-4xl mx-auto">
            <SpotlightCard>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Étudiant en <strong className="text-foreground">BUT 2 Informatique</strong> (IUT
                Paris-Saclay), parcours{" "}
                <span className="text-tech-blue font-medium">
                  Déploiement d&apos;applications communicantes et sécurisées
                </span>
                , je combine systèmes/réseaux et développement — notamment via des projets comme{" "}
                <strong className="text-foreground">ZeroStrike</strong> (multijoueur LAN) et{" "}
                <strong className="text-foreground">Guess The Like</strong> (temps réel).
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Je recherche un{" "}
                <span className="text-tech-blue font-medium">stage d&apos;avril à juillet 2026</span>{" "}
                pour renforcer mes compétences en entreprise.
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                Je suis <strong className="text-foreground">motivé</strong>,{" "}
                <strong className="text-foreground">polyvalent</strong> et désireux d&apos;acquérir
                de nouvelles expériences dans des environnements dynamiques.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="tech">Français (natif)</Badge>
                <Badge variant="tech">Anglais B2</Badge>
                <Badge variant="success">91140 Villebon-Sur-Yvette</Badge>
              </div>
            </SpotlightCard>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/arsenal"
                className="text-tech-blue hover:underline font-medium"
              >
                Voir mes compétences →
              </Link>
              <Link
                href="/contact"
                className="text-foreground/70 hover:text-tech-blue transition-colors"
              >
                Contact
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
    </PageLayout>
  );
}
