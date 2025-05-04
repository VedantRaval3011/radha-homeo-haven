import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const GiftSetPromotion = ({ darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "mt-12 p-6 rounded-lg flex items-center justify-between",
        darkMode
          ? "dark:bg-homeo-dark/50 border-homeo-darkBorder border"
          : "bg-homeo-softBlue border-homeo-softPeach"
      )}
    >
      <div className="flex items-center">
        <Gift
          className={
            darkMode
              ? "w-12 h-12 text-homeo-tertiary mr-6"
              : "w-12 h-12 text-homeo-softGreen mr-6"
          }
        />
        <div>
          <h3
            className={cn(
              "text-xl font-serif",
              darkMode ? "text-homeo-darkText" : "text-homeo-dark"
            )}
          >
            Gift the Gift of Nature
          </h3>
          <p
            className={
              darkMode ? "text-homeo-darkMuted mt-1" : "text-neutral-800 mt-1"
            }
          >
            Explore our exclusive soap gift sets, perfect for any occasion!
          </p>
        </div>
      </div>
      <Button
        className={cn(
          darkMode
            ? "bg-homeo-tertiary hover:bg-homeo-primary text-homeo-darkBg"
            : "bg-homeo-tertiary hover:bg-homeo-primary text-white"
        )}
        onClick={() => toast.info("Explore gift sets in our collections!")}
      >
        Shop Gift Sets
      </Button>
    </motion.div>
  );
};

export default GiftSetPromotion;