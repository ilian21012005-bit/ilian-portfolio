"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface Card {
  title: string;
  description: string;
  techStack: string[];
}

interface StackingCardsProps {
  cards: Card[];
}

export function StackingCards({ cards }: StackingCardsProps) {
  const cardsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-2xl mx-auto pt-6 pb-8 px-4">
      <button
        type="button"
        onClick={scrollToProjects}
        className="h-[12vh] min-h-[80px] w-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-100 opacity-70 transition-opacity group"
        aria-label="Défiler vers les projets"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-tech-blue/50 group-hover:to-tech-blue transition-colors" />
        <p className="text-foreground/40 text-sm font-mono tracking-widest group-hover:text-tech-blue/70 transition-colors">SCROLL TO EXPLORE</p>
      </button>
      <div ref={cardsRef} className="space-y-12 pb-8">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="sticky-card"
            style={{ top: 100 + i * 20 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-tech-blue/30 via-transparent to-success-green/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-background/80 rounded-2xl" />
              <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-tech-blue/30 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                  <span className="text-2xl font-bold text-tech-blue/40 font-mono tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-tech-blue/20 text-tech-blue border border-tech-blue/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="h-[12vh] min-h-[80px] flex flex-col items-center justify-center gap-2">
        <p className="text-foreground/40 text-sm font-mono tracking-widest">END OF PROJECTS</p>
        <div className="w-px h-8 bg-gradient-to-b from-tech-blue/50 to-transparent" />
      </div>
    </div>
  );
}
