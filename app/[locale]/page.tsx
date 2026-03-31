"use client";

import { motion } from "framer-motion";
import { User, Wrench, FolderGit2, Cpu, GraduationCap, Heart, Mail } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { PageLayout } from "@/components/PageLayout";
import { QuickLinkCard } from "@/components/QuickLinkCard";
import { PROJECTS } from "@/lib/projects";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

const WHY_ME_KEYS = [
  { titleKey: "whyme_0_title", descKey: "whyme_0_desc" },
  { titleKey: "whyme_1_title", descKey: "whyme_1_desc" },
  { titleKey: "whyme_2_title", descKey: "whyme_2_desc" },
];

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
              <QuickLinkCard href="/a-propos" icon={User} title={t("links_about")} subtitle={t("links_about_sub")} />
              <QuickLinkCard href="/arsenal" icon={Wrench} title={t("links_skills")} subtitle={t("links_skills_sub")} />
              <QuickLinkCard href="/projets" icon={FolderGit2} title="Projets" subtitle={`${PROJECTS.length} ${t("links_projects_sub")}`} />
              <QuickLinkCard href="/simulateur" icon={Cpu} title={t("links_simulator")} subtitle={t("links_simulator_sub")} />
              <QuickLinkCard
                href="/parcours"
                icon={GraduationCap}
                title={t("links_journey")}
                subtitle={t("links_journey_sub")}
                className="md:col-span-2"
              />
              <QuickLinkCard href="/interets" icon={Heart} title={t("links_interests")} subtitle={t("links_interests_sub")} />
              <QuickLinkCard
                href="/contact"
                icon={Mail}
                title={<span className="text-accent-tertiary font-semibold group-hover:underline block">{t("links_contact")}</span>}
                subtitle={<span className="text-sm text-foreground/80">{t("links_contact_sub")}</span>}
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
              {WHY_ME_KEYS.map((item, idx) => (
                <motion.article
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-accent-secondary/30 hover:bg-white/[0.04] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(item.titleKey as any)}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {t(item.descKey as any)}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="text-accent hover:underline font-medium">
                {t("contact_link")}
              </Link>
            </div>
          </div>
        </section>
    </PageLayout>
  );
}
