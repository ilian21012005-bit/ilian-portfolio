import Image from "next/image";
import { CaseStudy } from "@/components/CaseStudy";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { PROJECTS, getProject, resolveProject, loc } from "@/lib/projects";
import { CATEGORIES, presentationFor } from "@/lib/project-presentation";
import { localizedAlternates } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const raw = getProject(slug);
  if (!raw)
    return {
      title: locale === "en" ? "Project not found" : "Projet introuvable",
    };
  const p = resolveProject(raw, locale);
  return {
    title: p.title,
    description: p.description,
    alternates: localizedAlternates(locale, `/projets/${slug}`),
    openGraph: {
      title: p.title,
      description: p.description,
      url: `/${locale}/projets/${slug}`,
      type: "website",
      siteName: "Ilian — Portfolio",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ilian — Portfolio",
        },
      ],
    },
  };
}
const Section = ({ title, items }: { title: string; items?: string[] }) =>
    items?.length ? (
      <section className="detail-section">
        <h2>{title}</h2>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    ) : null;

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const raw = getProject(slug);
  if (!raw) notFound();
  const p = resolveProject(raw, locale);
  const info = presentationFor(slug);
  const logos: Record<string, {src:string; name:string}[]> = {
    "karu": [{src:"karu.png",name:"Karu"}],
    "sites-commerces": [{src:"ik.jpg",name:"I&K"}],
  };

  const en = locale === "en";
  const t = await getTranslations("Projects");
  const next =
    PROJECTS[
      (PROJECTS.findIndex((p) => p.slug === slug) + 1) % PROJECTS.length
    ];
  return (
    <PageLayout>
      <PageHeader locale={locale} title={p.title} />
      <div className="page-width">
        <div className="detail-header">
          <div className="detail-meta">
            <span>{loc(info.context, locale)}</span>
            <span>{loc(CATEGORIES[info.category], locale)}</span>
            {p.status === "in-progress" && (
              <span className="row-status">
                {en ? "In development" : "En cours"}
              </span>
            )}
          </div>
          <div className="detail-links">
            {p.links?.repo && (
              <a
                className="text-link"
                href={p.links.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {en ? "Source code" : "Code source"}
                <ArrowUpRight size={14} />
              </a>
            )}
            {p.links?.demo && (
              <a
                className="text-link"
                href={p.links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                {en ? "Open demo" : "Ouvrir la démo"}
                <ArrowUpRight size={14} />
              </a>
            )}
            <Link href="/projets" className="text-link">
              <ArrowLeft size={13} />
              {t("btn_back")}
            </Link>
          </div>
        </div>
        {slug === "dreamshift-bureau" && (
          <figure className="mt-9">
            <Image
              src="/project-images/dreamshift-bureau.jpg"
              alt={
                en
                  ? "Workstations in the OrbisCorp office environment in Dreamshift Bureau."
                  : "Postes de travail dans l’environnement de bureaux OrbisCorp de Dreamshift Bureau."
              }
              width={1566}
              height={609}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 text-xs text-muted">
              {en
                ? "Roblox development screenshot · October 2026 · Work in progress."
                : "Capture de développement Roblox · Octobre 2026 · Projet en cours."}
            </figcaption>
          </figure>
        )}
        {logos[slug] && <div className="project-brand-images" aria-label={locale === "en" ? "Project visuals" : "Visuels du projet"}>{logos[slug].map(logo => <figure key={logo.name}><Image src={`/project-images/logos/${logo.src}`} alt={logo.name} width={180} height={100} unoptimized className="project-brand-image"/><figcaption>{logo.name}</figcaption></figure>)}</div>}
      {slug === "lab-gns3-data-tricks" && <figure className="mt-9"><Image src="/project-images/lab-gns3.png" alt={en ? "GNS3 screenshot showing the simulated France, Tunisia and cloud network topology." : "Capture GNS3 de la topologie réseau simulée reliant la France, la Tunisie et le cloud."} width={1920} height={1080} sizes="(max-width: 1200px) 100vw, 1200px" className="h-auto w-full"/><figcaption className="mt-3 text-xs text-muted">{en ? "GNS3 lab screenshot · June 2026" : "Capture du lab GNS3 · Juin 2026"}</figcaption></figure>}
      <div className="detail-grid">
          <div>
            {["lab-gns3-data-tricks", "analyse-attaques-mitre", "karu"].includes(slug) ? <CaseStudy project={p} locale={locale} /> : <>
            <p className="detail-lead">{p.description}</p>
            <Section title={t("section_highlights")} items={p.highlights} />
            <Section title={t("section_role")} items={p.roleBullets} />
            <Section title={t("section_architecture")} items={p.architectureBullets} />
            <Section title={t("section_learned")} items={p.learnedBullets} />
            </>}

          </div>
          <aside className="detail-sidebar">
            <h2>{en ? "TECHNOLOGIES" : "TECHNOLOGIES"}</h2>
            <ul>
              {p.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            {!p.links?.repo && (
              <p className="mt-6">
                {en
                  ? "Source code is not published on this portfolio."
                  : "Le code de ce projet n’est pas publié sur ce portfolio."}
              </p>
            )}
          </aside>
        </div>
        <div className="project-next">
          <Link href="/projets" className="text-link">
            <ArrowLeft size={14} />
            {t("btn_back")}
          </Link>
          <Link href={`/projets/${next.slug}`} className="text-link">
            <span>{en ? "NEXT PROJECT" : "PROJET SUIVANT"}</span>
            {loc(next.title, locale)}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
