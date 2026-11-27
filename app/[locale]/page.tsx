import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { PageLayout } from "@/components/PageLayout";
import { ProjectDiagram } from "@/components/ProjectDiagram";
import { CONTACT } from "@/lib/contact";
import { Link } from "@/lib/navigation";
import { presentationFor } from "@/lib/project-presentation";
import { getProject, loc, resolveProject } from "@/lib/projects";
import { localizedAlternates } from "@/lib/site";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return {
		title: {
			absolute:
				locale === "en"
					? "Ilian — Systems, networks & software"
					: "Ilian — Systèmes, réseaux & développement",
		},
		alternates: localizedAlternates(locale),
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const en = locale === "en";

	const selectedSlugs = [
		"analyse-attaques-mitre",
		"continuite-supervision",
		"lab-active-directory",
		"lab-kubernetes-minikube",
	];
	const projects = selectedSlugs.map((slug) =>
		resolveProject(getProject(slug)!, locale),
	);

	const signals = [
		{
			label: en ? "3 sites · 14 VPN checks" : "3 sites · 14 contrôles VPN",
			sub: "GNS3 · RouterOS · IPsec",
			href: "/projets/lab-gns3-data-tricks",
		},
		{
			label: "PCAP · MITRE ATT&CK · Suricata",
			sub: en ? "Traffic · Detection" : "Trafic · Détection",
			href: "/projets/analyse-attaques-mitre",
		},
		{
			label: "Prometheus · Grafana · Nagios",
			sub: en ? "RTO/RPO · PromQL · Alerts" : "RTO/RPO · PromQL · Alertes",
			href: "/projets/continuite-supervision",
		},
		{
			label: "Active Directory · GPO · DNS",
			sub: "Windows Server · LDAP",
			href: "/projets/lab-active-directory",
		},
	];

	return (
		<PageLayout>
			<div className="hero-rail page-width swiss-enter">
				<span>
					{en
						? "Paris-Saclay · IUT d’Orsay · BUT 3"
						: "Paris-Saclay · IUT d’Orsay · BUT 3"}
				</span>
				<span className="hero-rail-status">
					<span className="status-dot" aria-hidden="true" />
					{en
						? "Available for internship · 18 Jan – 14 May 2027"
						: "Disponible en stage · 18 jan. – 14 mai 2027"}
				</span>
			</div>

			<section className="intro page-width">
				<div className="intro-copy swiss-enter">
					<p className="intro-kicker">
						{en
							? "BUT 3 Computer Science · Paris-Saclay"
							: "BUT 3 Informatique · Paris-Saclay"}
					</p>
					<h1>Ilian El Bouazzaoui Prieur</h1>
					<p className="intro-lead">
						{en ? (
							<>
								Systems, networks and cybersecurity,{" "}
								<em>through hands-on practice.</em>
							</>
						) : (
							<>
								Systèmes, réseaux et cybersécurité, <em>par la pratique.</em>
							</>
						)}
					</p>
					<p>
						{en
							? "I build and test infrastructure labs, investigate network traffic and develop tools to solve practical problems."
							: "Je conçois et teste des infrastructures, j’analyse le trafic réseau et je développe des outils pour répondre à des besoins concrets."}
					</p>
					<div className="intro-actions">
						<Link href="/projets" className="button-primary">
							{en ? "Explore projects" : "Voir les projets"}
							<ArrowUpRight size={15} aria-hidden="true" />
						</Link>
						<a
							href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl}
							className="text-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							{en ? "Download résumé (PDF)" : "Consulter mon CV (PDF)"}
							<ArrowUpRight size={14} aria-hidden="true" />
						</a>
					</div>
				</div>

				<aside
					className="briefing-card swiss-enter-delay-1"
					aria-label={en ? "Briefing Internship 2027" : "Briefing Stage 2027"}
				>
					<div className="briefing-header">
						<span className="briefing-title">
							<span className="status-dot-ink" aria-hidden="true" />
							{en ? "Briefing · Internship 2027" : "Briefing · Stage 2027"}
						</span>
					</div>
					<dl className="briefing-specs">
						<div>
							<dt>{en ? "Period" : "Période"}</dt>
							<dd className="tabular-nums">
								{en ? "18 Jan – 14 May 2027" : "18 jan. – 14 mai 2027"}
							</dd>
						</div>
						<div>
							<dt>{en ? "Target" : "Cible"}</dt>
							<dd>
								{en ? "SOC · Systems · Network" : "SOC · Systèmes · Réseau"}
							</dd>
						</div>
						<div>
							<dt>{en ? "Area" : "Zone"}</dt>
							<dd>Île-de-France</dd>
						</div>
					</dl>
					<div className="briefing-actions">
						<a
							href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="briefing-link"
						>
							{en ? "Résumé (PDF)" : "CV (PDF)"}
							<ArrowUpRight size={13} aria-hidden="true" />
						</a>
						<Link href="/contact" className="briefing-link">
							Contact
							<ArrowUpRight size={13} aria-hidden="true" />
						</Link>
					</div>
				</aside>
			</section>

			<section
				className="signals-band page-width swiss-enter-delay-2"
				aria-label={
					en
						? "Verifiable technical milestones"
						: "Repères techniques vérifiables"
				}
			>
				<div className="signals-grid">
					{signals.map((signal, index) => (
						<Link key={signal.href} href={signal.href} className="signal-cell">
							<div className="signal-top">
								<span className="signal-index" aria-hidden="true">
									{String(index + 1).padStart(2, "0")}
								</span>
								<ArrowUpRight
									size={13}
									className="signal-arrow"
									aria-hidden="true"
								/>
							</div>
							<span className="signal-label">{signal.label}</span>
							<span className="signal-sub">{signal.sub}</span>
						</Link>
					))}
				</div>
			</section>

			<section className="selected-work page-width" id="selection">
				<div className="section-heading">
					<div>
						<p className="section-label">Dossier · Index</p>
						<h2>
							{en ? (
								<>
									Selected <em>projects</em>
								</>
							) : (
								<>
									Projets <em>sélectionnés</em>
								</>
							)}
						</h2>
						<p>
							{en
								? "Professional, academic and lab work."
								: "En entreprise, en formation et en laboratoire."}
						</p>
					</div>
					<Link href="/projets" className="text-link">
						{en ? "All projects (19)" : "Tous les projets (19)"}
						<ArrowUpRight size={14} aria-hidden="true" />
					</Link>
				</div>

				<article className="featured-case">
					<Link
						href="/projets/lab-gns3-data-tricks"
						className="case-image"
						tabIndex={-1}
						aria-hidden="true"
					>
						<Image
							src="/project-images/lab-gns3.png"
							alt=""
							width={1920}
							height={1080}
							sizes="(max-width: 768px) 100vw, 55vw"
							priority
						/>
					</Link>
					<div className="case-copy">
						<p className="case-context">
							Data-Tricks · {en ? "Internship, 2026" : "Stage, 2026"}
						</p>
						<h3>
							<Link href="/projets/lab-gns3-data-tricks">
								{en
									? "Connecting three sites in a GNS3 lab"
									: "Relier trois sites dans un lab GNS3"}
							</Link>
						</h3>
						<p>
							{en
								? "I modeled a multi-site network, segmented VLANs and tested IPsec tunnels between France, Tunisia and a cloud environment."
								: "J’ai modélisé un réseau multi-sites, segmenté les VLAN et testé les tunnels IPsec entre la France, la Tunisie et un environnement cloud."}
						</p>
						<p className="case-evidence">
							{en
								? "14 VPN checks completed · RouterOS · GLPI"
								: "14 contrôles VPN conformes · RouterOS · GLPI"}
						</p>
						<Link href="/projets/lab-gns3-data-tricks" className="case-link">
							{en ? "Read case study" : "Lire l’étude de cas"}
							<ArrowUpRight size={14} aria-hidden="true" />
						</Link>
					</div>
				</article>

				<div className="bento-work-grid">
					{projects.map((project, index) => {
						const info = presentationFor(project.slug);
						return (
							<article key={project.slug} className="bento-card">
								<Link
									href={`/projets/${project.slug}`}
									className="bento-visual"
									tabIndex={-1}
									aria-hidden="true"
								>
									<ProjectDiagram slug={project.slug} locale={locale} compact />
									<span className="bento-badge">
										{en ? "Diagram" : "Schéma"}
									</span>
								</Link>
								<div className="bento-body">
									<div className="bento-meta">
										<p className="case-context">{loc(info.context, locale)}</p>
										<span className="bento-num" aria-hidden="true">
											{String(index + 1).padStart(2, "0")}
										</span>
									</div>
									<h3>
										<Link href={`/projets/${project.slug}`}>
											{project.title}
										</Link>
									</h3>
									<p className="bento-outcome">{loc(info.outcome, locale)}</p>
									<div className="bento-footer">
										<p className="bento-stack">
											{project.techStack.slice(0, 3).join(" · ")}
										</p>
										<Link
											href={`/projets/${project.slug}`}
											className="bento-arrow"
											aria-label={`${project.title} — ${en ? "View dossier" : "Voir la fiche"}`}
										>
											{en ? "Dossier" : "Fiche"}
											<ArrowUpRight size={13} aria-hidden="true" />
										</Link>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</section>

			<section className="experience-strip page-width">
				<div>
					<p className="section-label">{en ? "Experience" : "Expérience"}</p>
					<h2>Data-Tricks</h2>
					<p className="experience-period">
						{en
							? "Infrastructure and security intern · May–July 2026"
							: "Stagiaire infrastructure et sécurité · Mai–juillet 2026"}
					</p>
				</div>
				<div>
					<p>
						{en
							? "A multi-site network lab, segmentation, VPN testing and a GLPI inventory environment. Configurations and procedures documented throughout the internship."
							: "Un lab réseau multi-sites, de la segmentation, des tests VPN et un environnement d’inventaire GLPI. Les configurations et procédures ont été documentées pendant le stage."}
					</p>
					<Link href="/a-propos" className="case-link case-link-light">
						{en
							? "More about my background"
							: "En savoir plus sur mon parcours"}
						<ArrowUpRight size={14} aria-hidden="true" />
					</Link>
				</div>
			</section>

			<section className="expertise page-width">
				<div className="section-heading">
					<div>
						<p className="section-label">{en ? "Scope" : "Domaine"}</p>
						<h2>
							{en ? (
								<>
									What I <em>work on</em>
								</>
							) : (
								<>
									Ce sur quoi <em>je travaille</em>
								</>
							)}
						</h2>
						<p>
							{en
								? "Skills grounded in coursework and hands-on projects."
								: "Des compétences mises en pratique en formation et en projet."}
						</p>
					</div>
				</div>
				<div className="expertise-grid">
					<div className="expertise-cell">
						<span className="expertise-num" aria-hidden="true">
							01
						</span>
						<h3>{en ? "Systems & networks" : "Systèmes et réseaux"}</h3>
						<p>
							Linux, Windows Server, Active Directory, VLAN, VPN IPsec, GNS3.
						</p>
					</div>
					<div className="expertise-cell">
						<span className="expertise-num" aria-hidden="true">
							02
						</span>
						<h3>{en ? "Security & monitoring" : "Sécurité et supervision"}</h3>
						<p>Wireshark, MITRE ATT&amp;CK, Suricata, Prometheus, Grafana.</p>
					</div>
					<div className="expertise-cell">
						<span className="expertise-num" aria-hidden="true">
							03
						</span>
						<h3>
							{en
								? "Development & automation"
								: "Développement et automatisation"}
						</h3>
						<p>Python, C#, Node.js, Git, Docker, Kubernetes.</p>
					</div>
				</div>
			</section>

			<section className="final-contact page-width">
				<div>
					<p className="section-label">
						{en ? "Internship · 2027" : "Stage · 2027"}
					</p>
					<h2>
						{en ? "Let’s talk about your team" : "Parlons de votre équipe"}
					</h2>
					<p>
						{en
							? "Looking for an internship from 18 January to 14 May 2027 (SOC, systems or network)."
							: "À la recherche d’un stage du 18 janvier au 14 mai 2027 (SOC, systèmes ou réseau)."}
					</p>
				</div>
				<Link href="/contact" className="button-ink">
					{en ? "Get in touch" : "Prendre contact"}
					<ArrowUpRight size={15} aria-hidden="true" />
				</Link>
			</section>
		</PageLayout>
	);
}
