import {
  Plus,
  Download,
  Edit,
  Trash2,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

const ManageProducts = ({
  darkMode,
  searchQuery,
  sortConfig,
  setSortConfig,
  currentPage,
  setCurrentPage,
  filterStatus,
  setFilterStatus,
  setShowProductModal,
  setActiveProduct,
  setProductForm,
  setProductToDelete,
  setShowConfirmDelete,
  products,
  refreshProducts,
  loading,
  error,
}) => {
  const itemsPerPage = 5;

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!filterStatus || product.status === filterStatus)
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortConfig.direction === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
        return sortConfig.direction === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }
      return 0;
    });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const exportToCSV = (data, filename) => {
    const headers = [
      "id,name,price,stock,status,skinType,ingredient,fragrance,badges,sales,images,howToUse",
    ].join(",");
    const rows = data
      .map((item) =>
        [
          item._id,
          `"${item.name.replace(/"/g, '""')}"`,
          item.price,
          item.stock,
          item.status,
          item.skinType,
          `"${item.ingredient.replace(/"/g, '""')}"`,
          `"${item.fragrance.replace(/"/g, '""')}"`,
          `"${item.badges.join(";").replace(/"/g, '""')}"`,
          item.sales || 0,
          `"${item.images.join(";").replace(/"/g, '""')}"`,
          `"${(item.howToUse || "").replace(/"/g, '""')}"`,
        ].join(",")
      )
      .join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEditProduct = (product) => {
    if (!product._id) {
      console.error("Product has no _id:", product);
      return;
    }
    setActiveProduct({ ...product, id: product._id });
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      skinType: product.skinType,
      ingredient: product.ingredient,
      fragrance: product.fragrance,
      badges: product.badges,
      images: product.images,
      imageFiles: [],
      howToUse: product.howToUse || "",
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = (product) => {
    if (!product._id) {
      console.error("Product has no _id:", product);
      return;
    }
    setProductToDelete({ ...product, id: product._id });
    setShowConfirmDelete(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-semibold">Products</h1>
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`rounded-md border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            } px-3 py-2 text-sm`}
          >
            <option value="">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button
            onClick={() => {
              setActiveProduct(null);
              setProductForm({
                name: "",
                price: "",
                stock: "",
                description: "",
                skinType: "",
                ingredient: "",
                fragrance: "",
                badges: [],
                images: [],
                imageFiles: [],
                howToUse: "",
              });
              setShowProductModal(true);
            }}
            className={`flex items-center px-3 py-2 rounded-md ${
              darkMode
                ? "bg-green-600 hover:bg-green-500"
                : "bg-green-500 hover:bg-green-600"
            } text-white text-sm`}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </button>
          <button
            onClick={() => exportToCSV(products, "products.csv")}
            className={`flex items-center px-3 py-2 rounded-md ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } text-sm`}
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
          <button
            onClick={refreshProducts}
            className={`flex items-center px-3 py-2 rounded-md ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } text-sm`}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-6">
          <div
            className={`w-8 h-8 border-4 border-t-transparent ${
              darkMode ? "border-gray-300" : "border-gray-600"
            } rounded-full animate-spin`}
          ></div>
        </div>
      )}
      {error && (
        <div
          className={`p-4 rounded-md ${
            darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-900"
          }`}
        >
          {error}
          <button
            onClick={refreshProducts}
            className={`ml-4 px-3 py-1 rounded-md ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white text-sm`}
          >
            Try Again
          </button>
        </div>
      )}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-6">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No products found.
          </p>
        </div>
      )}
      {!loading && !error && products.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`text-left ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <tr>
                  <th className="px-6 py-3 text-sm font-medium">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("name")}
                    >
                      Product <ArrowUpDown className="w-4 h-4 ml-2" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-sm font-medium">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("price")}
                    >
                      Price <ArrowUpDown className="w-4 h-4 ml-2" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-sm font-medium">
                    <button
                      className="flex items-center"
                      onClick={() => handleSort("stock")}
                    >
                      Stock <ArrowUpDown className="w-4 h-4 ml-2" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr
                    key={product._id}
                    className={`border-b ${
                      darkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <td className="px-6 py-4 flex items-center space-x-3">
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className={`p-1 rounded-md ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <Edit
                          className={`w-5 h-5 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className={`p-1 rounded-md ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                      >
                        <Trash2
                          className={`w-5 h-5 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : darkMode
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
