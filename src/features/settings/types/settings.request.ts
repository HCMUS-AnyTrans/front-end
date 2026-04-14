import type {
  AuditAction,
  CropData,
  FileStatus,
  FileTTL,
  FileType,
  LedgerType,
  NotificationType,
  PaymentStatus,
  Theme,
  UILanguage,
} from './settings.types';

export interface UpdateProfileDto {
  fullName?: string;
  phone?: string | null;
  avatarUrl?: string | null;
}

export interface GeneralUploadRequest {
  file_name: string;
  file_size: number;
  mime_type: string;
  group?: string;
}

export interface ProcessAvatarRequest {
  storage_key: string;
  crop: CropData;
}

export interface UpdatePreferencesDto {
  uiLanguage?: UILanguage;
  theme?: Theme;
  fileTtl?: FileTTL;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateNotificationPreferencesDto {
  preferences: Array<{
    type: NotificationType;
    emailEnabled: boolean;
    pushEnabled: boolean;
  }>;
}

export interface CreatePaymentDto {
  packageId: string;
  returnUrl: string;
}

export interface NotificationsQuery {
  page?: number;
  limit?: number;
  isRead?: boolean;
  type?: NotificationType;
}

export interface LedgerQuery {
  page?: number;
  limit?: number;
  type?: LedgerType;
  from?: string;
  to?: string;
}

export interface PaymentsQuery {
  page?: number;
  limit?: number;
  status?: PaymentStatus;
}

export interface FilesQuery {
  page?: number;
  limit?: number;
  type?: FileType;
  status?: FileStatus;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ActivityQuery {
  page?: number;
  limit?: number;
  action?: AuditAction;
  from?: string;
  to?: string;
}
