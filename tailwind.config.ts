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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
          light: '#86EFAC',       // Light mint green
          darkBg: '#0F172A',      // Dark background
          darkCard: '#1E293B',    // Dark card background
          darkText: '#E2E8F0',    // Light text for dark mode
          darkMuted: '#94A3B8',   // Muted text for dark mode
          darkAccent: '#2DD4BF',  // Accent color for dark mode
          darkBorder: '#334155'   // Border color for dark mode
        }
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(102.3deg, #16A34A 5.9%, #86EFAC 64%, #DCFCE7 89%)',
        'yellow-gradient': 'linear-gradient(184.1deg, #D9F99D 44.7%, #BEF264 67.2%)',
        'orange-gradient': 'linear-gradient(111.4deg, #22C55E 1%, #A3E635 58%)',
        'blue-gradient': 'linear-gradient(90deg, #86EFAC 0%, #15803D 100%)',
        'pink-gradient': 'linear-gradient(90deg, #BBF7D0 0%, #16A34A 100%)',
        'soft-gradient': 'linear-gradient(109.6deg, #DCFCE7 11.2%, #F0FDF4 91.1%)',
        'dark-gradient': 'linear-gradient(to right, #0F172A, #1E293B)'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
