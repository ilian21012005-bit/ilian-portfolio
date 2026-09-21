"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { FEATURED_PROJECTS, SECONDARY_PROJECTS, resolveProject } from "@/lib/projects";

export default function ProjetsPage() {
  const t = useTranslations("Projects");
  const locale = useLocale();

  return (
    <PageLayout>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-sm text-muted">{t("section_featured")}</h2>
        <div className="mt-2">
          {FEATURED_PROJECTS.map((p, i) => {
            const copy = resolveProject(p, locale);
            return (
              <ProjectCard
                key={p.slug}
                href={`/projets/${p.slug}`}
                title={copy.title}
                description={copy.description}
                techStack={copy.techStack}
                index={i}
                statusLabel={p.status === "in-progress" ? t("status_wip") : undefined}
              />
            );
          })}
        </div>

        <h2 className="mt-14 text-sm text-muted">{t("section_other")}</h2>
        <div className="mt-2">
          {SECONDARY_PROJECTS.map((p) => {
            const copy = resolveProject(p, locale);
            return (
              <ProjectCard
                key={p.slug}
                href={`/projets/${p.slug}`}
                title={copy.title}
                description={copy.description}
                techStack={copy.techStack}
              />
            );
          })}
        </div>

        <div className="mt-10">
          <Link href="/contact" className="px-2 py-1 text-sm text-muted">
            {t("link_contact")}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
