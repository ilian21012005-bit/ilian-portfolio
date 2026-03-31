"use client";

import { motion } from "framer-motion";
import { User, Wrench, FolderGit2, Cpu, GraduationCap, Heart, Mail } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { PageLayout } from "@/components/PageLayout";
import { QuickLinkCard } from "@/components/QuickLinkCard";
import { PROJECTS } from "@/lib/projects";
import { Link } from "@/lib/navigation";
import { WHY_ME } from "@/lib/whyMe";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <PageLayout>
        <HeroSection />

        {/* Liens rapides vers les pages */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-0.5 rounded-full bg-accent/60 shadow-[0_0_8px_rgb(var(--accent-rgb)/0.4)]" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-foreground"
              >
                {t("explorer")}
              </motion.h2>
              <span className="w-12 h-0.5 rounded-full bg-accent/60 shadow-[0_0_8px_rgb(var(--accent-rgb)/0.4)]" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <QuickLinkCard href="/a-propos" icon={User} title="À propos" subtitle="Qui je suis" />
              <QuickLinkCard href="/arsenal" icon={Wrench} title="Arsenal" subtitle="Compétences" />
              <QuickLinkCard href="/projets" icon={FolderGit2} title="Projets" subtitle={`${PROJECTS.length} réalisations`} />
              <QuickLinkCard href="/simulateur" icon={Cpu} title="Simulateur" subtitle="Démo réseau" />
              <QuickLinkCard
                href="/parcours"
                icon={GraduationCap}
                title="Parcours"
                subtitle="Pro & scolaire"
                className="md:col-span-2"
              />
              <QuickLinkCard href="/interets" icon={Heart} title="Intérêts" subtitle="Passions" />
              <QuickLinkCard
                href="/contact"
                icon={Mail}
                title={<span className="text-accent-tertiary font-semibold group-hover:underline block">Contact</span>}
                subtitle={<span className="text-sm text-foreground/80">Stage Avril 2026</span>}
                iconClassName="w-9 h-9 text-accent-tertiary"
                variant="violet"
                className="p-7"
              />
            </motion.div>
          </div>
        </section>

        {/* Pourquoi moi */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-0.5 rounded-full bg-accent-secondary/60 shadow-[0_0_8px_rgb(var(--accent-secondary-rgb)/0.35)]" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl font-bold text-foreground"
              >
                {t("why_me")}
              </motion.h2>
              <span className="w-12 h-0.5 rounded-full bg-accent-secondary/60 shadow-[0_0_8px_rgb(var(--accent-secondary-rgb)/0.35)]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {WHY_ME.map((item, idx) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-accent-secondary/30 hover:bg-white/[0.04] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="text-accent hover:underline font-medium">
                Discutons de ton besoin de stage →
              </Link>
            </div>
          </div>
        </section>
    </PageLayout>
  );
}
