
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/context/RecipeContext';

const Profile = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const { recipes } = useRecipes();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  
  if (!user) return null;
  
  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <Button onClick={() => navigate(-1)} variant="outline">Back</Button>
        </div>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle>Your Account</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                {user.photoUrl ? (
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              
              <div className="space-y-1 text-center sm:text-left">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <div className="text-xs py-1 px-2 bg-primary/10 text-primary rounded-full">
                    {recipes.length} Saved Recipes
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end bg-accent/30 border-t">
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {recipes.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Recently Added Recipes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipes.slice(0, 4).map((recipe) => (
                      <Card key={recipe.id} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => navigate(`/recipes/${recipe.id}`)}>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{recipe.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {recipe.ingredients.length} ingredients • {recipe.instructions.length} steps
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {recipes.length > 4 && (
                    <div className="flex justify-center">
                      <Button variant="outline" onClick={() => navigate('/recipes')}>
                        View All Recipes
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">You haven't added any recipes yet</p>
                  <Button onClick={() => navigate('/recipes/new')}>
                    Add Your First Recipe
                  </Button>
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
