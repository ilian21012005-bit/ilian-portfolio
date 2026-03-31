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
import { Link } from "@/lib/navigation";
import { SKILLS_CATEGORIES } from "@/lib/skills";
import { useTranslations } from "next-intl";

const ARSENAL_CARD_WRAPPER_CLASS =
  "rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.24)] overflow-hidden h-full flex hover:border-white/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300";

type Accent = "accent" | "accent-secondary";
type SkillsKey = keyof typeof SKILLS_CATEGORIES;

const ARSENAL_CARDS: Array<{
  titleKey: string;
  descKey: string;
  Icon: LucideIcon;
  accent: Accent;
  tagsKey: SkillsKey;
  colSpan?: number;
}> = [
  { titleKey: "card_sysnet_title", descKey: "card_sysnet_desc", Icon: Server, accent: "accent", tagsKey: "systemsNetworks", colSpan: 2 },
  { titleKey: "card_db_title", descKey: "card_db_desc", Icon: Database, accent: "accent-secondary", tagsKey: "databases" },
  { titleKey: "card_dev_title", descKey: "card_dev_desc", Icon: Code2, accent: "accent", tagsKey: "development" },
  { titleKey: "card_quality_title", descKey: "card_quality_desc", Icon: Users, accent: "accent-secondary", tagsKey: "qualitiesProjects" },
  { titleKey: "card_cyber_title", descKey: "card_cyber_desc", Icon: Shield, accent: "accent", tagsKey: "cybersecurity" },
];

export default function ArsenalPage() {
  const t = useTranslations("Arsenal");
  return (
    <PageLayout>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <SectionWrapper id="skills" className="bg-white/[0.01]" withGrid={false} size="compact">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARSENAL_CARDS.map(({ titleKey, descKey, Icon, accent, tagsKey, colSpan }) => (
              <div
                key={tagsKey}
                className={`${ARSENAL_CARD_WRAPPER_CLASS} ${colSpan === 2 ? "md:col-span-2" : ""}`}
              >
                <span
                  className={`w-1 shrink-0 ${accent === "accent" ? "bg-accent/60" : "bg-accent-secondary/60"} rounded-l-2xl`}
                  aria-hidden
                />
                <TiltCard3d className="flex-1 min-w-0">
                  <SpotlightCard className="[&>div:last-child]:p-6 [&>div]:border-0 [&>div]:shadow-none h-full">
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-xl w-fit shrink-0 ${accent === "accent" ? "bg-accent/20" : "bg-accent-secondary/20"}`}>
                        <Icon className={`w-7 h-7 ${accent === "accent" ? "text-accent" : "text-accent-secondary"}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{t(titleKey as any)}</h3>
                        <p className="text-foreground/80 text-sm mb-3">{t(descKey as any)}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {SKILLS_CATEGORIES[tagsKey].map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded text-xs bg-white/10 text-foreground/80">{s}</span>
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
            <Link href="/projets" className="text-accent hover:underline font-medium">{t("link_projects")}</Link>
            <Link href="/contact" className="text-foreground/80 hover:text-accent transition-colors">{t("link_contact")}</Link>
          </motion.div>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
