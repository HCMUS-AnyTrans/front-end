/**
 * API Error Class
 *
 * Consolidated error class for handling API errors across the application.
 * Provides structured error information with code, message, and optional details.
 */

import { ERROR_CODES, type ErrorCode } from './error-codes';

// ============================================================================
// Types
// ============================================================================

/**
 * Standard API error structure from backend
 */
export interface ApiErrorData {
  code: string;
  message: string;
  details?: unknown;
  statusCode?: number;
}

/**
 * Options for creating an API error
 */
export interface ApiErrorOptions {
  code: string;
  message: string;
  details?: unknown;
  statusCode?: number;
  cause?: Error;
}

// ============================================================================
// API Error Class
// ============================================================================

/**
 * Custom error class for API errors
 *
 * @example
 * ```ts
 * // Creating from API response
 * throw new ApiError({
 *   code: 'INVALID_CREDENTIALS',
 *   message: 'Invalid email or password',
 * });
 *
 * // Catching and handling
 * try {
 *   await login(credentials);
 * } catch (error) {
 *   if (ApiError.isApiError(error)) {
 *     console.log(error.code); // 'INVALID_CREDENTIALS'
 *     console.log(error.message); // 'Invalid email or password'
 *   }
 * }
 * ```
 */
export class ApiError extends Error {
  /** Error code identifying the type of error */
  readonly code: string;

  /** Additional error details from the server */
  readonly details?: unknown;

  /** HTTP status code if available */
  readonly statusCode?: number;

  /** Timestamp when the error occurred */
  readonly timestamp: Date;

  constructor(options: ApiErrorOptions | ApiErrorData) {
    super(options.message);
    this.name = 'ApiError';
    this.code = options.code;
    this.details = options.details;
    this.statusCode = options.statusCode;
    this.timestamp = new Date();

    // Handle cause for error chaining
    if ('cause' in options && options.cause) {
      this.cause = options.cause;
    }

    // Maintain proper stack trace for where our error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  // ============================================================================
  // Type Guards
  // ============================================================================

  /**
   * Check if an error is an ApiError instance
   */
  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  /**
   * Check if the error has a specific error code
   */
  hasCode(code: string): boolean {
    return this.code === code;
  }

  /**
   * Check if the error is an authentication error
   */
  isAuthError(): boolean {
    const authCodes: string[] = [
      ERROR_CODES.INVALID_CREDENTIALS,
      ERROR_CODES.UNAUTHORIZED,
      ERROR_CODES.FORBIDDEN,
      ERROR_CODES.TOKEN_EXPIRED,
      ERROR_CODES.REFRESH_TOKEN_INVALID,
      ERROR_CODES.REFRESH_TOKEN_EXPIRED,
      ERROR_CODES.REFRESH_FAILED,
      ERROR_CODES.SESSION_EXPIRED,
    ];
    return authCodes.includes(this.code);
  }

  /**
   * Check if the error is a network error
   */
  isNetworkError(): boolean {
    return (
      this.code === ERROR_CODES.NETWORK_ERROR ||
      this.code === ERROR_CODES.TIMEOUT_ERROR
    );
  }

  /**
   * Check if the error is a server error
   */
  isServerError(): boolean {
    return (
      this.code === ERROR_CODES.SERVER_ERROR ||
      (this.statusCode !== undefined && this.statusCode >= 500)
    );
  }

  /**
   * Check if the error is a validation error
   */
  isValidationError(): boolean {
    const validationCodes: string[] = [
      ERROR_CODES.REQUIRED_FIELD,
      ERROR_CODES.INVALID_EMAIL,
      ERROR_CODES.WEAK_PASSWORD,
      ERROR_CODES.PASSWORD_MISMATCH,
      ERROR_CODES.INVALID_FILE_FORMAT,
      ERROR_CODES.FILE_TOO_LARGE,
      ERROR_CODES.INVALID_INPUT,
    ];
    return validationCodes.includes(this.code);
  }

  // ============================================================================
  // Factory Methods
  // ============================================================================

  /**
   * Create an ApiError from a fetch Response
   */
  static async fromResponse(response: Response): Promise<ApiError> {
    let errorData: ApiErrorData;

    try {
      const json = await response.json();
      errorData = {
        code: json.error?.code || ERROR_CODES.UNKNOWN_ERROR,
        message: json.error?.message || response.statusText,
        details: json.error?.details,
        statusCode: response.status,
      };
    } catch {
      errorData = {
        code: ERROR_CODES.UNKNOWN_ERROR,
        message: response.statusText || 'An unknown error occurred',
        statusCode: response.status,
      };
    }

    return new ApiError(errorData);
  }

  /**
   * Create a network error
   */
  static networkError(message = 'Network connection failed'): ApiError {
    return new ApiError({
      code: ERROR_CODES.NETWORK_ERROR,
      message,
    });
  }

  /**
   * Create a timeout error
   */
  static timeoutError(message = 'Request timed out'): ApiError {
    return new ApiError({
      code: ERROR_CODES.TIMEOUT_ERROR,
      message,
    });
  }

  /**
   * Create an unknown error
   */
  static unknownError(message = 'An unknown error occurred'): ApiError {
    return new ApiError({
      code: ERROR_CODES.UNKNOWN_ERROR,
      message,
    });
  }

  /**
   * Create from any error
   */
  static fromError(error: unknown): ApiError {
    if (ApiError.isApiError(error)) {
      return error;
    }

    if (error instanceof Error) {
      // Check for network errors
      if (
        error.message.includes('fetch') ||
        error.message.includes('network') ||
        error.name === 'TypeError'
      ) {
        return ApiError.networkError(error.message);
      }

      return new ApiError({
        code: ERROR_CODES.UNKNOWN_ERROR,
        message: error.message,
        cause: error,
      });
    }

    return ApiError.unknownError(String(error));
  }

  // ============================================================================
  // Serialization
  // ============================================================================

  /**
   * Convert to a plain object for logging/serialization
   */
  toJSON(): ApiErrorData & { timestamp: string } {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Get a user-friendly error message
   */
  getUserMessage(): string {
    // Return the error message for now
    // This could be enhanced to return localized messages
    return this.message;
  }
}
