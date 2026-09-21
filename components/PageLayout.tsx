import { ReactNode } from "react";
import { Footer } from "@/components/Footer";

export function PageLayout({
  children,
  className = "",
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <main className={`relative z-10 ${className}`}>
      <div
        id="main-content"
        tabIndex={-1}
        className={`relative min-h-screen focus:outline-none ${flush ? "" : "pt-24"}`}
      >
        {children}
      </div>
      <Footer />
    </main>
  );
}
