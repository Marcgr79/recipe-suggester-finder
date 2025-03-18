
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeProvider } from "@/context/RecipeContext";
import { AuthProvider } from "@/context/AuthContext";
import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById("root")!);

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </AuthProvider>
  </QueryClientProvider>
);
