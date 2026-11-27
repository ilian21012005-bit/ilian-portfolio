import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				elevated: "var(--background-elevated)",
				card: "var(--surface-card)",
				foreground: "var(--foreground)",
				muted: "var(--muted)",
				line: "var(--line)",
				accent: "rgb(var(--accent-rgb) / <alpha-value>)",
				ink: "var(--ink-bg)",
				"ink-surface": "var(--ink-surface)",
				"ink-fg": "var(--ink-fg)",
				"ink-muted": "var(--ink-muted)",
				"ink-accent": "var(--ink-accent)",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
				serif: ["var(--font-serif)", "Georgia", "serif"],
				mono: [
					"var(--font-mono)",
					"ui-monospace",
					"SFMono-Regular",
					"monospace",
				],
			},
		},
	},
	plugins: [],
};

export default config;
