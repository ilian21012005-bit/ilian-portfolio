export function SectionWrapper({
  children,
  id,
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
  size?: "compact" | "default" | "spacious";
  withGrid?: boolean;
  allowSticky?: boolean;
}) {
  const sizeClass = {
    compact: "py-16",
    default: "py-24",
    spacious: "py-32",
  };

  return (
    <section id={id} className={`relative ${sizeClass[size]} px-6 ${className}`}>
      {children}
    </section>
  );
}
