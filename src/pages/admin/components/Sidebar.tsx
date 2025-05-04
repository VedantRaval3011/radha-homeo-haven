import { Users, Package, ShoppingCart, Settings, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = ({ darkMode, sidebarCollapsed, setSidebarCollapsed, activeTab, setActiveTab }) => {
  const navItems = [
    { tab: "dashboard", icon: BarChart2, label: "Dashboard" },
    { tab: "products", icon: Package, label: "Products" },
    { tab: "orders", icon: ShoppingCart, label: "Orders" },
    { tab: "customers", icon: Users, label: "Customers" },
    { tab: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-r transition-all ${sidebarCollapsed ? "w-16" : "w-64"} fixed left-0 top-0 h-full z-20`}>
      <div className="flex flex-col h-full">
        <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"} py-4 px-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          {!sidebarCollapsed && <span className="text-xl font-semibold font-serif">Mitti Admin</span>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded-md ${darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-800 hover:bg-gray-200"}`}>
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map(item => (
              <li key={item.tab}>
                <button
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center ${sidebarCollapsed ? "justify-center" : ""} w-full px-3 py-2 rounded-md ${activeTab === item.tab ? (darkMode ? "bg-green-600 text-white" : "bg-green-100 text-green-700") : (darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100")}`}
                >
                  <item.icon className="w-5 h-5" />
                  {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"} p-4`}>
          <div className={`flex ${sidebarCollapsed ? "justify-center" : "items-center space-x-3"}`}>
            {!sidebarCollapsed ? (
              <>
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">AS</div>
                <div className="flex-1">
                  <h3 className="font-medium">Admin User</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>admin@mitti.com</p>
                </div>
              </>
            ) : (
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">AU</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;