"use client";

import { motion } from "framer-motion";
import {
  Server,
  Code2,
  Users,
  Shield,
  Database,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionWrapper } from "@/components/SectionWrapper";
import { TiltCard3d } from "@/components/TiltCard3d";
import Link from "next/link";
import { SKILLS_CATEGORIES } from "@/lib/skills";

/** Classe commune des cartes Arsenal (évite duplication, priorité 6). */
const ARSENAL_CARD_WRAPPER_CLASS =
  "rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300";

type Accent = "crimson" | "dark-red";
type SkillsKey = keyof typeof SKILLS_CATEGORIES;

const ARSENAL_CARDS: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: Accent;
  tagsKey: SkillsKey;
  colSpan?: number;
}> = [
  {
    title: "Systèmes & Réseaux",
    description:
      "Architecture des ordinateurs et des réseaux, administration Linux/Windows, programmation système. Virtualisation, services réseaux, routage, VLAN, pare-feu. Analyse Wireshark, simulation Marionnet, réseaux avancés.",
    Icon: Server,
    accent: "crimson",
    tagsKey: "systemsNetworks",
    colSpan: 2,
  },
  {
    title: "Base de données",
    description:
      "Modélisation relationnelle, SQL, exploitation et création de BDD. Intégration SQL dans un langage de programmation (requêtes, scripts).",
    Icon: Database,
    accent: "dark-red",
    tagsKey: "databases",
  },
  {
    title: "Développement",
    description:
      "Programmation orientée objet, IHM, qualité de développement. Développement web, conception et architecture logicielle, analyse. En BUT : compléments web sémantique, développement Android, automates et langages.",
    Icon: Code2,
    accent: "crimson",
    tagsKey: "development",
  },
  {
    title: "Qualités & Projet",
    description:
      "Gestion de projet et des organisations, management des SI. Communication professionnelle, PPP, droit des contrats et du numérique. Travail d'équipe, rigueur, autonomie.",
    Icon: Users,
    accent: "dark-red",
    tagsKey: "qualitiesProjects",
  },
  {
    title: "Cybersécurité",
    description:
      "Cryptographie et sécurité, sécurité système et réseau (BUT 2). Pare-feu, sécurisation des services, bonnes pratiques.",
    Icon: Shield,
    accent: "crimson",
    tagsKey: "cybersecurity",
  },
];

export default function ArsenalPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Arsenal"
        subtitle="Compétences techniques et domaines de maîtrise."
      />
      <SectionWrapper
        id="skills"
        className="bg-white/[0.01]"
        withGrid={false}
        size="compact"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARSENAL_CARDS.map(({ title, description, Icon, accent, tagsKey, colSpan }) => (
              <div
                key={tagsKey}
                className={`${ARSENAL_CARD_WRAPPER_CLASS} ${colSpan === 2 ? "md:col-span-2" : ""}`}
              >
                <span
                  className={`w-1 shrink-0 ${accent === "crimson" ? "bg-crimson/60" : "bg-dark-red/60"} rounded-l-2xl`}
                  aria-hidden
                />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 rounded-xl w-fit shrink-0 ${accent === "crimson" ? "bg-crimson/20" : "bg-dark-red/20"}`}
                      >
                        <Icon
                          className={`w-7 h-7 ${accent === "crimson" ? "text-crimson" : "text-dark-red"}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {title}
                        </h3>
                        <p className="text-foreground/80 text-sm mb-3">
                          {description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {SKILLS_CATEGORIES[tagsKey].map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard3d>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/projets"
              className="text-crimson hover:underline font-medium"
            >
              Voir les projets →
            </Link>
            <Link
              href="/contact"
              className="text-foreground/80 hover:text-crimson transition-colors"
            >
              Contact
            </Link>
          </motion.div>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
