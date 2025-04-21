import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html", // Vite entry point
    "./src/**/*.{js,ts,jsx,tsx}", // All components/pages
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#05203c", // Replaces old primary
          light: "#0e2a47", // Section backgrounds
          card: "#0b253f", // Card backgrounds
          border: "#1c3a5a", // Border lines
          muted: "#a3b9cc", // Muted text
        },
        accent: {
          yellow: "#f4b400", // Attention
          cyan: "#00bcd4", // Active elements
          coral: "#ff6f61", // CTAs / Warnings
        },
        neutral: {
          light: "#f8f9fa", // Light bg
          dark: "#343a40", // Dark bg
          textPrimary: "#ffffff",
          textMuted: "#a3b9cc",
        },
        status: {
          success: "#4caf50",
          info: "#2196f3",
          warning: "#ff9800",
          error: "#f44336",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
};
