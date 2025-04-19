import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html", // Vite entry point
    "./src/**/*.{js,ts,jsx,tsx}", // All components/pages
  ],
  theme: {
    extend: {
      colors: {
        primary: "#089219",
        secondary: "#6c757d",
        accent: "#28a745",
        backgroundLight: "#f8f9fa",
        backgroundDark: "#343a40",
        textPrimary: "#212529",
        textSecondary: "#495057",
        midnight: "#05203c",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
};
