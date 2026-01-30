/**
 * Authentication API layer
 *
 * Provides strongly-typed functions for all auth endpoints.
 * All functions use the central HTTP client and return typed data.
 */

import { api } from '@/lib/api-client';
import { AUTH_ENDPOINTS } from '@/config/api';
import type {
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ValidateResetTokenResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  LogoutResponse,
} from './types';

// ============================================================================
// Registration & Login
// ============================================================================

/**
 * Register a new user
 *
 * @param payload - User registration data
 * @returns AuthResponse with user and accessToken
 * @throws ApiErrorException on failure
 */
export async function register(
  payload: RegisterPayload
): Promise<AuthResponse> {
  return api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, payload, false);
}

/**
 * Authenticate user with email and password
 *
 * @param payload - Login credentials
 * @returns AuthResponse with user and accessToken
 * @throws ApiErrorException on failure
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  return api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, payload, false);
}

// ============================================================================
// Token Management
// ============================================================================

/**
 * Refresh access token using HttpOnly refresh_token cookie
 *
 * Note: This is called automatically by the API client on 401 errors.
 * You typically don't need to call this manually.
 *
 * @returns AuthResponse with new accessToken and updated user
 * @throws ApiErrorException on failure
 */
export async function refresh(): Promise<AuthResponse> {
  return api.post<AuthResponse>(AUTH_ENDPOINTS.REFRESH, undefined, false);
}

/**
 * Logout and revoke refresh token
 * Clears the refresh_token cookie on the server
 *
 * @returns LogoutResponse with success message
 * @throws ApiErrorException on failure
 */
export async function logout(): Promise<LogoutResponse> {
  return api.post<LogoutResponse>(AUTH_ENDPOINTS.LOGOUT, undefined, false);
}

// ============================================================================
// Password Reset Flow
// ============================================================================

/**
 * Request password reset email
 *
 * Note: This endpoint is idempotent and does NOT leak whether the email exists.
 * It always returns success with a generic message.
 *
 * @param payload - Email address
 * @returns Generic success message
 * @throws ApiErrorException only on validation errors
 */
export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> {
  return api.post<ForgotPasswordResponse>(
    AUTH_ENDPOINTS.FORGOT_PASSWORD,
    payload,
    false
  );
}

/**
 * Validate a password reset token
 *
 * Used before showing the reset password form to ensure the token is valid.
 *
 * @param token - Reset token from email link
 * @returns Validation result with valid flag and message
 * @throws ApiErrorException if token validation fails
 */
export async function validateResetToken(
  token: string
): Promise<ValidateResetTokenResponse> {
  return api.get<ValidateResetTokenResponse>(
    `${AUTH_ENDPOINTS.VALIDATE_RESET_TOKEN}?token=${encodeURIComponent(token)}`,
    false
  );
}

/**
 * Reset password with token
 *
 * Note: This will revoke ALL refresh tokens for the user,
 * forcing re-login on all devices for security.
 *
 * @param payload - Reset token and new password
 * @returns Success message
 * @throws ApiErrorException if token is invalid or expired
 */
export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> {
  return api.post<ResetPasswordResponse>(
    AUTH_ENDPOINTS.RESET_PASSWORD,
    payload,
    false
  );
}

// ============================================================================
// OAuth
// ============================================================================

/**
 * Get Google OAuth authorization URL
 *
 * Note: Don't call this directly. Instead, redirect the user:
 * ```ts
 * window.location.href = getGoogleAuthUrl();
 * ```
 *
 * @returns Full URL to Google OAuth consent screen
 */
export function getGoogleAuthUrl(): string {
  return `${AUTH_ENDPOINTS.GOOGLE_AUTH}`;
}
