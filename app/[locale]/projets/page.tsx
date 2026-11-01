import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { ProjectArchive } from "@/components/ProjectArchive";
import { PROJECTS, resolveProject } from "@/lib/projects";
export default async function ProjetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const priority = ["lab-gns3-data-tricks", "analyse-attaques-mitre", "continuite-supervision", "lab-active-directory"];
  const ordered = [...PROJECTS].sort((a, b) => { const rank = (slug: string) => { const i = priority.indexOf(slug); return i < 0 ? priority.length : i; }; return rank(a.slug) - rank(b.slug); });
  return (
    <PageLayout>
      <PageHeader
        locale={locale}
        title={en ? "Projects" : "Projets"}
        subtitle={
          en
            ? "Professional experience, coursework and personal projects. Each case explains the context, my contribution and the technical decisions."
            : "Expérience en entreprise, travaux d’études et projets personnels. Pour chaque réalisation : le contexte, ma contribution et les choix techniques."
        }
      />
      <ProjectArchive
        locale={locale}
        projects={ordered.map((p) => {
          const { slug, title, description, techStack, status } =
            resolveProject(p, locale);
          return { slug, title, description, techStack, status };
        })}
      />
    </PageLayout>
  );
}
