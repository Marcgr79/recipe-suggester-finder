
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecipeCard from '@/components/RecipeCard';
import Layout from '@/components/Layout';
import { useRecipes } from '@/context/RecipeContext';

const SuggestionsPage = () => {
  const { getSuggestedRecipes, pantryItems, recipes } = useRecipes();
  const navigate = useNavigate();
  const suggestedRecipes = getSuggestedRecipes();
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recipe Suggestions</h1>
            <p className="text-muted-foreground mt-1">
              Based on {pantryItems.length} ingredients in your pantry
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/pantry')}
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Update Pantry
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/shopping')}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Shopping List
            </Button>
          </div>
        </div>
        
        {pantryItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">
              Add ingredients to your pantry to get suggestions
            </p>
            <Button onClick={() => navigate('/pantry')}>Go to Pantry</Button>
          </div>
        ) : suggestedRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-4">
              {recipes.length === 0 
                ? "Add some recipes to get suggestions" 
                : "No matches found with your current pantry items"}
            </p>
            <Button onClick={() => navigate('/recipes')}>
              {recipes.length === 0 ? "Add Recipes" : "View All Recipes"}
            </Button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {suggestedRecipes.map((recipe, index) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                matchPercentage={recipe.score * 100}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default SuggestionsPage;
