"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Badge } from "@/components/Badge";
import { SKILLS, EXPERIENCES, loc } from "@/lib/skills";

export default function AProposPage() {
  const t = useTranslations("About");
  const locale = useLocale();

  return (
    <PageLayout>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="max-w-2xl space-y-6 text-lg leading-8 text-foreground/80">
          <p>
            {t.rich("p1", {
              strong: (c) => <strong className="font-medium text-foreground">{c}</strong>,
            })}
          </p>
          <p>
            {t.rich("p2", {
              strong: (c) => <strong className="font-medium text-foreground">{c}</strong>,
            })}
          </p>
          <p>{t("p3")}</p>
        </div>

        <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1">
          <Badge>{t("badge_fr")}</Badge>
          <Badge>{t("badge_en")}</Badge>
          <Badge>{t("badge_location")}</Badge>
        </p>

        <h2 className="mt-16 text-sm text-muted">{t("skills")}</h2>
        <ul className="mt-5 max-w-xl space-y-2 text-foreground/80">
          {SKILLS.map((skill) => (
            <li key={skill.fr}>{loc(skill, locale)}</li>
          ))}
        </ul>

        <h2 className="mt-16 text-sm text-muted">{t("experience")}</h2>
        <ul className="mt-5 max-w-2xl">
          {EXPERIENCES.map((exp) => (
            <li key={exp.org} className="border-t border-white/[0.1] py-6">
              <p className="text-sm text-muted">{loc(exp.period, locale)}</p>
              <p className="mt-1 text-foreground">{loc(exp.title, locale)}</p>
              <p className="text-muted">{exp.org}</p>
              <p className="mt-2 text-sm text-foreground/50">{loc(exp.detail, locale)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex gap-4 text-sm">
          <Link href="/projets" className="px-2 py-1 text-foreground">
            {t("link_projects")}
          </Link>
          <Link href="/contact" className="px-2 py-1 text-muted">
            {t("link_contact")}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
