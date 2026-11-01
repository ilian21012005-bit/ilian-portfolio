import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL, localizedAlternates } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projets",
    "/a-propos",
    "/contact",
    ...PROJECTS.map((p) => `/projets/${p.slug}`),
  ];
  return ["fr", "en"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: { languages: localizedAlternates(locale, path).languages },
    })),
  );
}
