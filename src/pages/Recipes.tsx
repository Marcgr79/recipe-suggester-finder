
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PlusCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard from '@/components/RecipeCard';
import RecipeDetail from '@/components/RecipeDetail';
import RecipeForm from '@/components/RecipeForm';
import Layout from '@/components/Layout';
import { useRecipes } from '@/context/RecipeContext';

const RecipeGrid = () => {
  const { recipes } = useRecipes();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Recipes</h1>
        <Button onClick={() => navigate('/recipes/new')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Recipe
        </Button>
      </div>
      
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "No recipes match your search" : "You don't have any recipes yet"}
          </p>
          <Button onClick={() => navigate('/recipes/new')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Your First Recipe
          </Button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const RecipeDetailPage = () => {
  const { recipes } = useRecipes();
  const recipeId = window.location.pathname.split('/').pop();
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  
  return <RecipeDetail recipe={recipe} />;
};

const NewRecipePage = () => {
  return <RecipeForm />;
};

const EditRecipePage = () => {
  const { recipes } = useRecipes();
  const recipeId = window.location.pathname.split('/').pop();
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  
  return <RecipeForm initialRecipe={recipe} />;
};

const RecipesPage = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RecipeGrid />} />
        <Route path="/new" element={<NewRecipePage />} />
        <Route path="/edit/:id" element={<EditRecipePage />} />
        <Route path="/:id" element={<RecipeDetailPage />} />
      </Routes>
    </Layout>
  );
};

export default RecipesPage;
