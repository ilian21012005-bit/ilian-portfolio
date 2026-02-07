"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { KineticText } from "./effects/KineticText";
import { GlitchText } from "./effects/GlitchText";
import { DecryptText } from "./effects/DecryptText";
import { NetworkMesh } from "./backgrounds/NetworkMesh";
import { TechGrid } from "./backgrounds/TechGrid";
import { InfiniteMarquee } from "./InfiniteMarquee";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* Backgrounds */}
      <NetworkMesh />
      <TechGrid />

      {/* Scan line (tech-grid style) */}
      <div
        className="absolute left-0 top-0 w-full h-[4px] pointer-events-none z-0 scan-line-anim"
        style={{
          background: "rgba(59, 130, 246, 0.4)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
        }}
      />

      {/* Gradient orbs */}
      <div className="gradient-orb gradient-orb-blue w-[500px] h-[500px] -top-48 -right-48" />
      <div className="gradient-orb gradient-orb-green w-[400px] h-[400px] -bottom-32 -left-32" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success-green" />
          </span>
          <span className="text-sm text-foreground/80">Disponible pour stage Avril 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[1.1] tracking-tight mb-4"
        >
          <KineticText>
            <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)] hover:text-white hover:[-webkit-text-stroke-color:transparent] transition-all duration-300" style={{ textShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}>
              Building Secure
            </span>
          </KineticText>
          <br />
          <span className="text-tech-blue">
            <GlitchText>Systems</GlitchText>
          </span>
          {" "}&{" "}
          <GlitchText>Code</GlitchText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/80 mb-2 max-w-2xl mx-auto"
        >
          <DecryptText>Ilian El Bouazzaoui Prieur</DecryptText>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm md:text-base text-foreground/60 mb-10 max-w-xl mx-auto"
        >
          Étudiant BUT 2 à Paris-Saclay — motivé, polyvalent et prêt à contribuer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="/CV-ILIAN-EL-BOUAZZAOUI-PRIEUR.pdf"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Télécharger CV
          </MagneticButton>
          <MagneticButton
            href="/projets"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Voir les Projets
          </MagneticButton>
        </motion.div>
      </div>

      {/* Dégradé en bas pour fondre vers la section Explorer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[5]"
        style={{
          background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />
      {/* Bandeau défilant en bas du hero (visible dès le premier écran) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <InfiniteMarquee />
      </div>
    </section>
  );
}
