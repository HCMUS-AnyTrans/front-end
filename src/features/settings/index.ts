// Feature: User Settings

// Components - shared
export {
  SettingsLayout,
  SettingsTabContent,
  SettingsSection,
  SettingsRow,
  SettingsDivider,
} from './components';

// Components - tabs
export {
  ProfileTab,
  PreferencesTab,
  SecurityTab,
  NotificationsTab,
  BillingTab,
  FilesTab,
  ActivityTab,
} from './components';

// API - profile & preferences
export {
  getProfileApi,
  updateProfileApi,
  requestGeneralUploadApi,
  uploadFileToPresignedUrl,
  buildStorageUrl,
  getPreferencesApi,
  updatePreferencesApi,
} from './api';

// API - security & notifications
export {
  changePasswordApi,
  getIdentitiesApi,
  unlinkIdentityApi,
  linkIdentityApi,
  getNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
  deleteNotificationApi,
  getNotificationPreferencesApi,
  updateNotificationPreferencesApi,
} from './api';

// API - billing, files, activity
export {
  getWalletApi,
  getWalletLedgerApi,
  getCreditPackagesApi,
  createVnpayPaymentApi,
  getPaymentsApi,
  getFilesApi,
  getFileDownloadApi,
  deleteFileApi,
  getStorageUsageApi,
  getActivityApi,
} from './api';

// Hooks - profile & preferences
export {
  useProfile,
  useUpdateProfile,
  useUploadAvatar,
  usePreferences,
  useUpdatePreferences,
} from './hooks';

// Hooks - security & notifications
export {
  useIdentities,
  useUnlinkIdentity,
  useLinkIdentity,
  useChangePassword,
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from './hooks';

// Hooks - billing, files, activity
export {
  useWallet,
  useWalletLedger,
  useCreditPackages,
  usePayments,
  useCreateVnpayPayment,
  useFiles,
  useFileDownload,
  useDeleteFile,
  useStorageUsage,
  useActivity,
} from './hooks';

// Types - shared & profile/preferences
export type {
  Pagination,
  PaginatedResponse,
  UserProfile,
  UpdateProfileDto,
  GeneralUploadRequest,
  GeneralUploadResponse,
  UILanguage,
  Theme,
  FileTTL,
  UserPreferences,
  UpdatePreferencesDto,
} from './types';

// Types - security & notifications
export type {
  AuthProvider,
  AuthIdentity,
  ChangePasswordDto,
  NotificationType,
  Notification,
  NotificationPreference,
  UpdateNotificationPreferencesDto,
} from './types';

// Types - billing
export type {
  Wallet,
  LedgerType,
  WalletLedger,
  LedgerSummary,
  WalletLedgerResponse,
  PaymentStatus,
  PaymentPackage,
  Payment,
  CreditPackageType,
  CreditPackage,
  CreateVnpayPaymentDto,
  CreateVnpayPaymentResponse,
} from './types';

// Types - files & activity
export type {
  FileStatus,
  FileType,
  UserFile,
  FileDetail,
  FileDownloadResponse,
  StorageUsage,
  AuditAction,
  AuditLog,
  SettingsTab,
  NotificationsQuery,
  LedgerQuery,
  PaymentsQuery,
  FilesQuery,
  ActivityQuery,
} from './types';

// Data - shared settings config
export {
  uiLanguageOptions,
  authProviderOptions,
  FILE_TTL_OPTIONS,
  themeOptions,
  ACCEPTED_TYPES,
  MAX_FILE_SIZE,
  notificationTypeIcons,
  createLedgerTypeConfig,
  createPaymentStatusConfig,
  createActivityActionConfig,
} from './data';
