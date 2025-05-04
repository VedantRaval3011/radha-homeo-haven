import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Dashboard = ({ darkMode, searchQuery, setActiveTab }) => {
  const dashboardStats = {
    revenue: { value: "₹24,539", change: "+12.5%", positive: true },
    orders: { value: "32", change: "+8.2%", positive: true },
    customers: { value: "16", change: "+15.3%", positive: true },
    aov: { value: "₹767", change: "+3.4%", positive: true },
  };

  const topSellingProducts = [
    { id: 1, name: "Neem & Tulsi Soap", sales: 28, revenue: "₹8,372" },
    { id: 4, name: "Charcoal Detox Soap", sales: 24, revenue: "₹7,896" },
    { id: 2, name: "Sandalwood Bliss Soap", sales: 21, revenue: "₹8,379" },
    { id: 5, name: "Lavender Serenity Soap", sales: 18, revenue: "₹6,642" },
    { id: 3, name: "Rose Petal Glow Soap", sales: 15, revenue: "₹5,235" },
  ].filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const recentActivity = [
    { id: 1, action: "New order placed", details: "Order #1092 by Aanya Sharma", time: "5 minutes ago" },
    { id: 2, action: "Product stock update", details: "Charcoal Detox Soap stock is low", time: "2 hours ago" },
    { id: 3, action: "Order status changed", details: "Order #1091 changed to Shipped", time: "3 hours ago" },
    { id: 4, action: "New customer registered", details: "Rahul Singh created an account", time: "Yesterday" },
    { id: 5, action: "Promotion created", details: "Summer Sale promotion activated", time: "Yesterday" },
  ];

  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(item => Object.values(item).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-semibold">Dashboard</h1>
        <div className="flex space-x-2">
          <select className={`rounded-md border ${darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"} px-3 py-2 text-sm`}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
          <button
            onClick={() => exportToCSV(topSellingProducts, "dashboard_stats.csv")}
            className={`flex items-center px-3 py-2 rounded-md ${darkMode ? "bg-green-600 hover:bg-green-500" : "bg-green-500 hover:bg-green-600"} text-white text-sm`}
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(dashboardStats).map(([key, stat]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border p-6`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                <h2 className="text-2xl font-semibold mt-1">{stat.value}</h2>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{stat.change}</span>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${key === "revenue" ? "bg-green-500" : key === "orders" ? "bg-blue-500" : key === "customers" ? "bg-green-500" : "bg-amber-500"}`}
                style={{ width: `${Math.random() * 50 + 50}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border`}
        >
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-lg">Top Selling Products</h2>
            <button onClick={() => setActiveTab("products")} className={`text-sm ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}>View All</button>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? "text-gray-400" : "text-gray-500"}>
                  <th className="text-left font-medium text-sm pb-3">Product</th>
                  <th className="text-right font-medium text-sm pb-3">Sales</th>
                  <th className="text-right font-medium text-sm pb-3">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map(product => (
                  <tr key={product.id} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"} last:border-0`}>
                    <td className="py-3">{product.name}</td>
                    <td className="py-3 text-right">{product.sales}</td>
                    <td className="py-3 text-right">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border`}
        >
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="font-semibold text-lg">Recent Activity</h2>
            <button className={`text-sm ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}>View All</button>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 ${darkMode ? "bg-green-400" : "bg-green-500"}`}></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{activity.details}</p>
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} mt-1`}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;