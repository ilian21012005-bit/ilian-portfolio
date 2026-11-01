"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
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

export function ProjectArchive({
  projects,
  locale,
}: {
  projects: ArchiveProject[];
  locale: string;
}) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const en = locale === "en";
  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
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
  return (
    <div className="page-width">
      <div className="project-toolbar">
        <label className="relative block max-w-[420px]">
          <span className="sr-only">
            {en ? "Search projects" : "Rechercher un projet"}
          </span>
          <input
            type="search"
            className="project-search pr-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              en ? "A project, a technology…" : "Un projet, une technologie…"
            }
          />
          <Search
            size={16}
            className="absolute right-4 top-4 text-muted"
            aria-hidden="true"
          />
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
            {en ? "All" : "Tout"} ({projects.length})
          </button>
          {(Object.keys(CATEGORIES) as Category[]).map((key) => (
            <button
              type="button"
              key={key}
              className="filter-button"
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              {loc(CATEGORIES[key], locale)} (
              {
                projects.filter((p) => presentationFor(p.slug).category === key)
                  .length
              }
              )
            </button>
          ))}
        </div>
      </div>
      <p className="results-summary" role="status" aria-live="polite">
        {filtered.length}{" "}
        {en
          ? filtered.length === 1
            ? "project"
            : "projects"
          : filtered.length === 1
            ? "projet"
            : "projets"}
      </p>
      <div>
        {filtered.map((project) => (
          <article key={project.slug} className="project-row">
            <div>
              <div className="row-context">
                {loc(presentationFor(project.slug).context, locale)}{" "}
                {project.status === "in-progress" && (
                  <span className="row-status">
                    {" "}
                    / {en ? "In development" : "En cours"}
                  </span>
                )}
              </div>
              <h2 className="m-0">
                <Link href={`/projets/${project.slug}`} className="row-title">
                  {project.title}
                </Link>
              </h2>
              <p className="row-description">{project.description}</p>
              <p className="row-stack">{project.techStack.join(" / ")}</p>
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
            className="text-link"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
          >
            {en ? "Clear filters" : "Réinitialiser les filtres"} ↗
          </button>
        </div>
      )}
      <div className="archive-bottom">
        <Link href="/contact" className="text-link">
          {en ? "Discuss a project" : "Échanger sur un projet"}
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
