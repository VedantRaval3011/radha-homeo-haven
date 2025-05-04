import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';

// Define the User interface for type safety
interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

// Define the AuthContextType interface for the context's value
interface AuthContextType {
  user: User | null; // Current user data
  isAuthenticated: boolean; // Whether the user is authenticated
  isAdmin: boolean; // Whether the user is an admin
  isLoading: boolean; // Whether auth status is being checked
  login: () => void; // Initiates Google OAuth login
  logout: () => Promise<void>; // Logs out and clears session
  checkAdminAccess: () => Promise<boolean>; // Checks if user is an admin
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  login: () => {},
  logout: async () => {},
  checkAdminAccess: async () => false,
});

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Base URL for the backend API, configurable via environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// AuthProvider component to wrap the app and provide auth context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State for user data
  const [user, setUser] = useState<User | null>(null);
  // State for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // State for admin status
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // State for loading status during auth checks
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Track route changes to recheck auth status (e.g., after OAuth redirect)
  const location = useLocation();

  // Function to check authentication status using /api/auth/me
  const checkAuthStatus = async () => {
    try {
      // Fetch user data from /api/auth/me with JWT cookie
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true, // Include JWT cookie
      });

      // Extract user data from response
      const userData = response.data.user;
      if (userData) {
        // Set user state
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
        });
        // Mark as authenticated
        setIsAuthenticated(true);

        // Check admin status
        const isAdminUser = await checkAdminAccess();
        setIsAdmin(isAdminUser);
      } else {
        // No user data means not authenticated
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      // Handle specific HTTP errors
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        if (axiosError.response.status === 401) {
          console.log('Unauthorized: No valid JWT token');
        } else if (axiosError.response.status === 403) {
          console.log('Forbidden: Invalid or expired token');
        } else {
          console.error('Auth check failed:', axiosError.message);
        }
      } else {
        console.error('Network error during auth check:', axiosError.message);
      }
      // Clear states on error
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      // Mark loading as complete
      setIsLoading(false);
    }
  };

  // Run checkAuthStatus on initial load and route changes
  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]); // Recheck when route changes (e.g., redirect to /admin/dashboard)

  // Function to initiate Google OAuth login
  const login = () => {
    // Redirect to backend's Google OAuth endpoint
    window.location.href = `${API_URL}/api/auth/google`;
  };

  // Function to log out and clear session
  const logout = async () => {
    try {
      // Call backend logout endpoint to clear JWT cookie
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // Clear client-side states
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      // Optionally clear cookie client-side (redundant if server clears it)
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Logout failed:', axiosError.message);
      // Clear states even if logout endpoint fails
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  // Function to check if the user has admin access
  const checkAdminAccess = async (): Promise<boolean> => {
    try {
      // Call backend admin-check endpoint
      await axios.get(`${API_URL}/api/auth/admin-check`, {
        withCredentials: true,
      });
      return true; // Endpoint only succeeds for admins
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          console.log('User is not an admin');
        } else if (axiosError.response.status === 401) {
          console.log('Unauthorized: No valid JWT token for admin check');
        } else {
          console.error('Admin check failed:', axiosError.message);
        }
      } else {
        console.error('Network error during admin check:', axiosError.message);
      }
      return false;
    }
  };

  // Provide context values to children
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        logout,
        checkAdminAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};