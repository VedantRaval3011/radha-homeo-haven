
import { Layout } from "../components/Layout";
import ProductFilters from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";
import ViewToggle from "../components/ViewToggle";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

// Sample product data
const productData = [
  {
    id: 1,
    name: "Neem & Tulsi Clarifying Soap",
    description: "A natural antibacterial soap with Neem and Tulsi for acne-prone skin. Helps clear breakouts and prevent new ones.",
    price: 8.99,
    rating: 4.8,
    reviews: 124,
    image: "bg-homeo-softBlue",
    badges: ["Natural", "Organic", "Ayurvedic"],
    ingredients: ["Neem Oil", "Tulsi Extract", "Coconut Oil", "Shea Butter"],
    skinType: "Oily, Acne-Prone",
    isNew: false,
    bestSeller: true
  },
  {
    id: 2,
    name: "Lavender & Chamomile Calming Soap",
    description: "A soothing blend of lavender and chamomile to calm irritated skin and promote relaxation. Perfect for evening use.",
    price: 9.99,
    rating: 4.9,
    reviews: 87,
    image: "bg-homeo-softPurple",
    badges: ["Calming", "Essential Oils", "Eco-friendly"],
    ingredients: ["Lavender Oil", "Chamomile Extract", "Glycerin", "Olive Oil"],
    skinType: "Sensitive, Dry",
    isNew: true,
    bestSeller: false
  },
  {
    id: 3,
    name: "Honey & Oatmeal Nourishing Soap",
    description: "A gentle exfoliating soap with real oatmeal and honey to soothe and nourish dry, itchy skin.",
    price: 7.99,
    rating: 4.6,
    reviews: 112,
    image: "bg-homeo-softYellow",
    badges: ["Moisturizing", "Exfoliating", "Handmade"],
    ingredients: ["Raw Honey", "Colloidal Oatmeal", "Shea Butter", "Almond Oil"],
    skinType: "Dry, Sensitive",
    isNew: false,
    bestSeller: true
  },
  {
    id: 4,
    name: "Activated Charcoal Detox Soap",
    description: "Deep cleansing soap with activated charcoal to draw out impurities and toxins from skin. Leaves skin feeling refreshed.",
    price: 10.99,
    rating: 4.7,
    reviews: 95,
    image: "bg-homeo-softBlue",
    badges: ["Detoxifying", "Deep Cleansing", "Vegan"],
    ingredients: ["Activated Charcoal", "Tea Tree Oil", "Peppermint", "Coconut Oil"],
    skinType: "All Skin Types, Especially Oily",
    isNew: false,
    bestSeller: false
  },
  {
    id: 5,
    name: "Aloe Vera & Cucumber Refreshing Soap",
    description: "Cool and refreshing soap with aloe and cucumber to hydrate and soothe skin. Perfect for after-sun care.",
    price: 8.49,
    rating: 4.5,
    reviews: 76,
    image: "bg-homeo-softPeach",
    badges: ["Cooling", "Hydrating", "After-Sun"],
    ingredients: ["Aloe Vera Gel", "Cucumber Extract", "Vitamin E", "Glycerin"],
    skinType: "All Skin Types, Sunburned",
    isNew: true,
    bestSeller: false
  },
  {
    id: 6,
    name: "Sandalwood & Turmeric Brightening Soap",
    description: "Traditional ayurvedic soap with sandalwood and turmeric to brighten skin tone and reduce pigmentation.",
    price: 11.99,
    rating: 4.8,
    reviews: 58,
    image: "bg-homeo-softPurple",
    badges: ["Brightening", "Ayurvedic", "Anti-Aging"],
    ingredients: ["Sandalwood Powder", "Turmeric", "Saffron", "Coconut Oil"],
    skinType: "Dull, Pigmented",
    isNew: false,
    bestSeller: true
  },
  {
    id: 7,
    name: "Rose & Geranium Balancing Soap",
    description: "Floral soap with rose and geranium essential oils to balance skin's natural oils and provide a luxurious bathing experience.",
    price: 9.49,
    rating: 4.7,
    reviews: 67,
    image: "bg-homeo-softYellow",
    badges: ["Balancing", "Floral", "Luxury"],
    ingredients: ["Rose Essential Oil", "Geranium Oil", "Rose Clay", "Shea Butter"],
    skinType: "Combination, Normal",
    isNew: true,
    bestSeller: false
  },
  {
    id: 8,
    name: "Lemon & Mint Energizing Soap",
    description: "Invigorating morning soap with lemon and mint to energize and refresh. Helps wake up tired skin and senses.",
    price: 7.99,
    rating: 4.6,
    reviews: 84,
    image: "bg-homeo-softBlue",
    badges: ["Energizing", "Morning Use", "Refreshing"],
    ingredients: ["Lemon Essential Oil", "Peppermint", "Lemongrass", "Apricot Seeds"],
    skinType: "All Skin Types",
    isNew: false,
    bestSeller: false
  }
];

export default function Products() {
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [currentSort, setCurrentSort] = useState("featured");

  return (
    <Layout>
      <div className="pl-0 md:pl-64 p-6 bg-homeo-softPurple dark:bg-homeo-dark">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-homeo-dark dark:text-white">Products</h1>
          <div className="flex gap-4 items-center">
            <ProductSort currentSort={currentSort} onSortChange={setCurrentSort} />
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <ProductFilters />
          <div className={`grid ${
            currentView === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "grid-cols-1 gap-4"
          }`}>
            {productData.map(product => (
              <ProductCard key={product.id} product={product} viewMode={currentView} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
