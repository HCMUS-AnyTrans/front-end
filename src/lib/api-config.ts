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

// Dashboard endpoints
export const DASHBOARD_ENDPOINTS = {
  STATS: '/dashboard/stats',
  ACTIVITY: '/dashboard/activity',
  WEEKLY: '/dashboard/weekly',
  OVERVIEW: '/dashboard/overview',
} as const;

// Translation endpoints
export const TRANSLATION_ENDPOINTS = {
  // Document translation
  DOCUMENT: {
    UPLOAD: '/translation/document/upload',
    TRANSLATE: '/translation/document/translate',
    STATUS: '/translation/document/status',
    DOWNLOAD: '/translation/document/download',
  },
  // Subtitle translation
  SUBTITLE: {
    UPLOAD: '/translation/subtitle/upload',
    DETECT_CONTEXT: '/translation/subtitle/detect-context',
    TRANSLATE: '/translation/subtitle/translate',
    STATUS: '/translation/subtitle/status',
    EXPORT: '/translation/subtitle/export',
  },
  // Common
  LANGUAGES: '/translation/languages',
  ESTIMATE: '/translation/estimate',
} as const;

// Notification endpoints
export const NOTIFICATION_ENDPOINTS = {
  LIST: '/notifications',
  STATS: '/notifications/stats',
  UNREAD_COUNT: '/notifications/unread-count',
  MARK_READ: '/notifications/mark-read',
  MARK_ALL_READ: '/notifications/mark-all-read',
  DELETE: '/notifications/delete',
  PIN: '/notifications/pin',
} as const;

// Translation history endpoints
export const HISTORY_ENDPOINTS = {
  LIST: '/translation/history',
  DETAIL: '/translation/history', // + /:id
  STATS: '/translation/history/stats',
  DELETE: '/translation/history', // + /:id (DELETE method)
  BATCH_DELETE: '/translation/history/batch',
  DOWNLOAD: '/translation/history/download', // + /:id
  BATCH_DOWNLOAD: '/translation/history/batch-download',
} as const;

// Account endpoints
export const ACCOUNT_ENDPOINTS = {
  // Profile
  PROFILE: '/account/profile',
  AVATAR: '/account/avatar',
  // Security
  CHANGE_PASSWORD: '/account/change-password',
  TWO_FACTOR: '/account/2fa',
  SESSIONS: '/account/sessions',
  REVOKE_SESSION: '/account/sessions', // + /:id (DELETE method)
  REVOKE_ALL_SESSIONS: '/account/sessions/revoke-all',
  // Preferences
  PREFERENCES: '/account/preferences',
  // Billing
  PLAN: '/account/billing/plan',
  PAYMENT_METHODS: '/account/billing/payment-methods',
  DEFAULT_PAYMENT_METHOD: '/account/billing/payment-methods/default',
  INVOICES: '/account/billing/invoices',
  CANCEL_SUBSCRIPTION: '/account/billing/cancel',
  UPGRADE_PLAN: '/account/billing/upgrade',
} as const;
