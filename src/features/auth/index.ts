/**
 * Auth feature exports
 *
 * Central export point for all authentication-related modules.
 */

// Types
export type {
  User,
  ApiError,
  ApiResponse,
  AuthResponse,
  ForgotPasswordResponse,
  ValidateResetTokenResponse,
  ResetPasswordResponse,
  LogoutResponse,
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthState,
  AuthActions,
  AuthErrorCode,
} from './types';

export { ApiErrorException, AUTH_ERROR_CODES } from './types';

// API functions
export * as authApi from './api';

// Store
export { useAuthStore } from './store';

// Hooks
export {
  useAuth,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useValidateResetTokenMutation,
  useResetPasswordMutation,
  useAuthErrorMessage,
} from './hooks';
