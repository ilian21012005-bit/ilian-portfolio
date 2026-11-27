import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { CONTACT } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const en = locale === "en";
	return pageMetadata(
		locale,
		"/contact",
		"Contact",
		en
			? "Contact Ilian El Bouazzaoui Prieur for a SOC, systems or network security internship (January–May 2027)."
			: "Contacter Ilian El Bouazzaoui Prieur pour un stage SOC, systèmes ou sécurité réseau (janvier–mai 2027).",
	);
}

export default async function Contact({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const en = locale === "en";
	const t = await getTranslations("Contact");
	const provider = process.env.FORMSPREE_ID ? "Formspree" : "FormSubmit";

	return (
		<PageLayout>
			<PageHeader
				locale={locale}
				kicker={en ? "Internship · Jan–May 2027" : "Stage · Janvier–mai 2027"}
				title="Contact"
				subtitle={
					en
						? "An internship opportunity, a technical question or a project to discuss? You can reach me directly by email."
						: "Une proposition de stage, une question technique ou un projet à partager ? Vous pouvez m’écrire directement."
				}
			/>
			<div className="contact-grid page-width">
				<section
					aria-label={en ? "Direct contact details" : "Coordonnées directes"}
				>
					<div className="contact-email-row">
						<a className="contact-email" href={`mailto:${CONTACT.email}`}>
							{CONTACT.email}
							<ArrowUpRight size={20} aria-hidden="true" />
						</a>
						<CopyEmailButton email={CONTACT.email} locale={locale} />
					</div>
					<dl className="contact-facts">
						<div>
							<dt>{t("avail_when")}</dt>
							<dd className="tabular-nums">{t("avail_when_value")}</dd>
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
							<dd className="tabular-nums">
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
							<ArrowUpRight size={13} aria-hidden="true" />
						</a>
						<a
							className="text-link"
							href={CONTACT.linkedinUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn
							<ArrowUpRight size={13} aria-hidden="true" />
						</a>
						<a
							className="text-link"
							href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{en ? "Résumé" : "CV"} (PDF)
							<ArrowUpRight size={13} aria-hidden="true" />
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
							: `Votre nom, votre email et votre message sont transmis via ${provider} pour me permettre de vous répondre. Vous pouvez aussi utiliser le lien email ci-contre.`}
					</p>
				</section>
			</div>
		</PageLayout>
	);
}
