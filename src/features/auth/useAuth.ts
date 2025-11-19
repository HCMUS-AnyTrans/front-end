/**
 * useAuth hook
 *
 * Provides access to authentication state and actions.
 * This is a convenience hook that wraps the Zustand store.
 */

import { useAuthStore } from './store';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const initAuth = useAuthStore((state) => state.initAuth);

  return {
    // State
    user,
    accessToken,
    isAuthenticated,
    isLoading,

    // Actions
    setAuth,
    clearAuth,
    login,
    logout,
    initAuth,
  };
}
