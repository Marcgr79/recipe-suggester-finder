
import React, { createContext, useContext, useState, useEffect } from 'react';
import initialRecipes from '../data/initialRecipes';

export type Ingredient = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
};

export type Instruction = {
  id: string;
  step: number;
  text: string;
};

export type Recipe = {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  image?: string;
  prepTime?: string;
  cookTime?: string;
};

type PantryItem = {
  id: string;
  name: string;
  quantity?: string;
  unit?: string;
};

type ShoppingListItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  recipeId: string;
  recipeName: string;
};

type RecipeContextType = {
  recipes: Recipe[];
  pantryItems: PantryItem[];
  shoppingList: ShoppingListItem[];
  selectedRecipesForShopping: string[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  addPantryItem: (item: Omit<PantryItem, 'id'>) => void;
  updatePantryItem: (id: string, item: Partial<PantryItem>) => void;
  deletePantryItem: (id: string) => void;
  toggleRecipeForShopping: (recipeId: string) => void;
  generateShoppingList: () => void;
  clearShoppingList: () => void;
  getSuggestedRecipes: () => Recipe[];
};

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : initialRecipes;
  });
  
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    const saved = localStorage.getItem('pantryItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedRecipesForShopping, setSelectedRecipesForShopping] = useState<string[]>(() => {
    const saved = localStorage.getItem('selectedRecipesForShopping');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
  }, [pantryItems]);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('selectedRecipesForShopping', JSON.stringify(selectedRecipesForShopping));
  }, [selectedRecipesForShopping]);

  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe = {
      ...recipe,
      id: generateId(),
      ingredients: recipe.ingredients.map(ingredient => ({
        ...ingredient,
        id: ingredient.id || generateId()
      })),
      instructions: recipe.instructions.map(instruction => ({
        ...instruction,
        id: instruction.id || generateId()
      }))
    };
    setRecipes(prev => [...prev, newRecipe]);
  };

  const updateRecipe = (id: string, recipe: Partial<Recipe>) => {
    setRecipes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...recipe } : item
      )
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const addPantryItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem = { ...item, id: generateId() };
    setPantryItems(prev => [...prev, newItem]);
  };

  const updatePantryItem = (id: string, item: Partial<PantryItem>) => {
    setPantryItems(prev => 
      prev.map(pItem => 
        pItem.id === id ? { ...pItem, ...item } : pItem
      )
    );
  };

  const deletePantryItem = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleRecipeForShopping = (recipeId: string) => {
    setSelectedRecipesForShopping(prev => {
      if (prev.includes(recipeId)) {
        return prev.filter(id => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const generateShoppingList = () => {
    // Get all selected recipes
    const selectedRecipes = recipes.filter(recipe => 
      selectedRecipesForShopping.includes(recipe.id)
    );
    
    // Create a map for pantry items for easy lookup
    const pantryMap = new Map();
    pantryItems.forEach(item => {
      pantryMap.set(item.name.toLowerCase(), item);
    });
    
    // Generate shopping list
    const newShoppingList: ShoppingListItem[] = [];
    
    selectedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        // Check if ingredient is in pantry
        const pantryItem = pantryMap.get(ingredient.name.toLowerCase());
        
        if (!pantryItem) {
          // Ingredient not in pantry, add to shopping list
          newShoppingList.push({
            id: generateId(),
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            recipeId: recipe.id,
            recipeName: recipe.name,
          });
        }
        // Could add partial quantity checking here in the future
      });
    });
    
    setShoppingList(newShoppingList);
  };

  const clearShoppingList = () => {
    setShoppingList([]);
    setSelectedRecipesForShopping([]);
  };

  const getSuggestedRecipes = () => {
    // Create a set of pantry items for easier lookup
    const pantryItemNames = new Set(
      pantryItems.map(item => item.name.toLowerCase())
    );
    
    // Calculate score for each recipe based on available ingredients
    const scoredRecipes = recipes.map(recipe => {
      const totalIngredients = recipe.ingredients.length;
      const availableIngredients = recipe.ingredients.filter(ingredient => 
        pantryItemNames.has(ingredient.name.toLowerCase())
      ).length;
      
      const score = availableIngredients / totalIngredients;
      
      return {
        ...recipe,
        score,
        availableCount: availableIngredients,
        totalCount: totalIngredients
      };
    });
    
    // Sort recipes by score (highest first)
    return scoredRecipes
      .sort((a, b) => b.score - a.score)
      .filter(recipe => recipe.score > 0); // Only return recipes with at least some ingredients
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      pantryItems,
      shoppingList,
      selectedRecipesForShopping,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      addPantryItem,
      updatePantryItem,
      deletePantryItem,
      toggleRecipeForShopping,
      generateShoppingList,
      clearShoppingList,
      getSuggestedRecipes
    }}>
      {children}
    </RecipeContext.Provider>
  );
};
