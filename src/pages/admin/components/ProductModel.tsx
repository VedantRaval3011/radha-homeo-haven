import { useState, useRef } from "react";
import { X, Plus, Save, Upload, Image as ImageIcon } from "lucide-react";

const ProductModal = ({
  darkMode,
  showProductModal,
  setShowProductModal,
  activeProduct,
  productForm,
  setProductForm,
  refreshProducts
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImages, setPreviewImages] = useState(activeProduct?.images || []);
  const [availableBadges] = useState([
    "100% Natural", "Handmade", "Vegan", "Luxury", "Detox", "Relaxing"
  ]);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    // Update form with files
    setProductForm(prev => ({ ...prev, imageFiles: [...(prev.imageFiles || []), ...files] }));

    // Create previews
    const newPreviews = files.map(file => {
      const reader = new FileReader();
      return new Promise<string | ArrayBuffer | null>((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then(results => {
      setPreviewImages(prev => [...prev, ...results]);
    });
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setProductForm(prev => ({
      ...prev,
      imageFiles: prev.imageFiles?.filter((_, i) => i !== index) || []
    }));
  };

  const handleBadgeToggle = (badge) => {
    setProductForm(prev => {
      const badges = [...prev.badges];
      if (badges.includes(badge)) {
        return { ...prev, badges: badges.filter(b => b !== badge) };
      } else {
        return { ...prev, badges: [...badges, badge] };
      }
    });
  };

  const calculateStatus = (stock) => {
    const stockNum = parseInt(stock);
    if (stockNum <= 0) return "Out of Stock";
    if (stockNum <= 10) return "Low Stock";
    return "In Stock";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (activeProduct && !activeProduct._id) {
        throw new Error("Cannot update product: Invalid product ID.");
      }

      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("price", parseFloat(productForm.price).toString());
      formData.append("stock", parseInt(productForm.stock).toString());
      formData.append("skinType", productForm.skinType);
      formData.append("ingredient", productForm.ingredient);
      formData.append("fragrance", productForm.fragrance);
      formData.append("badges", JSON.stringify(productForm.badges));
      formData.append("description", productForm.description);
      formData.append("howToUse", productForm.howToUse || "");
      formData.append("status", calculateStatus(productForm.stock));

      // Append new image files
      if (productForm.imageFiles?.length) {
        productForm.imageFiles.forEach(file => {
          formData.append("images", file);
        });
      }
      // If editing and no new images, send existing image URLs
      else if (activeProduct?.images?.length) {
        formData.append("imageUrls", JSON.stringify(activeProduct.images));
      }

      const url = activeProduct
        ? `http://localhost:8000/api/admin/products/${activeProduct._id}`
        : "http://localhost:8000/api/admin/products";

      const method = activeProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to save product (Status: ${response.status})`);
      }

      setShowProductModal(false);
      setProductForm({
        name: "", price: "", stock: "", description: "", skinType: "", 
        ingredient: "", fragrance: "", badges: [], imageFiles: [], howToUse: ""
      });
      setPreviewImages([]);
      refreshProducts();
    } catch (err) {
      setError(err.message || "An error occurred while saving the product.");
    } finally {
      setLoading(false);
    }
  };

  if (!showProductModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-serif font-medium">
            {activeProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={() => setShowProductModal(false)}
            className={`p-1 rounded-md hover:bg-opacity-70 ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className={`p-3 rounded-md ${darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-900"}`}>
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                required
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={productForm.stock}
                onChange={handleInputChange}
                required
                min="0"
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skin Type</label>
              <select
                name="skinType"
                value={productForm.skinType}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              >
                <option value="">Select Skin Type</option>
                <option value="Normal">Normal</option>
                <option value="Dry">Dry</option>
                <option value="Oily">Oily</option>
                <option value="Sensitive">Sensitive</option>
                <option value="Combination">Combination</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Main Ingredient</label>
              <input
                type="text"
                name="ingredient"
                value={productForm.ingredient}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fragrance</label>
              <input
                type="text"
                name="fragrance"
                value={productForm.fragrance}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Product Images</label>
              <div className="flex flex-col items-start gap-4">
                {/* Image Previews */}
                <div className="flex flex-wrap gap-4">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className={`w-24 h-24 rounded-lg object-cover border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={`absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {previewImages.length === 0 && (
                    <div className={`w-24 h-24 rounded-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} flex items-center justify-center`}>
                      <div className="flex flex-col items-center">
                        <ImageIcon className={`w-8 h-8 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                        <span className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No images</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Upload controls */}
                <div className="flex-1 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`flex items-center px-4 py-2 rounded-md mb-2 w-full ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </button>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">How to Use</label>
              <textarea
                name="howToUse"
                value={productForm.howToUse || ""}
                onChange={handleInputChange}
                rows={3}
                className={`w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} px-3 py-2 text-sm`}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Product Badges</label>
              <div className="flex flex-wrap gap-2">
                {availableBadges.map(badge => (
                  <button
                    type="button"
                    key={badge}
                    onClick={() => handleBadgeToggle(badge)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      productForm.badges.includes(badge)
                        ? darkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white"
                        : darkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowProductModal(false)}
              className={`px-4 py-2 border rounded-md ${
                darkMode
                  ? "border-gray-600 hover:bg-gray-700"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center px-4 py-2 rounded-md ${
                darkMode
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              ) : activeProduct ? (
                <Save className="w-4 h-4 mr-2" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {activeProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;