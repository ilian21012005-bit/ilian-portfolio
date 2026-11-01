"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { CONTACT } from "@/lib/contact";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const en = locale === "en";
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const links = [
    { href: "/projets", label: en ? "Work" : "Projets" },
    { href: "/a-propos", label: en ? "About" : "À propos" },
    { href: "/contact", label: "Contact" },
  ];
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const navItems = (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="nav-link"
          aria-current={isActive(link.href) ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <a
        className="nav-cv"
        href={en ? CONTACT.cvUrlEn : CONTACT.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {en ? "Résumé" : "Mon CV"}
        <ArrowUpRight size={13} />
        <span className="sr-only"> (PDF)</span>
      </a>
      <Link
        href={pathname || "/"}
        locale={en ? "fr" : "en"}
        hrefLang={en ? "fr" : "en"}
        className="nav-link language-link"
        aria-label={en ? "Lire en français" : "Read in English"}
        onClick={() => setOpen(false)}
      >
        {en ? "FR" : "EN"}
      </Link>
    </>
  );
  return (
    <header className="site-header">
      <nav
        className="site-nav page-width"
        aria-label={en ? "Main navigation" : "Navigation principale"}
      >
        <Link
          href="/"
          className="brand"
        >
          <span className="brand-mark" aria-hidden="true">
            i.
          </span>
          <span>
            ilian<span className="text-muted"> / portfolio</span>
          </span>
        </Link>
        <div className="desktop-nav">{navItems}</div>
        <button
          ref={menuButton}
          type="button"
          className="menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-label={
            open
              ? en
                ? "Close menu"
                : "Fermer le menu"
              : en
                ? "Open menu"
                : "Ouvrir le menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      <div
        id="mobile-navigation"
        className="mobile-nav md:hidden"
        hidden={!open}
      >
        {navItems}
      </div>
    </header>
  );
}
