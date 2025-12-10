/**
 * Authentication store using Zustand
 *
 * Manages authentication state including user, access token, and loading state.
 * Token is stored in memory and optionally in sessionStorage for persistence.
 */

import { create } from 'zustand';
import type { User, AuthState, AuthActions } from './types';
import { refresh as refreshApi, logout as logoutApi } from './api';
import { setAuthTokenHandlers } from '@/lib/api-client';

// ============================================================================
// Storage Keys
// ============================================================================

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  USER: 'auth_user',
} as const;

// ============================================================================
// Session Storage Helpers
// ============================================================================

function getStoredAuth(): { user: User | null; accessToken: string | null } {
  if (typeof window === 'undefined') {
    return { user: null, accessToken: null };
  }

  try {
    const accessToken = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const userJson = sessionStorage.getItem(STORAGE_KEYS.USER);
    const user = userJson ? JSON.parse(userJson) : null;

    return { user, accessToken };
  } catch (error) {
    console.error('Failed to read auth from sessionStorage:', error);
    return { user: null, accessToken: null };
  }
}

function storeAuth(user: User, accessToken: string): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store auth in sessionStorage:', error);
  }
}

function clearStoredAuth(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Failed to clear auth from sessionStorage:', error);
  }
}

// ============================================================================
// Zustand Store
// ============================================================================

type AuthStore = AuthState &
  AuthActions & {
    login: (user: User, accessToken: string) => void;
    logout: () => Promise<void>;
    initAuth: () => Promise<void>;
  };

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  // Actions
  setAuth: (user: User, accessToken: string) => {
    storeAuth(user, accessToken);
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  clearAuth: () => {
    clearStoredAuth();
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  updateAccessToken: (accessToken: string) => {
    const { user } = get();
    if (user) {
      storeAuth(user, accessToken);
    }
    set({ accessToken });
  },

  // Convenience method for login
  login: (user: User, accessToken: string) => {
    get().setAuth(user, accessToken);
  },

  // Logout with API call
  logout: async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      get().clearAuth();
    }
  },

  // Initialize auth on app startup
  initAuth: async () => {
    set({ isLoading: true });

    try {
      // First, try to restore from sessionStorage
      const stored = getStoredAuth();

      if (stored.accessToken && stored.user) {
        // We have stored credentials, verify them by calling refresh
        try {
          const { user, accessToken } = await refreshApi();
          get().setAuth(user, accessToken);
          return;
        } catch (error) {
          // Refresh failed, clear stored auth
          console.error('Token refresh failed during init:', error);
          clearStoredAuth();
        }
      }

      // No stored credentials or refresh failed
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Auth initialization failed:', error);
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

// ============================================================================
// Setup API Client Handlers
// ============================================================================

// Connect the API client to the auth store
if (typeof window !== 'undefined') {
  setAuthTokenHandlers(
    () => useAuthStore.getState().accessToken,
    (token: string) => useAuthStore.getState().updateAccessToken(token),
    () => useAuthStore.getState().clearAuth()
  );
}
