"use client";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { GitTimeline } from "@/components/GitTimeline";
import { Link } from "@/lib/navigation";

export default function ParcoursScolairePage() {
  return (
    <PageLayout>
        <PageHeader
          title="Parcours scolaire"
          subtitle="Formation académique jusqu'au BUT 2 — git log formation/"
        />
        <SectionWrapper id="formation">
          <div className="max-w-3xl mx-auto">
            <GitTimeline variant="scolaire" />
          </div>
        </SectionWrapper>
        <div className="max-w-3xl mx-auto px-6 pb-12 flex flex-wrap gap-4 justify-center">
          <Link href="/parcours-pro" className="text-accent hover:underline font-medium">
            Parcours professionnel →
          </Link>
          <Link href="/contact" className="text-foreground/70 hover:text-accent transition-colors">
            Contact
          </Link>
        </div>
    </PageLayout>
  );
}
