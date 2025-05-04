const Settings = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-semibold">Settings</h1>
      <div className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg border p-6`}>
        <h2 className="text-lg font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Store Name</label>
            <input
              type="text"
              defaultValue="Mitti Naturals"
              className={`mt-1 w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"} px-3 py-2`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select className={`mt-1 w-full rounded-md border ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"} px-3 py-2`}>
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Email Notifications</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input type="checkbox" defaultChecked className={`rounded border-gray-300 text-green-600 focus:ring-green-500 ${darkMode ? "bg-gray-700" : "bg-white"}`} />
                <span className="ml-2">New Orders</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" defaultChecked className={`rounded border-gray-300 text-green-600 focus:ring-green-500 ${darkMode ? "bg-gray-700" : "bg-white"}`} />
                <span className="ml-2">Low Stock Alerts</span>
              </label>
            </div>
          </div>
        </div>
        <button className={`mt-6 px-4 py-2 rounded-md ${darkMode ? "bg-green-600 hover:bg-green-500" : "bg-green-500 hover:bg-green-600"} text-white`}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;