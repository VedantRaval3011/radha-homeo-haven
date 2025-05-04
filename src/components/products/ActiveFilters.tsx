import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ActiveFilters = ({
  darkMode,
  selectedSkinType,
  setSelectedSkinType,
  selectedIngredients,
  setSelectedIngredients,
  selectedFragrance,
  setSelectedFragrance,
  priceRange,
  setPriceRange,
}) => {
  const activeFilterCount =
    selectedSkinType.length +
    selectedIngredients.length +
    selectedFragrance.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  if (activeFilterCount === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {selectedSkinType.map((type) => (
        <Badge
          key={`skin-${type}`}
          variant="outline"
          className={cn(
            "px-3 py-1 flex items-center",
            darkMode
              ? "border-homeo-darkBorder text-homeo-darkText bg-homeo-darkCard"
              : "border-homeo-softPeach text-homeo-primary bg-homeo-softPurple"
          )}
        >
          {type}
          <X
            className="w-3 h-3 ml-2 cursor-pointer"
            onClick={() =>
              setSelectedSkinType(selectedSkinType.filter((t) => t !== type))
            }
          />
        </Badge>
      ))}
      {selectedIngredients.map((ingredient) => (
        <Badge
          key={`ing-${ingredient}`}
          variant="outline"
          className={cn(
            "px-3 py-1 flex items-center",
            darkMode
              ? "border-homeo-darkBorder text-homeo-darkText bg-homeo-darkCard"
              : "border-homeo-softPeach text-homeo-primary bg-homeo-softPurple"
          )}
        >
          {ingredient}
          <X
            className="w-3 h-3 ml-2 cursor-pointer"
            onClick={() =>
              setSelectedIngredients(
                selectedIngredients.filter((i) => i !== ingredient)
              )
            }
          />
        </Badge>
      ))}
      {selectedFragrance.map((fragrance) => (
        <Badge
          key={`frag-${fragrance}`}
          variant="outline"
          className={cn(
            "px-3 py-1 flex items-center",
            darkMode
              ? "border-homeo-darkBorder text-homeo-darkText bg-homeo-darkCard"
              : "border-homeo-softPeach text-homeo-primary bg-homeo-softPurple"
          )}
        >
          {fragrance}
          <X
            className="w-3 h-3 ml-2 cursor-pointer"
            onClick={() =>
              setSelectedFragrance(
                selectedFragrance.filter((f) => f !== fragrance)
              )
            }
          />
        </Badge>
      ))}
      {(priceRange[0] > 0 || priceRange[1] < 1000) && (
        <Badge
          variant="outline"
          className={cn(
            "px-3 py-1 flex items-center",
            darkMode
              ? "border-homeo-darkBorder text-homeo-darkText bg-homeo-darkCard"
              : "border-homeo-softPeach text-homeo-primary bg-homeo-softPurple"
          )}
        >
          ₹{priceRange[0]} - ₹{priceRange[1]}
          <X
            className="w-3 h-3 ml-2 cursor-pointer"
            onClick={() => setPriceRange([0, 1000])}
          />
        </Badge>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setSelectedSkinType([]);
          setSelectedIngredients([]);
          setSelectedFragrance([]);
          setPriceRange([0, 1000]);
        }}
        className={
          darkMode
            ? "text-homeo-darkMuted hover:text-homeo-tertiary"
            : "text-neutral-500 hover:text-homeo-primary"
        }
      >
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;