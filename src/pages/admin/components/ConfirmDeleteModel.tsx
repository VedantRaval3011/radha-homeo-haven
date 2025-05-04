import { Trash2, X } from "lucide-react";
import { useState } from "react";

const ConfirmDeleteModal = ({
  darkMode,
  showConfirmDelete,
  setShowConfirmDelete,
  productToDelete,
  onConfirmDelete
}) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!productToDelete) {
      setError("No product selected for deletion.");
      return;
    }
    if (!productToDelete._id) {
      console.error("Product to delete has no _id:", productToDelete);
      setError("Cannot delete product: Invalid product ID.");
      return;
    }

    try {
      const deleteUrl = `http://localhost:8000/api/admin/products/${productToDelete._id}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
        credentials: "include",
      });


      // Check for JSON response
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON, but received ${contentType || "no content-type"}. Response starts with: ${text.slice(0, 50)}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete product (Status: ${response.status})`);
      }

      setError(null);
      onConfirmDelete();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message || "An error occurred while deleting the product.");
    }
  };

  if (!showConfirmDelete || !productToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className={`relative w-full max-w-md rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-serif font-medium">Confirm Delete</h2>
          <button
            onClick={() => setShowConfirmDelete(false)}
            className={`p-1 rounded-md hover:bg-opacity-70 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {error && (
            <div className={`p-3 rounded-md ${darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-900"} mb-4`}>
              {error}
            </div>
          )}
          <div className="flex items-center justify-center mb-4">
            <div className={`rounded-full p-3 ${darkMode ? "bg-red-900" : "bg-red-100"}`}>
              <Trash2 className={`w-8 h-8 ${darkMode ? "text-red-300" : "text-red-600"}`} />
            </div>
          </div>
          <p className="text-center mb-6">
            Are you sure you want to delete <span className="font-medium">{productToDelete.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className={`px-4 py-2 border rounded-md ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className={`px-4 py-2 rounded-md ${
                darkMode
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;