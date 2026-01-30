/**
 * Error Handling Module
 *
 * Centralized error handling for the entire application.
 *
 * @example
 * ```tsx
 * import {
 *   ApiError,
 *   handleError,
 *   ERROR_CODES,
 *   getErrorMessage,
 * } from '@/lib/errors';
 *
 * try {
 *   await api.get('/data');
 * } catch (error) {
 *   const result = handleError(error);
 *   toast.error(result.message);
 *
 *   if (result.shouldRedirectToLogin) {
 *     router.push('/login');
 *   }
 * }
 * ```
 */

// ============================================================================
// Error Codes
// ============================================================================

export {
  // Individual code groups
  GENERIC_ERROR_CODES,
  AUTH_ERROR_CODES,
  VALIDATION_ERROR_CODES,
  TRANSLATION_ERROR_CODES,
  BILLING_ERROR_CODES,
  // Combined error codes
  ERROR_CODES,
  // HTTP status mapping
  HTTP_STATUS_ERROR_MAP,
} from './error-codes';

export type {
  GenericErrorCode,
  AuthErrorCode,
  ValidationErrorCode,
  TranslationErrorCode,
  BillingErrorCode,
  ErrorCode,
} from './error-codes';

// ============================================================================
// API Error Class
// ============================================================================

export { ApiError } from './api-error';

export type { ApiErrorData, ApiErrorOptions } from './api-error';

// ============================================================================
// Error Handler
// ============================================================================

export {
  // Main handler
  handleError,
  createErrorHandler,
  // Utility functions
  getErrorMessage,
  logError,
  reportError,
  requiresReauth,
  isRetriableError,
  withErrorHandling,
} from './error-handler';

export type { ErrorHandlerOptions, ErrorHandlerResult } from './error-handler';
