import { Layout } from "../components/Layout";
import ProductFilters from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";
import ViewToggle from "../components/ViewToggle";
import { useState } from "react";

export default function Products() {
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const [currentSort, setCurrentSort] = useState("featured");

  return (
    <Layout>
      <div className="pl-0 md:pl-64 p-6">
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
            {/* Product cards will be rendered here */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
