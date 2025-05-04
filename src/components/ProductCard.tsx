
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    badges: string[];
    ingredients: string[];
    skinType: string;
    isNew: boolean;
    bestSeller: boolean;
  };
  viewMode: "grid" | "list";
}

export default function ProductCard({ product, viewMode }: ProductProps) {
  const isGrid = viewMode === "grid";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className={`overflow-hidden h-full homeo-card border-2 border-transparent hover:border-homeo-secondary transition-all duration-300 ${isGrid ? '' : 'flex'}`}>
        <div className={`relative ${isGrid ? 'w-full aspect-square' : 'w-1/3'}`}>
          {/* Product image */}
          <div className={`${product.image} h-full flex items-center justify-center`}>
            <span className="text-5xl">🧼</span>
          </div>
          
          {/* Overlay badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-homeo-tertiary">New</Badge>
            )}
            {product.bestSeller && (
              <Badge className="bg-homeo-primary">Best Seller</Badge>
            )}
          </div>
          
          {/* Quick action buttons */}
          <div className="absolute top-2 right-2">
            <button className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-homeo-secondary hover:text-white transition-all duration-300">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <CardContent className={`p-4 ${isGrid ? '' : 'w-2/3'}`}>
          <div className="mb-1 flex items-center">
            <div className="flex text-yellow-400">
              {Array(Math.floor(product.rating)).fill(0).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              {product.rating % 1 > 0 && (
                <span className="relative">
                  <Star className="h-4 w-4 stroke-yellow-400" />
                  <Star className="absolute top-0 left-0 h-4 w-4 fill-current clip-path-half" />
                </span>
              )}
              {Array(5 - Math.ceil(product.rating)).fill(0).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-gray-300" />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
          </div>
          
          <Link to={`/products/${product.id}`} className="block mb-2">
            <h3 className="font-semibold text-lg hover:text-homeo-primary transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          
          {(!isGrid || (isGrid && product.description.length < 80)) && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {isGrid 
                ? (product.description.length > 80 
                    ? product.description.substring(0, 80) + '...' 
                    : product.description)
                : product.description
              }
            </p>
          )}
          
          {!isGrid && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.badges.map((badge) => (
                <Badge key={badge} variant="outline" className="bg-homeo-softBlue text-homeo-primary">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold text-homeo-primary text-lg">${product.price.toFixed(2)}</span>
            
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-homeo-softBlue hover:bg-homeo-primary hover:text-white transition-all duration-300">
                <ShoppingCart className="h-4 w-4" />
              </button>
              
              <Link to={`/products/${product.id}`} className="homeo-button py-2 px-4 flex items-center gap-1">
                <span>Details</span>
                <Plus className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
