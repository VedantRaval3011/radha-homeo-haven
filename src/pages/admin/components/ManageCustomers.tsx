import { Download, Eye, ArrowUpDown } from "lucide-react";

const ManageCustomers = ({ darkMode, searchQuery, sortConfig, setSortConfig, currentPage, setCurrentPage }) => {
  const customers = [
    { id: "CUS-501", name: "Aanya Sharma", email: "aanya@example.com", orders: 5, spent: "₹4,230", joined: "15 Mar 2025" },
    { id: "CUS-500", name: "Vikram Patel", email: "vikram@example.com", orders: 3, spent: "₹2,147", joined: "02 Apr 2025" },
    { id: "CUS-499", name: "Priya Mehta", email: "priya@example.com", orders: 7, spent: "₹6,541", joined: "18 Jan 2025" },
    { id: "CUS-498", name: "Rahul Singh", email: "rahul@example.com", orders: 2, spent: "₹1,398", joined: "24 Apr 2025" },
    { id: "CUS-497", name: "Meera Gupta", email: "meera@example.com", orders: 6, spent: "₹5,284", joined: "07 Feb 2025" },
  ];

  const itemsPerPage = 5;

  const handleSort = key => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const filteredCustomers = customers
    .filter(customer => customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortConfig.key) {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortConfig.direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        return sortConfig.direction === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      }
      return 0;
    });

  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

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
        <h1 className="text-2xl font-serif font-semibold">Customers</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => exportToCSV(customers, "customers.csv")}
            className={`flex items-center px-3 py-2 rounded-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} text-sm`}
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`text-left ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <tr>
              <th className="px-6 py-3 text-sm font-medium">
                <button className="flex items-center" onClick={() => handleSort("name")}>Name <ArrowUpDown className="w-4 h-4 ml-2" /></button>
              </th>
              <th className="px-6 py-3 text-sm font-medium">
                <button className="flex items-center" onClick={() => handleSort("email")}>Email <ArrowUpDown className="w-4 h-4 ml-2" /></button>
              </th>
              <th className="px-6 py-3 text-sm font-medium">
                <button className="flex items-center" onClick={() => handleSort("orders")}>Orders <ArrowUpDown className="w-4 h-4 ml-2" /></button>
              </th>
              <th className="px-6 py-3 text-sm font-medium">
                <button className="flex items-center" onClick={() => handleSort("spent")}>Total Spent <ArrowUpDown className="w-4 h-4 ml-2" /></button>
              </th>
              <th className="px-6 py-3 text-sm font-medium">
                <button className="flex items-center" onClick={() => handleSort("joined")}>Joined <ArrowUpDown className="w-4 h-4 ml-2" /></button>
              </th>
              <th className="px-6 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map(customer => (
              <tr key={customer.id} className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.orders}</td>
                <td className="px-6 py-4">{customer.spent}</td>
                <td className="px-6 py-4">{customer.joined}</td>
                <td className="px-6 py-4">
                  <button className={`p-1 rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                    <Eye className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;