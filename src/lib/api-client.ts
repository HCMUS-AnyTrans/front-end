/**
 * Central HTTP client for API requests
 *
 * Features:
 * - Unified error handling with ApiResponse<T> parsing
 * - Automatic token refresh on 401 for protected routes
 * - Credentials included for refresh token cookie support
 * - Type-safe responses
 * - Integration with centralized error module
 */

import { API_BASE_URL, AUTH_ENDPOINTS } from '@/config/api';
import { ApiError, ERROR_CODES } from './errors';

// ============================================================================
// Types
// ============================================================================

/**
 * Standard API response envelope from backend
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
}

/**
 * Auth response structure
 */
interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  accessToken: string;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  requiresAuth?: boolean;
  headers?: Record<string, string>;
}

// ============================================================================
// Token Management (internal)
// ============================================================================

/**
 * Get the current access token from the auth store
 * This is set dynamically to avoid circular dependencies
 */
let getAccessTokenFn: (() => string | null) | null = null;
let setAccessTokenFn: ((token: string) => void) | null = null;
let clearAuthFn: (() => void) | null = null;

export function setAuthTokenHandlers(
  getToken: () => string | null,
  setToken: (token: string) => void,
  clearAuth: () => void
) {
  getAccessTokenFn = getToken;
  setAccessTokenFn = setToken;
  clearAuthFn = clearAuth;
}

// ============================================================================
// Refresh Token Logic
// ============================================================================

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Attempt to refresh the access token
 * Uses the HttpOnly refresh_token cookie automatically sent by browser
 */
async function refreshAccessToken(): Promise<string> {
  // If already refreshing, return the existing promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
        method: 'POST',
        credentials: 'include', // Critical: sends refresh_token cookie
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result: ApiResponse<AuthResponse> = await response.json();

      if (!result.success || !result.data) {
        throw new ApiError({
          code: result.error?.code || ERROR_CODES.REFRESH_FAILED,
          message: result.error?.message || 'Failed to refresh token',
          details: result.error?.details,
          statusCode: response.status,
        });
      }

      // Update the access token in the store
      if (setAccessTokenFn) {
        setAccessTokenFn(result.data.accessToken);
      }

      return result.data.accessToken;
    } catch (error) {
      // Clear auth state on refresh failure
      if (clearAuthFn) {
        clearAuthFn();
      }
      throw ApiError.fromError(error);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ============================================================================
// Core API Client
// ============================================================================

/**
 * Parse and validate API response
 * Throws ApiError if success is false
 */
function parseApiResponse<T>(response: ApiResponse<T>, statusCode?: number): T {
  if (!response.success || response.data === null) {
    throw new ApiError({
      code: response.error?.code || ERROR_CODES.UNKNOWN_ERROR,
      message: response.error?.message || 'An unknown error occurred',
      details: response.error?.details,
      statusCode,
    });
  }
  return response.data;
}

/**
 * Main API client function
 *
 * @param endpoint - API endpoint (e.g., '/auth/login')
 * @param options - Request options
 * @returns Parsed response data
 * @throws ApiError if request fails
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    requiresAuth = false,
    headers: customHeaders = {},
  } = options;

  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  // Add Authorization header if required
  if (requiresAuth && getAccessTokenFn) {
    const token = getAccessTokenFn();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Build request config
  const config: RequestInit = {
    method,
    headers,
    credentials: 'include', // Always include credentials for cookie support
  };

  // Add body if provided
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  // Make the request
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    let response = await fetch(url, config);

    // Handle 401 for protected routes - attempt token refresh
    if (response.status === 401 && requiresAuth) {
      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshAccessToken();

        // Retry the original request with the new token
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        response = await fetch(url, {
          ...config,
          headers,
        });
      } catch (refreshError) {
        // Refresh failed, throw the error
        throw refreshError;
      }
    }

    // Parse response
    const result: ApiResponse<T> = await response.json();

    // Return parsed data or throw error
    return parseApiResponse(result, response.status);
  } catch (error) {
    // Convert any error to ApiError
    throw ApiError.fromError(error);
  }
}

// ============================================================================
// Convenience Methods
// ============================================================================

export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'GET', requiresAuth }),

  post: <T>(endpoint: string, body?: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'POST', body, requiresAuth }),

  put: <T>(endpoint: string, body?: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'PUT', body, requiresAuth }),

  patch: <T>(endpoint: string, body?: unknown, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'PATCH', body, requiresAuth }),

  delete: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: 'DELETE', requiresAuth }),
};

// ============================================================================
// Re-exports for convenience
// ============================================================================

export { ApiError, ERROR_CODES } from './errors';
export type { ApiErrorData, ApiErrorOptions } from './errors';
