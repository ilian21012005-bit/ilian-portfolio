import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BootIntro } from "@/components/BootIntro";
import { AuroraBg } from "@/components/backgrounds/AuroraBg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ilian El Bouazzaoui Prieur | Fullstack Dev & Systems Student",
  description:
    "Portfolio d'Ilian El Bouazzaoui Prieur - Étudiant BUT 2 Informatique à Paris-Saclay. Stage recherché Avril - Juillet 2026. Motové, polyvalent et désireux d'acquérir de nouvelles expériences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.className} antialiased font-sans`}>
        <BootIntro>
          <AuroraBg />
          <ScrollProgress />
          <Navbar />
          {children}
        </BootIntro>
      </body>
    </html>
  );
}
