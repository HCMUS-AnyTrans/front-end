/**
 * Account Feature Module
 *
 * Provides comprehensive account/profile management functionality.
 *
 * @example
 * ```tsx
 * import {
 *   useProfile,
 *   useUpdateProfile,
 *   useAccountDialog,
 *   type UserProfile,
 * } from '@/features/account';
 *
 * function ProfileForm() {
 *   const { data: profile, isLoading } = useProfile();
 *   const updateProfile = useUpdateProfile();
 *   const { closeDialog } = useAccountDialog();
 *
 *   const handleSubmit = async (data) => {
 *     await updateProfile.mutateAsync(data);
 *     closeDialog();
 *   };
 *
 *   // ...
 * }
 * ```
 */

// Types
export type {
  // Core types
  ThemeMode,
  SupportedLocale,
  DateFormat,
  TimeFormat,
  BillingCycle,
  PlanStatus,
  CardType,
  InvoiceStatus,
  // Profile
  UserProfile,
  UpdateProfileRequest,
  AvatarUploadResponse,
  // Security
  ChangePasswordRequest,
  TwoFactorStatus,
  Enable2FARequest,
  Enable2FAResponse,
  Session,
  SessionsResponse,
  // Billing
  CreditBalance,
  Plan,
  PaymentMethod,
  AddPaymentMethodRequest,
  Invoice,
  BillingOverviewResponse,
  // Preferences
  Preferences,
  UpdatePreferencesRequest,
  // API
  AccountOverviewResponse,
  // Store
  AccountTab,
  AccountDialogState,
  AccountState,
  AccountActions,
} from './types';

// Constants
export { accountQueryKeys, DEFAULT_PREFERENCES, TIMEZONES } from './types';

// API functions
export {
  // Profile
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  // Security
  changePassword,
  getTwoFactorStatus,
  enableTwoFactor,
  disableTwoFactor,
  getSessions,
  revokeSession,
  revokeAllOtherSessions,
  // Preferences
  getPreferences,
  updatePreferences,
  resetPreferences,
  // Billing
  getPlan,
  getBillingOverview,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,
  getInvoices,
  downloadInvoice,
  cancelSubscription,
  upgradePlan,
  // Helpers
  formatCardExpiry,
  isCardExpiringSoon,
  isCardExpired,
  formatCurrency,
  getCardBrandIcon,
} from './api';

// Hooks
export {
  // Profile
  useProfile,
  useUpdateProfile,
  useUploadAvatar,
  useDeleteAvatar,
  // Security
  useChangePassword,
  useTwoFactorStatus,
  useEnableTwoFactor,
  useDisableTwoFactor,
  useSessions,
  useRevokeSession,
  useRevokeAllOtherSessions,
  // Preferences
  usePreferences,
  useUpdatePreferences,
  useResetPreferences,
  // Billing
  usePlan,
  useBillingOverview,
  usePaymentMethods,
  useAddPaymentMethod,
  useRemovePaymentMethod,
  useSetDefaultPaymentMethod,
  useInvoices,
  useCancelSubscription,
  useUpgradePlan,
} from './hooks';

// Store
export {
  useAccountStore,
  // Selectors
  selectHasUnsavedChanges,
  selectCanCloseDialog,
  // Hook selectors
  useAccountDialog,
  useAccountFormState,
} from './store';
