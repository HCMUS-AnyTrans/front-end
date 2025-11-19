/**
 * Authentication types and interfaces
 */

// ============================================================================
// Core User Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  fullName: string;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Standard API error structure from backend
 */
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Unified API response envelope
 * All backend responses follow this structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
}

// ============================================================================
// Authentication Response Types
// ============================================================================

/**
 * Standard auth response containing user and access token
 * Note: refresh token is NOT included as it's stored in HttpOnly cookie
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
}

/**
 * Response from forgot password endpoint
 */
export interface ForgotPasswordResponse {
  message: string;
}

/**
 * Response from reset token validation
 */
export interface ValidateResetTokenResponse {
  valid: boolean;
  message: string;
}

/**
 * Response from reset password endpoint
 */
export interface ResetPasswordResponse {
  message: string;
}

/**
 * Response from logout endpoint
 */
export interface LogoutResponse {
  message: string;
}

// ============================================================================
// Request Payload Types
// ============================================================================

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

// ============================================================================
// Auth State Types
// ============================================================================

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateAccessToken: (accessToken: string) => void;
}

// ============================================================================
// Custom Error Class
// ============================================================================

/**
 * Custom error class for API errors
 * Thrown when API response has success: false
 */
export class ApiErrorException extends Error {
  code: string;
  details?: unknown;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiErrorException';
    this.code = error.code;
    this.details = error.details;

    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiErrorException);
    }
  }
}

// ============================================================================
// Error Code Constants
// ============================================================================

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  REFRESH_TOKEN_MISSING: 'REFRESH_TOKEN_MISSING',
  REFRESH_TOKEN_INVALID: 'REFRESH_TOKEN_INVALID',
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];
