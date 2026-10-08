import { Link } from "@/lib/navigation";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  href: string;
  statusLabel?: string;
  index?: number;
}

export function ProjectCard({
  title,
  description,
  techStack,
  href,
  statusLabel,
  index,
}: ProjectCardProps) {
  const number = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link href={href} className="group -mx-4 block border-t border-white/[0.12] px-4 py-8 last:border-b">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {number && <span className="text-sm tabular-nums text-muted">{number}</span>}
        <h3 className="font-serif text-[1.45rem] font-normal leading-snug text-foreground">{title}</h3>
        {statusLabel && <span className="text-sm text-muted">{statusLabel}</span>}
      </div>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{description}</p>
      <p className="mt-2 text-sm text-accent">{techStack.slice(0, 3).join(" · ")}</p>
    </Link>
  );
}
