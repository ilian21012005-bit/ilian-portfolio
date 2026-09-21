"use client";

import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/contact";
import { Link } from "@/lib/navigation";

const V1_URL =
  process.env.NEXT_PUBLIC_V1_URL || "https://github.com/ilian21012005-bit/ilian-portfolio/tree/v1";

export function Footer() {
  const t = useTranslations("Navigation");

  return (
    <footer className="border-t border-white/[0.1] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Ilian El Bouazzaoui Prieur</p>
        <div className="flex flex-wrap items-center gap-3">
          {CONTACT.githubUrl && (
            <a href={CONTACT.githubUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1">
              GitHub
            </a>
          )}
          {CONTACT.linkedinUrl && (
            <a href={CONTACT.linkedinUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1">
              LinkedIn
            </a>
          )}
          <Link href="/contact" className="px-2 py-1">
            {t("contact")}
          </Link>
          <a href={V1_URL} target="_blank" rel="noopener noreferrer" className="px-2 py-1">
            {t("previous_version")}
          </a>
        </div>
      </div>
    </footer>
  );
}
