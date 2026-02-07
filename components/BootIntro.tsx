"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "> Initializing IlianOS Kernel v2.0.26...",
  "[OK] CPU 0: Intel Architecture recognized",
  "[OK] Memory: 32GB RAM allocated",
  "> Loading drivers: C++, Java, PHP...",
  "> Mounting filesystem /dev/sda1 (PROJECTS)...",
  "[INFO] Wireshark protocol analyzer: ACTIVE",
  "> Establishing secure connection (TLS 1.3)...",
  "> Authenticating user: ADMIN",
  "> Starting GUI interface...",
  "> Welcome, Ilian.",
];

const STORAGE_KEY = "ilian-portfolio-boot-seen";

export function BootIntro({ children }: { children: React.ReactNode }) {
  const [showBoot, setShowBoot] = useState<boolean | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const seen = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    setShowBoot(!seen);
  }, []);

  useEffect(() => {
    if (showBoot !== true) return;
    if (lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, "1");
        setShowBoot(false);
      }, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((l) => [...l, BOOT_LINES[lineIndex]]);
      setLineIndex((i) => i + 1);
    }, Math.random() * 180 + 70);
    return () => clearTimeout(t);
  }, [showBoot, lineIndex]);

  return (
    <>
      {children}
      <AnimatePresence>
        {showBoot === true && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-6 font-mono text-sm text-success-green overflow-hidden"
          >
            <div className="flex-1 overflow-auto space-y-0.5">
              {lines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success-green/90">
                  {line}
                </motion.div>
              ))}
            </div>
            <span className="inline-block w-2 h-4 bg-success-green animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
