"use client";

const TAGS = [
  "C++",
  "JAVA",
  "LINUX",
  "WIRESHARK",
  "DOCKER",
  "SECURITY",
  "PHP",
  "REACT",
  "NETWORK",
  "CYBER",
];

export function InfiniteMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-white/10 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...TAGS, ...TAGS].map((tag, i) => (
          <span
            key={i}
            className="mx-8 text-3xl md:text-4xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] hover:[-webkit-text-stroke-color:rgba(59,130,246,0.8)] hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
