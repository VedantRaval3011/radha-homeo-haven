
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { MessageSquare, Phone } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
        <ThemeToggle />
        <Sidebar />
        <main>
          {children}
        </main>
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <a 
            href="/bookings" 
            className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Book a call"
          >
            <Phone className="h-6 w-6" />
          </a>
          <a 
            href="https://wa.me/123456789" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}
