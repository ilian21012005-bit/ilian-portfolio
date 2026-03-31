"use client";

interface RadarScanProps {
  size?: number;
  className?: string;
}

export function RadarScan({ size = 120, className = "" }: RadarScanProps) {
  return (
    <div
      className={`relative rounded-full border-2 border-accent/30 overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: `
          radial-gradient(circle, transparent 0%, transparent 69%, rgb(var(--accent-rgb) / 0.08) 70%, transparent 71%),
          radial-gradient(circle, transparent 0%, transparent 39%, rgb(var(--accent-rgb) / 0.08) 40%, transparent 41%),
          linear-gradient(90deg, transparent 49.5%, rgb(var(--accent-rgb) / 0.08) 50%, transparent 50.5%),
          linear-gradient(0deg, transparent 49.5%, rgb(var(--accent-rgb) / 0.08) 50%, transparent 50.5%)
        `,
        boxShadow: "0 0 30px rgb(var(--accent-rgb) / 0.1)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-1/2 h-1/2 origin-[100%_100%] rounded-br-full"
        style={{
          background: "conic-gradient(from 0deg at 100% 100%, rgb(var(--accent-rgb) / 0.4) 0deg, transparent 60deg)",
          animation: "radar-scan 3s infinite linear",
        }}
      />
    </div>
  );
}
