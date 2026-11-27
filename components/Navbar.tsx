"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import { CONTACT } from "@/lib/contact";
import { Link, usePathname } from "@/lib/navigation";

export function Navbar() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const locale = useLocale();
	const en = locale === "en";
	const headerRef = useRef<HTMLElement>(null);
	const menuButton = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				menuButton.current?.focus();
			}
		};
		const onPointerDown = (event: PointerEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("pointerdown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("pointerdown", onPointerDown);
		};
	}, [open]);

	const links = [
		{ href: "/projets", label: en ? "Work" : "Projets" },
		{ href: "/a-propos", label: en ? "About" : "À propos" },
		{ href: "/contact", label: "Contact" },
	];

	const isActive = (href: string) =>
		pathname === href || pathname.startsWith(`${href}/`);

	const renderNavItems = () => (
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
				onClick={() => setOpen(false)}
			>
				{en ? "Résumé" : "Mon CV"}
				<ArrowUpRight size={13} aria-hidden="true" />
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
		<header ref={headerRef} className="site-header">
			<nav
				className="site-nav page-width"
				aria-label={en ? "Main navigation" : "Navigation principale"}
			>
				<Link href="/" className="brand" onClick={() => setOpen(false)}>
					<span className="brand-mark" aria-hidden="true">
						i<span className="brand-dot" />
					</span>
					<span>
						ilian<span className="brand-sep"> / portfolio</span>
					</span>
				</Link>
				<div className="desktop-nav">{renderNavItems()}</div>
				<button
					ref={menuButton}
					type="button"
					className="menu-button"
					onClick={() => setOpen((value) => !value)}
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
					{open ? (
						<X size={18} aria-hidden="true" />
					) : (
						<Menu size={18} aria-hidden="true" />
					)}
				</button>
			</nav>
			{open && (
				<div id="mobile-navigation" className="mobile-nav">
					{renderNavItems()}
				</div>
			)}
		</header>
	);
}
