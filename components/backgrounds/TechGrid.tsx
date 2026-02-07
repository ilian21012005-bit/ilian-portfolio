"use client";

export function TechGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.12]"
      aria-hidden
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent 0px, transparent 49px, rgba(59, 130, 246, 0.15) 49px, rgba(59, 130, 246, 0.15) 50px),
          repeating-linear-gradient(90deg, transparent 0px, transparent 49px, rgba(59, 130, 246, 0.15) 49px, rgba(59, 130, 246, 0.15) 50px)
        `,
      }}
    />
  );
}
