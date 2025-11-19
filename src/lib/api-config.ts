/**
 * Central API configuration
 *
 * Manages base URLs and API endpoints for the application.
 * Environment variables:
 * - NEXT_PUBLIC_API_ORIGIN: Backend origin (e.g., http://localhost:3333 in dev)
 */

// Backend origin from environment variable
export const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN;

// API base URL with /api prefix (NestJS global prefix)
export const API_BASE_URL = `${API_ORIGIN}/api`;

// Auth endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VALIDATE_RESET_TOKEN: '/auth/reset-password/validate',
  RESET_PASSWORD: '/auth/reset-password',
  GOOGLE_AUTH: '/auth/google',
  GOOGLE_CALLBACK: '/auth/google/callback',
} as const;
