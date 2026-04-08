import { ArrowDownLeft, ArrowUpRight, type LucideIcon } from 'lucide-react';
import type {
  AuditAction,
  FileTTL,
  LedgerType,
  NotificationType,
  PaymentStatus,
  Theme,
} from '../types';

export { settingsUiLanguageOptions as uiLanguageOptions } from '@/shared/data';

export const authProviderOptions = [
  {
    id: 'google',
    name: 'Google',
    icon: '/authen/google.svg',
    color: '#EA4335',
  },
] as const;

export const FILE_TTL_OPTIONS: { value: FileTTL; hours: number }[] = [
  { value: 1, hours: 1 },
  { value: 6, hours: 6 },
  { value: 12, hours: 12 },
  { value: 24, hours: 24 },
];

export const themeOptions: Array<{
  value: Theme;
  labelKey: 'themeLight' | 'themeDark' | 'themeSystem';
}> = [
  { value: 'light', labelKey: 'themeLight' },
  { value: 'dark', labelKey: 'themeDark' },
  { value: 'system', labelKey: 'themeSystem' },
];

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const notificationTypeIcons: Record<NotificationType, string> = {
  translation_status: '\u{1F4C4}',
  glossary_status: '\u{1F4DA}',
  credit_purchase: '\u{1F4B3}',
  file_expiring: '\u26A0\uFE0F',
  security_alert: '\u{1F512}',
  promotion: '\u{1F381}',
  system: '\u2139\uFE0F',
};

export function createLedgerTypeConfig(
  t: (key: 'topUp' | 'usage' | 'refund') => string,
): Record<LedgerType, { icon: LucideIcon; color: string; label: string }> {
  return {
    topup: { icon: ArrowDownLeft, color: 'text-success', label: t('topUp') },
    spend: { icon: ArrowUpRight, color: 'text-destructive', label: t('usage') },
    refund: { icon: ArrowDownLeft, color: 'text-info', label: t('refund') },
  };
}

export function createPaymentStatusConfig(
  t: (key: `paymentStatus.${PaymentStatus}`) => string,
): Record<PaymentStatus, { color: string; label: string }> {
  return {
    pending: {
      color:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      label: t('paymentStatus.pending'),
    },
    succeeded: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      label: t('paymentStatus.succeeded'),
    },
    failed: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      label: t('paymentStatus.failed'),
    },
    cancelled: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      label: t('paymentStatus.cancelled'),
    },
  };
}

export function createActivityActionConfig(
  t: (
    key:
      | 'login'
      | 'logout'
      | 'passwordChange'
      | 'profileUpdate'
      | 'providerLink'
      | 'providerUnlink'
      | 'sessionRevoke'
      | 'fileUpload'
      | 'fileDelete'
      | 'translationStart'
      | 'translationComplete'
      | 'creditPurchase'
      | 'settingsChange',
  ) => string,
): Record<AuditAction, { label: string; color: string }> {
  return {
    login: { label: t('login'), color: 'bg-success/10 text-success' },
    logout: { label: t('logout'), color: 'bg-muted text-muted-foreground' },
    password_change: {
      label: t('passwordChange'),
      color: 'bg-warning/10 text-warning',
    },
    profile_update: {
      label: t('profileUpdate'),
      color: 'bg-primary/10 text-primary',
    },
    provider_link: { label: t('providerLink'), color: 'bg-info/10 text-info' },
    provider_unlink: {
      label: t('providerUnlink'),
      color: 'bg-warning/10 text-warning',
    },
    session_revoke: {
      label: t('sessionRevoke'),
      color: 'bg-destructive/10 text-destructive',
    },
    file_upload: {
      label: t('fileUpload'),
      color: 'bg-primary/10 text-primary',
    },
    file_delete: {
      label: t('fileDelete'),
      color: 'bg-destructive/10 text-destructive',
    },
    translation_start: {
      label: t('translationStart'),
      color: 'bg-primary/10 text-primary',
    },
    translation_complete: {
      label: t('translationComplete'),
      color: 'bg-success/10 text-success',
    },
    credit_purchase: {
      label: t('creditPurchase'),
      color: 'bg-success/10 text-success',
    },
    settings_change: {
      label: t('settingsChange'),
      color: 'bg-muted text-muted-foreground',
    },
  };
}
