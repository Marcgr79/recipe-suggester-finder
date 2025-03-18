
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

type User = {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  // For Clerk integration
  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();

  // Check for existing login on mount
  useEffect(() => {
    if (PUBLISHABLE_KEY) {
      // If using Clerk, we'll get user info from Clerk
      if (clerkIsLoaded) {
        if (clerkUser) {
          const clerkUserData: User = {
            id: clerkUser.id,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'User',
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            photoUrl: clerkUser.imageUrl,
          };
          setUser(clerkUserData);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    } else {
      // Fall back to mock auth if no Clerk key
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }
  }, [PUBLISHABLE_KEY, clerkUser, clerkIsLoaded]);

  // Login function that uses mock auth since Clerk is handled separately
  const login = async () => {
    if (!PUBLISHABLE_KEY) {
      setIsLoading(true);
      try {
        // Create a mock user
        const mockUser: User = {
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          name: 'Demo User',
          email: 'user@example.com',
          photoUrl: 'https://i.pravatar.cc/150?img=60',
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
    // If using Clerk, login is handled by Clerk UI
    return Promise.resolve();
  };

  // Logout function that uses mock auth since Clerk is handled separately
  const logout = async () => {
    if (!PUBLISHABLE_KEY) {
      setIsLoading(true);
      try {
        setUser(null);
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
    // If using Clerk, logout is handled by Clerk UI
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
