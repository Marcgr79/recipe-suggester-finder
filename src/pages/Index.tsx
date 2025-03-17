
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, RefrigeratorIcon, Sparkles } from 'lucide-react';
import { useRecipes } from '@/context/RecipeContext';

const Index = () => {
  const { recipes, pantryItems } = useRecipes();
  
  const features = [
    {
      icon: BookOpen,
      title: "Recipe Collection",
      description: "Store and organize your favorite recipes in one place.",
      link: "/recipes",
      count: recipes.length,
    },
    {
      icon: RefrigeratorIcon,
      title: "Pantry Management",
      description: "Keep track of ingredients you have on hand.",
      link: "/pantry",
      count: pantryItems.length,
    },
    {
      icon: Sparkles,
      title: "Recipe Suggestions",
      description: "Get recipe ideas based on what's in your pantry.",
      link: "/suggestions",
    },
    {
      icon: ShoppingBag,
      title: "Shopping List",
      description: "Generate shopping lists for your planned meals.",
      link: "/shopping",
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 md:py-20">
      <div className="text-center mb-12 max-w-2xl">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Personal Recipe Assistant
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Organize recipes, track ingredients, and cook smarter
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <Card key={index} className="overflow-hidden">
              <Link to={feature.link}>
                <CardContent className="p-6 flex flex-col h-full hover:bg-accent/20 transition-colors">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-medium text-xl">{feature.title}</h2>
                      {feature.count !== undefined && (
                        <p className="text-sm text-muted-foreground">
                          {feature.count} {feature.count === 1 ? 'item' : 'items'}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="mt-auto">
                    <Button variant="ghost" className="p-0 h-auto">
                      Get Started →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Index;
