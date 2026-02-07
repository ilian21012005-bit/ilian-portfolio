"use client";

import { useRef, useState, useCallback } from "react";

interface TiltCard3dProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard3d({ children, className = "" }: TiltCard3dProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const rotateY = x * 15;
      const rotateX = -y * 15;
      setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("rotateX(0deg) rotateY(0deg)");
  }, []);

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card-3d w-full h-full"
        style={{
          transform,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
