"use client";

import { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type QuickLinkVariant = "default" | "primary" | "success" | "violet";

const variantStyles: Record<QuickLinkVariant, string> = {
  default:
    "border border-white/10 bg-white/[0.02] hover:border-crimson/30 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:scale-[1.02]",
  primary:
    "border border-crimson/25 bg-crimson/[0.06] hover:border-crimson/50 hover:bg-crimson/[0.10] hover:shadow-[0_10px_34px_rgba(220,20,60,0.14)] hover:scale-[1.03]",
  success:
    "border border-dark-red/25 bg-dark-red/[0.06] hover:border-dark-red/50 hover:bg-dark-red/[0.10] hover:shadow-[0_10px_34px_rgba(139,0,0,0.14)] hover:scale-[1.03]",
  violet:
    "border-2 border-blood-red/40 bg-blood-red/10 hover:bg-blood-red/20 hover:border-blood-red/60 hover:shadow-[0_12px_40px_rgba(255,0,0,0.15)] hover:scale-[1.03]",
};

const baseClass =
  "rounded-2xl p-6 transition-all duration-300 text-center group flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson/60 focus-visible:ring-offset-0";

interface QuickLinkCardProps {
  href: string;
  title: ReactNode;
  subtitle: ReactNode;
  icon: LucideIcon;
  iconClassName?: string;
  variant?: QuickLinkVariant;
  className?: string;
  /** Utilisé si la carte est un lien vers une ressource externe. */
  external?: boolean;
}

export function QuickLinkCard({
  href,
  title,
  subtitle,
  icon: Icon,
  iconClassName = "w-8 h-8 text-crimson/90 group-hover:text-crimson",
  variant = "default",
  className = "",
  external = false,
}: QuickLinkCardProps) {
  const content = (
    <>
      <Icon className={iconClassName} aria-hidden />
      <span className="text-crimson font-medium group-hover:underline block">{title}</span>
      <span className="text-sm text-foreground/70">{subtitle}</span>
    </>
  );

  const classes = `${baseClass} ${variantStyles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

