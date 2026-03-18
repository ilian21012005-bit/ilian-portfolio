"use client";

import { useRef, useState, useEffect } from "react";

interface LazyIframeProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
  className?: string;
  allow?: string;
}

/**
 * Iframe chargée uniquement quand le conteneur entre dans le viewport.
 * Réduit le JS et les requêtes tierces au chargement initial.
 */
export function LazyIframe({
  src,
  title,
  width = "100%",
  height = "300",
  className = "",
  allow,
}: LazyIframeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "100px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <iframe
          title={title}
          src={src}
          width={width}
          height={height}
          frameBorder={0}
          allow={allow}
          loading="lazy"
          className="w-full rounded-xl"
        />
      ) : (
        <div
          className="w-full rounded-xl bg-white/5 animate-pulse"
          style={{ width, minHeight: `${height}px` }}
          aria-hidden
        />
      )}
    </div>
  );
}
