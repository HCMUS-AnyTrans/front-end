/**
 * Application providers
 *
 * Wraps the app with necessary providers:
 * - QueryClientProvider for React Query
 * - AuthProvider for authentication initialization
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect, type ReactNode } from 'react';
import { useAuth } from '@/features/auth';

// ============================================================================
// Auth Provider
// ============================================================================

/**
 * AuthProvider initializes authentication on app startup
 * This should be rendered inside QueryClientProvider
 */
function AuthProvider({ children }: { children: ReactNode }) {
  const { initAuth } = useAuth();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initAuth().finally(() => {
      setInitialized(true);
    });
  }, [initAuth]);

  // Optionally show a loading screen during initialization
  // For now, we render children immediately to avoid flash
  return <>{children}</>;
}

// ============================================================================
// App Providers
// ============================================================================

/**
 * Main providers component
 * Wraps the entire application with necessary context providers
 */
export function AppProviders({ children }: { children: ReactNode }) {
  // Create a stable QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching by default
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            // Retry failed requests once
            retry: 1,
            // Cache data for 5 minutes
            staleTime: 5 * 60 * 1000,
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
