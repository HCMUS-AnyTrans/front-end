/**
 * Account Feature - Type Definitions
 *
 * Domain types for account/profile management.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Theme options
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Supported locales
 */
export type SupportedLocale = 'en' | 'vi' | 'es' | 'fr';

/**
 * Date format options
 */
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';

/**
 * Time format options
 */
export type TimeFormat = '12h' | '24h';

/**
 * Billing cycle
 */
export type BillingCycle = 'monthly' | 'yearly';

/**
 * Plan status
 */
export type PlanStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

/**
 * Payment card type
 */
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover';

/**
 * Invoice status
 */
export type InvoiceStatus = 'paid' | 'unpaid' | 'refunded' | 'pending';

// ============================================================================
// Profile Types
// ============================================================================

/**
 * User profile data
 */
export interface UserProfile {
  /** User ID */
  id?: string;

  /** Full name */
  fullName: string;

  /** Email address (readonly) */
  email: string;

  /** Phone number */
  phone?: string;

  /** Company name */
  company?: string;

  /** Avatar URL */
  avatar?: string | null;

  /** Whether email is verified */
  emailVerified?: boolean;

  /** Account creation date */
  createdAt?: string;

  /** Last update date */
  updatedAt?: string;
}

/**
 * Profile update request
 */
export interface UpdateProfileRequest {
  fullName?: string;
  phone?: string;
  company?: string;
}

/**
 * Avatar upload response
 */
export interface AvatarUploadResponse {
  avatarUrl: string;
}

// ============================================================================
// Security Types
// ============================================================================

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Two-factor authentication status
 */
export interface TwoFactorStatus {
  enabled: boolean;
  method?: 'app' | 'sms' | 'email';
  lastUpdated?: string;
}

/**
 * Enable 2FA request
 */
export interface Enable2FARequest {
  method: 'app' | 'sms' | 'email';
  verificationCode?: string;
}

/**
 * Enable 2FA response
 */
export interface Enable2FAResponse {
  /** QR code URL for authenticator apps */
  qrCodeUrl?: string;
  /** Backup codes */
  backupCodes?: string[];
}

/**
 * Active session
 */
export interface Session {
  /** Session ID */
  id: string;

  /** Device description */
  device: string;

  /** Browser info */
  browser?: string;

  /** Operating system */
  os?: string;

  /** IP address */
  ipAddress?: string;

  /** Approximate location */
  location: string;

  /** Last activity timestamp */
  lastActive: string;

  /** Whether this is the current session */
  current: boolean;
}

// ============================================================================
// Billing Types
// ============================================================================

/**
 * Credit balance
 */
export interface CreditBalance {
  used: number;
  total: number;
  percentage?: number;
}

/**
 * Subscription plan
 */
export interface Plan {
  /** Plan ID */
  id?: string;

  /** Plan name */
  name: string;

  /** Plan price */
  price: number;

  /** Currency */
  currency?: string;

  /** Billing cycle */
  billing: BillingCycle;

  /** Credit allocation */
  credits: CreditBalance;

  /** Next renewal date */
  renewalDate: string;

  /** Plan status */
  status: PlanStatus;

  /** Features included */
  features?: string[];
}

/**
 * Payment method
 */
export interface PaymentMethod {
  /** Payment method ID */
  id: string;

  /** Card type */
  type: CardType;

  /** Last 4 digits */
  last4: string;

  /** Expiry month (1-12) */
  expiryMonth: number;

  /** Expiry year (4 digits) */
  expiryYear: number;

  /** Whether this is the default payment method */
  isDefault: boolean;

  /** Cardholder name */
  cardholderName?: string;
}

/**
 * Add payment method request
 */
export interface AddPaymentMethodRequest {
  /** Stripe/payment token */
  token: string;
  /** Set as default */
  setAsDefault?: boolean;
}

/**
 * Invoice
 */
export interface Invoice {
  /** Invoice ID */
  id: string;

  /** Invoice date */
  date: string;

  /** Amount */
  amount: number;

  /** Currency */
  currency?: string;

  /** Invoice status */
  status: InvoiceStatus;

  /** PDF download URL */
  pdfUrl?: string;

  /** Description */
  description?: string;
}

// ============================================================================
// Preferences Types
// ============================================================================

/**
 * User preferences
 */
export interface Preferences {
  // Appearance
  /** Theme mode */
  theme: ThemeMode;

  /** Interface language */
  language: SupportedLocale;

  // Notifications
  /** Email notifications */
  emailNotifications: boolean;

  /** Push notifications */
  pushNotifications: boolean;

  /** Translation completion alerts */
  translationAlerts: boolean;

  // Localization
  /** Date format */
  dateFormat: DateFormat;

  /** Time format */
  timeFormat: TimeFormat;

  /** Timezone */
  timezone: string;

  // Translation defaults
  /** Default source language */
  defaultSourceLanguage: string;

  /** Default target language */
  defaultTargetLanguage: string;

  // Other
  /** Auto-save translation drafts */
  autoSaveDrafts: boolean;

  /** Show helpful tooltips */
  showTooltips: boolean;
}

/**
 * Update preferences request
 */
export type UpdatePreferencesRequest = Partial<Preferences>;

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Account overview response
 */
export interface AccountOverviewResponse {
  profile: UserProfile;
  plan: Plan;
  preferences: Preferences;
  twoFactor: TwoFactorStatus;
}

/**
 * Sessions list response
 */
export interface SessionsResponse {
  sessions: Session[];
  currentSessionId: string;
}

/**
 * Billing overview response
 */
export interface BillingOverviewResponse {
  plan: Plan;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  defaultPaymentMethodId: string | null;
}

// ============================================================================
// Store Types
// ============================================================================

/**
 * Account tab
 */
export type AccountTab = 'profile' | 'billing' | 'settings';

/**
 * Account dialog state
 */
export interface AccountDialogState {
  isOpen: boolean;
  activeTab: AccountTab;
}

/**
 * Account store state
 */
export interface AccountState {
  // Dialog state
  isDialogOpen: boolean;
  activeTab: AccountTab;

  // Form states
  isProfileDirty: boolean;
  isPreferencesDirty: boolean;

  // Loading states
  isSaving: boolean;
}

/**
 * Account store actions
 */
export interface AccountActions {
  // Dialog
  openDialog: (tab?: AccountTab) => void;
  closeDialog: () => void;
  setActiveTab: (tab: AccountTab) => void;

  // Form
  setProfileDirty: (dirty: boolean) => void;
  setPreferencesDirty: (dirty: boolean) => void;

  // Loading
  setSaving: (saving: boolean) => void;

  // Reset
  reset: () => void;
}

// ============================================================================
// React Query Keys
// ============================================================================

export const accountQueryKeys = {
  all: ['account'] as const,
  profile: () => [...accountQueryKeys.all, 'profile'] as const,
  preferences: () => [...accountQueryKeys.all, 'preferences'] as const,
  sessions: () => [...accountQueryKeys.all, 'sessions'] as const,
  twoFactor: () => [...accountQueryKeys.all, '2fa'] as const,
  billing: () => [...accountQueryKeys.all, 'billing'] as const,
  plan: () => [...accountQueryKeys.billing(), 'plan'] as const,
  paymentMethods: () =>
    [...accountQueryKeys.billing(), 'payment-methods'] as const,
  invoices: () => [...accountQueryKeys.billing(), 'invoices'] as const,
};

// ============================================================================
// Constants
// ============================================================================

export const DEFAULT_PREFERENCES: Preferences = {
  theme: 'auto',
  language: 'en',
  emailNotifications: true,
  pushNotifications: true,
  translationAlerts: true,
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  defaultSourceLanguage: 'en',
  defaultTargetLanguage: 'vi',
  autoSaveDrafts: true,
  showTooltips: true,
};

export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Ho_Chi_Minh',
  'Asia/Singapore',
  'Australia/Sydney',
] as const;
