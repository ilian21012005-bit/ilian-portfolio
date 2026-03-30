"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { CONTACT } from "@/lib/contact";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/a-propos", key: "about" },
  { href: "/arsenal", key: "skills" },
  { href: "/projets", key: "projects" },
  { href: "/simulateur", key: "simulator" },
  { href: "/parcours", key: "journey" },
  { href: "/interets", key: "interests" },
  { href: "/contact", key: "contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const locale = useLocale();

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const switchLocale = locale === 'fr' ? 'en' : 'fr';
  const switchPath = pathname.replace(`/${locale}`, `/${switchLocale}`) || `/${switchLocale}`;

  const isActive = (href: string) => {
    if (href === "/") return pathname === `/${locale}`;
    return pathname?.startsWith(`/${locale}${href}`);
  };

  return (
    <>
      {/* Nav Island - Desktop */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none"
      >
        <nav
          className="pointer-events-auto hidden md:flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              width: isHovered ? 680 : 140,
              backgroundColor: isHovered ? "rgba(5, 5, 5, 0.9)" : "rgba(255, 255, 255, 0.06)",
              borderColor: isHovered ? "rgba(220, 20, 60, 0.3)" : "rgba(255, 255, 255, 0.1)",
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="h-12 rounded-full flex items-center justify-center overflow-hidden border backdrop-blur-xl shadow-xl shadow-black/30 max-w-[95vw]"
          >
            {!isHovered ? (
              <span className="text-sm font-bold text-foreground whitespace-nowrap">
                <span className="text-crimson">I</span>Menu
              </span>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 px-5 whitespace-nowrap"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={localizedHref(link.href)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`text-xs font-medium transition-colors shrink-0 ${
                      isActive(link.href)
                        ? "text-crimson"
                        : "text-foreground/80 hover:text-crimson"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <a
                  href={CONTACT.cvUrl || "/cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-crimson hover:text-crimson/80"
                >
                  CV
                </a>
                <div className="w-px h-4 bg-white/20 mx-1" />
                <Link
                  href={switchPath}
                  className="text-xs font-bold text-foreground hover:text-crimson transition-colors"
                >
                  {t("language_switch")}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </nav>

        {/* Mobile: bouton flottant */}
        <div className="md:hidden absolute top-5 right-5 pointer-events-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-foreground"
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.ul
              id="mobile-menu"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-24 left-6 right-6 p-6 flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              {navLinks.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    href={localizedHref(link.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block py-3 transition-colors ${
                      isActive(link.href) ? "text-crimson" : "text-foreground hover:text-crimson"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.li>
              ))}
              <a
                href={CONTACT.cvUrl || "/cv.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 py-3 rounded-xl bg-crimson text-white text-center font-medium"
              >
                CV
              </a>
              <Link
                href={switchPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 py-3 rounded-xl border border-white/20 text-center font-bold hover:border-crimson hover:text-crimson transition-colors"
              >
                {t("language_switch")}
              </Link>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
