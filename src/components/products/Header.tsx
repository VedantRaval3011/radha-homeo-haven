import { Button } from "@/components/ui/button";
import { Moon, Sun, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = ({ darkMode, setDarkMode, cartItemCount, setCartOpen }) => {
  return (
    <div className="flex justify-end mb-6 gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setDarkMode(!darkMode)}
        className={cn(
          "rounded-full",
          darkMode
            ? "bg-homeo-darkBg border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-darkCard"
            : "bg-white border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple"
        )}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      <Button
        variant="outline"
        className={cn(
          "flex items-center gap-2 rounded-full",
          darkMode
            ? "bg-homeo-darkBg border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-darkCard"
            : "bg-white border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple"
        )}
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Cart ({cartItemCount})</span>
      </Button>
    </div>
  );
};

export default Header;