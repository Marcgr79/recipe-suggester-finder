
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeProvider } from "@/context/RecipeContext";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Recipes from "./pages/Recipes";
import Pantry from "./pages/Pantry";
import Suggestions from "./pages/Suggestions";
import Shopping from "./pages/Shopping";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecipeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recipes/*" element={<Recipes />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </RecipeProvider>
  </QueryClientProvider>
);

export default App;
