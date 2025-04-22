
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-homeo-darkCard shadow-md transition-all duration-300 hover:shadow-lg border border-transparent dark:border-homeo-darkBorder"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-homeo-primary" />
      ) : (
        <Moon className="h-5 w-5 text-homeo-primary" />
      )}
    </button>
  );
}
