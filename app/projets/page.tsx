"use client";

import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { StackingCards } from "@/components/StackingCards";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";
import Link from "next/link";

export default function ProjetsPage() {
  return (
    <PageLayout>
        <PageHeader
          title="Projets"
          subtitle="Fiches détaillées : architecture, sécurité/réseaux et rôle — sélection de projets durant le BUT."
        />
        <SectionWrapper id="projects" allowSticky className="pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Sélection rapide (recruteur / stage) */}
            <div className="mb-10 px-2">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Sélection</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PROJECTS.slice(0, 3).map((p, idx) => (
                  <Link key={p.slug} href={`/projets/${p.slug}`} className="block">
                    <ProjectCard
                      title={p.title}
                      description={p.description}
                      techStack={p.techStack}
                      index={idx}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <StackingCards cards={PROJECTS} />
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="text-crimson hover:underline font-medium">
                Me contacter pour en discuter →
              </Link>
            </div>
          </div>
        </SectionWrapper>
    </PageLayout>
  );
}
