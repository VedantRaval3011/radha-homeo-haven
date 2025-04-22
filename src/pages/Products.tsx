
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import ProductSort from "@/components/ProductSort";
import ViewToggle from "@/components/ViewToggle";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Neem Purifying Soap",
    description: "Natural antibacterial soap with neem extract for acne-prone skin",
    price: 12.99,
    rating: 4.8,
    reviews: 124,
    image: "bg-homeo-softGreen",
    badges: ["100% Natural", "Vegan"],
    ingredients: ["Neem Extract", "Coconut Oil", "Shea Butter"],
    skinType: "Oily",
    isNew: true,
    bestSeller: true
  },
  {
    id: 2,
    name: "Rose Petal Moisturizing Bar",
    description: "Hydrating soap with rose petals for dry, sensitive skin",
    price: 14.50,
    rating: 4.6,
    reviews: 98,
    image: "bg-homeo-softPink",
    badges: ["Handmade", "Cruelty-Free"],
    ingredients: ["Rose Extract", "Glycerin", "Almond Oil"],
    skinType: "Dry",
    isNew: false,
    bestSeller: true
  },
  {
    id: 3,
    name: "Sandalwood Luxury Soap",
    description: "Premium soap with sandalwood oil for all skin types",
    price: 18.99,
    rating: 4.9,
    reviews: 215,
    image: "bg-homeo-softPeach",
    badges: ["Premium", "Ayurvedic"],
    ingredients: ["Sandalwood Oil", "Turmeric", "Coconut Oil"],
    skinType: "Normal",
    isNew: false,
    bestSeller: false
  },
  {
    id: 4,
    name: "Lavender Calming Bar",
    description: "Soothing lavender soap to calm the senses and relax the mind",
    price: 13.50,
    rating: 4.7,
    reviews: 87,
    image: "bg-homeo-softPurple",
    badges: ["Aromatherapy", "Vegan"],
    ingredients: ["Lavender Essential Oil", "Olive Oil", "Shea Butter"],
    skinType: "Sensitive",
    isNew: true,
    bestSeller: false
  },
  {
    id: 5,
    name: "Charcoal Detox Soap",
    description: "Deep cleansing charcoal soap for removing impurities",
    price: 16.99,
    rating: 4.5,
    reviews: 156,
    image: "bg-gray-200 dark:bg-gray-800",
    badges: ["Detoxifying", "Natural"],
    ingredients: ["Activated Charcoal", "Tea Tree Oil", "Coconut Oil"],
    skinType: "Oily",
    isNew: false,
    bestSeller: true
  },
  {
    id: 6,
    name: "Honey & Oatmeal Scrub Bar",
    description: "Gentle exfoliating soap with natural oatmeal and honey",
    price: 15.50,
    rating: 4.4,
    reviews: 72,
    image: "bg-homeo-softYellow",
    badges: ["Exfoliating", "Natural"],
    ingredients: ["Honey", "Oatmeal", "Shea Butter"],
    skinType: "Normal",
    isNew: true,
    bestSeller: false
  }
];

export default function Products() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  const [sortOption, setSortOption] = useState("featured");
  
  // Sorting function
  const handleSort = (option: string) => {
    setSortOption(option);
    let sortedProducts = [...products];
    
    switch(option) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sortedProducts.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case "name-a-z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured - prioritize best sellers then highly rated
        sortedProducts.sort((a, b) => {
          if (a.bestSeller !== b.bestSeller) return a.bestSeller ? -1 : 1;
          return b.rating - a.rating;
        });
    }
    
    setProducts(sortedProducts);
  };

  return (
    <Layout>
      <div className="homeo-section">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4 mr-1" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="homeo-heading">Natural Homeopathic Soaps</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Discover our handcrafted collection of natural soaps made with traditional homeopathic ingredients. 
            Each bar is formulated to nourish your skin while addressing specific concerns.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button 
            className="lg:hidden homeo-button flex items-center justify-center mb-4"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Filters Sidebar - Hidden on mobile unless toggled */}
          <div className={`lg:w-1/4 lg:block ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
            <ProductFilters />
          </div>

          {/* Product listing */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <ProductSort currentSort={sortOption} onSortChange={handleSort} />
              <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
            </div>

            <div className={`
              ${viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "flex flex-col gap-6"}
            `}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
