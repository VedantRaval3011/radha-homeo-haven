import { useState, useEffect } from 'react';
import { Download, Eye, ArrowUpDown, X } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

const ManageOrders = ({ darkMode, searchQuery, sortConfig, setSortConfig, currentPage, setCurrentPage, filterStatus, setFilterStatus }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const itemsPerPage = 5;
  const viteUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${viteUrl}/api/payments/orders`);
        setOrders(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredOrders = orders
    .filter(order => {
      const search = searchQuery.toLowerCase();
      return (
        order.orderId.toLowerCase().includes(search) ||
        `${order.userDetails.firstName} ${order.userDetails.lastName}`.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];
        if (sortConfig.key === 'userDetails') {
          valueA = `${a.userDetails.firstName} ${a.userDetails.lastName}`;
          valueB = `${b.userDetails.firstName} ${b.userDetails.lastName}`;
        } else if (sortConfig.key === 'createdAt') {
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
        } else if (sortConfig.key === 'amount') {
          valueA = Number(a.amount);
          valueB = Number(b.amount);
        }
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortConfig.direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
        return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    })
    .filter(order => !filterStatus || order.status === filterStatus);

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const exportToCSV = (data, filename) => {
    const headers = ['Order ID,Customer,Phone,Address,Date,Total,Status,Items'];
    const rows = data.map(order => {
      const customer = `${order.userDetails.firstName} ${order.userDetails.lastName}`;
      const items = order.items
        .map(item => `${item.name} (Qty: ${item.quantity}, Price: ₹${item.price})`)
        .join('; ');
      return [
        order.orderId,
        customer,
        order.userDetails.phone,
        order.userDetails.address,
        format(new Date(order.createdAt), 'dd MMM yyyy'),
        `₹${order.amount}`,
        order.status,
        items,
      ]
        .map(field => `"${field.replace(/"/g, '""')}"`) // Escape quotes
        .join(',');
    });
    const csv = `${headers}\n${rows.join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const openOrderDetails = order => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-semibold">Orders</h1>
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className={`rounded-md border ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-900'} px-3 py-2 text-sm`}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => exportToCSV(filteredOrders, 'orders.csv')}
            className={`flex items-center px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-sm`}
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      {loading && <p className="text-center">Loading orders...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`text-left ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-sm font-medium">
                  <button className="flex items-center" onClick={() => handleSort('orderId')}>
                    Order ID <ArrowUpDown className="w-4 h-4 ml-2" />
                  </button>
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  <button className="flex items-center" onClick={() => handleSort('userDetails')}>
                    Customer <ArrowUpDown className="w-4 h-4 ml-2" />
                  </button>
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  <button className="flex items-center" onClick={() => handleSort('createdAt')}>
                    Date <ArrowUpDown className="w-4 h-4 ml-2" />
                  </button>
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  <button className="flex items-center" onClick={() => handleSort('amount')}>
                    Total <ArrowUpDown className="w-4 h-4 ml-2" />
                  </button>
                </th>
                <th className="px-6 py-3 text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map(order => (
                <tr key={order.orderId} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <td className="px-6 py-4">{order.orderId}</td>
                  <td className="px-6 py-4">{`${order.userDetails.firstName} ${order.userDetails.lastName}`}</td>
                  <td className="px-6 py-4">{format(new Date(order.createdAt), 'dd MMM yyyy')}</td>
                  <td className="px-6 py-4">₹{order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openOrderDetails(order)}
                      className={`p-1 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <Eye className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && (
        <div className="flex justify-between items-center mt-4">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length}{' '}
            orders
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : darkMode
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 max-w-2xl w-full ${
              darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Order Details: {selectedOrder.orderId}</h2>
              <button onClick={closeOrderDetails}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Customer Information</h3>
                <p>Name: {`${selectedOrder.userDetails.firstName} ${selectedOrder.userDetails.lastName}`}</p>
                <p>Phone: {selectedOrder.userDetails.phone}</p>
                <p>Address: {selectedOrder.userDetails.address}</p>
              </div>
              <div>
                <h3 className="font-medium">Order Information</h3>
                <p>Date: {format(new Date(selectedOrder.createdAt), 'dd MMM yyyy')}</p>
                <p>Total: ₹{selectedOrder.amount}</p>
                <p>Status: {selectedOrder.status}</p>
              </div>
              <div>
                <h3 className="font-medium">Items</h3>
                <ul className="list-disc pl-5">
                  {selectedOrder.items.map(item => (
                    <li key={item.id}>
                      {item.name} - Qty: {item.quantity}, Price: ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeOrderDetails}
                className={`px-4 py-2 rounded-md ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;