"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { PageLayout } from "@/components/PageLayout";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export default function AProposPage() {
  const t = useTranslations("About");
  return (
    <PageLayout>
        <PageHeader title={t("title")} subtitle={t("subtitle")} />
        <SectionWrapper id="about" size="compact">
          <div className="max-w-4xl mx-auto">
            <SpotlightCard>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                {t.rich("p1", {
                  strong: (c) => <strong className="text-foreground">{c}</strong>,
                  accent: (c) => <span className="text-accent font-medium">{c}</span>,
                })}
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                {t.rich("p2", {
                  accent: (c) => <span className="text-accent font-medium">{c}</span>,
                })}
              </p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                {t.rich("p3", {
                  strong: (c) => <strong className="text-foreground">{c}</strong>,
                })}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="tech">{t("badge_fr")}</Badge>
                <Badge variant="tech">{t("badge_en")}</Badge>
                <Badge variant="success">{t("badge_location")}</Badge>
              </div>
            </SpotlightCard>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/arsenal" className="text-accent hover:underline font-medium">
                {t("link_skills")}
              </Link>
              <Link href="/contact" className="text-foreground/70 hover:text-accent transition-colors">
                {t("link_contact")}
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
    </PageLayout>
  );
}
