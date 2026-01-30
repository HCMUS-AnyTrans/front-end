/**
 * Account Feature - API Layer
 *
 * API functions for account/profile management.
 */

import { api } from '@/lib/api-client';
import { ACCOUNT_ENDPOINTS } from '@/lib/api-config';
import type {
  UserProfile,
  UpdateProfileRequest,
  AvatarUploadResponse,
  ChangePasswordRequest,
  TwoFactorStatus,
  Enable2FARequest,
  Enable2FAResponse,
  Session,
  SessionsResponse,
  Plan,
  PaymentMethod,
  AddPaymentMethodRequest,
  Invoice,
  Preferences,
  UpdatePreferencesRequest,
  AccountOverviewResponse,
  BillingOverviewResponse,
} from './types';

// ============================================================================
// Profile API
// ============================================================================

/**
 * Get user profile
 */
export async function getProfile(): Promise<UserProfile> {
  return api.get<UserProfile>(ACCOUNT_ENDPOINTS.PROFILE, true);
}

/**
 * Update user profile
 */
export async function updateProfile(
  data: UpdateProfileRequest
): Promise<UserProfile> {
  return api.patch<UserProfile>(ACCOUNT_ENDPOINTS.PROFILE, data, true);
}

/**
 * Upload avatar
 */
export async function uploadAvatar(file: File): Promise<AvatarUploadResponse> {
  const formData = new FormData();
  formData.append('avatar', file);

  // Use fetch directly for FormData
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ORIGIN}/api${ACCOUNT_ENDPOINTS.AVATAR}`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload avatar');
  }

  const result = await response.json();
  return result.data;
}

/**
 * Delete avatar
 */
export async function deleteAvatar(): Promise<void> {
  await api.delete<void>(ACCOUNT_ENDPOINTS.AVATAR, true);
}

// ============================================================================
// Security API
// ============================================================================

/**
 * Change password
 */
export async function changePassword(
  data: ChangePasswordRequest
): Promise<void> {
  await api.post<void>(ACCOUNT_ENDPOINTS.CHANGE_PASSWORD, data, true);
}

/**
 * Get two-factor authentication status
 */
export async function getTwoFactorStatus(): Promise<TwoFactorStatus> {
  return api.get<TwoFactorStatus>(ACCOUNT_ENDPOINTS.TWO_FACTOR, true);
}

/**
 * Enable two-factor authentication
 */
export async function enableTwoFactor(
  data: Enable2FARequest
): Promise<Enable2FAResponse> {
  return api.post<Enable2FAResponse>(ACCOUNT_ENDPOINTS.TWO_FACTOR, data, true);
}

/**
 * Disable two-factor authentication
 */
export async function disableTwoFactor(password: string): Promise<void> {
  await api.delete<void>(
    `${ACCOUNT_ENDPOINTS.TWO_FACTOR}?password=${encodeURIComponent(password)}`,
    true
  );
}

/**
 * Get active sessions
 */
export async function getSessions(): Promise<SessionsResponse> {
  return api.get<SessionsResponse>(ACCOUNT_ENDPOINTS.SESSIONS, true);
}

/**
 * Revoke a specific session
 */
export async function revokeSession(sessionId: string): Promise<void> {
  await api.delete<void>(
    `${ACCOUNT_ENDPOINTS.REVOKE_SESSION}/${sessionId}`,
    true
  );
}

/**
 * Revoke all other sessions
 */
export async function revokeAllOtherSessions(): Promise<void> {
  await api.post<void>(ACCOUNT_ENDPOINTS.REVOKE_ALL_SESSIONS, undefined, true);
}

// ============================================================================
// Preferences API
// ============================================================================

/**
 * Get user preferences
 */
export async function getPreferences(): Promise<Preferences> {
  return api.get<Preferences>(ACCOUNT_ENDPOINTS.PREFERENCES, true);
}

/**
 * Update user preferences
 */
export async function updatePreferences(
  data: UpdatePreferencesRequest
): Promise<Preferences> {
  return api.patch<Preferences>(ACCOUNT_ENDPOINTS.PREFERENCES, data, true);
}

/**
 * Reset preferences to defaults
 */
export async function resetPreferences(): Promise<Preferences> {
  return api.post<Preferences>(
    `${ACCOUNT_ENDPOINTS.PREFERENCES}/reset`,
    undefined,
    true
  );
}

// ============================================================================
// Billing API
// ============================================================================

/**
 * Get current plan
 */
export async function getPlan(): Promise<Plan> {
  return api.get<Plan>(ACCOUNT_ENDPOINTS.PLAN, true);
}

/**
 * Get billing overview
 */
export async function getBillingOverview(): Promise<BillingOverviewResponse> {
  return api.get<BillingOverviewResponse>(
    `${ACCOUNT_ENDPOINTS.PLAN}/overview`,
    true
  );
}

/**
 * Get payment methods
 */
export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return api.get<PaymentMethod[]>(ACCOUNT_ENDPOINTS.PAYMENT_METHODS, true);
}

/**
 * Add payment method
 */
export async function addPaymentMethod(
  data: AddPaymentMethodRequest
): Promise<PaymentMethod> {
  return api.post<PaymentMethod>(ACCOUNT_ENDPOINTS.PAYMENT_METHODS, data, true);
}

/**
 * Remove payment method
 */
export async function removePaymentMethod(id: string): Promise<void> {
  await api.delete<void>(`${ACCOUNT_ENDPOINTS.PAYMENT_METHODS}/${id}`, true);
}

/**
 * Set default payment method
 */
export async function setDefaultPaymentMethod(id: string): Promise<void> {
  await api.put<void>(ACCOUNT_ENDPOINTS.DEFAULT_PAYMENT_METHOD, { id }, true);
}

/**
 * Get invoices
 */
export async function getInvoices(): Promise<Invoice[]> {
  return api.get<Invoice[]>(ACCOUNT_ENDPOINTS.INVOICES, true);
}

/**
 * Download invoice PDF
 */
export function downloadInvoice(invoiceId: string): void {
  const url = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api${ACCOUNT_ENDPOINTS.INVOICES}/${invoiceId}/pdf`;
  window.open(url, '_blank');
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(reason?: string): Promise<void> {
  await api.post<void>(ACCOUNT_ENDPOINTS.CANCEL_SUBSCRIPTION, { reason }, true);
}

/**
 * Upgrade plan
 */
export async function upgradePlan(planId: string): Promise<Plan> {
  return api.post<Plan>(ACCOUNT_ENDPOINTS.UPGRADE_PLAN, { planId }, true);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Format card expiry for display
 */
export function formatCardExpiry(month: number, year: number): string {
  const monthStr = month.toString().padStart(2, '0');
  const yearStr = year.toString().slice(-2);
  return `${monthStr}/${yearStr}`;
}

/**
 * Check if card is expiring soon (within 3 months)
 */
export function isCardExpiringSoon(month: number, year: number): boolean {
  const now = new Date();
  const expiryDate = new Date(year, month - 1); // month is 1-indexed
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  return expiryDate <= threeMonthsFromNow && expiryDate >= now;
}

/**
 * Check if card is expired
 */
export function isCardExpired(month: number, year: number): boolean {
  const now = new Date();
  const expiryDate = new Date(year, month); // End of expiry month
  return expiryDate < now;
}

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Get card brand icon name
 */
export function getCardBrandIcon(type: string): string {
  const icons: Record<string, string> = {
    visa: 'visa',
    mastercard: 'mastercard',
    amex: 'amex',
    discover: 'discover',
  };
  return icons[type.toLowerCase()] || 'card';
}
