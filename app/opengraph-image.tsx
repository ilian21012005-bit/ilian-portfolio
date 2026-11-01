import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt =
  "Ilian El Bouazzaoui Prieur — Systèmes, réseaux et logiciels";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "65px 80px",
          background: "#111315",
          color: "#f4f4f1",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "#a6adb2",
          }}
        >
          <span>ILIAN / PORTFOLIO</span>
          <span>PARIS-SACLAY · BUT INFORMATIQUE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 25, color: "#a6adb2" }}>
            Ilian El Bouazzaoui Prieur
          </span>
          <span style={{ fontSize: 83, lineHeight: 1.1, letterSpacing: -3 }}>
            Systèmes. Réseaux.
          </span>
          <span
            style={{
              fontSize: 83,
              lineHeight: 1.1,
              letterSpacing: -3,
              color: "#e6e8e7",
            }}
          >
            Logiciels.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #33383d",
            paddingTop: 20,
            fontSize: 20,
            color: "#a6adb2",
          }}
        >
          Infrastructure · Cybersécurité · Développement · Automatisation
        </div>
      </div>
    ),
    size,
  );
}
