"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary:
      "cyber-btn bg-crimson text-white hover:bg-crimson/90 border-crimson shadow-[0_0_15px_rgba(220,20,60,0.4)] hover:shadow-[0_0_25px_rgba(220,20,60,0.6)]",
    secondary:
      "cyber-btn bg-transparent text-foreground border-white/30 hover:border-crimson hover:text-crimson hover:shadow-[0_0_15px_rgba(220,20,60,0.2)]",
  };

  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium border transition-all duration-300 cursor-pointer";

  const content = (
    <motion.span
      style={{ x: xSpring, y: ySpring }}
      className="inline-block cyber-text relative z-20"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
