import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseStudy } from "@/components/CaseStudy";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { ProjectDiagram, hasProjectDiagram } from "@/components/ProjectDiagram";
import { Link } from "@/lib/navigation";
import { CATEGORIES, presentationFor } from "@/lib/project-presentation";
import { PROJECTS, getProject, loc, resolveProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

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
	if (!raw) {
		return {
			title: locale === "en" ? "Project not found" : "Projet introuvable",
		};
	}
	const p = resolveProject(raw, locale);
	return pageMetadata(locale, `/projets/${slug}`, p.title, p.description);
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
	const logos: Record<
		string,
		{ src: string; name: string; width: number; height: number }[]
	> = {
		karu: [{ src: "karu.png", name: "Karu", width: 256, height: 256 }],
		"sites-commerces": [
			{ src: "ik.jpg", name: "I&K", width: 1024, height: 1024 },
		],
	};

	const en = locale === "en";
	const t = await getTranslations("Projects");
	const next =
		PROJECTS[
			(PROJECTS.findIndex((item) => item.slug === slug) + 1) % PROJECTS.length
		];

	return (
		<PageLayout>
			<PageHeader
				locale={locale}
				kicker={loc(CATEGORIES[info.category], locale)}
				title={p.title}
			/>
			<div className="page-width">
				<div className="detail-layout">
					<aside className="detail-rail">
						<p className="rail-eyebrow">
							{en ? "Technical dossier" : "Dossier technique"}
						</p>
						<dl className="rail-meta">
							<div>
								<dt>{en ? "Context" : "Contexte"}</dt>
								<dd>{loc(info.context, locale)}</dd>
							</div>
							<div>
								<dt>{en ? "Category" : "Catégorie"}</dt>
								<dd>{loc(CATEGORIES[info.category], locale)}</dd>
							</div>
							{p.status === "in-progress" && (
								<div>
									<dt>{en ? "Status" : "Statut"}</dt>
									<dd>{en ? "In development" : "En cours"}</dd>
								</div>
							)}
						</dl>

						<div className="rail-block">
							<h2>{en ? "Technologies" : "Technologies"}</h2>
							<ul className="rail-tech-list">
								{p.techStack.map((tech) => (
									<li key={tech}>{tech}</li>
								))}
							</ul>
						</div>

						<div className="rail-block rail-links">
							{p.links?.repo && (
								<a
									className="text-link"
									href={p.links.repo}
									target="_blank"
									rel="noopener noreferrer"
								>
									{en ? "Source code" : "Code source"}
									<ArrowUpRight size={14} aria-hidden="true" />
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
									<ArrowUpRight size={14} aria-hidden="true" />
								</a>
							)}
							{!p.links?.repo && (
								<p className="rail-note">
									{en
										? "Source code is not published on this portfolio."
										: "Le code de ce projet n’est pas publié sur ce portfolio."}
								</p>
							)}
							<Link href="/projets" className="text-link">
								<ArrowLeft size={13} aria-hidden="true" />
								{t("btn_back")}
							</Link>
						</div>
					</aside>

					<div className="detail-main">
						{slug === "dreamshift-bureau" && (
							<figure className="detail-figure">
								<Image
									src="/project-images/dreamshift-bureau.jpg"
									alt={
										en
											? "Workstations in the OrbisCorp office environment in Dreamshift Bureau."
											: "Postes de travail dans l’environnement de bureaux OrbisCorp de Dreamshift Bureau."
									}
									width={1566}
									height={609}
									sizes="(max-width: 900px) 100vw, 820px"
									className="h-auto w-full"
									priority
								/>
								<figcaption>
									{en
										? "Roblox development screenshot · October 2026 · Work in progress."
										: "Capture de développement Roblox · Octobre 2026 · Projet en cours."}
								</figcaption>
							</figure>
						)}

						{slug === "lab-gns3-data-tricks" && (
							<figure className="detail-figure">
								<Image
									src="/project-images/lab-gns3.png"
									alt={
										en
											? "GNS3 screenshot showing the simulated France, Tunisia and cloud network topology."
											: "Capture GNS3 de la topologie réseau simulée reliant la France, la Tunisie et le cloud."
									}
									width={1920}
									height={1080}
									sizes="(max-width: 900px) 100vw, 820px"
									className="h-auto w-full"
									priority
								/>
								<figcaption>
									{en
										? "GNS3 lab screenshot · June 2026"
										: "Capture du lab GNS3 · Juin 2026"}
								</figcaption>
							</figure>
						)}

						{hasProjectDiagram(slug) && (
							<ProjectDiagram slug={slug} locale={locale} />
						)}

						{logos[slug] && (
							<div
								className="project-brand-images"
								aria-label={en ? "Project visuals" : "Visuels du projet"}
							>
								{logos[slug].map((logo) => (
									<figure key={logo.name}>
										<Image
											src={`/project-images/logos/${logo.src}`}
											alt=""
											width={logo.width}
											height={logo.height}
											sizes="96px"
											className="project-brand-image"
										/>
										<figcaption>{logo.name}</figcaption>
									</figure>
								))}
							</div>
						)}

						{[
							"lab-gns3-data-tricks",
							"analyse-attaques-mitre",
							"karu",
						].includes(slug) ? (
							<CaseStudy project={p} locale={locale} />
						) : (
							<>
								<p className="detail-lead">{p.description}</p>
								<Section title={t("section_highlights")} items={p.highlights} />
								<Section title={t("section_role")} items={p.roleBullets} />
								<Section
									title={t("section_architecture")}
									items={p.architectureBullets}
								/>
								<Section
									title={t("section_learned")}
									items={p.learnedBullets}
								/>
							</>
						)}
					</div>
				</div>

				<div className="project-next">
					<Link href="/projets" className="text-link">
						<ArrowLeft size={14} aria-hidden="true" />
						{t("btn_back")}
					</Link>
					<Link href={`/projets/${next.slug}`} className="text-link">
						<span className="next-label">
							{en ? "Next project" : "Projet suivant"}
						</span>
						{loc(next.title, locale)}
						<ArrowRight size={15} aria-hidden="true" />
					</Link>
				</div>
			</div>
		</PageLayout>
	);
}
