interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "tech" | "success" | "outline";
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return <span className={`text-sm text-muted ${className}`}>{children}</span>;
}
