
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
          skyBlue: '#1E90FF',     // Dodger Blue - bright, vibrant primary color
          softBlue: '#E6F2FF',    // Very soft, light blue background
          softPink: '#F0F6FF',    // Lighter blue, almost white-blue
          softPeach: '#E1F5FE',   // Light blue with a hint of warmth
          softPurple: '#E3F2FD',  // Soft, pale blue 
          softGreen: '#E6F9FD',   // Blue-green soft tone
          softYellow: '#E6F1FF',  // Pale blue with a hint of warmth
          primary: '#0D47A1',     // Deep blue - more professional, authoritative
          secondary: '#1565C0',   // Slightly lighter blue for contrast
          tertiary: '#2196F3',    // Material design blue for accents
          dark: '#0D47A1',        // Deep blue for dark elements
          light: '#64B5F6'        // Lighter sky blue
        }
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to right, #0D47A1, #1565C0)',
        'soft-blue-gradient': 'linear-gradient(to right, #E6F2FF, #F0F6FF)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
