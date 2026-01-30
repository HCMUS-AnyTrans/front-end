/**
 * React Query hooks for authentication
 *
 * Provides mutation hooks for all auth operations using @tanstack/react-query.
 */

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useRouter } from '@/i18n/routing';
import { ApiError, getErrorMessage } from '@/lib/errors';
import { ROUTES } from '@/config';
import * as authApi from './api';
import { useAuthStore } from './store';
import type {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
  ForgotPasswordResponse,
  ValidateResetTokenResponse,
  ResetPasswordResponse,
} from './types';

// ============================================================================
// useAuth Hook
// ============================================================================

/**
 * Provides access to authentication state and actions.
 * This is a convenience hook that wraps the Zustand store.
 */
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

// ============================================================================
// Login Mutation
// ============================================================================

export function useLoginMutation(
  options?: Omit<
    UseMutationOptions<AuthResponse, ApiError, LoginPayload>,
    'mutationFn' | 'onSuccess'
  > & {
    onSuccess?: (data: AuthResponse, variables: LoginPayload) => void;
  }
) {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data, variables) => {
      // Update auth state
      login(data.user, data.accessToken);

      // Call custom onSuccess if provided
      if (options?.onSuccess) {
        options.onSuccess(data, variables);
      }

      // Redirect to dashboard
      router.push(ROUTES.APP.DASHBOARD);
    },
    ...options,
  });
}

// ============================================================================
// Register Mutation
// ============================================================================

export function useRegisterMutation(
  options?: Omit<
    UseMutationOptions<AuthResponse, ApiError, RegisterPayload>,
    'mutationFn' | 'onSuccess'
  > & {
    onSuccess?: (data: AuthResponse, variables: RegisterPayload) => void;
  }
) {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data, variables) => {
      // Update auth state
      login(data.user, data.accessToken);

      // Call custom onSuccess if provided
      if (options?.onSuccess) {
        options.onSuccess(data, variables);
      }

      // Redirect to dashboard
      router.push(ROUTES.APP.DASHBOARD);
    },
    ...options,
  });
}

// ============================================================================
// Logout Mutation
// ============================================================================

export function useLogoutMutation(
  options?: Omit<
    UseMutationOptions<void, ApiError, void>,
    'mutationFn' | 'onSuccess'
  > & {
    onSuccess?: () => void;
  }
) {
  const { logout } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // Call custom onSuccess if provided
      if (options?.onSuccess) {
        options.onSuccess();
      }

      // Redirect to homepage
      router.push(ROUTES.PUBLIC.HOME);
    },
    ...options,
  });
}

// ============================================================================
// Forgot Password Mutation
// ============================================================================

export function useForgotPasswordMutation(
  options?: Omit<
    UseMutationOptions<ForgotPasswordResponse, ApiError, ForgotPasswordPayload>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    ...options,
  });
}

// ============================================================================
// Validate Reset Token Mutation
// ============================================================================

export function useValidateResetTokenMutation(
  options?: Omit<
    UseMutationOptions<ValidateResetTokenResponse, ApiError, string>,
    'mutationFn'
  >
) {
  return useMutation({
    mutationFn: authApi.validateResetToken,
    ...options,
  });
}

// ============================================================================
// Reset Password Mutation
// ============================================================================

export function useResetPasswordMutation(
  options?: Omit<
    UseMutationOptions<ResetPasswordResponse, ApiError, ResetPasswordPayload>,
    'mutationFn' | 'onSuccess'
  > & {
    onSuccess?: (
      data: ResetPasswordResponse,
      variables: ResetPasswordPayload
    ) => void;
  }
) {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (data, variables) => {
      // Call custom onSuccess if provided
      if (options?.onSuccess) {
        options.onSuccess(data, variables);
      }

      // Redirect to login with success message
      router.push(`${ROUTES.AUTH.LOGIN}?message=password_reset`);
    },
    ...options,
  });
}

// ============================================================================
// Utility Hook for Error Messages
// ============================================================================

/**
 * Helper hook to get user-friendly error messages from API errors
 * Now uses centralized error message system
 */
export function useAuthErrorMessage() {
  return (error: ApiError | null): string | null => {
    if (!error) return null;

    // Use centralized error message getter
    return getErrorMessage(error.code, error.message);
  };
}
