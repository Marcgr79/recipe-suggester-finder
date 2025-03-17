
import React from 'react';
import Layout from '@/components/Layout';
import IngredientsList from '@/components/IngredientsList';

const PantryPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Pantry</h1>
        <p className="text-muted-foreground">
          Keep track of ingredients you have on hand to get recipe suggestions
        </p>
        
        <IngredientsList />
      </div>
    </Layout>
  );
};

export default PantryPage;
