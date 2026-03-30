"use client";

import { ReactNode } from "react";
import { Footer, FOOTER_HEIGHT } from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <main className={`relative ${className}`}>
      <div
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen focus:outline-none focus:ring-2 focus:ring-crimson/50 focus:ring-offset-0"
        style={{ paddingBottom: FOOTER_HEIGHT }}
      >
        {children}
      </div>
      <Footer />
    </main>
  );
}

