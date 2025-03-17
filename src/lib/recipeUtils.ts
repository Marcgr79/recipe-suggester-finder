
import { Recipe, Ingredient } from '../context/RecipeContext';

export const calculateMatchPercentage = (recipe: Recipe, availableIngredients: string[]): number => {
  const totalIngredients = recipe.ingredients.length;
  if (totalIngredients === 0) return 0;
  
  const availableSet = new Set(availableIngredients.map(i => i.toLowerCase()));
  
  const matchedIngredients = recipe.ingredients.filter(ingredient => 
    availableSet.has(ingredient.name.toLowerCase())
  ).length;
  
  return (matchedIngredients / totalIngredients) * 100;
};

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

export const normalizeIngredient = (name: string): string => {
  return name.toLowerCase().trim();
};

export const groupShoppingListByCategory = (ingredients: Ingredient[]): Record<string, Ingredient[]> => {
  const categories: Record<string, Ingredient[]> = {
    'Produce': [],
    'Meat & Seafood': [],
    'Dairy & Eggs': [],
    'Grains & Pasta': [],
    'Canned & Jarred': [],
    'Spices & Condiments': [],
    'Baking': [],
    'Other': []
  };
  
  // This is a simple categorization logic - could be expanded
  ingredients.forEach(ingredient => {
    const name = ingredient.name.toLowerCase();
    
    if (/lettuce|spinach|kale|arugula|tomato|cucumber|carrot|onion|garlic|potato|bell pepper|broccoli|celery|avocado|mushroom|zucchini|squash|fruit|apple|banana|berry|berries|lemon|lime|orange/i.test(name)) {
      categories['Produce'].push(ingredient);
    } else if (/beef|chicken|pork|lamb|fish|salmon|tuna|shrimp|bacon|sausage|turkey|meat/i.test(name)) {
      categories['Meat & Seafood'].push(ingredient);
    } else if (/milk|cheese|yogurt|cream|butter|egg|dairy/i.test(name)) {
      categories['Dairy & Eggs'].push(ingredient);
    } else if (/pasta|rice|bread|flour|oats|cereal|grain/i.test(name)) {
      categories['Grains & Pasta'].push(ingredient);
    } else if (/canned|jar|sauce|soup|beans|legumes/i.test(name)) {
      categories['Canned & Jarred'].push(ingredient);
    } else if (/salt|pepper|spice|herb|oil|vinegar|condiment/i.test(name)) {
      categories['Spices & Condiments'].push(ingredient);
    } else if (/sugar|baking powder|baking soda|vanilla|chocolate|cocoa/i.test(name)) {
      categories['Baking'].push(ingredient);
    } else {
      categories['Other'].push(ingredient);
    }
  });
  
  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });
  
  return categories;
};
