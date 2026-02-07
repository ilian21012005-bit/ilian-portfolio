"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/arsenal", label: "Arsenal" },
  { href: "/projets", label: "Projets" },
  { href: "/simulateur", label: "Simulateur" },
  { href: "/parcours", label: "Parcours" },
  { href: "/interets", label: "Intérêts" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              borderColor: isHovered ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.1)",
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="h-12 rounded-full flex items-center justify-center overflow-hidden border backdrop-blur-xl shadow-xl shadow-black/30 max-w-[95vw]"
          >
            {!isHovered ? (
              <span className="text-sm font-bold text-foreground whitespace-nowrap">
                <span className="text-tech-blue">I</span>EBP
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
                    href={link.href}
                    className="text-xs font-medium text-foreground/80 hover:text-tech-blue transition-colors shrink-0"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="/CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-tech-blue hover:text-tech-blue/80"
                >
                  CV
                </a>
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
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-24 left-6 right-6 p-6 flex flex-col gap-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              {navLinks.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-foreground hover:text-tech-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <a
                href="/CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 py-3 rounded-xl bg-tech-blue text-white text-center font-medium"
              >
                Télécharger CV
              </a>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
