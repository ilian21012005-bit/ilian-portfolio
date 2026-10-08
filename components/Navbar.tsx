"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { CONTACT } from "@/lib/contact";

const navLinks = [
  { href: "/projets", key: "projects" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const switchLocale = locale === "fr" ? "en" : "fr";

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const cvHref = locale === "en" ? CONTACT.cvUrlEn : CONTACT.cvUrl;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.12] bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="px-1.5 py-1 text-sm font-medium text-foreground">
          {t("brand")}
        </Link>

        <div className="hidden items-center gap-4 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 ${isActive(link.href) ? "text-foreground" : "text-muted hover:text-foreground"}`}
            >
              {t(link.key)}
            </Link>
          ))}
          <a
            href={cvHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 text-muted hover:text-foreground"
          >
            CV
          </a>
          <Link href={pathname || "/"} locale={switchLocale} className="px-2 py-1 text-muted hover:text-foreground">
            {t("language_switch")}
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.08] bg-background px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block px-2 py-1.5 text-foreground/90">
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <a href={cvHref} target="_blank" rel="noopener noreferrer" className="block px-2 py-1.5 text-muted">
                CV
              </a>
            </li>
            <li>
              <Link href={pathname || "/"} locale={switchLocale} onClick={() => setOpen(false)} className="block px-2 py-1.5 text-muted">
                {t("language_switch")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
