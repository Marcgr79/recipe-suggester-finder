
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat } from 'lucide-react';
import { Recipe } from '@/context/RecipeContext';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: Recipe;
  matchPercentage?: number;
  index?: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, matchPercentage, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/recipes/${recipe.id}`}>
        <Card className="overflow-hidden h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {recipe.image ? (
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-accent/50">
                <ChefHat className="h-12 w-12 text-accent-foreground/50" />
              </div>
            )}
            
            {matchPercentage !== undefined && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="font-medium bg-background/80 backdrop-blur-sm">
                  {Math.round(matchPercentage)}% match
                </Badge>
              </div>
            )}
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-medium text-lg tracking-tight line-clamp-1">{recipe.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {recipe.ingredients.length} ingredients
            </p>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            {(recipe.prepTime || recipe.cookTime) && (
              <div className="flex items-center text-muted-foreground text-xs">
                <Clock className="h-3 w-3 mr-1" />
                <span>{recipe.prepTime && recipe.cookTime ? 
                  `${recipe.prepTime} + ${recipe.cookTime}` : 
                  recipe.prepTime || recipe.cookTime}
                </span>
              </div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;
