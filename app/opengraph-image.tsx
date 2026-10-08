import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Portfolio Ilian";
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
          padding: "80px",
          background: "#121212",
          color: "#f5f5f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: "22px", color: "#c8ccd4" }}>Portfolio Ilian</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "56px", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Systèmes, réseau, identités.
          </div>
          <div style={{ fontSize: "28px", color: "#c8ccd4" }}>BUT 3 Informatique — parcours B, Paris-Saclay</div>
        </div>
      </div>
    ),
    size
  );
}
