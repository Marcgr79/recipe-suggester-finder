
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/context/RecipeContext';
import { BookOpen, ShoppingBag, RefrigeratorIcon, Sparkles, History } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { recipes, pantryItems, shoppingList } = useRecipes();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  
  const features = [
    {
      icon: BookOpen,
      title: "My Recipes",
      description: "Manage your personal recipe collection",
      link: "/recipes",
      count: recipes.length,
    },
    {
      icon: RefrigeratorIcon,
      title: "My Pantry",
      description: "Track ingredients you have available",
      link: "/pantry",
      count: pantryItems.length,
    },
    {
      icon: Sparkles,
      title: "Recipe Suggestions",
      description: "Find recipes based on your pantry",
      link: "/suggestions",
    },
    {
      icon: ShoppingBag,
      title: "Shopping List",
      description: "Generate and manage your shopping list",
      link: "/shopping",
      count: shoppingList.length,
    },
    {
      icon: History,
      title: "History",
      description: "View your cooking history",
      link: "/history",
    },
  ];
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/profile')}>
            View Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(feature.link)}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      {feature.count !== undefined && (
                        <p className="text-sm text-muted-foreground">
                          {feature.count} {feature.count === 1 ? 'item' : 'items'}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
