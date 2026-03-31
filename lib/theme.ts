export type Theme = "blue" | "red";

export const THEMES = {
  blue: {
    label: "Blue Team",
    accentRgb: "59 130 246",
    accentSecondaryRgb: "16 185 129",
    accentTertiaryRgb: "139 92 246",
  },
  red: {
    label: "Red Team",
    accentRgb: "220 20 60",
    accentSecondaryRgb: "139 0 0",
    accentTertiaryRgb: "255 0 0",
  },
} as const;

export const THEME_STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME: Theme = "red";
