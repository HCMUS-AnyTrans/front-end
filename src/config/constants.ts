/**
 * Application Constants
 *
 * Centralized constants for the entire application.
 * Use these instead of hardcoding values throughout the codebase.
 */

// ============================================================================
// Application Info
// ============================================================================

export const APP_INFO = {
  NAME: 'AnyTrans',
  TAGLINE: 'AI-Powered Translation Platform',
  VERSION: '1.0.0',
  DESCRIPTION:
    'Professional document and subtitle translation powered by advanced AI',
} as const;

// ============================================================================
// Locale & Internationalization
// ============================================================================

export const LOCALES = {
  ENGLISH: 'en',
  VIETNAMESE: 'vi',
} as const;

export const DEFAULT_LOCALE = LOCALES.ENGLISH;

export const SUPPORTED_LOCALES = [LOCALES.ENGLISH, LOCALES.VIETNAMESE] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// ============================================================================
// Theme
// ============================================================================

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const DEFAULT_THEME = THEMES.LIGHT;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

// ============================================================================
// Branding & Colors
// ============================================================================

export const BRAND_COLORS = {
  PRIMARY: '#4169E1', // Royal Blue
  PRIMARY_DARK: '#1e3a8a',
  SECONDARY: '#6366f1', // Indigo
  ACCENT: '#f59e0b', // Amber
} as const;

// ============================================================================
// API & Network
// ============================================================================

export const API_CONFIG = {
  /** Request timeout in milliseconds */
  TIMEOUT: 30000,

  /** Number of retry attempts for failed requests */
  RETRY_ATTEMPTS: 3,

  /** Delay between retries in milliseconds */
  RETRY_DELAY: 1000,

  /** Cache duration for queries in milliseconds (5 minutes) */
  STALE_TIME: 5 * 60 * 1000,

  /** Polling interval for status checks in milliseconds */
  POLLING_INTERVAL: 2000,
} as const;

// ============================================================================
// Authentication
// ============================================================================

export const AUTH_CONFIG = {
  /** Session storage key for access token */
  ACCESS_TOKEN_KEY: 'auth_access_token',

  /** Session storage key for user data */
  USER_KEY: 'auth_user',

  /** Token refresh threshold in milliseconds (5 minutes before expiry) */
  REFRESH_THRESHOLD: 5 * 60 * 1000,

  /** Maximum OTP attempts */
  MAX_OTP_ATTEMPTS: 3,

  /** OTP resend cooldown in seconds */
  OTP_RESEND_COOLDOWN: 60,
} as const;

// ============================================================================
// File Upload
// ============================================================================

export const UPLOAD_CONFIG = {
  /** Maximum file size in bytes (50MB) */
  MAX_FILE_SIZE: 50 * 1024 * 1024,

  /** Maximum files per upload */
  MAX_FILES: 10,

  /** Supported document formats */
  DOCUMENT_FORMATS: [
    '.docx',
    '.doc',
    '.pdf',
    '.txt',
    '.rtf',
    '.odt',
    '.xlsx',
    '.pptx',
  ],

  /** Supported subtitle formats */
  SUBTITLE_FORMATS: ['.srt', '.vtt', '.ass', '.ssa', '.sub'],

  /** MIME types for documents */
  DOCUMENT_MIME_TYPES: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf',
    'text/plain',
    'application/rtf',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ],

  /** MIME types for subtitles */
  SUBTITLE_MIME_TYPES: [
    'text/plain',
    'text/vtt',
    'application/x-subrip',
    'text/x-ssa',
  ],
} as const;

// ============================================================================
// Pagination
// ============================================================================

export const PAGINATION = {
  /** Default page size */
  DEFAULT_PAGE_SIZE: 10,

  /** Available page size options */
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],

  /** Maximum page size */
  MAX_PAGE_SIZE: 100,
} as const;

// ============================================================================
// Animation
// ============================================================================

export const ANIMATION = {
  /** Default transition duration in milliseconds */
  DURATION: 300,

  /** Stagger delay for list animations */
  STAGGER_DELAY: 50,

  /** Debounce delay for search inputs */
  DEBOUNCE_DELAY: 300,
} as const;

// ============================================================================
// Breakpoints (matches Tailwind defaults)
// ============================================================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// ============================================================================
// External Links
// ============================================================================

export const EXTERNAL_LINKS = {
  /** GitHub repository */
  GITHUB: 'https://github.com/HCMUS-AnyTrans',

  /** Documentation */
  DOCS: 'https://docs.anytrans.ai',

  /** Support email */
  SUPPORT_EMAIL: 'support@anytrans.ai',

  /** Social media */
  SOCIAL: {
    TWITTER: 'https://twitter.com/anytrans',
    LINKEDIN: 'https://linkedin.com/company/anytrans',
    FACEBOOK: 'https://facebook.com/anytrans',
  },
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURES = {
  /** Enable dark mode */
  DARK_MODE: true,

  /** Enable OAuth login */
  OAUTH_LOGIN: true,

  /** Enable subtitle translation */
  SUBTITLE_TRANSLATION: true,

  /** Enable real-time collaboration */
  REALTIME_COLLAB: false,

  /** Enable premium features */
  PREMIUM_FEATURES: true,
} as const;

// ============================================================================
// Z-Index Layers
// ============================================================================

export const Z_INDEX = {
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  TOAST: 80,
} as const;
