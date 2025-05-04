import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRoute from "./components/AdminRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/Products";
import ProductPage from "./components/products/ProductPage"; // Import ProductPage
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductAdmin from "./pages/admin/ProductAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<NotFound />} />
              <Route path="/homeopathy" element={<NotFound />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductPage />} /> {/* Add ProductPage route */}
              <Route path="/bookings" element={<NotFound />} />
              <Route path="/blog" element={<NotFound />} />
              <Route path="/testimonials" element={<NotFound />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductAdmin />} />
                {/* <Route path="/admin/blog" element={<ProductAdmin />} /> */}
                {/* <Route path="/admin/booking" element={<ProductAdmin />} /> */}
                {/* Add more admin routes here */}
              </Route>

              {/* Catch-all route for undefined paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;