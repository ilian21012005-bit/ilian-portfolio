"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Card {
  title: string;
  slug?: string;
  description: string;
  techStack: string[];
  links?: {
    repo?: string;
    demo?: string;
  };
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
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-crimson/50 group-hover:to-crimson transition-colors" />
        <p className="text-foreground/40 text-sm font-mono tracking-widest group-hover:text-crimson/70 transition-colors">SCROLL TO EXPLORE</p>
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
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-crimson/30 via-transparent to-dark-red/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-background/80 rounded-2xl" />
              <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-crimson/30 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(220,20,60,0.1)]">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                  <span className="text-2xl font-bold text-crimson/40 font-mono tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                {(card.links?.repo || card.links?.demo || card.slug) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.links?.repo && (
                      card.links.repo.startsWith("/") ? (
                        <Link
                          href={card.links.repo}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/[0.02] text-foreground/80 hover:text-crimson hover:border-crimson/40 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/60"
                        >
                          Repo
                        </Link>
                      ) : (
                        <a
                          href={card.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/[0.02] text-foreground/80 hover:text-crimson hover:border-crimson/40 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/60"
                        >
                          Repo
                        </a>
                      )
                    )}
                    {card.links?.demo && (
                      card.links.demo.startsWith("/") ? (
                        <Link
                          href={card.links.demo}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-crimson/30 bg-crimson/10 text-crimson hover:bg-crimson/15 hover:border-crimson/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/60"
                        >
                          Demo
                        </Link>
                      ) : (
                        <a
                          href={card.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-crimson/30 bg-crimson/10 text-crimson hover:bg-crimson/15 hover:border-crimson/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/60"
                        >
                          Demo
                        </a>
                      )
                    )}
                    {card.slug && (
                      <Link
                        href={`/projets/${card.slug}`}
                        className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold border border-white/15 bg-white/[0.02] text-foreground/80 hover:text-crimson hover:border-crimson/40 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/60"
                      >
                        Détails
                      </Link>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {card.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-crimson/20 text-crimson border border-crimson/30"
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
        <div className="w-px h-8 bg-gradient-to-b from-crimson/50 to-transparent" />
      </div>
    </div>
  );
}
