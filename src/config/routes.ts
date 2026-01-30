/**
 * Application Routes Configuration
 *
 * Centralized, type-safe route definitions for the entire application.
 * Use these constants instead of hardcoding route strings.
 *
 * @example
 * ```tsx
 * import { ROUTES } from '@/config';
 *
 * <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
 * <Link href={ROUTES.APP.DASHBOARD}>Dashboard</Link>
 * ```
 */

// ============================================================================
// Route Types
// ============================================================================

/**
 * Generic route path type
 * Allows for both static routes and routes with parameters
 */
export type RoutePath = string;

/**
 * Route with dynamic parameter
 */
export type RouteWithParam<T extends string> = `${string}${T}${string}`;

// ============================================================================
// Public Routes (Marketing/Landing Pages)
// ============================================================================

export const PUBLIC_ROUTES = {
  /** Home page */
  HOME: '/',

  /** About us page */
  ABOUT: '/about',

  /** Contact page */
  CONTACT: '/contact',

  /** Pricing page */
  PRICING: '/pricing',

  /** Features overview page */
  FEATURES: '/features',

  /** FAQ page */
  FAQ: '/faq',

  /** Privacy policy */
  PRIVACY: '/privacy',

  /** Terms of service */
  TERMS: '/terms',
} as const;

// ============================================================================
// Authentication Routes
// ============================================================================

export const AUTH_ROUTES = {
  /** Login page */
  LOGIN: '/login',

  /** Signup/Register page */
  SIGNUP: '/signup',

  /** Forgot password page */
  FORGOT_PASSWORD: '/forgot-password',

  /** Check email after forgot password */
  CHECK_EMAIL: '/forgot-password/check-email',

  /** Reset password page (requires token) */
  RESET_PASSWORD: '/reset-password',

  /** OTP verification page */
  VERIFY_OTP: '/verify-otp',

  /** OAuth callback handler */
  CALLBACK: '/auth/callback',
} as const;

// ============================================================================
// Application Routes (Protected)
// ============================================================================

export const APP_ROUTES = {
  /** Main dashboard */
  DASHBOARD: '/app/dashboard',

  /** Document translation feature */
  DOCUMENT_TRANSLATION: '/app/document-translation',

  /** Subtitle translation feature */
  SUBTITLE_TRANSLATION: '/app/subtitle-translation',

  /** Translation history */
  TRANSLATION_HISTORY: '/app/translation-history',

  /** Notifications center */
  NOTIFICATIONS: '/app/notifications',

  /** Support/Help center */
  SUPPORT: '/app/support',
} as const;

// ============================================================================
// Account & Settings Routes
// ============================================================================

export const ACCOUNT_ROUTES = {
  /** User profile settings */
  PROFILE: '/app/account/profile',

  /** Billing & subscription */
  BILLING: '/app/account/billing',

  /** Account settings */
  SETTINGS: '/app/account/settings',

  /** Credits management */
  CREDITS: '/credits',

  /** Buy credits page */
  BUY_CREDITS: '/buy-credits',
} as const;

// ============================================================================
// Feature Anchor Routes (for scrolling to sections)
// ============================================================================

export const FEATURE_ANCHORS = {
  /** Document translation section on features page */
  DOCUMENT_TRANSLATION: '/features#document-translation',

  /** Subtitle translation section on features page */
  SUBTITLE_TRANSLATION: '/features#subtitle-translation',
} as const;

// ============================================================================
// Combined Routes Object
// ============================================================================

/**
 * All application routes organized by category
 *
 * @example
 * ```tsx
 * import { ROUTES } from '@/config';
 *
 * // Navigation
 * <Link href={ROUTES.PUBLIC.HOME}>Home</Link>
 * <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
 * <Link href={ROUTES.APP.DASHBOARD}>Dashboard</Link>
 *
 * // Programmatic navigation
 * router.push(ROUTES.APP.DOCUMENT_TRANSLATION);
 * ```
 */
export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  AUTH: AUTH_ROUTES,
  APP: APP_ROUTES,
  ACCOUNT: ACCOUNT_ROUTES,
  FEATURES: FEATURE_ANCHORS,
} as const;

// ============================================================================
// Route Helpers
// ============================================================================

/**
 * Check if a route is a protected (app) route
 */
export function isProtectedRoute(path: string): boolean {
  return path.startsWith('/app');
}

/**
 * Check if a route is an auth route
 */
export function isAuthRoute(path: string): boolean {
  const authPaths = Object.values(AUTH_ROUTES);
  return authPaths.some((route) => path.startsWith(route));
}

/**
 * Check if a route is a public route
 */
export function isPublicRoute(path: string): boolean {
  return !isProtectedRoute(path) && !isAuthRoute(path);
}

/**
 * Get the redirect path after login
 */
export function getPostLoginRedirect(intendedPath?: string): string {
  if (intendedPath && isProtectedRoute(intendedPath)) {
    return intendedPath;
  }
  return APP_ROUTES.DASHBOARD;
}

/**
 * Build a route with query parameters
 *
 * @example
 * ```ts
 * buildRouteWithParams(ROUTES.AUTH.RESET_PASSWORD, { token: 'abc123' })
 * // => '/reset-password?token=abc123'
 * ```
 */
export function buildRouteWithParams(
  route: string,
  params: Record<string, string>
): string {
  const searchParams = new URLSearchParams(params);
  return `${route}?${searchParams.toString()}`;
}

// ============================================================================
// Type Exports
// ============================================================================

export type PublicRoute = (typeof PUBLIC_ROUTES)[keyof typeof PUBLIC_ROUTES];
export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
export type AccountRoute = (typeof ACCOUNT_ROUTES)[keyof typeof ACCOUNT_ROUTES];
export type AnyRoute = PublicRoute | AuthRoute | AppRoute | AccountRoute;
