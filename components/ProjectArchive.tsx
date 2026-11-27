"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { ProjectDiagram, hasProjectDiagram } from "@/components/ProjectDiagram";
import { Link } from "@/lib/navigation";
import { loc, type ResolvedProject } from "@/lib/projects";
import {
	CATEGORIES,
	presentationFor,
	type Category,
} from "@/lib/project-presentation";

export type ArchiveProject = Pick<
	ResolvedProject,
	"slug" | "title" | "description" | "techStack" | "status"
>;

const SHOWCASE_SLUGS = [
	"lab-gns3-data-tricks",
	"analyse-attaques-mitre",
	"continuite-supervision",
	"karu",
];

export function ProjectArchive({
	projects,
	locale,
}: {
	projects: ArchiveProject[];
	locale: string;
}) {
	const [category, setCategory] = useState<Category | "all">("all");
	const [query, setQuery] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);
	const en = locale === "en";

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
				return;
			}
			const target = event.target as HTMLElement | null;
			if (
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.tagName === "SELECT" ||
					target.isContentEditable)
			) {
				return;
			}
			event.preventDefault();
			searchRef.current?.focus();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	const normalize = (value: string) =>
		value
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();

	const showcaseProjects = useMemo(
		() =>
			SHOWCASE_SLUGS.map((slug) =>
				projects.find((project) => project.slug === slug),
			).filter((p): p is ArchiveProject => Boolean(p)),
		[projects],
	);

	const showShowcase = category === "all" && query.trim() === "";

	const filtered = useMemo(
		() =>
			projects.filter(
				(project) =>
					(category === "all" ||
						presentationFor(project.slug).category === category) &&
					normalize(
						[
							project.title,
							project.description,
							...project.techStack,
							loc(CATEGORIES[presentationFor(project.slug).category], locale),
						].join(" "),
					).includes(normalize(query.trim())),
			),
		[projects, category, query, locale],
	);

	const resetFilters = () => {
		setCategory("all");
		setQuery("");
		searchRef.current?.focus();
	};

	return (
		<div className="page-width">
			{showShowcase && showcaseProjects.length > 0 && (
				<section
					className="bento-showcase"
					aria-label={en ? "Featured selection" : "Sélection phare"}
				>
					<div className="showcase-header">
						<div>
							<p className="section-label">
								{en ? "Featured · Highlights" : "Vitrine · Sélection phare"}
							</p>
							<h2>{en ? "Four flagship dossiers" : "Quatre dossiers clés"}</h2>
						</div>
					</div>
					<div className="bento-work-grid">
						{showcaseProjects.map((project, index) => {
							const info = presentationFor(project.slug);
							const isGns3 = project.slug === "lab-gns3-data-tricks";
							const isDiagram = hasProjectDiagram(project.slug);
							return (
								<article key={project.slug} className="bento-card">
									{(isGns3 || isDiagram) && (
										<Link
											href={`/projets/${project.slug}`}
											className="bento-visual"
											tabIndex={-1}
											aria-hidden="true"
										>
											{isGns3 ? (
												<>
													<Image
														src="/project-images/lab-gns3.png"
														alt=""
														width={1920}
														height={1080}
														sizes="(max-width: 768px) 100vw, 45vw"
													/>
													<span className="bento-badge">
														{en ? "Screenshot" : "Capture"}
													</span>
												</>
											) : (
												<>
													<ProjectDiagram
														slug={project.slug}
														locale={locale}
														compact
													/>
													<span className="bento-badge">
														{en ? "Diagram" : "Schéma"}
													</span>
												</>
											)}
										</Link>
									)}
									<div className="bento-body">
										<div className="bento-meta">
											<p className="case-context">
												{loc(info.context, locale)}
											</p>
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
			)}

			<div className="project-toolbar">
				<label className="search-wrap">
					<span className="sr-only">
						{en ? "Search projects" : "Rechercher un projet"}
					</span>
					<Search size={15} className="search-icon" aria-hidden="true" />
					<input
						ref={searchRef}
						type="text"
						inputMode="search"
						className="project-search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								if (query) {
									e.preventDefault();
									setQuery("");
								} else {
									e.currentTarget.blur();
								}
							}
						}}
						placeholder={
							en ? "A project, a technology…" : "Un projet, une technologie…"
						}
					/>
					{query ? (
						<button
							type="button"
							className="search-clear"
							onClick={() => {
								setQuery("");
								searchRef.current?.focus();
							}}
							aria-label={en ? "Clear search" : "Effacer la recherche"}
						>
							<X size={14} aria-hidden="true" />
						</button>
					) : (
						<kbd className="search-kbd" aria-hidden="true">
							/
						</kbd>
					)}
				</label>
				<div
					className="filter-row"
					role="group"
					aria-label={en ? "Project category" : "Catégorie de projet"}
				>
					<button
						type="button"
						className="filter-button"
						aria-pressed={category === "all"}
						onClick={() => setCategory("all")}
					>
						<span>{en ? "All" : "Tout"}</span>
						<span className="filter-count">{projects.length}</span>
					</button>
					{(Object.keys(CATEGORIES) as Category[]).map((key) => {
						const count = projects.filter(
							(p) => presentationFor(p.slug).category === key,
						).length;
						return (
							<button
								type="button"
								key={key}
								className="filter-button"
								aria-pressed={category === key}
								onClick={() => setCategory(key)}
							>
								<span>{loc(CATEGORIES[key], locale)}</span>
								<span className="filter-count">{count}</span>
							</button>
						);
					})}
				</div>
			</div>

			<p className="results-summary" role="status" aria-live="polite">
				<span className="font-mono tabular-nums">{filtered.length}</span>{" "}
				{en
					? filtered.length === 1
						? "project"
						: "projects"
					: filtered.length === 1
						? "projet"
						: "projets"}
			</p>

			<div>
				{filtered.map((project, index) => (
					<article key={project.slug} className="project-row">
						<span className="row-number" aria-hidden="true">
							{String(index + 1).padStart(2, "0")}
						</span>
						<div>
							<div className="row-context">
								<span>
									{loc(presentationFor(project.slug).context, locale)}
								</span>
								{project.status === "in-progress" && (
									<span className="row-status">
										{" / "}
										{en ? "In development" : "En cours"}
									</span>
								)}
							</div>
							<h2 className="m-0">
								<Link href={`/projets/${project.slug}`} className="row-title">
									{project.title}
								</Link>
							</h2>
							<p className="row-description">{project.description}</p>
							<p className="row-stack">{project.techStack.join(" · ")}</p>
						</div>
						<ArrowUpRight className="row-arrow" size={18} aria-hidden="true" />
					</article>
				))}
			</div>

			{!filtered.length && (
				<div className="empty-results">
					<p>
						{en
							? "No projects match these filters."
							: "Aucun projet ne correspond à ces filtres."}
					</p>
					<button
						type="button"
						className="button-secondary"
						onClick={resetFilters}
					>
						{en ? "Clear filters" : "Réinitialiser les filtres"}
					</button>
				</div>
			)}

			<div className="archive-bottom">
				<Link href="/contact" className="text-link">
					{en ? "Discuss a project" : "Échanger sur un projet"}
					<ArrowUpRight size={15} aria-hidden="true" />
				</Link>
			</div>
		</div>
	);
}
