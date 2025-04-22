
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSortProps {
  currentSort: string;
  onSortChange: (option: string) => void;
}

export default function ProductSort({ currentSort, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Sort By:</span>
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Featured" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="name-a-z">Name: A to Z</SelectItem>
          <SelectItem value="name-z-a">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
