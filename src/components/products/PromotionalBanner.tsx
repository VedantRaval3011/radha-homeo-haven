import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PromotionalBanner = ({ darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "p-5 rounded-lg mb-8 flex items-center justify-between",
        darkMode
          ? "dark:bg-homeo-dark/50 border-homeo-darkBorder"
          : "bg-gradient-to-r from-homeo-softPurple to-homeo-softBlue border border-homeo-softPeach"
      )}
    >
      <div className="flex items-center gap-4">
        <Zap
          className={
            darkMode
              ? "w-8 h-8 text-homeo-tertiary"
              : "w-8 h-8 text-homeo-softGreen"
          }
        />
        <div>
          <h2
            className={cn(
              "text-xl font-serif",
              darkMode ? "text-homeo-darkText" : "text-homeo-dark"
            )}
          >
            Limited Time Offer!
          </h2>
          <p
            className={darkMode ? "text-homeo-darkMuted" : "text-neutral-600"}
          >
            Get 20% off on all soaps with code: MITTI20
          </p>
        </div>
      </div>
      <Button
        className={cn(
          darkMode
            ? "bg-homeo-tertiary hover:bg-homeo-primary text-homeo-darkBg"
            : "bg-homeo-primary hover:bg-homeo-secondary text-white"
        )}
        onClick={() => toast.info("Use code MITTI20 at checkout!")}
      >
        Shop Now
      </Button>
    </motion.div>
  );
};

export default PromotionalBanner;