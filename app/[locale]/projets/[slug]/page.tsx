import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Badge } from "@/components/Badge";
import { PROJECTS } from "@/lib/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project", description: "Project sheet" };
  return { title: `${project.title} — Projects`, description: project.description };
}

export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations("Projects");

  const renderLink = (href: string | undefined, label: string) => {
    if (!href) return null;
    const isInternal = href.startsWith("/");
    const cls =
      "inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/30 bg-accent/10 text-accent hover:bg-accent/15 hover:border-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";
    if (isInternal) return <Link href={href} className={cls}>{label}</Link>;
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>;
  };

  const SectionList = ({ titleKey, items }: { titleKey: string; items?: string[] }) => {
    if (!items?.length) return null;
    return (
      <div className="mb-10">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">{t(titleKey as any)}</h2>
        <ul className="list-disc pl-5 text-foreground/80 space-y-2">
          {items.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </div>
    );
  };

  return (
    <PageLayout>
      <PageHeader title={project.title} subtitle={t("detail_subtitle")} />
      <SectionWrapper id="project-detail" size="compact" className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-8">
            {renderLink(project.links?.repo, t("btn_repo"))}
            {renderLink(project.links?.demo, t("btn_demo"))}
            <Link
              href="/projets"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/[0.02] text-foreground/80 hover:text-accent hover:border-accent/40 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {t("btn_back")}
            </Link>
          </div>

          <div className="glass glass-hover rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-foreground/85 text-base md:text-lg leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4">{t("section_techstack")}</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => <Badge key={tech} variant="tech">{tech}</Badge>)}
            </div>
          </div>

          <SectionList titleKey="section_highlights" items={project.highlights} />
          <SectionList titleKey="section_architecture" items={project.architectureBullets} />
          <SectionList titleKey="section_security" items={project.securityBullets} />
          <SectionList titleKey="section_role" items={project.roleBullets} />
          <SectionList titleKey="section_summary" items={project.summary30sBullets} />
          <SectionList titleKey="section_decisions" items={project.decisionsBullets} />
          <SectionList titleKey="section_tradeoffs" items={project.tradeOffsBullets} />
          <SectionList titleKey="section_checklist" items={project.interviewChecklistBullets} />
          <SectionList titleKey="section_learned" items={project.learnedBullets} />
          <SectionList titleKey="section_future" items={project.futureImprovementsBullets} />
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
