
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Clock, ChefHat } from 'lucide-react';

const History = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Mock history data - in a real app this would come from a database
  const historyItems = [
    { id: '1', date: '2023-11-28', recipe: 'Pasta Carbonara', action: 'cooked' },
    { id: '2', date: '2023-11-25', recipe: 'Chicken Curry', action: 'cooked' },
    { id: '3', date: '2023-11-22', recipe: 'Chocolate Cake', action: 'added' },
    { id: '4', date: '2023-11-20', recipe: 'Greek Salad', action: 'cooked' },
    { id: '5', date: '2023-11-18', recipe: 'Vegetable Stir-Fry', action: 'added' },
  ];
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your History</h1>
            <p className="text-muted-foreground mt-1">
              Track your cooking activity over time
            </p>
          </div>
          
          <div>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="space-y-5">
          {historyItems.length > 0 ? (
            historyItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mt-1">
                      {item.action === 'cooked' ? (
                        <ChefHat className="h-5 w-5 text-primary" />
                      ) : (
                        <Clock className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="font-medium">{item.recipe}</h3>
                          <p className="text-sm text-muted-foreground">
                            You {item.action} this recipe
                          </p>
                        </div>
                        <time className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-muted-foreground mb-4">
                Your cooking history will appear here
              </p>
              <Button onClick={() => navigate('/recipes')}>Browse Recipes</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;
