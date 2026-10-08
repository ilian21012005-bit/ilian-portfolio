import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { PROJECTS, getProject, resolveProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projet" };
  const copy = resolveProject(project, locale);
  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function ProjetDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const raw = getProject(slug);
  if (!raw) notFound();
  const project = resolveProject(raw, locale);

  const t = await getTranslations("Projects");

  const linkClass = "px-2 py-1 text-sm text-muted";

  const SectionList = ({ title, items }: { title: string; items?: string[] }) => {
    if (!items?.length) return null;
    return (
      <div className="mb-16">
        <h2 className="text-sm font-medium text-accent">{title}</h2>
        <ul className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-muted">
          {items.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <PageLayout>
      <PageHeader
        title={project.title}
        subtitle={project.status === "in-progress" ? t("status_wip") : t("detail_subtitle")}
      />
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-12 flex flex-wrap gap-8">
          {project.links?.repo && (
            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t("btn_repo")}
            </a>
          )}
          {project.links?.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t("btn_demo")}
            </a>
          )}
          <Link href="/projets" className={linkClass}>
            {t("btn_back")}
          </Link>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-foreground/80">{project.description}</p>

        <div className="mt-10 mb-16 flex flex-wrap gap-x-5 gap-y-2">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <SectionList title={t("section_highlights")} items={project.highlights} />
        <SectionList title={t("section_architecture")} items={project.architectureBullets} />
        <SectionList title={t("section_role")} items={project.roleBullets} />
        <SectionList title={t("section_learned")} items={project.learnedBullets} />
      </section>
    </PageLayout>
  );
}
