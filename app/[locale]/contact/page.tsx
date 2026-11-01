import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/lib/contact";
export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const t = await getTranslations("Contact");
  const provider =
    process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID
      ? "Formspree"
      : "FormSubmit";
  return (
    <PageLayout>
      <PageHeader
        locale={locale}
        title={en ? "Let’s talk." : "Discutons-en."}
        subtitle={
          en
            ? "An internship opportunity, a technical question or a project to discuss? You can reach me directly by email."
            : "Une proposition de stage, une question technique ou un projet à partager ? Tu peux m’écrire directement."
        }
      />
      <div className="contact-grid page-width">
        <section>
          <a className="contact-email" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
            <ArrowUpRight size={22} />
          </a>
          <dl className="contact-facts">
            <div>
              <dt>{t("avail_when")}</dt>
              <dd>{t("avail_when_value")}</dd>
            </div>
            <div>
              <dt>{t("avail_what")}</dt>
              <dd>{t("avail_what_value")}</dd>
            </div>
            <div>
              <dt>{t("avail_where")}</dt>
              <dd>{t("avail_where_value")}</dd>
            </div>
            <div>
              <dt>{t("phone")}</dt>
              <dd>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="contact-socials">
            <a
              className="text-link"
              href={CONTACT.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ArrowUpRight size={13} />
            </a>
            <a
              className="text-link"
              href={CONTACT.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={13} />
            </a>
            <a
              className="text-link"
              href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {en ? "Résumé" : "CV"} (PDF)
              <ArrowUpRight size={13} />
            </a>
          </div>
        </section>
        <section className="form-panel">
          <h2>
            {en ? "Or leave a message here" : "Ou laisser un message ici"}
          </h2>
          <ContactForm />
          <p className="form-note">
            {en
              ? `Your name, email and message are sent via ${provider} so I can reply. You can also use the email link above.`
              : `Ton nom, ton email et ton message sont transmis via ${provider} pour me permettre de te répondre. Tu peux aussi utiliser le lien email ci-contre.`}
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
