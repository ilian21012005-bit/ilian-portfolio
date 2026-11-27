import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
	"Ilian El Bouazzaoui Prieur — Systèmes, réseaux et logiciels";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "64px 80px",
				background: "#f3f1ea",
				color: "#131311",
				borderTop: "8px solid #b8320f",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontSize: 18,
					color: "#55534d",
					borderBottom: "1px solid #d4cfc3",
					paddingBottom: 20,
				}}
			>
				<span style={{ color: "#131311", fontWeight: 600 }}>
					ILIAN / PORTFOLIO
				</span>
				<span>PARIS-SACLAY · BUT INFORMATIQUE</span>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
				<span style={{ fontSize: 24, color: "#b8320f", fontWeight: 600 }}>
					Ilian El Bouazzaoui Prieur
				</span>
				<span
					style={{
						fontSize: 82,
						lineHeight: 1.06,
						letterSpacing: -3,
						fontWeight: 700,
					}}
				>
					Systèmes. Réseaux.
				</span>
				<span
					style={{
						fontSize: 82,
						lineHeight: 1.06,
						letterSpacing: -3,
						color: "#b8320f",
						fontStyle: "italic",
					}}
				>
					Logiciels.
				</span>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					borderTop: "1px solid #d4cfc3",
					paddingTop: 22,
					fontSize: 20,
					color: "#55534d",
				}}
			>
				<span>
					Infrastructure · Cybersécurité · Développement · Automatisation
				</span>
				<span style={{ color: "#131311", fontWeight: 600 }}>
					Stage jan.–mai 2027
				</span>
			</div>
		</div>,
		size,
	);
}
