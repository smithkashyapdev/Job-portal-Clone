import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ClerkProvider } from '@clerk/clerk-react'
import { neobrutalism } from "@clerk/themes";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('PUBLISHABLE_KEY', PUBLISHABLE_KEY);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
