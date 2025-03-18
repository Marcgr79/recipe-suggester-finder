
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeProvider } from "@/context/RecipeContext";
import { AuthProvider } from "@/context/AuthContext";
import App from './App.tsx';
import './index.css';

// Use Clerk for authentication
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

if (!PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key! Using mock authentication instead.");
}

const root = createRoot(document.getElementById("root")!);

// We'll conditionally wrap with ClerkProvider if the key exists
if (PUBLISHABLE_KEY) {
  root.render(
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      afterSignOutUrl="/"
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RecipeProvider>
            <App />
          </RecipeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
} else {
  // Fall back to mock auth if no Clerk key is provided
  root.render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
