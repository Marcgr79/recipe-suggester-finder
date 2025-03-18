
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, ChevronLeft, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Recipe, Ingredient, Instruction, useRecipes } from '@/context/RecipeContext';

type RecipeFormProps = {
  initialRecipe?: Recipe;
};

type FormValues = {
  name: string;
  prepTime?: string;
  cookTime?: string;
  imageUrl?: string;
};

const RecipeForm: React.FC<RecipeFormProps> = ({ initialRecipe }) => {
  const navigate = useNavigate();
  const { addRecipe, updateRecipe } = useRecipes();
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>(
    initialRecipe?.ingredients.map(ing => ({
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
    })) || [{ name: '', quantity: '', unit: '' }]
  );
  const [instructions, setInstructions] = useState<Omit<Instruction, 'id'>[]>(
    initialRecipe?.instructions.map(ins => ({
      step: ins.step,
      text: ins.text,
    })) || [{ step: 1, text: '' }]
  );

  const form = useForm<FormValues>({
    defaultValues: {
      name: initialRecipe?.name || '',
      prepTime: initialRecipe?.prepTime || '',
      cookTime: initialRecipe?.cookTime || '',
      imageUrl: initialRecipe?.image || '',
    },
  });

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: keyof Omit<Ingredient, 'id'>, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const addInstruction = () => {
    const nextStep = instructions.length > 0 ? instructions[instructions.length - 1].step + 1 : 1;
    setInstructions([...instructions, { step: nextStep, text: '' }]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
    // Reorder steps after removal
    const updated = instructions
      .filter((_, i) => i !== index)
      .map((instruction, idx) => ({
        ...instruction,
        step: idx + 1,
      }));
    setInstructions(updated);
  };

  const updateInstruction = (index: number, text: string) => {
    const updated = [...instructions];
    updated[index] = { ...updated[index], text };
    setInstructions(updated);
  };

  const onSubmit = (data: FormValues) => {
    // Validate inputs
    if (ingredients.some(ing => !ing.name.trim())) {
      toast({
        title: "Ingredient name required",
        description: "All ingredients must have a name",
        variant: "destructive",
      });
      return;
    }

    if (instructions.some(ins => !ins.text.trim())) {
      toast({
        title: "Instruction text required",
        description: "All instruction steps must have text",
        variant: "destructive",
      });
      return;
    }

    if (initialRecipe) {
      // For updating recipes, map the ingredients and instructions to include IDs
      const updatedIngredients = ingredients.map((ing, index) => {
        // Use existing ID if available, otherwise create a new one
        const existingIng = initialRecipe.ingredients[index];
        return {
          id: existingIng?.id || `ing-${Date.now()}-${index}`,
          ...ing
        };
      });

      const updatedInstructions = instructions.map((ins, index) => {
        // Use existing ID if available, otherwise create a new one
        const existingIns = initialRecipe.instructions[index];
        return {
          id: existingIns?.id || `ins-${Date.now()}-${index}`,
          ...ins
        };
      });

      updateRecipe(initialRecipe.id, {
        name: data.name,
        ingredients: updatedIngredients,
        instructions: updatedInstructions,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        image: data.imageUrl,
      });
      toast({
        title: "Recipe updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // For new recipes, the addRecipe function will handle the ID generation
      // But we still need to convert the ingredient and instruction objects to the right format
      const recipeData = {
        name: data.name,
        ingredients: ingredients.map(ing => ({
          ...ing,
          id: '' // This ID will be replaced by the addRecipe function
        })),
        instructions: instructions.map(ins => ({
          ...ins,
          id: '' // This ID will be replaced by the addRecipe function
        })),
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        image: data.imageUrl,
      };
      
      addRecipe(recipeData);
      toast({
        title: "Recipe added",
        description: `${data.name} has been added to your recipes.`,
      });
    }
    
    navigate('/recipes');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="hover:bg-transparent hover:text-primary font-normal"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tight">
                {initialRecipe ? 'Edit Recipe' : 'Add New Recipe'}
              </h1>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Pasta Carbonara" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prep Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 15 minutes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cookTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cook Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 30 minutes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Ingredients</h2>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addIngredient}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Ingredient
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-5">
                          <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                            Name
                          </FormLabel>
                          <Input
                            value={ingredient.name}
                            onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                            placeholder="Ingredient name"
                          />
                        </div>
                        <div className="col-span-3">
                          <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                            Quantity
                          </FormLabel>
                          <Input
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                            placeholder="Amount"
                          />
                        </div>
                        <div className="col-span-3">
                          <FormLabel className={index !== 0 ? 'sr-only' : ''}>
                            Unit
                          </FormLabel>
                          <Input
                            value={ingredient.unit}
                            onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                            placeholder="Unit"
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIngredient(index)}
                            disabled={ingredients.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Instructions</h2>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addInstruction}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
                <div className="space-y-4">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 flex items-start mt-2">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm">
                          {instruction.step}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <Textarea
                          value={instruction.text}
                          onChange={(e) => updateInstruction(index, e.target.value)}
                          placeholder={`Step ${instruction.step} instructions...`}
                        />
                      </div>
                      <div className="flex-shrink-0 flex items-start mt-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                          disabled={instructions.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {initialRecipe ? 'Update Recipe' : 'Save Recipe'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecipeForm;
