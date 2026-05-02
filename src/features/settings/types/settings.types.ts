// Common / pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// User & profile
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  isOAuthUser: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

// Avatar helpers
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Preferences
export type UILanguage = 'vi' | 'en';
export type Theme = 'light' | 'dark' | 'system';
export type FileTTL = number;

export interface UserPreferences {
  uiLanguage: UILanguage;
  theme: Theme;
  fileTtl: FileTTL;
}

// Security
export type AuthProvider = 'google' | 'credentials';

export interface AuthIdentity {
  id: string;
  provider: AuthProvider;
  email: string | null;
  linkedAt: string;
  canUnlink: boolean;
}

// Notifications
export type NotificationType =
  | 'translation_status'
  | 'glossary_status'
  | 'credit_purchase'
  | 'file_expiring'
  | 'security_alert'
  | 'promotion'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: Record<string, string>;
  message: Record<string, string>;
  data?: Record<string, unknown>;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationPreference {
  type: NotificationType;
  label: string;
  description: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
}

// Billing & wallet
export interface Wallet {
  id: string;
  balance: number;
  updatedAt: string;
}

export type LedgerType = 'topup' | 'spend' | 'refund';

export interface WalletLedger {
  id: string;
  ledgerType: LedgerType;
  delta: number;
  refTable: string;
  refId: string;
  note: string;
  createdAt: string;
}

export interface LedgerSummary {
  totalTopup: number;
  totalSpend: number;
  totalRefund: number;
  netChange: number;
}

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled';

export interface PaymentPackage {
  id: string;
  name: string;
  credits: number;
}

export interface Payment {
  id: string;
  provider: string;
  providerPaymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
  paidAt: string | null;
  package: PaymentPackage;
}

export type CreditPackageType = 'personal' | 'business';

export interface CreditPackage {
  id: string;
  name: string;
  description: Record<string, string[]>;
  credits: number;
  price: number;
  currency: string;
  type: CreditPackageType;
  active: boolean;
  bonus: number | null;
  discount: number | null;
  tags: string[];
}

// Files
export type FileStatus = 'pending' | 'uploaded' | 'parsed' | 'failed';
export type FileType = 'doc' | 'sub' | 'doc-result' | 'sub-result';

export interface UserFile {
  id: string;
  name: string;
  mime: string;
  sizeBytes: number;
  status: FileStatus;
  type: FileType;
  createdAt: string;
  storeUntil: string;
}

export interface FileDetail extends UserFile {
  sha256: string;
  metadata?: {
    pageCount?: number;
    wordCount?: number;
    detectedLanguage?: string;
  };
}

export interface StorageUsage {
  used: number;
  total: number;
  unit: string;
  percentage: number;
  fileCount: number;
  breakdown: {
    documents: { count: number; size: number };
  };
}

// Activity & audit
export type AuditAction =
  | 'login'
  | 'logout'
  | 'password_change'
  | 'profile_update'
  | 'provider_link'
  | 'provider_unlink'
  | 'session_revoke'
  | 'file_upload'
  | 'file_delete'
  | 'translation_start'
  | 'translation_complete'
  | 'credit_purchase'
  | 'settings_change';

export interface AuditLog {
  id: string;
  action: AuditAction;
  description: string;
  ip: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  location: string | null;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// Settings tabs
export type SettingsTab =
  | 'profile'
  | 'preferences'
  | 'security'
  | 'notifications'
  | 'billing'
  | 'files'
  | 'activity';
