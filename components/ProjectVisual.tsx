import Image from "next/image";
type Visual =
  | "network"
  | "capture"
  | "analysis"
  | "game"
  | "system"
  | "dreamshift";

/** Schémas de principe : aucune métrique ni capture de produit inventée. */
export function ProjectVisual({
  kind,
  locale = "fr",
}: {
  kind: Visual;
  locale?: string;
}) {
  const en = locale === "en";
  if (kind === "network") return <div className="project-visual visual-network" aria-hidden="true"><Image src="/project-images/lab-gns3.png" alt="" fill sizes="(max-width: 680px) 100vw, 50vw" className="object-contain" /></div>;

  if (kind === "capture") return <div className="project-visual visual-capture" aria-hidden="true"><Image src="/project-images/logos/karu.png" alt="" fill sizes="(max-width: 680px) 100vw, 50vw" className="object-contain p-8" /></div>;
  if (kind === "analysis") return <div className="project-visual visual-analysis" aria-hidden="true"><div className="analysis-diagram"><div><span>01</span><p>{en ? "Observe" : "Observer"}</p><small>Wireshark</small></div><b>→</b><div><span>02</span><p>{en ? "Understand" : "Comprendre"}</p><small>MITRE ATT&amp;CK</small></div><b>→</b><div><span>03</span><p>{en ? "Detect" : "Détecter"}</p><small>Suricata</small></div></div><span className="visual-footnote">{en ? "Analysis process" : "Démarche d’analyse"}</span></div>;
  if (kind === "dreamshift")
    return (
      <div className="project-visual visual-game" aria-hidden="true">
        <Image
          src="/project-images/dreamshift-bureau.jpg"
          alt=""
          fill
          sizes="(max-width: 680px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="visual-caption relative z-10 !text-foreground">
          <span>Dreamshift Bureau / Roblox</span>
          <span>↗</span>
        </div>
        <span className="visual-footnote z-10 !opacity-100 !text-foreground">
          {en
            ? "In-development screenshot · October 2026"
            : "Capture de développement · Octobre 2026"}
        </span>
      </div>
    );
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <div className="visual-caption">
        <span>
          Architecture
        </span>
        <span>↗</span>
      </div>
      {(
        <svg viewBox="0 0 580 260" fill="none">
          <rect
            x="210"
            y="78"
            width="160"
            height="90"
            rx="3"
            stroke="currentColor"
          />
          <text x="290" y="128" textAnchor="middle">
            SERVICES
          </text>
          <path
            d="M130 123h80m160 0h80M290 168v40"
            stroke="currentColor"
            strokeDasharray="4 4"
          />
          <rect
            x="55"
            y="94"
            width="75"
            height="58"
            rx="3"
            stroke="currentColor"
          />
          <rect
            x="450"
            y="94"
            width="75"
            height="58"
            rx="3"
            stroke="currentColor"
          />
          <text x="92" y="128" textAnchor="middle">
            01
          </text>
          <text x="488" y="128" textAnchor="middle">
            02
          </text>
          <text x="290" y="234" textAnchor="middle" className="svg-secondary">
            IDENTITY / NETWORK / DATA
          </text>
        </svg>
      )}
      <span className="visual-footnote">
        {en ? "Architecture schematic" : "Schéma de principe"}
      </span>
    </div>
  );
}
