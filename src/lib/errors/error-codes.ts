/**
 * Error Codes
 *
 * Centralized error code definitions for the entire application.
 * Organized by domain for easy management.
 */

// ============================================================================
// Generic Error Codes
// ============================================================================

export const GENERIC_ERROR_CODES = {
  /** Unknown error occurred */
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  /** Network connection failed */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** Request timeout */
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  /** Server error (5xx) */
  SERVER_ERROR: 'SERVER_ERROR',
  /** Invalid request format */
  INVALID_REQUEST: 'INVALID_REQUEST',
  /** Resource not found */
  NOT_FOUND: 'NOT_FOUND',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  /** Maintenance mode */
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
} as const;

// ============================================================================
// Authentication Error Codes
// ============================================================================

export const AUTH_ERROR_CODES = {
  /** Invalid email or password */
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  /** Email already registered */
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  /** Invalid or malformed token */
  INVALID_TOKEN: 'INVALID_TOKEN',
  /** Token has expired */
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  /** Refresh token not provided */
  REFRESH_TOKEN_MISSING: 'REFRESH_TOKEN_MISSING',
  /** Refresh token is invalid */
  REFRESH_TOKEN_INVALID: 'REFRESH_TOKEN_INVALID',
  /** Refresh token has expired */
  REFRESH_TOKEN_EXPIRED: 'REFRESH_TOKEN_EXPIRED',
  /** Failed to refresh access token */
  REFRESH_FAILED: 'REFRESH_FAILED',
  /** User account is disabled */
  ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
  /** User account is locked */
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  /** Email not verified */
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  /** Unauthorized access */
  UNAUTHORIZED: 'UNAUTHORIZED',
  /** Forbidden action */
  FORBIDDEN: 'FORBIDDEN',
  /** Session expired */
  SESSION_EXPIRED: 'SESSION_EXPIRED',
} as const;

// ============================================================================
// Validation Error Codes
// ============================================================================

export const VALIDATION_ERROR_CODES = {
  /** Required field is missing */
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  /** Invalid email format */
  INVALID_EMAIL: 'INVALID_EMAIL',
  /** Password too weak */
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  /** Password mismatch */
  PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
  /** Invalid file format */
  INVALID_FILE_FORMAT: 'INVALID_FILE_FORMAT',
  /** File too large */
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  /** Invalid input */
  INVALID_INPUT: 'INVALID_INPUT',
} as const;

// ============================================================================
// Translation Error Codes
// ============================================================================

export const TRANSLATION_ERROR_CODES = {
  /** Translation failed */
  TRANSLATION_FAILED: 'TRANSLATION_FAILED',
  /** Unsupported language */
  UNSUPPORTED_LANGUAGE: 'UNSUPPORTED_LANGUAGE',
  /** Document processing failed */
  DOCUMENT_PROCESSING_FAILED: 'DOCUMENT_PROCESSING_FAILED',
  /** Subtitle parsing failed */
  SUBTITLE_PARSING_FAILED: 'SUBTITLE_PARSING_FAILED',
  /** Translation timeout */
  TRANSLATION_TIMEOUT: 'TRANSLATION_TIMEOUT',
  /** Insufficient credits */
  INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
  /** Daily limit exceeded */
  DAILY_LIMIT_EXCEEDED: 'DAILY_LIMIT_EXCEEDED',
} as const;

// ============================================================================
// Billing Error Codes
// ============================================================================

export const BILLING_ERROR_CODES = {
  /** Payment failed */
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  /** Card declined */
  CARD_DECLINED: 'CARD_DECLINED',
  /** Invalid payment method */
  INVALID_PAYMENT_METHOD: 'INVALID_PAYMENT_METHOD',
  /** Subscription expired */
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  /** Subscription cancelled */
  SUBSCRIPTION_CANCELLED: 'SUBSCRIPTION_CANCELLED',
} as const;

// ============================================================================
// Combined Error Codes
// ============================================================================

export const ERROR_CODES = {
  ...GENERIC_ERROR_CODES,
  ...AUTH_ERROR_CODES,
  ...VALIDATION_ERROR_CODES,
  ...TRANSLATION_ERROR_CODES,
  ...BILLING_ERROR_CODES,
} as const;

// ============================================================================
// Type Exports
// ============================================================================

export type GenericErrorCode =
  (typeof GENERIC_ERROR_CODES)[keyof typeof GENERIC_ERROR_CODES];
export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];
export type ValidationErrorCode =
  (typeof VALIDATION_ERROR_CODES)[keyof typeof VALIDATION_ERROR_CODES];
export type TranslationErrorCode =
  (typeof TRANSLATION_ERROR_CODES)[keyof typeof TRANSLATION_ERROR_CODES];
export type BillingErrorCode =
  (typeof BILLING_ERROR_CODES)[keyof typeof BILLING_ERROR_CODES];
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// ============================================================================
// HTTP Status to Error Code Mapping
// ============================================================================

export const HTTP_STATUS_ERROR_MAP: Record<number, ErrorCode> = {
  400: ERROR_CODES.INVALID_REQUEST,
  401: ERROR_CODES.UNAUTHORIZED,
  403: ERROR_CODES.FORBIDDEN,
  404: ERROR_CODES.NOT_FOUND,
  408: ERROR_CODES.TIMEOUT_ERROR,
  429: ERROR_CODES.RATE_LIMIT_EXCEEDED,
  500: ERROR_CODES.SERVER_ERROR,
  502: ERROR_CODES.SERVER_ERROR,
  503: ERROR_CODES.MAINTENANCE_MODE,
  504: ERROR_CODES.TIMEOUT_ERROR,
};
