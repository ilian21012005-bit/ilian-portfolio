import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const now = new Date();

  const routes = [
    "/",
    "/a-propos",
    "/arsenal",
    "/projets",
    "/simulateur",
    "/parcours",
    "/parcours-pro",
    "/parcours-scolaire",
    "/interets",
    "/contact",
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

