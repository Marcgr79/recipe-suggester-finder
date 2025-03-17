
import { Recipe } from '../context/RecipeContext';

const initialRecipes: Recipe[] = [
  {
    id: "1",
    name: "Pasta Carbonara",
    ingredients: [
      { id: "1-1", name: "spaghetti", quantity: "200", unit: "g" },
      { id: "1-2", name: "bacon", quantity: "100", unit: "g" },
      { id: "1-3", name: "eggs", quantity: "2", unit: "" },
      { id: "1-4", name: "parmesan cheese", quantity: "50", unit: "g" },
      { id: "1-5", name: "black pepper", quantity: "1", unit: "tsp" },
      { id: "1-6", name: "salt", quantity: "1", unit: "tsp" },
    ],
    instructions: [
      { id: "1-1", step: 1, text: "Boil pasta according to package instructions." },
      { id: "1-2", step: 2, text: "Fry bacon until crispy." },
      { id: "1-3", step: 3, text: "Beat eggs with grated parmesan." },
      { id: "1-4", step: 4, text: "Mix hot pasta with bacon, then quickly stir in egg mixture." },
      { id: "1-5", step: 5, text: "Season with pepper and serve immediately." },
    ],
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    prepTime: "10 minutes",
    cookTime: "15 minutes",
  },
  {
    id: "2",
    name: "Classic Omelet",
    ingredients: [
      { id: "2-1", name: "eggs", quantity: "3", unit: "" },
      { id: "2-2", name: "milk", quantity: "2", unit: "tbsp" },
      { id: "2-3", name: "butter", quantity: "1", unit: "tbsp" },
      { id: "2-4", name: "cheese", quantity: "30", unit: "g" },
      { id: "2-5", name: "salt", quantity: "1", unit: "pinch" },
      { id: "2-6", name: "pepper", quantity: "1", unit: "pinch" },
    ],
    instructions: [
      { id: "2-1", step: 1, text: "Whisk eggs, milk, salt, and pepper in a bowl." },
      { id: "2-2", step: 2, text: "Melt butter in a non-stick skillet over medium heat." },
      { id: "2-3", step: 3, text: "Pour in egg mixture and cook until almost set." },
      { id: "2-4", step: 4, text: "Sprinkle cheese on one half, fold omelet over, and cook until cheese melts." },
    ],
    image: "https://images.unsplash.com/photo-1579946812754-4dd13c4aa58d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    prepTime: "5 minutes",
    cookTime: "5 minutes",
  },
  {
    id: "3",
    name: "Simple Green Salad",
    ingredients: [
      { id: "3-1", name: "mixed greens", quantity: "200", unit: "g" },
      { id: "3-2", name: "cucumber", quantity: "1", unit: "" },
      { id: "3-3", name: "cherry tomatoes", quantity: "10", unit: "" },
      { id: "3-4", name: "olive oil", quantity: "2", unit: "tbsp" },
      { id: "3-5", name: "lemon juice", quantity: "1", unit: "tbsp" },
      { id: "3-6", name: "salt", quantity: "1", unit: "pinch" },
      { id: "3-7", name: "pepper", quantity: "1", unit: "pinch" },
    ],
    instructions: [
      { id: "3-1", step: 1, text: "Wash and dry all greens and vegetables." },
      { id: "3-2", step: 2, text: "Slice cucumber and halve cherry tomatoes." },
      { id: "3-3", step: 3, text: "Mix olive oil and lemon juice to create dressing." },
      { id: "3-4", step: 4, text: "Combine all vegetables in a bowl, drizzle with dressing, and season with salt and pepper." },
    ],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    prepTime: "10 minutes",
    cookTime: "0 minutes",
  },
];

export default initialRecipes;
