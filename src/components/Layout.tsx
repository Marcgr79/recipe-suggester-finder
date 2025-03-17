
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, RefrigeratorIcon, Sparkles, Plus } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: BookOpen, label: "Recipes", path: "/recipes" },
    { icon: RefrigeratorIcon, label: "Pantry", path: "/pantry" },
    { icon: Sparkles, label: "Suggestions", path: "/suggestions" },
    { icon: ShoppingBag, label: "Shopping List", path: "/shopping" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/40 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="font-semibold text-xl tracking-tight">RecipeFinder</span>
          </NavLink>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
      
      {/* Bottom navigation for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/40 h-16">
        <div className="flex items-center justify-around h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex flex-col items-center justify-center w-16 h-full transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
