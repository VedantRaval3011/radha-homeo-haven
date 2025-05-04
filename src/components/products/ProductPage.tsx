import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  TruckIcon,
  ShieldCheck,
  Heart,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import Header from "./Header.tsx";
import { Sidebar } from "../Sidebar.tsx";
import ProductCard from "./ProductCard.tsx";
import Cart from "./Cart.tsx";
import { Button } from "../ui/button.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs.tsx";
import { Badge } from "../ui/badge.tsx";
import { Input } from "../ui/input.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useCartStore } from "@/store/cartStore.ts";

const ProductPage = () => {
  const { slug } = useParams(); // Extract slug from URL (used for SEO/display)
  const location = useLocation(); // Get location to access state
  const navigate = useNavigate();
  const { productId } = location.state || {}; // Extract productId from state

  // State for product, related products, and loading/error
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for UI and cart
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [reviewStep, setReviewStep] = useState(1); // 1: Rating, 2: Comment, 3: User Details

  // Cart store
  const { addToCart, getCartItemCount } = useCartStore();

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Reset quantity on product change
  useEffect(() => {
    setQuantity(1);
  }, [slug]);

  // Calculate average rating
  const calculateAverageRating = (reviewsArray) => {
    if (!reviewsArray || reviewsArray.length === 0) {
      return 0; // Return 0 if no reviews exist
    }
    const totalRating = reviewsArray.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (totalRating / reviewsArray.length).toFixed(1);
  };

  // Fetch product and reviews by productId
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      try {
        if (!productId) {
          throw new Error("Product ID is missing");
        }

        const apiUrl = import.meta.env.VITE_API_URL || "";
        // Fetch product by ID
        const productResponse = await fetch(
          `${apiUrl}/api/products/${productId}`
        );
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch product with ID ${productId}`);
        }
        const productData = await productResponse.json();

        // Fetch reviews for main product using productId
        const reviewsResponse = await fetch(
          `${apiUrl}/api/reviews/${productId}`
        );
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        // Calculate average rating
        const avgRating = calculateAverageRating(reviewsData);

        setProduct({
          ...productData,
          id: productId, // Ensure product has the correct ID
          originalPrice:
            productData.originalPrice || (productData.price * 1.05).toFixed(2),
          images: productData.images || [
            productData.image || "/placeholder-image.jpg",
            "/placeholder-image-2.jpg",
            "/placeholder-image-3.jpg",
          ],
          rating: parseFloat(avgRating.toString()),
          reviews: reviewsData.length,
          benefits: productData.benefits || [
            "Natural ingredients",
            "Handcrafted with care",
            "Free from harsh chemicals",
          ],
          usageDirections:
            productData.usageDirections ||
            "Apply to damp skin, massage gently to create a rich lather, rinse thoroughly with water.",
          shipping:
            productData.shipping || "Free shipping for orders above Rs. 499",
          available:
            productData.available !== undefined ? productData.available : true,
        });

        // Fetch related products and their reviews
        const relatedResponse = await fetch(
          `${apiUrl}/api/products?category=${productData.category}&limit=4`
        );
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related products");
        }
        const relatedData = await relatedResponse.json();
        const filteredRelated = relatedData.filter(
          (item) => item.id !== productId && item._id !== productId
        );

        // Fetch reviews for each related product
        const relatedWithReviews = await Promise.all(
          filteredRelated.map(async (item) => {
            const relatedReviewsResponse = await fetch(
              `${apiUrl}/api/reviews/${item.id || item._id}`
            );
            const relatedReviewsData = relatedReviewsResponse.ok
              ? await relatedReviewsResponse.json()
              : [];
            const relatedAvgRating = calculateAverageRating(relatedReviewsData);
            return {
              ...item,
              rating: parseFloat(relatedAvgRating.toString()),
              reviews: relatedReviewsData.length,
            };
          })
        );

        setRelatedProducts(relatedWithReviews.slice(0, 4));
        setRecommendedProducts(relatedWithReviews.slice(0, 4));

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load product or reviews. Please try again later.");
        setProduct(null);
        setReviews([]);
        setRelatedProducts([]);
        setRecommendedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [productId]);

  // Cart handlers
  const handleAddToCart = (item, qty = 1) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: qty,
      images: item.images || ["/placeholder-image.jpg"],
    });
    toast.success("Added to cart!", {
      description: `${item.name} × ${qty} has been added to your cart.`,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const calculateDiscount = (original, sale) => {
    return Math.round(((original - sale) / original) * 100);
  };

  // Review form handlers
  const handleRatingSelect = (rating: number) => {
    setNewReview({ ...newReview, rating });
    setReviewStep(2);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      setReviewStep(3);
    } else {
      toast.error("Please enter a comment");
    }
  };

  const handleUserDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newReview.firstName.trim() ||
      !newReview.lastName.trim() ||
      !newReview.email.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id, // Use product.id from fetched product data
          firstName: newReview.firstName,
          lastName: newReview.lastName,
          email: newReview.email,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      const savedReview = await response.json();
      const updatedReviews = [savedReview, ...reviews];
      setReviews(updatedReviews);
      setNewReview({
        rating: 0,
        comment: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      setReviewStep(1);
      toast.success("Review submitted!");
      const avgRating = calculateAverageRating(updatedReviews);
      setProduct((prev) => ({
        ...prev,
        rating: parseFloat(avgRating.toString()),
        reviews: updatedReviews.length,
      }));
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  // Rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++;
  });
  const totalReviews = reviews.length;
  const ratingPercentages = ratingDistribution.map((count) =>
    totalReviews > 0 ? (count / totalReviews) * 100 : 0
  );

  return (
    <div
      className={cn(
        "flex min-h-screen transition-colors duration-200",
        darkMode
          ? "bg-card text-homeo-darkText"
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

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-homeo-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p
              className={darkMode ? "text-homeo-darkMuted" : "text-neutral-500"}
            >
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
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className={cn(
                      "hover:underline",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                    )}
                  >
                    Home
                  </button>
                </li>
                <li
                  className={
                    darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                  }
                >
                  /
                </li>
                <li>
                  <button
                    onClick={() => navigate("/products")}
                    className={cn(
                      "hover:underline",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                    )}
                  >
                    Products
                  </button>
                </li>
                <li
                  className={
                    darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                  }
                >
                  /
                </li>
                <li className="font-medium truncate max-w-xs">
                  {product.name}
                </li>
              </ol>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              {/* Product Images */}
              <div className="lg:w-1/2">
                <div className="flex flex-col gap-4">
                  <div className="relative overflow-hidden rounded-lg shadow-lg border border-opacity-20">
                    {product.available === false && (
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-red-500 text-white">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className={cn(
                        "w-full h-96 object-contain",
                        darkMode
                          ? "border-homeo-darkBorder"
                          : "border-homeo-softPeach"
                      )}
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "rounded-full bg-opacity-80 hover:bg-opacity-100 border-0",
                          darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                        )}
                        onClick={() => toast.success("Added to wishlist")}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "rounded-full bg-opacity-80 hover:bg-opacity-100 border-0",
                          darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                        )}
                        onClick={() =>
                          toast.success("Link copied to clipboard")
                        }
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                          "w-20 h-20 rounded border-2 transition-all",
                          selectedImage === index
                            ? darkMode
                              ? "border-homeo-tertiary"
                              : "border-homeo-primary"
                            : darkMode
                            ? "border-homeo-darkBorder"
                            : "border-homeo-softPeach"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - view ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1
                    className={cn(
                      "text-3xl font-serif mr-2",
                      darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                    )}
                  >
                    {product.name}
                  </h1>
                  {product.isNew && (
                    <Badge
                      className={cn(
                        darkMode
                          ? "bg-homeo-tertiary text-homeo-darkText"
                          : "bg-homeo-primary text-white"
                      )}
                    >
                      New
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-amber-500 text-white">
                      Bestseller
                    </Badge>
                  )}
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-none text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm line-through",
                        darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                      )}
                    >
                      ₹ {parseFloat(product.originalPrice).toFixed(2)}
                    </span>
                    <span
                      className={cn(
                        "text-2xl font-medium",
                        darkMode ? "text-homeo-darkText" : "text-homeo-primary"
                      )}
                    >
                      ₹ {parseFloat(product.price).toFixed(2)}
                    </span>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      Save{" "}
                      {calculateDiscount(
                        parseFloat(product.originalPrice),
                        parseFloat(product.price)
                      )}
                      %
                    </span>
                  </div>
                  <p className="text-xs mt-1 text-green-600">In Stock</p>
                </div>

                <p
                  className={cn(
                    "mb-6",
                    darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                  )}
                >
                  {product.description ||
                    "Indulge in the luxury of our natural handmade soaps, crafted with care for your skin."}
                </p>

                <div className="mb-6 grid grid-cols-2 gap-3">
                  <p
                    className={cn(
                      "text-sm flex items-center",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                    )}
                  >
                    <strong className="mr-2">Skin Type:</strong>{" "}
                    {product.skinType || "All"}
                  </p>
                  <p
                    className={cn(
                      "text-sm flex items-center",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                    )}
                  >
                    <strong className="mr-2">Ingredients:</strong>{" "}
                    {product.ingredient || "Natural"}
                  </p>
                  <p
                    className={cn(
                      "text-sm flex items-center",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                    )}
                  >
                    <strong className="mr-2">Fragrance:</strong>{" "}
                    {product.fragrance || "Unscented"}
                  </p>
                  <p
                    className={cn(
                      "text-sm flex items-center",
                      darkMode ? "text-homeo-darkMuted" : "text-neutral-500"
                    )}
                  >
                    <strong className="mr-2">Weight:</strong>{" "}
                    {product.weight || "100g"}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center flex-wrap gap-4">
                    <div
                      className={cn(
                        "flex items-center border rounded-md",
                        darkMode
                          ? "border-homeo-darkBorder"
                          : "border-homeo-softPeach"
                      )}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className={cn(
                          "h-10 w-10 rounded-none",
                          darkMode
                            ? "text-homeo-darkText hover:bg-homeo-tertiary"
                            : "text-homeo-primary hover:bg-homeo-softPurple"
                        )}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={increaseQuantity}
                        className={cn(
                          "h-10 w-10 rounded-none",
                          darkMode
                            ? "text-homeo-darkText hover:bg-homeo-tertiary"
                            : "text-homeo-primary hover:bg-homeo-softPurple"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      className={cn(
                        "flex-1",
                        darkMode
                          ? "bg-homeo-tertiary text-homeo-dark hover:bg-homeo-tertiary"
                          : "bg-homeo-primary text-white hover:bg-homeo-secondary"
                      )}
                      onClick={() => handleAddToCart(product, quantity)}
                      disabled={product.available === false}
                    >
                      {product.available === false
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <TruckIcon className="h-5 w-5 text-homeo-primary dark:text-homeo-tertiary" />
                      <div>
                        <p className="text-sm font-medium">Free Shipping</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {product.shipping}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-homeo-primary dark:text-homeo-tertiary" />
                      <div>
                        <p className="text-sm font-medium">30-Day Returns</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Hassle-free returns policy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3
                    className={cn(
                      "text-lg font-medium mb-2",
                      darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                    )}
                  >
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-homeo-primary dark:text-homeo-tertiary" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mb-12">
              <Tabs defaultValue="description" className="w-full">
                <TabsList
                  className={cn(
                    "w-full border-b rounded-none justify-start",
                    darkMode
                      ? "bg-homeo-darkBg border-homeo-darkBorder"
                      : "bg-white border-gray-200"
                  )}
                >
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-homeo-primary dark:data-[state=active]:border-homeo-tertiary"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="howToUse"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-homeo-primary dark:data-[state=active]:border-homeo-tertiary"
                  >
                    How to Use
                  </TabsTrigger>
                  <TabsTrigger
                    value="ingredients"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-homeo-primary dark:data-[state=active]:border-homeo-tertiary"
                  >
                    Ingredients
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-homeo-primary dark:data-[state=active]:border-homeo-tertiary"
                  >
                    Reviews ({product.reviews})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="py-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      {product.description ||
                        "Our handcrafted soaps are made with the finest natural ingredients."}
                    </p>
                    <p className="mt-4">
                      Unlike mass-produced soaps, our soaps maintain your skin's
                      natural moisture balance.
                    </p>
                    <p className="mt-4">
                      Eco-friendly, biodegradable, and cruelty-free with
                      recyclable packaging.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="howToUse" className="py-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Directions for Use</h3>
                    <ol className="list-decimal ml-5">
                      <li>Wet your hands and the soap with warm water.</li>
                      <li>Rub the soap to create a rich lather.</li>
                      <li>Massage gently in circular motions.</li>
                      <li>Rinse thoroughly.</li>
                      <li>Store in a dry soap dish.</li>
                    </ol>
                    <p className="mt-4">
                      <strong>Pro tip:</strong> {product.usageDirections}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="ingredients" className="py-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Full Ingredients List</h3>
                    <p>
                      Saponified oils (Olive oil, Coconut oil, Sustainable Palm
                      oil), Shea butter, Essential oils, Natural colorants,
                      Vitamin E.
                    </p>
                    <p className="mt-4">
                      <strong>Free from:</strong> Parabens, Sulfates,
                      Phthalates, Synthetic fragrances.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                      * Ingredients may vary. Refer to packaging.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="py-4">
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <h3 className="text-2xl font-bold">{product.rating}</h3>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3 h-3",
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-none text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-xs mt-1">
                          {product.reviews} reviews
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs w-6">{star} ★</span>
                              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400"
                                  style={{
                                    width: `${
                                      totalReviews > 0
                                        ? ratingPercentages[star - 1]
                                        : 0
                                    }%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs w-8">
                                {totalReviews > 0
                                  ? Math.round(ratingPercentages[star - 1])
                                  : 0
                                }%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Form */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">
                        Write a Review
                      </h3>
                      {reviewStep === 1 && (
                        <div>
                          <label className="text-sm font-medium">
                            Select Rating
                          </label>
                          <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingSelect(star)}
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center",
                                  newReview.rating >= star
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                )}
                              >
                                <Star
                                  className={cn(
                                    "w-6 h-6",
                                    newReview.rating >= star
                                      ? "fill-yellow-400"
                                      : "fill-none"
                                  )}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {reviewStep === 2 && (
                        <form
                          onSubmit={handleCommentSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label className="text-sm font-medium">
                              Your Comment
                            </label>
                            <Textarea
                              value={newReview.comment}
                              onChange={(e) =>
                                setNewReview({
                                  ...newReview,
                                  comment: e.target.value,
                                })
                              }
                              placeholder="Share your experience with this product"
                              required
                              className={cn(
                                darkMode
                                  ? "bg-homeo-darkBg border-homeo-darkBorder"
                                  : "bg-white border-homeo-softPeach"
                              )}
                            />
                          </div>
                          <Button
                            type="submit"
                            className={cn(
                              darkMode
                                ? "bg-homeo-tertiary text-homeo-darkText hover:bg-homeo-tertiary"
                                : "bg-homeo-primary text-white hover:bg-homeo-secondary"
                            )}
                          >
                            Next
                          </Button>
                        </form>
                      )}
                      {reviewStep === 3 && (
                        <form
                          onSubmit={handleUserDetailsSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label className="text-sm font-medium">
                              First Name
                            </label>
                            <Input
                              value={newReview.firstName}
                              onChange={(e) =>
                                setNewReview({
                                  ...newReview,
                                  firstName: e.target.value,
                                })
                              }
                              placeholder="Your first name"
                              required
                              className={cn(
                                darkMode
                                  ? "bg-homeo-darkBg border-homeo-darkBorder"
                                  : "bg-white border-homeo-softPeach"
                              )}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Last Name
                            </label>
                            <Input
                              value={newReview.lastName}
                              onChange={(e) =>
                                setNewReview({
                                  ...newReview,
                                  lastName: e.target.value,
                                })
                              }
                              placeholder="Your last name"
                              required
                              className={cn(
                                darkMode
                                  ? "bg-homeo-darkBg border-homeo-darkBorder"
                                  : "bg-white border-homeo-softPeach"
                              )}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                              type="email"
                              value={newReview.email}
                              onChange={(e) =>
                                setNewReview({
                                  ...newReview,
                                  email: e.target.value,
                                })
                              }
                              placeholder="Your email"
                              required
                              className={cn(
                                darkMode
                                  ? "bg-homeo-darkBg border-homeo-darkBorder"
                                  : "bg-white border-homeo-softPeach"
                              )}
                            />
                          </div>
                          <Button
                            type="submit"
                            className={cn(
                              darkMode
                                ? "bg-homeo-tertiary text-homeo-darkText hover:bg-homeo-tertiary"
                                : "bg-homeo-primary text-white hover:bg-homeo-secondary"
                            )}
                          >
                            Submit Review
                          </Button>
                        </form>
                      )}
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviews.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No reviews yet. Be the first to review this product!
                        </p>
                      ) : (
                        reviews.map((review) => (
                          <div
                            key={review._id}
                            className="border-b pb-4 dark:border-gray-700"
                          >
                            <div className="flex justify-between">
                              <h4 className="font-medium">{`${review.firstName} ${review.lastName}`}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center my-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-3 h-3",
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-none text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-sm mt-2">{review.comment}</p>
                          </div>
                        ))
                      )}
                      {reviews.length > 3 && (
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full",
                            darkMode
                              ? "border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-tertiary"
                              : "border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple"
                          )}
                        >
                          View All {product.reviews} Reviews
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
              <div className="mb-12">
                <h2
                  className={cn(
                    "text-2xl font-serif mb-6",
                    darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                  )}
                >
                  You Might Also Like
                </h2>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {recommendedProducts.map((recommendedProduct) => (
                    <ProductCard
                      key={recommendedProduct.id || recommendedProduct._id}
                      product={recommendedProduct}
                      viewMode="grid"
                      darkMode={darkMode}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Cart Overlay */}
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

export default ProductPage;