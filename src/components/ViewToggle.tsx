
import React from "react";
import { Grid2X2, List } from "lucide-react";

interface ViewToggleProps {
  currentView: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <button
        className={`p-2 ${
          currentView === "grid"
            ? "bg-homeo-primary text-white"
            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        onClick={() => onViewChange("grid")}
        aria-label="Grid view"
      >
        <Grid2X2 className="h-5 w-5" />
      </button>
      <button
        className={`p-2 ${
          currentView === "list"
            ? "bg-homeo-primary text-white"
            : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        onClick={() => onViewChange("list")}
        aria-label="List view"
      >
        <List className="h-5 w-5" />
      </button>
    </div>
  );
}
