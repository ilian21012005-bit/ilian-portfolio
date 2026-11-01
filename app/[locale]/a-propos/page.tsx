import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SKILLS, EXPERIENCES, loc } from "@/lib/skills";
import { CONTACT } from "@/lib/contact";
export default async function About({
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
        title={
          en
            ? "About me."
            : "À propos."
        }
        subtitle={
          en
            ? "Ilian El Bouazzaoui Prieur · Systems, networks & development"
            : "Ilian El Bouazzaoui Prieur · Systèmes, réseaux & développement"
        }
      />
      <section className="about-grid page-width">
        <div className="about-copy">
          <p>
            {en ? (
              <>
                I am a third-year{" "}
                <strong>Computer Science student at Paris-Saclay</strong>,
                specializing in deploying communicating and secure applications.
              </>
            ) : (
              <>
                Je suis étudiant en{" "}
                <strong>BUT 3 Informatique à Paris-Saclay</strong>, parcours
                déploiement d’applications communicantes et sécurisées.
              </>
            )}
          </p>
          <p>
            {en
              ? "I like moving between layers: understanding a network, building a Windows tool, automating a repetitive task or synchronizing a multiplayer game."
              : "J’aime passer d’une couche à l’autre : comprendre un réseau, construire un outil Windows, automatiser une tâche répétitive ou synchroniser un jeu multijoueur."}
          </p>
          <p className="!font-sans !text-sm text-muted">
            {en
              ? "My internship at Data-Tricks gave me hands-on experience in network infrastructure and security. Today I continue with labs in Active Directory, traffic analysis and monitoring, while developing my own applications."
              : "Mon stage chez Data-Tricks m’a permis de travailler sur l’infrastructure et la sécurité réseau. Je poursuis aujourd’hui avec des labs Active Directory, d’analyse de trafic et de supervision, tout en développant mes propres applications."}
          </p>
        </div>
        <aside className="about-facts">
          <span className="eyebrow">
            {en ? "A FEW DETAILS" : "QUELQUES REPÈRES"}
          </span>
          <dl>
            <div>
              <dt>{en ? "Based in" : "Localisation"}</dt>
              <dd>
                Villebon-sur-Yvette
                <br />
                Île-de-France
              </dd>
            </div>
            <div>
              <dt>{en ? "Languages" : "Langues"}</dt>
              <dd>
                {en ? "French · Native" : "Français · Langue maternelle"}
                <br />
                {en ? "English · B2" : "Anglais · B2"}
              </dd>
            </div>
            <div>
              <dt>{en ? "Outside the screen" : "Hors écran"}</dt>
              <dd>
                {en ? "Sport, cinema and music." : "Sport, cinéma et musique."}
              </dd>
            </div>
          </dl>
          <a
            href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {en ? "Read my résumé" : "Consulter mon CV"}
            <ArrowUpRight size={14} />
            <span className="sr-only"> (PDF)</span>
          </a>
        </aside>
      </section>
      <section className="about-section page-width">
        <div>
          <span className="eyebrow">{en ? "PRACTICE" : "PRATIQUE"}</span>
          <h2>{en ? "Technical skills" : "Compétences"}</h2>
        </div>
        <div>
          {SKILLS.map((skill) => (
            <p key={skill.fr} className="skill-line">
              {loc(skill, locale)}
            </p>
          ))}
          <Link href="/projets" className="text-link mt-5">
            {en ? "See them in practice" : "Les voir en pratique"}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
      <section className="about-section page-width">
        <div>
          <span className="eyebrow">
            {en ? "EXPERIENCE" : "EXPÉRIENCE"}
          </span>
          <h2>{en ? "In the field" : "Sur le terrain"}</h2>
        </div>
        <div>
          {EXPERIENCES.map((exp) => (
            <article className="experience-row" key={exp.org}>
              <span>{loc(exp.period, locale)}</span>
              <h3>{loc(exp.title, locale)}</h3>
              <p className="!text-foreground">{exp.org}</p>
              <p>{loc(exp.detail, locale)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-section page-width">
        <div>
          <span className="eyebrow">{en ? "EDUCATION" : "FORMATION"}</span>
          <h2>Paris-Saclay</h2>
        </div>
        <div>
          <article className="experience-row">
            <span>2024 — {en ? "PRESENT" : "AUJOURD’HUI"}</span>
            <h3>BUT Informatique · {en ? "Year 3" : "3e année"}</h3>
            <p>IUT d’Orsay · Université Paris-Saclay</p>
            <p>
              {en
                ? "Track B: deployment of communicating and secure applications. Networks, systems, cybersecurity, service continuity and software development."
                : "Parcours B : déploiement d’applications communicantes et sécurisées. Réseaux, systèmes, cybersécurité, continuité de service et développement."}
            </p>
          </article>
          <Link href="/contact" className="text-link mt-5">
            {en ? "Get in touch" : "Prenons contact"}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
