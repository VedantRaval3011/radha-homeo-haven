import { Search, Bell, Moon, Sun, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ darkMode, setDarkMode, searchQuery, setSearchQuery, notifications, showNotifications, setShowNotifications, markAllAsRead, unreadCount }) => {
  return (
    <header className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b sticky top-0 z-10`}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="relative flex items-center rounded-md">
          <Search className={`w-5 h-5 ml-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} border-0 rounded-md py-2 pl-10 pr-4 focus:outline-none w-56`}
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-md relative ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
              <Bell className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute right-0 mt-2 w-80 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-md shadow-lg border z-30`}
              >
                <div className="px-4 py-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Notifications</h3>
                  <button className={`text-sm ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`} onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length ? (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 ${notification.read ? "" : darkMode ? "bg-gray-700" : "bg-green-50"} ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} cursor-pointer`}
                      >
                        <p className={notification.read ? (darkMode ? "text-gray-400" : "text-gray-600") : "font-medium"}>{notification.message}</p>
                        <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No notifications</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            {darkMode ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <button className={`p-2 rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <LogOut className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;