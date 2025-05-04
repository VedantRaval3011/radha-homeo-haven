
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const skinTypes = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];
const ingredients = ["Neem", "Sandalwood", "Rose", "Charcoal", "Lavender", "Honey", "Turmeric", "Aloe Vera"];
const fragrances = ["Floral", "Herbal", "Woody", "Citrus", "Spicy", "Unscented"];

export default function ProductFilters() {
  const [priceRange, setPriceRange] = React.useState([10, 50]);
  const [openSections, setOpenSections] = React.useState({
    skinType: true,
    ingredient: true,
    price: true,
    fragrance: true,
    rating: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="homeo-card h-fit sticky top-24">
      <h2 className="font-semibold text-xl mb-6 gradient-text">Filter Products</h2>

      {/* Skin Type Filter */}
      <Collapsible
        open={openSections.skinType}
        onOpenChange={() => toggleSection('skinType')}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Skin Type</h3>
          <CollapsibleTrigger className="hover:bg-muted p-1 rounded-md">
            {openSections.skinType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2">
            {skinTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`skin-${type}`} />
                <label
                  htmlFor={`skin-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Ingredient Filter */}
      <Collapsible
        open={openSections.ingredient}
        onOpenChange={() => toggleSection('ingredient')}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Ingredients</h3>
          <CollapsibleTrigger className="hover:bg-muted p-1 rounded-md">
            {openSections.ingredient ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2">
            {ingredients.map((ingredient) => (
              <div key={ingredient} className="flex items-center space-x-2">
                <Checkbox id={`ingredient-${ingredient}`} />
                <label
                  htmlFor={`ingredient-${ingredient}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {ingredient}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range Filter */}
      <Collapsible
        open={openSections.price}
        onOpenChange={() => toggleSection('price')}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Price Range</h3>
          <CollapsibleTrigger className="hover:bg-muted p-1 rounded-md">
            {openSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <Slider
            defaultValue={[10, 50]}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-6"
          />
          <div className="flex justify-between">
            <span className="text-sm font-medium">${priceRange[0]}</span>
            <span className="text-sm font-medium">${priceRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Fragrance Filter */}
      <Collapsible
        open={openSections.fragrance}
        onOpenChange={() => toggleSection('fragrance')}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Fragrance</h3>
          <CollapsibleTrigger className="hover:bg-muted p-1 rounded-md">
            {openSections.fragrance ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2">
            {fragrances.map((fragrance) => (
              <div key={fragrance} className="flex items-center space-x-2">
                <Checkbox id={`fragrance-${fragrance}`} />
                <label
                  htmlFor={`fragrance-${fragrance}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {fragrance}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Rating Filter */}
      <Collapsible
        open={openSections.rating}
        onOpenChange={() => toggleSection('rating')}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">Rating</h3>
          <CollapsibleTrigger className="hover:bg-muted p-1 rounded-md">
            {openSections.rating ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                >
                  <span className="flex">
                    {Array(rating).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    {Array(5 - rating).fill(0).map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </span>
                  <span className="ml-1">& Up</span>
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <button className="homeo-button w-full mt-4">Apply Filters</button>
      <button className="w-full mt-2 text-sm text-gray-500 hover:text-homeo-primary">Clear All Filters</button>
    </div>
  );
}
