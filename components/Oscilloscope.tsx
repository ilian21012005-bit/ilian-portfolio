"use client";

import { useEffect, useRef } from "react";

export function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 80;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      frameRef.current++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "rgba(5, 5, 5, 0.15)";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y =
          h / 2 +
          Math.sin(x * 0.015 + frameRef.current * 0.04) * 25 +
          Math.sin(x * 0.03 + frameRef.current * 0.08) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden border border-success-green/20 bg-black/50">
      <div className="absolute top-2 left-2 text-success-green/80 text-xs font-mono z-10">
        SIGNAL: 2.4GHz // PACKET STREAM
      </div>
      <canvas ref={canvasRef} className="w-full h-20 block" />
    </div>
  );
}
