"use client";

import { PageHeader } from "@/components/PageHeader";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";
import { SectionWrapper } from "@/components/SectionWrapper";
import { StackingCards } from "@/components/StackingCards";
import { PROJECTS } from "@/lib/data";
import Link from "next/link";

export default function ProjetsPage() {
  return (
    <main className="relative">
      <div className="relative min-h-screen" style={{ paddingBottom: FOOTER_HEIGHT }}>
        <PageHeader title="Projets" subtitle="Projets techniques réalisés durant le BUT." />
        <SectionWrapper id="projects" allowSticky className="pb-8">
          <div className="max-w-6xl mx-auto">
            <StackingCards cards={PROJECTS} />
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="text-tech-blue hover:underline font-medium">
                Me contacter pour en discuter →
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </div>
      <Footer />
    </main>
  );
}
