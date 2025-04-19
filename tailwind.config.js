// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
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
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
};
