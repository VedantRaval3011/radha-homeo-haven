
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
          skyBlue: '#4ADE80',     // Bright green
          softBlue: '#DCFCE7',    // Soft green
          softPink: '#86EFAC',    // Light green
          softPeach: '#BBF7D0',   // Pale green
          softPurple: '#F0FDF4',  // Softest green
          softGreen: '#22C55E',   // Medium green
          softYellow: '#D9F99D',  // Yellow-green
          primary: '#16A34A',     // Forest green
          secondary: '#15803D',   // Dark green
          tertiary: '#4ADE80',    // Bright green
          dark: '#052e16',        // Dark forest green
          light: '#86EFAC'        // Light mint green
        }
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(102.3deg, #16A34A 5.9%, #86EFAC 64%, #DCFCE7 89%)',
        'yellow-gradient': 'linear-gradient(184.1deg, #D9F99D 44.7%, #BEF264 67.2%)',
        'orange-gradient': 'linear-gradient(111.4deg, #22C55E 1%, #A3E635 58%)',
        'blue-gradient': 'linear-gradient(90deg, #86EFAC 0%, #15803D 100%)',
        'pink-gradient': 'linear-gradient(90deg, #BBF7D0 0%, #16A34A 100%)',
        'soft-gradient': 'linear-gradient(109.6deg, #DCFCE7 11.2%, #F0FDF4 91.1%)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
