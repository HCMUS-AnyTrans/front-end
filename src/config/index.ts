/**
 * Application Configuration
 *
 * Central export point for all configuration, routes, and constants.
 *
 * @example
 * ```tsx
 * import { ROUTES, APP_INFO, UPLOAD_CONFIG } from '@/config';
 *
 * // Routes
 * <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
 *
 * // Constants
 * console.log(APP_INFO.NAME); // 'AnyTrans'
 *
 * // Config
 * if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) { ... }
 * ```
 */

// ============================================================================
// Routes
// ============================================================================

export {
  // Route objects
  ROUTES,
  PUBLIC_ROUTES,
  AUTH_ROUTES,
  APP_ROUTES,
  ACCOUNT_ROUTES,
  FEATURE_ANCHORS,
  // Route helpers
  isProtectedRoute,
  isAuthRoute,
  isPublicRoute,
  getPostLoginRedirect,
  buildRouteWithParams,
} from './routes';

export type {
  RoutePath,
  PublicRoute,
  AuthRoute,
  AppRoute,
  AccountRoute,
  AnyRoute,
} from './routes';

// ============================================================================
// Constants
// ============================================================================

export {
  // App info
  APP_INFO,
  // Locale
  LOCALES,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  // Theme
  THEMES,
  DEFAULT_THEME,
  // Branding
  BRAND_COLORS,
  // API
  API_CONFIG,
  // Auth
  AUTH_CONFIG,
  // Upload
  UPLOAD_CONFIG,
  // Pagination
  PAGINATION,
  // Animation
  ANIMATION,
  // Breakpoints
  BREAKPOINTS,
  // External links
  EXTERNAL_LINKS,
  // Features
  FEATURES,
  // Z-Index
  Z_INDEX,
} from './constants';

export type { SupportedLocale, Theme } from './constants';
