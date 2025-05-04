import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Header from "./Header.tsx";
import PromotionalBanner from "./PromotionalBanner.tsx";
import ControlsRow from "./ControlsRow.tsx";
import ActiveFilters from "./ActiveFilters.tsx";
import FiltersSidebar from "./FiltersSidebar.tsx";
import ProductCard from "./ProductCard.tsx";
import GiftSetPromotion from "./GiftSetPromotion.tsx";
import Cart from "./Cart.tsx";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "../ui/button.tsx";
import { useCartStore } from "@/store/cartStore";

const ProductsPage = () => {
  // State for products and loading state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters and UI
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSkinType, setSelectedSkinType] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState([]);

  // Dynamic filter options that will be populated from API data
  const [skinTypes, setSkinTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [fragrances, setFragrances] = useState([]);

  // Cart store
  const { addToCart, getCartItemCount } = useCartStore();

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/products`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        // Ensure each product has a valid id
        const validatedData = data.map(product => ({
          ...product,
          id: product.id || product._id || crypto.randomUUID(), // Fallback to _id or generate UUID
        }));
        setProducts(validatedData);
        
        // Extract unique filter options from the fetched data
        const uniqueSkinTypes = [...new Set(validatedData.map(product => product.skinType))];
        const uniqueIngredients = [...new Set(validatedData.map(product => product.ingredient))];
        const uniqueFragrances = [...new Set(validatedData.map(product => product.fragrance))];
        
        setSkinTypes(uniqueSkinTypes);
        setIngredients(uniqueIngredients);
        setFragrances(uniqueFragrances);
        
        // Find the max price for the price range filter
        const maxPrice = Math.max(...validatedData.map(product => product.price), 1000);
        setPriceRange([0, maxPrice]);
        
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!product.id || typeof product.id !== 'string') {
      console.error('Invalid product id:', product);
      toast.error('Cannot add product to cart: invalid product ID');
      return;
    }
    console.log('Adding to cart:', product); // Debug log
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      images: product.images || ["/placeholder-image.jpg"],
    });
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products
    .filter((product) => {
      const skinTypeMatch =
        selectedSkinType.length === 0 ||
        selectedSkinType.includes(product.skinType);
      const ingredientMatch =
        selectedIngredients.length === 0 ||
        selectedIngredients.includes(product.ingredient);
      const fragranceMatch =
        selectedFragrance.length === 0 ||
        selectedFragrance.includes(product.fragrance);
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return skinTypeMatch && ingredientMatch && fragranceMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const activeFilterCount =
    selectedSkinType.length +
    selectedIngredients.length +
    selectedFragrance.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  return (
    <div
      className={cn(
        "flex min-h-screen transition-colors duration-200",
        darkMode
          ? "bg-homeo-card text-homeo-darkText"
          : "bg-white text-homeo-dark"
      )}
    >
      <div className="w-64 fixed top-0 left-0 h-full">
        <Sidebar />
      </div>
      <div className="ml-64 flex-1 container mx-auto py-8 px-6">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          cartItemCount={getCartItemCount()}
          setCartOpen={setCartOpen}
        />
        <div className="mb-8">
          <h1
            className={cn(
              "text-3xl font-serif",
              darkMode ? "text-homeo-darkText" : "text-homeo-dark"
            )}
          >
            Natural Handmade Soaps
          </h1>
          <p
            className={
              darkMode ? "text-homeo-darkMuted mt-2" : "text-neutral-600 mt-2"
            }
          >
            Pure, sustainable skincare for your everyday ritual
          </p>
        </div>
        <PromotionalBanner darkMode={darkMode} />
        <ControlsRow
          darkMode={darkMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeFilterCount={activeFilterCount}
        />
        <ActiveFilters
          darkMode={darkMode}
          selectedSkinType={selectedSkinType}
          setSelectedSkinType={setSelectedSkinType}
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
          selectedFragrance={selectedFragrance}
          setSelectedFragrance={setSelectedFragrance}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div className="flex flex-col md:flex-row gap-8">
          {showFilters && (
            <FiltersSidebar
              darkMode={darkMode}
              selectedSkinType={selectedSkinType}
              setSelectedSkinType={setSelectedSkinType}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              selectedFragrance={selectedFragrance}
              setSelectedFragrance={setSelectedFragrance}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              skinTypes={skinTypes}
              ingredients={ingredients}
              fragrances={fragrances}
              setShowFilters={setShowFilters}
            />
          )}
          <div className={showFilters ? "w-full md:w-3/4" : "w-full"}>
            {loading ? (
              // Loading state
              <div className="col-span-full flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-homeo-primary"></div>
              </div>
            ) : error ? (
              // Error state
              <div className="col-span-full text-center py-16">
                <p className={darkMode ? "text-homeo-darkMuted" : "text-neutral-500"}>
                  {error}
                </p>
                <Button
                  variant="outline"
                  className={cn(
                    "mt-4",
                    darkMode
                      ? "border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-darkBg"
                      : "border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple"
                  )}
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              // Products grid
              <motion.div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? showFilters
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      darkMode={darkMode}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p
                      className={
                        darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                      }
                    >
                      No products match your selected filters.
                    </p>
                    <Button
                      variant="outline"
                      className={cn(
                        "mt-4",
                        darkMode
                          ? "border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-darkBg"
                          : "border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple"
                      )}
                      onClick={() => {
                        setSelectedSkinType([]);
                        setSelectedIngredients([]);
                        setSelectedFragrance([]);
                        setPriceRange([0, 1000]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
            <GiftSetPromotion darkMode={darkMode} />
          </div>
        </div>
        {cartOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setCartOpen(false)}
          />
        )}
        <Cart
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default ProductsPage;