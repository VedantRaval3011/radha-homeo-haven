import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Calendar,
  FileText,
  LogOut,
  Moon,
  Sun,
  X,
  Activity,
  Shield,
  Server, // Added for System Status
  Database, // Added for System Status
  Users, // Added for System Status (Auth Service)
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLandingPage() {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("Admin User"); // Example username
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Dark mode persistence
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("adminDarkMode");
    if (savedDarkMode !== null) {
      const isDark = JSON.parse(savedDarkMode);
      setDarkMode(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      // Default to dark mode if nothing is saved
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminDarkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Clock updater
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      // Simulate API call if needed, then clear local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_profile");
      setShowLogoutModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error (e.g., show a notification)
      alert("Failed to log out. Please try again.");
    }
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { y: -5, scale: 1.02, transition: { duration: 0.2 } }, // Added subtle scale on hover
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }, // Added exit transition
  };

  // Time and Date Formatting
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      // second: '2-digit', // Optionally add seconds
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      // year: 'numeric', // Optionally add year if needed frequently
    });
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300 font-sans`} // Added font-sans for consistency
    >
      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`sticky top-0 z-20 ${
          darkMode ? "bg-gray-800/90" : "bg-white/90"
        } border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm shadow-sm`} // Added shadow-sm
      >
        {/* Changed padding/container to be wider */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center"> {/* Increased vertical padding */}
          <div className="flex items-center space-x-6"> {/* Increased space */}
            <h1 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400"> {/* Increased font size */}
              Mitti Naturals Admin
            </h1>
            {/* Status moved slightly for better grouping */}
            {/* Increased font size and icon size */}
            <div className="hidden md:flex items-center text-base text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 pl-4 ml-2 space-x-3"> {/* Increased space */}
              <Activity className="w-5 h-5 text-emerald-500" /> {/* Increased icon size */}
              <span>Operational</span>
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <span className="font-medium">{formatTime(currentTime)}</span>
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <span>{formatDate(currentTime)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4"> {/* Increased space */}
            {/* Increased padding and ring size */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none" // Added focus ring
                  : "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none" // Added focus ring
              } transition-all duration-200`}
              title="Toggle Dark Mode"
              aria-label="Toggle Dark Mode"
            >
              {/* Increased icon size */}
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" /> // Slightly adjusted icon color for visibility
              ) : (
                <Moon className="w-6 h-6 text-emerald-600" />
              )}
            </button>
             {/* Increased padding, font size, and ring size */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className={`flex items-center space-x-3 px-5 py-2.5 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-emerald-500 focus:outline-none" // Added focus ring
                  : "bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none" // Added focus ring
              } transition-colors text-base font-medium`}
              title="Log Out"
              aria-label="Log Out"
            >
              {/* Increased icon size */}
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Now Full Width Edge-to-Edge */}
      <main className="flex-1 py-16 flex flex-col items-center w-full"> {/* Increased vertical padding, removed px-6, added w-full */}
        {/* Welcome Message Section (centered by items-center on main & mx-auto on p) */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center w-full max-w-5xl px-4 sm:px-6 lg:px-8" // Increased max-width, adjusted padding
        >
           {/* Increased font size */}
          <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
            Welcome, {username}!
          </h2>
           {/* Increased font size */}
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Manage your products, appointments, and content efficiently from this central hub.
          </p>
        </motion.div>

        {/* Card Grid Section (centered by items-center on main, limited by max-w-6xl) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          
            <motion.div
             variants={cardVariants}
             whileHover="hover"
              
             className={`p-8 rounded-lg shadow-lg ${
               darkMode
                 ? "bg-gray-800 border border-gray-700/50"
                 : "bg-white border border-gray-200/80"
             } cursor-pointer flex flex-col justify-between`}
             role="button"
             tabIndex={0}
             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigation('/admin/products')}
             onClick={() => handleNavigation('/admin/products')}
            >
            {/* ... card content remains the same ... */}
              <div> {/* Content wrapper */}
                 {/* Increased space */}
                <div className="flex items-center space-x-6 mb-5">
                 {/* Increased padding */}
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex-shrink-0">
                     {/* Increased icon size */}
                   <Package className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                 </div>
                 <div>
                     {/* Increased font size */}
                   <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                   Products
                   </h3>
                    {/* Increased font size */}
                   <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                   Manage inventory, pricing, and descriptions.
                   </p>
                 </div>
                </div>
              </div>
               {/* Increased padding, font size, and ring size/offset */}
              <button
                className="mt-5 w-full py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-emerald-500 transition-colors text-base font-medium"
                aria-label="Manage Products"
                onClick={(e) => { e.stopPropagation(); handleNavigation("/admin/products"); }}
                tabIndex={-1}
              >
                Manage Products
              </button>
            </motion.div>

          {/* Appointment Card */}
            <motion.div
             variants={cardVariants}
             whileHover="hover"
             className={`p-8 rounded-lg shadow-lg ${
               darkMode
                 ? "bg-gray-800 border border-gray-700/50"
                 : "bg-white border border-gray-200/80"
             } cursor-pointer flex flex-col justify-between`}
             role="button"
             tabIndex={0}
             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigation('/admin/appointments')}
             onClick={() => handleNavigation('/admin/appointments')}
            >
            {/* ... card content remains the same ... */}
              <div>
                 {/* Increased space */}
                <div className="flex items-center space-x-6 mb-5">
                  {/* Increased padding */}
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex-shrink-0">
                   {/* Increased icon size */}
                   <Calendar className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                 </div>
                 <div>
                     {/* Increased font size */}
                   <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                   Appointments
                   </h3>
                     {/* Increased font size */}
                   <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                   View, schedule, and manage customer bookings.
                   </p>
                 </div>
                </div>
              </div>
               {/* Increased padding, font size, and ring size/offset */}
              <button
               className="mt-5 w-full py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-emerald-500 transition-colors text-base font-medium"
               aria-label="Manage Appointments"
               onClick={(e) => { e.stopPropagation(); handleNavigation("/admin/appointments"); }}
               tabIndex={-1}
              >
                Manage Appointments
              </button>
            </motion.div>

          {/* Content Card */}
            <motion.div
             variants={cardVariants}
             whileHover="hover"
             className={`p-8 rounded-lg shadow-lg ${
               darkMode
                 ? "bg-gray-800 border border-gray-700/50"
                 : "bg-white border border-gray-200/80"
             } cursor-pointer flex flex-col justify-between`}
             role="button"
             tabIndex={0}
             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigation('/admin/blog')}
             onClick={() => handleNavigation('/admin/blog')}
            >
            {/* ... card content remains the same ... */}
              <div>
                 {/* Increased space */}
                <div className="flex items-center space-x-6 mb-5">
                  {/* Increased padding */}
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex-shrink-0">
                   {/* Increased icon size */}
                   <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                 </div>
                 <div>
                     {/* Increased font size */}
                   <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                   Content
                   </h3>
                     {/* Increased font size */}
                   <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                   Create, edit, and publish blog posts or articles.
                   </p>
                 </div>
                </div>
              </div>
               {/* Increased padding, font size, and ring size/offset */}
              <button
                className="mt-5 w-full py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-emerald-500 transition-colors text-base font-medium"
                aria-label="Manage Content"
                onClick={(e) => { e.stopPropagation(); handleNavigation("/admin/blog"); }}
                tabIndex={-1}
              >
                Manage Content
              </button>
            </motion.div>
        </motion.div>

        {/* System Status Section (centered by items-center on main, limited by max-w-6xl) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`mt-16 p-8 rounded-lg ${
            darkMode
              ? "bg-gray-800/80 border border-gray-700/50"
              : "bg-white/90 border border-gray-200/80"
          } shadow-md w-full max-w-7xl px-4 sm:px-6 lg:px-8`}
        >
        {/* ... system status content remains the same ... */}
           {/* Increased font size and border */}
          <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-5 border-b border-gray-300 dark:border-gray-600 pb-3">
            System Status
          </h3>
           {/* Increased gap, increased font size */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-base">
             {/* Increased space, increased icon size */}
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <Server className="w-5 h-5 text-emerald-500" />
              <span>API Status:</span>
              <span className="font-medium text-emerald-500 dark:text-emerald-400">Online</span>
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full ml-auto"></span> {/* Slightly increased size */}
            </div>
             {/* Increased space, increased icon size */}
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <Database className="w-5 h-5 text-emerald-500" />
              <span>Database:</span>
               <span className="font-medium text-emerald-500 dark:text-emerald-400">Connected</span>
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full ml-auto"></span> {/* Slightly increased size */}
            </div>
             {/* Increased space, increased icon size */}
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 text-emerald-500" />
              <span>Auth Service:</span>
               <span className="font-medium text-emerald-500 dark:text-emerald-400">Active</span>
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full ml-auto"></span> {/* Slightly increased size */}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" // Increased backdrop opacity
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit" // Use defined exit variant
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg p-8 w-full max-w-md mx-auto shadow-xl border ${ // Increased max-width, Added mx-auto
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
              role="dialog" // Added role
              aria-modal="true" // Added aria-modal
              aria-labelledby="logout-modal-title" // Added aria label
            >
               {/* Increased space and title size */}
              <div className="flex justify-between items-center mb-5">
                <h3 id="logout-modal-title" className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  Confirm Logout
                </h3>
                 {/* Increased padding and icon size */}
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  aria-label="Close Modal"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
               {/* Increased font size and margin */}
              <p className="text-base text-gray-600 dark:text-gray-300 mb-8">
                Are you sure you want to log out of the Admin Panel? Your session will be terminated.
              </p>
               {/* Increased space */}
              <div className="flex justify-end space-x-4">
                 {/* Increased padding, font size, and ring size */}
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className={`px-5 py-2.5 rounded-lg ${
                    darkMode
                      ? "bg-gray-600 hover:bg-gray-500 text-gray-100" // Adjusted cancel button color
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  } text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500`}
                >
                  Cancel
                </button>
                 {/* Increased padding, font size, and ring size/offset */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900 focus:ring-emerald-500 text-base font-medium transition-colors"
                >
                  Confirm Log Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className={`${
          darkMode ? "bg-gray-800" : "bg-gray-100" // Slightly adjusted light footer bg
        } border-t border-gray-200 dark:border-gray-700 py-6 mt-auto`} // Increased py, added mt-auto
      >
        {/* Increased padding and font size */}
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-base text-gray-600 dark:text-gray-400"> {/* Adjusted text color slightly */}
          {/* Increased space and icon size */}
          <div className="flex items-center mb-3 sm:mb-0 space-x-3">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>&copy; {new Date().getFullYear()} Mitti Naturals. All Rights Reserved.</span>
          </div>
           {/* Increased space */}
          <div className="flex items-center space-x-5">
            <span>Version 2.3.5</span>
            <span className="hidden sm:inline">|</span> {/* Hide separator on small screens */}
            <span>Powered by Veddant Raval</span>
          </div>
        </div>
      </footer>
    </div>
  );
}