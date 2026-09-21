"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PageLayout } from "@/components/PageLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { FEATURED_PROJECTS, resolveProject } from "@/lib/projects";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <PageLayout flush>
      <section className="px-6 pt-28 pb-16 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-muted">{t("name")}</p>
          <h1 className="mt-5 max-w-3xl font-serif text-hero font-normal text-foreground">{t("line1")}</h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-muted">{t("lineFacts")}</p>
          <p className="mt-3 max-w-xl text-lg leading-7 text-foreground/80">{t("line2")}</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted">{t("availability")}</p>
          <div className="mt-10 flex gap-8 text-sm">
            <Link href="/projets" className="px-2 py-1 text-foreground">
              {t("projects")}
            </Link>
            <Link href="/contact" className="px-2 py-1 text-muted">
              {t("contact")}
            </Link>
          </div>
        </div>
      </section>

      <section id="selection" className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm text-muted">{t("featured")}</h2>
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
        </div>
      </section>
    </PageLayout>
  );
}
