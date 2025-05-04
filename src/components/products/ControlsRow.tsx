import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const ControlsRow = ({
  darkMode,
  showFilters,
  setShowFilters,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  activeFilterCount,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "mr-3",
            darkMode
              ? "border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-darkCard"
              : "border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple"
          )}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge
              className={cn(
                "ml-2",
                darkMode ? "bg-homeo-tertiary" : "bg-homeo-primary"
              )}
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger
            className={cn(
              "w-[180px]",
              darkMode
                ? "border-homeo-darkBorder bg-homeo-darkBg text-homeo-darkText focus:ring-homeo-tertiary"
                : "border-homeo-softPeach focus:ring-homeo-primary"
            )}
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent
            className={darkMode ? "bg-homeo-darkCard border-homeo-darkBorder" : ""}
          >
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Customer Rating</SelectItem>
            <SelectItem value="name-asc">A-Z</SelectItem>
            <SelectItem value="name-desc">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          onClick={() => setViewMode("grid")}
          className={cn(
            viewMode === "grid"
              ? darkMode
                ? "bg-homeo-tertiary text-homeo-darkBg hover:bg-homeo-primary"
                : "bg-homeo-primary text-white hover:bg-homeo-secondary"
              : darkMode
              ? "border-homeo-darkBorder text-homeo-darkText"
              : "border-homeo-softPeach text-homeo-primary"
          )}
          size="sm"
        >
          Grid
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          onClick={() => setViewMode("list")}
          className={cn(
            viewMode === "list"
              ? darkMode
                ? "bg-homeo-tertiary text-homeo-darkBg hover:bg-homeo-primary"
                : "bg-homeo-primary text-white hover:bg-homeo-secondary"
              : darkMode
              ? "border-homeo-darkBorder text-homeo-darkText"
              : "border-homeo-softPeach text-homeo-primary"
          )}
          size="sm"
        >
          List
        </Button>
      </div>
    </div>
  );
};

export default ControlsRow;