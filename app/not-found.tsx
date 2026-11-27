import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { NotFoundScreen } from "@/components/NotFoundScreen";

const sans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-sans",
	display: "swap",
});

const mono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-mono",
	display: "swap",
});

export default function RootNotFound() {
	return (
		<html lang="fr">
			<body className={`${sans.variable} ${mono.variable} antialiased`}>
				<NotFoundScreen
					code="404"
					label="Page introuvable"
					back="Retour à l’accueil"
				/>
			</body>
		</html>
	);
}
