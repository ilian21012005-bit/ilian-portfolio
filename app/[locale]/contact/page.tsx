"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/lib/contact";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <PageLayout>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <dl className="max-w-xl space-y-3 border-t border-white/[0.12] pt-6 text-base leading-7">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="w-24 shrink-0 text-muted">{t("avail_when")}</dt>
            <dd className="text-foreground">{t("avail_when_value")}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="w-24 shrink-0 text-muted">{t("avail_what")}</dt>
            <dd className="text-foreground">{t("avail_what_value")}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="w-24 shrink-0 text-muted">{t("avail_where")}</dt>
            <dd className="text-foreground">{t("avail_where_value")}</dd>
          </div>
        </dl>
      </section>
      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 md:grid-cols-[minmax(0,28rem)_1fr] md:gap-16">
        <div>
          <h2 className="text-sm text-muted">{t("form_heading")}</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
        <div className="max-w-sm space-y-3 text-foreground/80 md:pt-8">
          {CONTACT.email && (
            <p>
              <span className="text-muted">{t("email")} · </span>
              <a href={`mailto:${CONTACT.email}`} className="px-1.5 py-0.5">
                {CONTACT.email}
              </a>
            </p>
          )}
          {CONTACT.phone && (
            <p>
              <span className="text-muted">{t("phone")} · </span>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="px-1.5 py-0.5">
                {CONTACT.phone}
              </a>
            </p>
          )}
          {CONTACT.linkedinUrl && (
            <p>
              <a href={CONTACT.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5">
                LinkedIn
              </a>
            </p>
          )}
          {CONTACT.githubUrl && (
            <p>
              <a href={CONTACT.githubUrl} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5">
                GitHub
              </a>
            </p>
          )}
          {CONTACT.cvUrl && (
            <p>
              <a href={CONTACT.cvUrl} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5">
                {t("cv_fr")}
              </a>
            </p>
          )}
          {CONTACT.cvUrlEn && (
            <p>
              <a href={CONTACT.cvUrlEn} target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5">
                {t("cv_en")}
              </a>
            </p>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
