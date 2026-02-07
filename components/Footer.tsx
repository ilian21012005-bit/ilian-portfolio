"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Hauteur de réserve pour que le contenu ne soit pas caché sous la capsule */
const FOOTER_HEIGHT = 80;

/** Seuil en px : afficher le footer quand on est à moins de X px du bas */
const BOTTOM_THRESHOLD = 250;

export function Footer() {
  const [ping, setPing] = useState(24);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - BOTTOM_THRESHOLD;
      setIsNearBottom(scrollBottom > threshold);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setPing((p) => Math.floor(18 + Math.random() * 22));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div style={{ height: FOOTER_HEIGHT }} aria-hidden />
      <div className="fixed bottom-5 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
        <AnimatePresence>
          {isNearBottom && (
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
          className="pointer-events-auto flex items-center gap-6 sm:gap-10 py-3 px-5 sm:px-8 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-xl shadow-black/30 hover:bg-white/[0.06] hover:border-tech-blue/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tech-blue to-tech-blue/70 border border-tech-blue/40 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              IE
            </div>
            <span className="text-xs text-foreground/60 font-medium">© 2026</span>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 border-x border-white/10 px-6 py-1 font-mono text-xs text-foreground/50">
            <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse shadow-[0_0_6px_#10B981]" />
            <span>ONLINE</span>
            <span className="text-foreground/30 mx-1">|</span>
            <span>{ping}ms</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-tech-blue transition-colors font-medium relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-tech-blue after:transition-all after:duration-300 hover:after:w-full"
            >
              GitHub
            </a>
            <span className="w-px h-4 bg-white/20" />
            <a
              href="https://www.linkedin.com/in/ilian-ebp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/70 hover:text-tech-blue transition-colors font-medium relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-px after:bg-tech-blue after:transition-all after:duration-300 hover:after:w-full"
            >
              LinkedIn
            </a>
            <span className="w-px h-4 bg-white/20" />
            <a
              href="/contact"
              className="text-sm text-accent-violet font-semibold hover:brightness-110 transition-all px-3 py-1.5 rounded-full bg-accent-violet/10 hover:bg-accent-violet/20 border border-accent-violet/20"
            >
              Contact
            </a>
          </div>
        </motion.footer>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export { FOOTER_HEIGHT };
