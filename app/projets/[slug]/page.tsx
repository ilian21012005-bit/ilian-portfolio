import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/Badge";
import { PROJECTS } from "@/lib/projects";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Projet",
      description: "Fiche projet",
    };
  }

  return {
    title: `${project.title} — Projets`,
    description: project.description,
  };
}

export default function ProjetDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) notFound();

  const renderLink = (href: string | undefined, label: string) => {
    if (!href) return null;
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link
          href={href}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-tech-blue/30 bg-tech-blue/10 text-tech-blue hover:bg-tech-blue/15 hover:border-tech-blue/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue/60"
        >
          {label}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-tech-blue/30 bg-tech-blue/10 text-tech-blue hover:bg-tech-blue/15 hover:border-tech-blue/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue/60"
      >
        {label}
      </a>
    );
  };

  return (
    <PageLayout>
      <PageHeader
        title={project.title}
        subtitle="Fiche détaillée : architecture, sécurité/réseaux, et rôle dans le projet."
      />

      <SectionWrapper id="project-detail" size="compact" className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-8">
            {renderLink(project.links?.repo, "Repo")}
            {renderLink(project.links?.demo, "Demo")}

            <Link
              href="/projets"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/[0.02] text-foreground/80 hover:text-tech-blue hover:border-tech-blue/40 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tech-blue/60"
            >
              Retour aux projets
            </Link>
          </div>

          <div className="glass glass-hover rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-foreground/85 text-base md:text-lg leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {project.highlights?.length ? (
            <div className="mb-10">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Highlights</h2>
              <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                {project.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.architectureBullets?.length ? (
            <div className="mb-10">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Architecture</h2>
              <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                {project.architectureBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.securityBullets?.length ? (
            <div className="mb-10">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">
                Sécurité & réseaux (by design)
              </h2>
              <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                {project.securityBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.roleBullets?.length ? (
            <div className="mb-10">
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">Rôle & apports</h2>
              <ul className="list-disc pl-5 text-foreground/80 space-y-2">
                {project.roleBullets.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}

