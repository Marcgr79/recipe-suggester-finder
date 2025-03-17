
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ShoppingList from '@/components/ShoppingList';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useRecipes } from '@/context/RecipeContext';

const ShoppingPage = () => {
  const { selectedRecipesForShopping } = useRecipes();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
          
          {selectedRecipesForShopping.length === 0 && (
            <Button 
              onClick={() => navigate('/suggestions')}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Find Recipes to Cook
            </Button>
          )}
        </div>
        
        <p className="text-muted-foreground">
          Generate a shopping list based on selected recipes
        </p>
        
        <ShoppingList />
      </div>
    </Layout>
  );
};

export default ShoppingPage;
