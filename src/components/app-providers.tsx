
"use client";

import { useState, useEffect } from 'react';

// This component exists to ensure that theme related class changes
// on documentElement happen only on the client-side after hydration.
export function AppProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme from localStorage if not already handled by useCardData
    // This ensures that if useCardData hook is not on the RootLayout, theme is still applied.
    // However, with useCardData handling it, this might be redundant unless used carefully.
    // For now, useCardData hook will manage applying the 'dark' class.
    // This component primarily ensures children are rendered client-side for hooks like useToast.
  }, []);

  if (!mounted) {
    // To prevent hydration mismatch, you can return null or a skeleton loader
    // until the component is mounted on the client.
    // However, for simple theme toggling this might not be strictly necessary
    // if the initial server render is theme-agnostic or defaults to one theme.
    // For Toaster and other client-side reliant components, this pattern is useful.
    return null; 
  }

  return <>{children}</>;
}
