
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2, ShoppingBag, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRecipes } from '@/context/RecipeContext';
import { groupShoppingListByCategory } from '@/lib/recipeUtils';

const ShoppingList: React.FC = () => {
  const { 
    recipes, 
    shoppingList, 
    selectedRecipesForShopping, 
    generateShoppingList, 
    clearShoppingList 
  } = useRecipes();
  
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  
  const selectedRecipesData = recipes.filter(recipe => 
    selectedRecipesForShopping.includes(recipe.id)
  );
  
  const toggleCheckedItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  // Group shopping list items by category
  const groupedItems = groupShoppingListByCategory(shoppingList);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Shopping List
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={clearShoppingList}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button size="sm" onClick={generateShoppingList}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Generate
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {selectedRecipesData.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">For recipes:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedRecipesData.map(recipe => (
                  <div 
                    key={recipe.id} 
                    className="text-xs py-1 px-2 bg-primary/10 text-primary rounded-full"
                  >
                    {recipe.name}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">
              No recipes selected for shopping list
            </p>
          )}
          
          {shoppingList.length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">{category}</h3>
                  <div className="space-y-1">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div 
                            className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => toggleCheckedItem(item.id)}
                          >
                            <div className="flex items-center flex-1">
                              <div className="h-5 w-5 mr-3 rounded border flex items-center justify-center">
                                {checkedItems.has(item.id) && <Check className="h-3 w-3" />}
                              </div>
                              <span className={checkedItems.has(item.id) ? "line-through text-muted-foreground" : ""}>
                                {item.name}
                              </span>
                            </div>
                            <span className="text-muted-foreground text-sm">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          ) : selectedRecipesData.length > 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-3">
                Click "Generate" to create your shopping list
              </p>
              <Button onClick={generateShoppingList}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Generate Shopping List
              </Button>
            </div>
          ) : null}
        </CardContent>
        
        {shoppingList.length > 0 && (
          <CardFooter className="pt-0 flex justify-between">
            <div className="text-sm text-muted-foreground">
              {checkedItems.size} of {shoppingList.length} items checked
            </div>
            {checkedItems.size > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setCheckedItems(new Set())}
              >
                Uncheck All
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ShoppingList;
