import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FiltersSidebar = ({
  darkMode,
  selectedSkinType,
  setSelectedSkinType,
  selectedIngredients,
  setSelectedIngredients,
  selectedFragrance,
  setSelectedFragrance,
  priceRange,
  setPriceRange,
  skinTypes,
  ingredients,
  fragrances,
  setShowFilters,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-80 max-w-md mx-auto md:mx-0"
    >
      <Card
        className={cn(
          "shadow-sm h-[calc(100vh-2rem)] md:h-auto max-h-[600px] flex flex-col",
          darkMode
            ? "bg-dark border-homeo-dark"
            : "bg-white border-neutral-200"
        )}
      >
        <CardHeader className="pb-2 px-4">
          <div className="flex items-center justify-between">
            <CardTitle
              className={cn(
                "font-serif text-lg",
                darkMode ? "text-homeo-darkText" : "text-homeo-dark"
              )}
            >
              Filters
            </CardTitle>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X
                className={cn(
                  "w-5 h-5",
                  darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                )}
              />
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-4 pb-6 space-y-6">
          <div>
            <Label
              className={cn(
                "text-sm font-medium",
                darkMode ? "text-homeo-darkText" : "text-neutral-700"
              )}
            >
              Skin Type
            </Label>
            <div className="mt-3 space-y-2 max-h-32 overflow-y-auto pr-2">
              {skinTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id={`skin-${type}`}
                    checked={selectedSkinType.includes(type)}
                    onChange={() => {
                      setSelectedSkinType(
                        selectedSkinType.includes(type)
                          ? selectedSkinType.filter((t) => t !== type)
                          : [...selectedSkinType, type]
                      );
                    }}
                    className={cn(
                      "h-4 w-4",
                      darkMode ? "accent-homeo-tertiary" : "accent-homeo-primary"
                    )}
                  />
                  <Label
                    htmlFor={`skin-${type}`}
                    className={cn(
                      "text-sm font-normal cursor-pointer",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-600"
                    )}
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label
              className={cn(
                "text-sm font-medium",
                darkMode ? "text-homeo-darkText" : "text-neutral-700"
              )}
            >
              Ingredients
            </Label>
            <div className="mt-3 space-y-2 max-h-32 overflow-y-auto pr-2">
              {ingredients.map((ingredient) => (
                <div key={ingredient} className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id={`ingredient-${ingredient}`}
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => {
                      setSelectedIngredients(
                        selectedIngredients.includes(ingredient)
                          ? selectedIngredients.filter((i) => i !== ingredient)
                          : [...selectedIngredients, ingredient]
                      );
                    }}
                    className={cn(
                      "h-4 w-4",
                      darkMode ? "accent-homeo-tertiary" : "accent-homeo-primary"
                    )}
                  />
                  <Label
                    htmlFor={`ingredient-${ingredient}`}
                    className={cn(
                      "text-sm font-normal cursor-pointer",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-600"
                    )}
                  >
                    {ingredient}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Label
                className={cn(
                  "text-sm font-medium",
                  darkMode ? "text-homeo-darkText" : "text-neutral-700"
                )}
              >
                Price Range
              </Label>
              <span
                className={cn(
                  "text-sm",
                  darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                )}
              >
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </span>
            </div>
            <Slider
              className={cn(
                "mt-4",
                darkMode ? "text-homeo-tertiary" : "text-homeo-primary"
              )}
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
          <div>
            <Label
              className={cn(
                "text-sm font-medium",
                darkMode ? "text-homeo-darkText" : "text-neutral-700"
              )}
            >
              Fragrance
            </Label>
            <div className="mt-3 space-y-2 max-h-32 overflow-y-auto pr-2">
              {fragrances.map((fragrance) => (
                <div key={fragrance} className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id={`fragrance-${fragrance}`}
                    checked={selectedFragrance.includes(fragrance)}
                    onChange={() => {
                      setSelectedFragrance(
                        selectedFragrance.includes(fragrance)
                          ? selectedFragrance.filter((f) => f !== fragrance)
                          : [...selectedFragrance, fragrance]
                      );
                    }}
                    className={cn(
                      "h-4 w-4",
                      darkMode ? "accent-homeo-tertiary" : "accent-homeo-primary"
                    )}
                  />
                  <Label
                    htmlFor={`fragrance-${fragrance}`}
                    className={cn(
                      "text-sm font-normal cursor-pointer",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-600"
                    )}
                  >
                    {fragrance}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 

export default FiltersSidebar;