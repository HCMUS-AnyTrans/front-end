'use client';

import { useEffect, useCallback } from 'react';
import {
  useAccessToken,
  useAuthActions,
  useAuthStore,
  useIsAuthenticated,
} from '../store/auth.store';
import { refreshTokenApi } from '../api/auth.api';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component
 * 
 * Handles automatic session refresh on app initialization.
 * Attempts to refresh the access token if user appears to be authenticated
 * but doesn't have an access token (e.g., after page refresh).
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();
  const { setAuth, clearAuth, setInitialized } = useAuthActions();

  const initializeAuth = useCallback(async () => {
    // If we have user data but no access token, try to refresh
    if (isAuthenticated && !accessToken) {
      try {
        const response = await refreshTokenApi();
        setAuth(response.user, response.accessToken);
      } catch {
        // Avoid clearing a valid session if another concurrent refresh already succeeded.
        const latestState = useAuthStore.getState();
        if (!latestState.accessToken) {
          clearAuth();
        }
      }
    }
    setInitialized(true);
  }, [isAuthenticated, accessToken, setAuth, clearAuth, setInitialized]);

  useEffect(() => {
    const persistApi = useAuthStore.persist;

    if (!persistApi) {
      void initializeAuth();
      return;
    }

    if (persistApi.hasHydrated()) {
      void initializeAuth();
      return;
    }

    const unsubscribe = persistApi.onFinishHydration(() => {
      void initializeAuth();
    });

    return unsubscribe;
  }, [initializeAuth]);

  return <>{children}</>;
}
