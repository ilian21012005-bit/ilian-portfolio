"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Link } from "@/lib/navigation";
import { Cpu, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

const NetworkSimulator = dynamic(
  () => import("@/components/network-sim").then((m) => m.NetworkSimulator),
  {
    ssr: false,
    loading: () => (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 animate-pulse">
          <div className="h-10 w-3/4 rounded bg-white/10 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 aspect-[16/10] min-h-[260px] rounded-xl bg-white/5" />
            <div className="h-[360px] rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function SimulateurPage() {
  const t = useTranslations("Simulator");
  return (
    <PageLayout>
        <PageHeader title={t("title")} subtitle={t("subtitle")} />
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-6 py-8 md:py-10"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:border-accent/20 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/15 border border-accent/25">
                  <Cpu className="w-6 h-6 text-accent" />
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-foreground/10 border border-white/10">
                  <Terminal className="w-6 h-6 text-foreground/70" />
                </div>
              </div>
              <div className="space-y-3 min-w-0">
                <p className="text-foreground/85 text-base md:text-lg leading-relaxed">
                  {t.rich("desc_main", {
                    b: (c) => <span className="text-foreground font-medium">{c}</span>,
                  })}{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-accent font-mono text-sm">ip</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-accent font-mono text-sm">dhclient</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-accent font-mono text-sm">ping</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-accent font-mono text-sm">save</code>,{" "}
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-accent font-mono text-sm">reboot</code>.
                </p>
                <p className="text-foreground/55 text-sm">{t("desc_goal")}</p>
              </div>
            </div>
          </div>
        </motion.section>
        <NetworkSimulator />
        <div className="max-w-4xl mx-auto px-6 mt-8 flex justify-center pb-12">
          <Link href="/arsenal" className="text-accent hover:underline font-medium">
            {t("link_skills")}
          </Link>
        </div>
    </PageLayout>
  );
}
