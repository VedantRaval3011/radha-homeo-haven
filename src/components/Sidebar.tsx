import { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  BookOpen, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  Star,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About Us', href: '/about', icon: User },
  { name: 'Homeopathy', href: '/homeopathy', icon: BookOpen },
  { name: 'Products', href: '/products', icon: ShoppingBag },
  { name: 'Bookings', href: '/bookings', icon: Calendar },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Testimonials', href: '/testimonials', icon: Star },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/');

  // Set active route based on current path
  useEffect(() => {
    const pathname = window.location.pathname;
    setActiveRoute(pathname);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-card p-2 rounded-full shadow-md"
      >
        {isOpen ? <X className="h-6 w-6 text-homeo-primary" /> : <Menu className="h-6 w-6 text-homeo-primary" />}
      </button>

      <div className={cn(
<<<<<<< HEAD
        "fixed top-0 left-0 bottom-0 z-40 bg-white dark:bg-card border-r border-homeo-softBlue dark:border-gray-700 transition-all duration-300 ease-in-out",
=======
        "fixed top-0 left-0 bottom-0 z-40 bg-white dark:bg-gray-800 border-r border-homeo-softBlue dark:border-gray-700 transition-all duration-300 ease-in-out",
>>>>>>> 74f40745f9e1c4fd949f7be555df137589f0e8bd
        "flex flex-col items-center overflow-hidden",
        isCollapsed ? "w-20" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="absolute top-4 right-2 md:flex hidden">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-1 rounded-full hover:bg-homeo-softBlue transition-all duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? 
              <ChevronRight className="h-5 w-5 text-homeo-primary" /> : 
              <ChevronLeft className="h-5 w-5 text-homeo-primary" />
            }
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-homeo-softBlue dark:bg-homeo-dark/30 flex items-center justify-center animate-pulse-soft">
            <h1 className="font-bold text-lg md:text-2xl text-homeo-primary dark:text-homeo-light">RD</h1>
          </div>
          {!isCollapsed && (
            <>
              <h2 className="mt-4 font-semibold text-gray-800 dark:text-white text-sm md:text-lg">Dr. Radha Dangi</h2>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Homeopathy Specialist</p>
            </>
          )}
        </div>

        <nav className="flex-1 w-full mt-6 px-2">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-3 rounded-lg transition-all duration-200",
                    "relative overflow-hidden",
                    activeRoute === item.href 
                      ? "bg-homeo-softBlue dark:bg-homeo-dark/50 text-homeo-primary dark:text-white" 
                      : "hover:bg-homeo-softPurple dark:hover:bg-homeo-dark/30"
                  )}
                  onClick={() => {
                    setActiveRoute(item.href);
                    setIsOpen(false);
                  }}
                >
                  {activeRoute === item.href && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-homeo-primary to-homeo-secondary" />
                  )}
                  <div className={cn(
                    "flex items-center",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}>
                    <item.icon className={cn(
                      "h-6 w-6 transition-colors duration-200",
                      activeRoute === item.href
                        ? "text-homeo-primary dark:text-homeo-light" 
                        : "text-homeo-secondary dark:text-gray-400 group-hover:text-homeo-primary dark:group-hover:text-white"
                    )} />
                    {!isCollapsed && (
                      <span className={cn(
                        "ml-3 text-sm font-medium transition-colors duration-200",
                        activeRoute === item.href
                          ? "text-homeo-primary dark:text-white" 
                          : "text-gray-700 dark:text-gray-300 group-hover:text-homeo-primary dark:group-hover:text-white"
                      )}>
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="py-4 w-full flex flex-col items-center px-2 mt-auto">
          {!isCollapsed && (
            <Link 
              to="/bookings" 
              className="bg-gradient-to-r from-homeo-primary to-homeo-secondary text-white font-medium rounded-lg px-6 py-3 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg w-full flex items-center justify-center text-center"
              onClick={() => setIsOpen(false)}
            >
              Book an Appointment
            </Link>
          )}
          <div className="flex items-center justify-center space-x-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-homeo-softBlue dark:bg-homeo-dark/30 text-homeo-primary dark:text-homeo-light hover:bg-homeo-primary hover:text-white dark:hover:bg-homeo-secondary transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-homeo-softBlue dark:bg-homeo-dark/30 text-homeo-primary dark:text-homeo-light hover:bg-homeo-primary hover:text-white dark:hover:bg-homeo-secondary transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-homeo-softBlue dark:bg-homeo-dark/30 text-homeo-primary dark:text-homeo-light hover:bg-homeo-primary hover:text-white dark:hover:bg-homeo-secondary transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
