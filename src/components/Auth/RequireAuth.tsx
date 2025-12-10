/**
 * RequireAuth component
 *
 * Guards protected routes by checking authentication status.
 * Redirects unauthenticated users to login.
 */

'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth';

interface RequireAuthProps {
  children: ReactNode;
  /**
   * Custom redirect path (default: '/login')
   */
  redirectTo?: string;
  /**
   * If true, shows a loading state instead of redirecting immediately
   */
  showLoading?: boolean;
}

/**
 * Loading component shown while authentication is being checked
 */
function AuthLoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

/**
 * RequireAuth component
 * Wrap any component or page that requires authentication
 */
export function RequireAuth({
  children,
  redirectTo = '/login',
  showLoading = true,
}: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the current path to redirect back after login
      const returnUrl = pathname !== redirectTo ? pathname : undefined;
      const redirectUrl = returnUrl
        ? `${redirectTo}?returnUrl=${encodeURIComponent(returnUrl)}`
        : redirectTo;

      router.push(redirectUrl);
    }
  }, [isLoading, isAuthenticated, router, pathname, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading) {
    return showLoading ? <AuthLoadingState /> : null;
  }

  // If not authenticated, show nothing (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}

/**
 * Higher-order component version
 * Wraps a component to require authentication
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<RequireAuthProps, 'children'>
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <RequireAuth {...options}>
        <Component {...props} />
      </RequireAuth>
    );
  };
}
