"use client";

import { motion } from "framer-motion";
import { Dumbbell, Film, Music, Gamepad2, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SectionWrapper } from "@/components/SectionWrapper";
import { LazyIframe } from "@/components/LazyIframe";
import Link from "next/link";

const INTERESTS = [
  { icon: Dumbbell, label: "Sport", href: "https://www.youtube.com/watch?v=n1BjNH_H2-8", title: "David Laid" },
  { icon: Film, label: "Cinéma", href: "", title: "" },
  { icon: Music, label: "Musique", href: "https://www.deezer.com/us/playlist/14803330743", title: "My Top 2025" },
  { icon: Gamepad2, label: "Valo, CS & RL", href: "https://rocketleague.tracker.network/rocket-league/profile/steam/76561199021621098/overview", title: "Rocket League Tracker" },
  { icon: BookOpen, label: "Manga", href: "https://www.youtube.com/watch?v=xiWjulqTquo", title: "AMV Gojo vs Sukuna" },
];

export default function InteretsPage() {
  return (
    <PageLayout>
        <PageHeader title="Centres d'intérêt" subtitle="Ce qui me passionne au quotidien." />
        <SectionWrapper id="interests" className="bg-white/[0.01]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-[800px] mx-auto mb-12"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 overflow-hidden hover:border-crimson/20 transition-colors">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-crimson" />
                  My Top 2025
                </h3>
                <LazyIframe
                  title="deezer-widget"
                  src="https://widget.deezer.com/widget/dark/playlist/14803330743"
                  height="300"
                  allow="encrypted-media; clipboard-write"
                  className="w-full rounded-xl"
                />
              </div>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {INTERESTS.map((item, i) => {
                const Wrapper = item.href ? motion.a : motion.div;
                const wrapperProps = item.href
                  ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative rounded-2xl p-6 flex flex-col items-center gap-3 border border-white/10 bg-white/[0.02] overflow-hidden ${item.href ? "cursor-pointer hover:border-crimson/40 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(220,20,60,0.08)] transition-all duration-300" : "cursor-default"}`}
                    title={item.title || undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <item.icon className="w-10 h-10 text-crimson relative z-10 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-foreground text-center relative z-10">{item.label}</span>
                  </Wrapper>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="text-crimson hover:underline font-medium">
                Contact →
              </Link>
            </div>
          </div>
        </SectionWrapper>
    </PageLayout>
  );
}
