/**
 * React Query hooks for authentication
 *
 * Provides mutation hooks for all auth operations using @tanstack/react-query.
 */

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useRouter } from '@/i18n/routing';
import * as authApi from './api';
import { useAuth } from './useAuth';
import type {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
  ForgotPasswordResponse,
  ValidateResetTokenResponse,
  ResetPasswordResponse,
  ApiErrorException,
} from './types';

// ============================================================================
// Login Mutation
// ============================================================================

export function useLoginMutation(
  options?: Omit<
    UseMutationOptions<AuthResponse, ApiErrorException, LoginPayload>,
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

      // Redirect to dashboard (or custom redirect)
      router.push('/dashboard');
    },
    ...options,
  });
}

// ============================================================================
// Register Mutation
// ============================================================================

export function useRegisterMutation(
  options?: Omit<
    UseMutationOptions<AuthResponse, ApiErrorException, RegisterPayload>,
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

      // Redirect to dashboard (or custom redirect)
      router.push('/dashboard');
    },
    ...options,
  });
}

// ============================================================================
// Logout Mutation
// ============================================================================

export function useLogoutMutation(
  options?: Omit<
    UseMutationOptions<void, ApiErrorException, void>,
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
      router.push('/');
    },
    ...options,
  });
}

// ============================================================================
// Forgot Password Mutation
// ============================================================================

export function useForgotPasswordMutation(
  options?: Omit<
    UseMutationOptions<
      ForgotPasswordResponse,
      ApiErrorException,
      ForgotPasswordPayload
    >,
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
    UseMutationOptions<ValidateResetTokenResponse, ApiErrorException, string>,
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
    UseMutationOptions<
      ResetPasswordResponse,
      ApiErrorException,
      ResetPasswordPayload
    >,
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
      router.push('/login?message=password_reset');
    },
    ...options,
  });
}

// ============================================================================
// Utility Hook for Error Messages
// ============================================================================

/**
 * Helper hook to get user-friendly error messages from API errors
 */
export function useAuthErrorMessage() {
  return (error: ApiErrorException | null): string | null => {
    if (!error) return null;

    // Map common error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
      INVALID_CREDENTIALS: 'Invalid email or password',
      EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
      INVALID_TOKEN: 'This reset link is invalid or has expired',
      TOKEN_EXPIRED: 'This reset link has expired',
      REFRESH_TOKEN_MISSING: 'Your session has expired. Please log in again',
      REFRESH_TOKEN_INVALID: 'Your session is invalid. Please log in again',
      ACCOUNT_DISABLED: 'Your account has been disabled',
      ACCOUNT_LOCKED: 'Your account has been locked',
      VALIDATION_ERROR: 'Please check your input and try again',
    };

    return errorMessages[error.code] || error.message || 'An error occurred';
  };
}
