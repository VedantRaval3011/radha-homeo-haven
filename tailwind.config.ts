
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
          skyBlue: '#33C3F0',     // Bright sky blue
          softBlue: '#E6F0FF',    // Soft blue
          softPink: '#FFDEE2',    // Soft pink
          softPeach: '#FDE1D3',   // Soft peach
          softPurple: '#E5DEFF',  // Soft purple
          softGreen: '#F2FCE2',   // Soft green
          softYellow: '#FEF7CD',  // Soft yellow
          primary: '#8B5CF6',     // Vivid purple
          secondary: '#D946EF',   // Magenta pink
          tertiary: '#F97316',    // Bright orange
          dark: '#1A1F2C',        // Dark background
          light: '#0EA5E9'        // Ocean blue
        }
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)',
        'yellow-gradient': 'linear-gradient(184.1deg, rgba(249,255,182,1) 44.7%, rgba(226,255,172,1) 67.2%)',
        'orange-gradient': 'linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)',
        'blue-gradient': 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
        'pink-gradient': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
        'soft-gradient': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
