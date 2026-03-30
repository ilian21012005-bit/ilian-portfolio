import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ilian El Bouazzaoui Prieur — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "radial-gradient(circle at 20% 20%, rgba(220,20,60,0.35), transparent 50%), radial-gradient(circle at 80% 30%, rgba(139,0,0,0.25), transparent 45%), #050505",
          color: "#EDEDED",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.04)",
              width: "fit-content",
              fontSize: "20px",
              color: "rgba(237,237,237,0.85)",
            }}
          >
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#8B0000" }} />
            Disponible pour stage Avril–Juillet 2026
          </div>

          <div style={{ fontSize: "68px", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Ilian El Bouazzaoui Prieur
          </div>
          <div style={{ fontSize: "34px", fontWeight: 600, color: "rgba(237,237,237,0.8)" }}>
            Systèmes • Réseaux • Développement
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: "22px", color: "rgba(237,237,237,0.7)" }}>
            BUT 2 Informatique — Paris-Saclay
          </div>
          <div style={{ fontSize: "22px", color: "rgba(220,20,60,0.95)", fontWeight: 700 }}>
            ilian.dev
          </div>
        </div>
      </div>
    ),
    size
  );
}

