import { ReactNode } from "react";
export function PageLayout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`relative min-h-[70vh] focus:outline-none ${className}`}
    >
      {children}
    </main>
  );
}
