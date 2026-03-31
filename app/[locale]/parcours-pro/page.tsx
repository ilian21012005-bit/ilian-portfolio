"use client";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { GitTimeline } from "@/components/GitTimeline";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";

export default function ParcoursProPage() {
  const t = useTranslations("JourneyPro");
  return (
    <PageLayout>
        <PageHeader title={t("title")} subtitle={t("subtitle")} />
        <SectionWrapper id="experience" className="bg-white/[0.01]">
          <div className="max-w-3xl mx-auto">
            <GitTimeline variant="pro" />
          </div>
        </SectionWrapper>
        <div className="max-w-3xl mx-auto px-6 pb-12 flex flex-wrap gap-4 justify-center">
          <Link href="/parcours-scolaire" className="text-accent hover:underline font-medium">
            {t("link_school")}
          </Link>
          <Link href="/contact" className="text-foreground/70 hover:text-accent transition-colors">
            {t("link_contact")}
          </Link>
        </div>
    </PageLayout>
  );
}
