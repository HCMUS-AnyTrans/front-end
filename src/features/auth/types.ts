/**
 * Authentication types and interfaces
 */

import {
  ApiError as ApiErrorClass,
  AUTH_ERROR_CODES as ErrorCodes,
} from '@/lib/errors';

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
 * @deprecated Use ApiErrorData from '@/lib/errors' instead
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
// Custom Error Class (Re-export for backward compatibility)
// ============================================================================

/**
 * Custom error class for API errors
 * @deprecated Use ApiError from '@/lib/errors' instead
 */
export const ApiErrorException = ApiErrorClass;
export type ApiErrorException = ApiErrorClass;

// ============================================================================
// Error Code Constants (Re-export for backward compatibility)
// ============================================================================

/**
 * @deprecated Use AUTH_ERROR_CODES from '@/lib/errors' instead
 */
export const AUTH_ERROR_CODES = ErrorCodes;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];
