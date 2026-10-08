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
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        steel: "#282D38",
        stormy: "#414553",
        mist: "#60687B",
        midnight: "#242731",
        slate: "#536E7B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        hero: ["clamp(2.4rem, 6vw, 4.75rem)", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
