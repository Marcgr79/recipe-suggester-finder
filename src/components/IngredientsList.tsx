
import React, { useState } from 'react';
import { PlusCircle, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useRecipes } from '@/context/RecipeContext';

const IngredientsList: React.FC = () => {
  const { pantryItems, addPantryItem, deletePantryItem } = useRecipes();
  const [newIngredient, setNewIngredient] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      addPantryItem({ name: newIngredient.trim() });
      setNewIngredient('');
    }
  };
  
  const filteredItems = pantryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleAddIngredient} className="flex space-x-2 mb-6">
            <Input
              type="text"
              placeholder="Add new ingredient to pantry..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add
            </Button>
          </form>
          
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground mb-3">Your Pantry ({pantryItems.length} items)</h3>
            
            {filteredItems.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">
                {searchTerm ? "No matching ingredients found" : "Your pantry is empty"}
              </p>
            )}
            
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3 rounded-md hover:bg-accent/50 transition-colors group">
                    <span className="capitalize">{item.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deletePantryItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IngredientsList;
