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
        projects={PROJECTS.map((p) => {
          const { slug, title, description, techStack, status } =
            resolveProject(p, locale);
          return { slug, title, description, techStack, status };
        })}
      />
    </PageLayout>
  );
}
