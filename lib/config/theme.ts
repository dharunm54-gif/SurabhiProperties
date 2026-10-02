/**
 * lib/config/theme.ts
 *
 * Design system tokens — mirrors Tailwind and brand specs.
 */

export const theme = {
  colors: {
    // Primary — Deep Forest Green
    primary: {
      DEFAULT: "#173F35",
      light: "#1F5447",
      dark: "#0E2820",
      foreground: "#FFFFFF",
    },
    // Secondary — Muted Gold
    secondary: {
      DEFAULT: "#C7A45D",
      light: "#D4B87A",
      dark: "#A8883E",
      foreground: "#FFFFFF",
    },
    // Background — Warm White
    background: {
      DEFAULT: "#F8F7F3",
      subtle: "#F0EFE9",
      card: "#FFFFFF",
    },
    // Text
    text: {
      primary: "#242424",
      secondary: "#555555",
      muted: "#888888",
      inverted: "#FFFFFF",
    },
    // Borders
    border: {
      DEFAULT: "#E2E0D8",
      subtle: "#ECEAE4",
      strong: "#C8C5BB",
    },
    // Status
    success: "#16A34A",
    warning: "#D97706",
    error: "#DC2626",
    info: "#2563EB",
  },
} as const;

export type Theme = typeof theme;
