
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        homeo: {
          skyBlue: '#33C3F0',
          softBlue: '#E6F0FF',      // Updated softer blue
          softPink: '#EAF4FF',      // More blue-aligned soft color
          softPeach: '#F0F6FF',     // Lighter blue tone
          softPurple: '#EAF2FE',    // Blue-leaning purple
          softGreen: '#E6F3FA',     // Kept similar
          softYellow: '#E6F1FF',    // Kept similar
          primary: '#1E88E5',       // Material Design Blue (kept)
          secondary: '#2196F3',     // Vibrant blue accent
          tertiary: '#03A9F4',      // Light blue
          dark: '#1A1F2C',          // Dark background
          light: '#87CEEB'          // Sky Blue
        }
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to right, #1E88E5, #2196F3)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
