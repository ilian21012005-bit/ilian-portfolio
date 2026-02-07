"use client";

import { PageHeader } from "@/components/PageHeader";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { SectionWrapper } from "@/components/SectionWrapper";
import { GitTimeline } from "@/components/GitTimeline";
import Link from "next/link";

export default function ParcoursProPage() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <PageHeader
          title="Parcours professionnel"
          subtitle="Boulanger, Toyota France Financement, stage de découverte — git log work/"
        />
        <SectionWrapper id="experience" className="bg-white/[0.01]">
          <div className="max-w-3xl mx-auto">
            <GitTimeline variant="pro" />
          </div>
        </SectionWrapper>
        <div className="max-w-3xl mx-auto px-6 pb-12 flex flex-wrap gap-4 justify-center">
          <Link href="/parcours-scolaire" className="text-tech-blue hover:underline font-medium">
            Parcours scolaire →
          </Link>
          <Link href="/contact" className="text-foreground/70 hover:text-tech-blue transition-colors">
            Contact
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
