import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { parseBadges } from "./badgeUtils";

// Utility function to generate slug from product name
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const ProductCard = ({ product, viewMode, darkMode, handleAddToCart }) => {
  const [reviewData, setReviewData] = useState({
    avgRating: product.rating !== undefined ? parseFloat(product.rating) : 0,
    totalReviews: product.reviews !== undefined ? product.reviews : 0,
    isLoading: true,
  });

  const processedBadges = parseBadges(product.badges);
  const productId = product._id || product.id;
  const slug = product.slug || generateSlug(product.name);

  useEffect(() => {
    if (!productId) {
      console.warn("Product ID is undefined for product:", product);
    } else {
      console.log("Product ID:", productId, "Slug:", slug);
    }
  }, [productId, slug]);

  useEffect(() => {
    const fetchReviewData = async () => {
      if (!productId) return;

      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const reviewsResponse = await fetch(
          `${apiUrl}/api/reviews/${productId}`
        );

        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();

          if (reviewsData && reviewsData.length > 0) {
            const totalRating = reviewsData.reduce(
              (sum, review) => sum + review.rating,
              0
            );
            const avgRating = totalRating / reviewsData.length;

            setReviewData({
              avgRating: parseFloat(avgRating.toFixed(1)),
              totalReviews: reviewsData.length,
              isLoading: false,
            });
          } else {
            setReviewData({
              avgRating: 0,
              totalReviews: 0,
              isLoading: false,
            });
          }
        } else {
          console.error("Failed to fetch reviews:", reviewsResponse.status);
          setReviewData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
        setReviewData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchReviewData();
  }, [productId]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(reviewData.avgRating);
    const hasHalfStar = reviewData.avgRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              darkMode
                ? "text-homeo-primary fill-homeo-primary"
                : "text-homeo-primary fill-homeo-primary"
            )}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className={cn(
              "w-4 h-4",
              darkMode
                ? "text-homeo-primary fill-homeo-primary"
                : "text-homeo-primary fill-homeo-primary"
            )}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              darkMode ? "text-homeo-darkMuted" : "text-gray-300"
            )}
          />
        );
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        viewMode === "grid" ? "w-full max-w-sm" : "w-full max-w-3xl",
        "mx-auto"
      )}
    >
      <Card
        className={cn(
          "flex",
          viewMode === "grid" ? "flex-col h-[500px]" : "flex-row h-[200px]",
          "shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden",
          darkMode
            ? "bg-dark hover:dark:bg-homeo-dark/50 hover:border-homeo-softGreen transition-all border-homeo-darkBorder"
            : "bg-white border-gray-200"
        )}
      >
        <div
          className={cn(
            viewMode === "grid" ? "w-full h-52" : "w-2/5 h-full",
            "flex-shrink-0"
          )}
        >
          <div className="relative w-full h-full">
            {productId ? (
              <Link to={`/products/${slug}`} state={{ productId }}>
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.png"}
                  alt={product.name}
                  className={cn(
                    "w-full h-full object-contain",
                    "hover:opacity-90 transition-opacity duration-200"
                  )}
                />
              </Link>
            ) : (
              <img
                src="/placeholder.png"
                alt={product.name}
                className={cn(
                  "w-full h-full object-contain"
                )}
              />
            )}
            {(product.isBestSeller || product.isNew) && (
              <Badge
                className={cn(
                  "absolute top-2 right-2 text-sm font-semibold uppercase px-2.5 py-1",
                  product.isBestSeller
                    ? darkMode
                      ? "bg-homeo-primary text-white"
                      : "bg-homeo-primary text-white"
                    : darkMode
                    ? "bg-homeo-secondary text-white"
                    : "bg-homeo-secondary text-white"
                )}
              >
                {product.isBestSeller ? "Best Seller" : "New Arrival"}
              </Badge>
            )}
          </div>
        </div>
        <div
          className={cn(
            viewMode === "grid" ? "w-full flex-1" : "w-3/5 flex-1",
            "flex flex-col"
          )}
        >
          <CardContent
            className={cn(
              "flex-grow",
              viewMode === "grid" ? "pt-4 px-4" : "p-4"
            )}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                {productId ? (
                  <Link to={`/products/${slug}`} state={{ productId }}>
                    <CardTitle
                      className={cn(
                        "font-serif text-lg hover:underline truncate",
                        darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                      )}
                    >
                      {product.name}
                    </CardTitle>
                  </Link>
                ) : (
                  <CardTitle
                    className={cn(
                      "font-serif text-lg truncate",
                      darkMode ? "text-homeo-darkText" : "text-homeo-dark"
                    )}
                  >
                    {product.name}
                  </CardTitle>
                )}
                <p
                  className={cn(
                    "text-sm mt-1 line-clamp-2",
                    darkMode ? "text-homeo-darkMuted" : "text-gray-600"
                  )}
                >
                  {product.description || "No description available"}
                </p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span
                  className={cn(
                    "text-lg font-semibold",
                    darkMode ? "text-homeo-primary" : "text-homeo-primary"
                  )}
                >
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span
                    className={cn(
                      "text-sm line-through",
                      darkMode ? "text-homeo-darkMuted" : "text-gray-400"
                    )}
                  >
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center">
                {renderStars()}
                <span
                  className={cn(
                    "text-sm ml-2",
                    darkMode ? "text-homeo-darkMuted" : "text-gray-500"
                  )}
                >
                  {reviewData.isLoading ? (
                    "Loading..."
                  ) : (
                    `${reviewData.avgRating} (${reviewData.totalReviews} ${
                      reviewData.totalReviews === 1 ? "review" : "reviews"
                    })`
                  )}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 max-w-full">
                {processedBadges.slice(0, 3).map((badge, index) => (
                  <Badge
                    key={`${badge}-${index}`}
                    variant="outline"
                    className={cn(
                      "text-sm font-semibold uppercase px-2.5 py-1 rounded-full",
                      darkMode
                        ? "border-homeo-primary text-homeo-primary bg-homeo-primary/20"
                        : "border-homeo-primary text-homeo-primary bg-homeo-softPurple"
                    )}
                  >
                    {badge}
                  </Badge>
                ))}
                {processedBadges.length > 3 && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm font-semibold uppercase px-2.5 py-1 rounded-full",
                      darkMode
                        ? "border-homeo-primary text-homeo-primary bg-homeo-primary/20"
                        : "border-homeo-primary text-homeo-primary bg-homeo-softPurple"
                    )}
                  >
                    +{processedBadges.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter
            className={cn(
              "pt-0 pb-4 px-4",
              viewMode === "grid" ? "justify-end" : "justify-start"
            )}
          >
            <Button
              size="sm"
              onClick={() => handleAddToCart(product)}
              className={cn(
                darkMode
                  ? "bg-homeo-primary hover:bg-homeo-secondary text-white"
                  : "bg-homeo-primary hover:bg-homeo-secondary text-white"
              )}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;