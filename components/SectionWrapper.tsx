"use client";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  withGrid?: boolean;
  /** Désactive overflow-hidden pour permettre sticky (ex: stacking cards) */
  allowSticky?: boolean;
  /** Rythme vertical : compact (py-16), default (py-24), spacious (py-32) */
  size?: "compact" | "default" | "spacious";
}

const sizeClass = {
  compact: "py-16",
  default: "py-24",
  spacious: "py-32",
};

export function SectionWrapper({
  children,
  id,
  className = "",
  withGrid = true,
  allowSticky = false,
  size = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative ${sizeClass[size]} px-6 ${allowSticky ? "overflow-visible" : "overflow-hidden"} ${className}`}
    >
      {withGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 20, 60, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 20, 60, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
