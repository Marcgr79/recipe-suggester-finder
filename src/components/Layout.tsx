
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, RefrigeratorIcon, Sparkles, User, History, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
  const navItems = [
    { icon: BookOpen, label: "Recipes", path: "/recipes" },
    { icon: RefrigeratorIcon, label: "Pantry", path: "/pantry" },
    { icon: Sparkles, label: "Suggestions", path: "/suggestions" },
    { icon: ShoppingBag, label: "Shopping List", path: "/shopping" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-border/40 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
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
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      {user?.photoUrl ? (
                        <AvatarImage src={user.photoUrl} alt={user.name} />
                      ) : (
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.name && <p className="font-medium">{user.name}</p>}
                      {user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/history')}>
                    <History className="mr-2 h-4 w-4" />
                    <span>History</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign in
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
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
          
          <NavLink
            to={isAuthenticated ? "/profile" : "/login"}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-16 h-full transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <User size={20} />
            <span className="text-xs mt-1">
              {isAuthenticated ? "Profile" : "Sign In"}
            </span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
