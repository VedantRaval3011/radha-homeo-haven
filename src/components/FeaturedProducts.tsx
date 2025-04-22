
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Arnica Montana 30C",
    price: 12.99,
    description: "For bruises, muscle soreness, and injuries",
    image: "bg-homeo-softBlue"
  },
  {
    id: 2,
    name: "Allergy Relief Kit",
    price: 29.99,
    description: "Comprehensive homeopathic remedies for seasonal allergies",
    image: "bg-homeo-softPurple"
  },
  {
    id: 3,
    name: "Digestive Support Drops",
    price: 18.50,
    description: "Natural remedy for digestive discomfort and bloating",
    image: "bg-homeo-softPeach"
  },
  {
    id: 4,
    name: "Stress & Anxiety Relief",
    price: 15.99,
    description: "Calm mind and reduce anxiety with this natural formula",
    image: "bg-homeo-softYellow"
  }
];

export function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Number of products visible at a time based on screen size
  const slidesToShow = 3;
  
  // Create an array of visible products based on currentIndex
  const visibleProducts = [];
  for (let i = 0; i < slidesToShow; i++) {
    const productIndex = (currentIndex + i) % products.length;
    visibleProducts.push(products[productIndex]);
  }

  return (
    <section id="products" className="homeo-section pl-0 md:pl-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-4 md:mb-0 animate-fade-in">
            <h2 className="homeo-heading">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Explore our selection of high-quality homeopathic remedies for various health concerns.
            </p>
          </div>
          
          <div className="flex space-x-2 animate-fade-in">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-homeo-softBlue hover:border-homeo-primary text-gray-700 dark:text-gray-300 transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-homeo-softBlue hover:border-homeo-primary text-gray-700 dark:text-gray-300 transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="homeo-card group animate-scale-in dark:bg-gray-800 dark:border dark:border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${product.image} dark:bg-homeo-dark/20 h-48 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                {/* Product image placeholder */}
                <div className="text-5xl">💊</div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-homeo-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button className="p-3 bg-white rounded-full hover:bg-homeo-softBlue transition-colors duration-300">
                    <Eye className="h-5 w-5 text-homeo-primary" />
                  </button>
                  <button className="p-3 bg-white rounded-full hover:bg-homeo-softBlue transition-colors duration-300">
                    <ShoppingCart className="h-5 w-5 text-homeo-primary" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-homeo-primary dark:text-white transition-colors duration-300">
                {product.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-homeo-primary dark:text-homeo-light font-bold">
                  ${product.price.toFixed(2)}
                </span>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-2 text-sm bg-homeo-softBlue dark:bg-homeo-dark/30 text-homeo-primary dark:text-homeo-light rounded-lg hover:bg-homeo-primary hover:text-white dark:hover:bg-homeo-secondary transition-colors duration-300">
                    Add to Cart
                  </button>
                  <button className="px-3 py-2 text-sm bg-homeo-primary text-white rounded-lg hover:bg-homeo-secondary transition-colors duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
