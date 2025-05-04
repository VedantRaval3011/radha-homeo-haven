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
<<<<<<< HEAD
      <div className="min-h-screen bg-homeo-softPurple dark:bg-homeo-dark transition-colors duration-300">
=======
      <div className="min-h-screen bg-homeo-softPurple dark:bg-homeo-darkBg transition-colors duration-300">
>>>>>>> 74f40745f9e1c4fd949f7be555df137589f0e8bd
        <ThemeToggle />
        <Sidebar />
        <main>
          {children}
        </main>
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <a 
            href="/bookings" 
            className="p-3 rounded-full bg-gradient-to-r from-homeo-primary to-homeo-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Book a call"
          >
            <Phone className="h-6 w-6" />
          </a>
          <a 
            href="https://wa.me/123456789" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gradient-to-r from-homeo-softGreen to-homeo-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="h-6 w-6" />
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
}
