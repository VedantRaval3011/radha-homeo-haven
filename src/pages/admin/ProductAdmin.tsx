import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ManageProducts from "./components/ManageProducts.tsx";
import ManageOrders from "./components/ManageOrders.tsx";
import ManageCustomers from "./components/ManageCustomers.tsx";
import Settings from "./components/Settings.tsx";
import ProductModal from "./components/ProductModel.tsx";
import ConfirmDeleteModal from "./components/ConfirmDeleteModel.tsx";

const AdminPortal = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order #1089 received", time: "5 minutes ago", read: false },
    { id: 2, message: "Low stock alert: Neem & Tulsi Soap", time: "3 hours ago", read: false },
    { id: 3, message: "Payment received for order #1088", time: "Yesterday", read: true },
  ]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "", price: "", stock: "", description: "", skinType: "", ingredient: "", fragrance: "", badges: [], image: "",
  });

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("adminDarkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
      document.documentElement.classList.toggle("dark", JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminDarkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      // Log response status and headers for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.log("Response text:", text.slice(0, 200)); // Log first 200 chars
        throw new Error(`Expected JSON, but received ${contentType || "no content-type"}. Response starts with: ${text.slice(0, 50)}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch products (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "An error occurred while fetching products. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`flex min-h-screen ${darkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar
        darkMode={darkMode}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          markAllAsRead={markAllAsRead}
          unreadCount={unreadCount}
        />
        <main className="p-6">
          {activeTab === "dashboard" && (
            <Dashboard darkMode={darkMode} searchQuery={searchQuery} setActiveTab={setActiveTab} />
          )}
          {activeTab === "products" && (
            <ManageProducts
              darkMode={darkMode}
              searchQuery={searchQuery}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              setShowProductModal={setShowProductModal}
              setActiveProduct={setActiveProduct}
              setProductForm={setProductForm}
              setProductToDelete={setProductToDelete}
              setShowConfirmDelete={setShowConfirmDelete}
              products={products}
              refreshProducts={fetchProducts}
              loading={loading}
              error={error}
            />
          )}
          {activeTab === "orders" && (
            <ManageOrders
              darkMode={darkMode}
              searchQuery={searchQuery}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          )}
          {activeTab === "customers" && (
            <ManageCustomers
              darkMode={darkMode}
              searchQuery={searchQuery}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          {activeTab === "settings" && <Settings darkMode={darkMode} />}
          <ProductModal
            darkMode={darkMode}
            showProductModal={showProductModal}
            setShowProductModal={setShowProductModal}
            activeProduct={activeProduct}
            productForm={productForm}
            setProductForm={setProductForm}
            refreshProducts={fetchProducts}
          />
          <ConfirmDeleteModal
            darkMode={darkMode}
            showConfirmDelete={showConfirmDelete}
            setShowConfirmDelete={setShowConfirmDelete}
            productToDelete={productToDelete}
            onConfirmDelete={() => {
              setShowConfirmDelete(false);
              setProductToDelete(null);
              fetchProducts();
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;