
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronLeft, ShoppingBag, Pencil, Check } from 'lucide-react';
import { Recipe, useRecipes } from '@/context/RecipeContext';
import { motion } from 'framer-motion';

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { pantryItems, toggleRecipeForShopping, selectedRecipesForShopping } = useRecipes();
  
  const pantryItemNames = new Set(pantryItems.map(item => item.name.toLowerCase()));
  const isSelected = selectedRecipesForShopping.includes(recipe.id);
  
  const handleToggleShoppingList = () => {
    toggleRecipeForShopping(recipe.id);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="hover:bg-transparent hover:text-primary font-normal"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <Button 
            size="sm" 
            variant={isSelected ? "default" : "outline"}
            onClick={handleToggleShoppingList}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added to Shopping
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add to Shopping List
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
            {recipe.image ? (
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-accent/50">
                <span className="text-accent-foreground/50">No image</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-4">{recipe.name}</h1>
          
          {(recipe.prepTime || recipe.cookTime) && (
            <div className="flex items-center text-muted-foreground mb-6">
              <Clock className="h-4 w-4 mr-2" />
              <span>
                {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
                {recipe.prepTime && recipe.cookTime && <span> · </span>}
                {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
              </span>
            </div>
          )}
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient) => {
                  const isInPantry = pantryItemNames.has(ingredient.name.toLowerCase());
                  
                  return (
                    <motion.li 
                      key={ingredient.id}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="flex items-center">
                        <span className={isInPantry ? "text-primary font-medium" : ""}>
                          {ingredient.name}
                        </span>
                        {isInPantry && (
                          <Badge variant="outline" className="ml-2 text-xs bg-primary/10 border-primary/20 text-primary">
                            In pantry
                          </Badge>
                        )}
                      </span>
                      <span className="text-muted-foreground">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction) => (
                <motion.li 
                  key={instruction.id}
                  className="flex"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: instruction.step * 0.1 }}
                >
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm mr-3 mt-0.5">
                    {instruction.step}
                  </span>
                  <p>{instruction.text}</p>
                </motion.li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetail;
