/**
 * Error Handler
 *
 * Central error processing utilities for handling errors consistently
 * across the application. Provides error reporting, logging, and
 * user-friendly message generation.
 */

import { ApiError } from './api-error';
import { ERROR_CODES, type ErrorCode } from './error-codes';

// ============================================================================
// Types
// ============================================================================

/**
 * Error handler options
 */
export interface ErrorHandlerOptions {
  /** Log the error to console */
  log?: boolean;
  /** Report the error to monitoring service */
  report?: boolean;
  /** Show a toast notification */
  showToast?: boolean;
  /** Custom error message override */
  customMessage?: string;
}

/**
 * Error handler result
 */
export interface ErrorHandlerResult {
  /** The processed error */
  error: ApiError;
  /** User-friendly message */
  message: string;
  /** Whether the error should redirect to login */
  shouldRedirectToLogin: boolean;
  /** Whether the error was handled */
  handled: boolean;
}

// ============================================================================
// Error Message Map
// ============================================================================

/**
 * Default user-friendly error messages by error code
 * These can be overridden by i18n translations
 */
const DEFAULT_ERROR_MESSAGES: Partial<Record<ErrorCode, string>> = {
  // Generic
  [ERROR_CODES.UNKNOWN_ERROR]:
    'An unexpected error occurred. Please try again.',
  [ERROR_CODES.NETWORK_ERROR]:
    'Unable to connect to the server. Please check your internet connection.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'The request took too long. Please try again.',
  [ERROR_CODES.SERVER_ERROR]:
    'Server error occurred. Our team has been notified.',
  [ERROR_CODES.MAINTENANCE_MODE]:
    'The service is temporarily unavailable for maintenance.',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]:
    'Too many requests. Please wait a moment and try again.',

  // Auth
  [ERROR_CODES.INVALID_CREDENTIALS]:
    'Invalid email or password. Please try again.',
  [ERROR_CODES.EMAIL_ALREADY_EXISTS]:
    'An account with this email already exists.',
  [ERROR_CODES.UNAUTHORIZED]:
    'You need to be logged in to perform this action.',
  [ERROR_CODES.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ERROR_CODES.SESSION_EXPIRED]:
    'Your session has expired. Please log in again.',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',

  // Validation
  [ERROR_CODES.REQUIRED_FIELD]: 'Please fill in all required fields.',
  [ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
  [ERROR_CODES.WEAK_PASSWORD]:
    'Password is too weak. Please use a stronger password.',
  [ERROR_CODES.INVALID_FILE_FORMAT]: 'This file format is not supported.',
  [ERROR_CODES.FILE_TOO_LARGE]:
    'The file is too large. Please upload a smaller file.',

  // Translation
  [ERROR_CODES.TRANSLATION_FAILED]: 'Translation failed. Please try again.',
  [ERROR_CODES.UNSUPPORTED_LANGUAGE]:
    'This language is not currently supported.',
  [ERROR_CODES.INSUFFICIENT_CREDITS]:
    'You do not have enough credits. Please purchase more credits.',
  [ERROR_CODES.DAILY_LIMIT_EXCEEDED]:
    'You have reached your daily translation limit.',

  // Billing
  [ERROR_CODES.PAYMENT_FAILED]:
    'Payment failed. Please check your payment details.',
  [ERROR_CODES.CARD_DECLINED]:
    'Your card was declined. Please try a different card.',
};

// ============================================================================
// Error Handler Functions
// ============================================================================

/**
 * Get a user-friendly error message for an error code
 */
export function getErrorMessage(code: string, fallback?: string): string {
  return (
    DEFAULT_ERROR_MESSAGES[code as ErrorCode] ||
    fallback ||
    DEFAULT_ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR]!
  );
}

/**
 * Handle an error and return a processed result
 *
 * @example
 * ```ts
 * try {
 *   await someApiCall();
 * } catch (error) {
 *   const result = handleError(error, { showToast: true });
 *   if (result.shouldRedirectToLogin) {
 *     router.push('/login');
 *   }
 * }
 * ```
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): ErrorHandlerResult {
  const { log = true, report = false, customMessage } = options;

  // Convert to ApiError if needed
  const apiError = ApiError.fromError(error);

  // Get user-friendly message
  const message =
    customMessage || getErrorMessage(apiError.code, apiError.message);

  // Check if should redirect to login
  const shouldRedirectToLogin =
    apiError.hasCode(ERROR_CODES.UNAUTHORIZED) ||
    apiError.hasCode(ERROR_CODES.SESSION_EXPIRED) ||
    apiError.hasCode(ERROR_CODES.REFRESH_FAILED) ||
    apiError.hasCode(ERROR_CODES.REFRESH_TOKEN_EXPIRED);

  // Log the error
  if (log) {
    logError(apiError);
  }

  // Report to monitoring service
  if (report) {
    reportError(apiError);
  }

  return {
    error: apiError,
    message,
    shouldRedirectToLogin,
    handled: true,
  };
}

/**
 * Log an error to the console with formatting
 */
export function logError(error: ApiError): void {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 API Error: ${error.code}`);
    console.error('Message:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    if (error.statusCode) {
      console.error('Status Code:', error.statusCode);
    }
    console.error('Timestamp:', error.timestamp.toISOString());
    console.groupEnd();
  } else {
    // In production, log minimal info
    console.error(`[${error.code}] ${error.message}`);
  }
}

/**
 * Report an error to monitoring service (e.g., Sentry)
 * This is a placeholder - implement with your monitoring service
 */
export function reportError(error: ApiError): void {
  // Placeholder for error reporting service integration
  // Examples: Sentry, LogRocket, Bugsnag, etc.

  if (process.env.NODE_ENV === 'production') {
    // Example Sentry integration:
    // Sentry.captureException(error, {
    //   tags: { errorCode: error.code },
    //   extra: { details: error.details },
    // });
  }
}

/**
 * Create an error handler with pre-configured options
 *
 * @example
 * ```ts
 * const handleApiError = createErrorHandler({ showToast: true });
 *
 * try {
 *   await api.get('/data');
 * } catch (error) {
 *   const result = handleApiError(error);
 * }
 * ```
 */
export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
  return (error: unknown, overrideOptions: ErrorHandlerOptions = {}) => {
    return handleError(error, { ...defaultOptions, ...overrideOptions });
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if an error requires user re-authentication
 */
export function requiresReauth(error: unknown): boolean {
  if (!ApiError.isApiError(error)) {
    return false;
  }

  return (
    error.hasCode(ERROR_CODES.UNAUTHORIZED) ||
    error.hasCode(ERROR_CODES.SESSION_EXPIRED) ||
    error.hasCode(ERROR_CODES.REFRESH_FAILED) ||
    error.hasCode(ERROR_CODES.REFRESH_TOKEN_EXPIRED) ||
    error.hasCode(ERROR_CODES.REFRESH_TOKEN_INVALID)
  );
}

/**
 * Check if an error is retriable (temporary failure)
 */
export function isRetriableError(error: unknown): boolean {
  if (!ApiError.isApiError(error)) {
    return false;
  }

  return (
    error.hasCode(ERROR_CODES.NETWORK_ERROR) ||
    error.hasCode(ERROR_CODES.TIMEOUT_ERROR) ||
    error.hasCode(ERROR_CODES.SERVER_ERROR) ||
    error.hasCode(ERROR_CODES.RATE_LIMIT_EXCEEDED)
  );
}

/**
 * Wrap an async function with error handling
 *
 * @example
 * ```ts
 * const safeFetch = withErrorHandling(async () => {
 *   return await api.get('/data');
 * });
 *
 * const result = await safeFetch();
 * if (result.error) {
 *   console.log(result.message);
 * } else {
 *   console.log(result.data);
 * }
 * ```
 */
export function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): () => Promise<{
  data: T | null;
  error: ApiError | null;
  message: string | null;
}> {
  return async () => {
    try {
      const data = await fn();
      return { data, error: null, message: null };
    } catch (error) {
      const result = handleError(error, options);
      return { data: null, error: result.error, message: result.message };
    }
  };
}
