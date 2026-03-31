"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Briefcase, GraduationCap } from "lucide-react";
import { QuickLinkCard } from "@/components/QuickLinkCard";

export default function ParcoursPage() {
  return (
    <PageLayout>
        <PageHeader title="Parcours" subtitle="Pro & formation." />
        <SectionWrapper id="parcours">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <QuickLinkCard
                href="/parcours-pro"
                icon={Briefcase}
                title={<span className="text-foreground font-semibold">Parcours professionnel</span>}
                subtitle="Expériences travail, stages"
                iconClassName="w-10 h-10 text-accent"
                variant="default"
                className="p-8"
              />
              <QuickLinkCard
                href="/parcours-scolaire"
                icon={GraduationCap}
                title={<span className="text-foreground font-semibold">Parcours scolaire</span>}
                subtitle="Formation académique"
                iconClassName="w-10 h-10 text-accent-secondary"
                variant="success"
                className="p-8"
              />
            </motion.div>
          </div>
        </SectionWrapper>
    </PageLayout>
  );
}
