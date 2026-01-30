/**
 * Account Feature - React Query Hooks
 *
 * Custom hooks for account data fetching and mutations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
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
  cancelSubscription,
  upgradePlan,
} from './api';
import {
  accountQueryKeys,
  type UpdateProfileRequest,
  type ChangePasswordRequest,
  type Enable2FARequest,
  type UpdatePreferencesRequest,
  type AddPaymentMethodRequest,
} from './types';

// ============================================================================
// Profile Hooks
// ============================================================================

/**
 * Fetch user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: accountQueryKeys.profile(),
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(accountQueryKeys.profile(), updatedProfile);
    },
  });
}

/**
 * Upload avatar
 */
export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.profile() });
    },
  });
}

/**
 * Delete avatar
 */
export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.profile() });
    },
  });
}

// ============================================================================
// Security Hooks
// ============================================================================

/**
 * Change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });
}

/**
 * Get two-factor status
 */
export function useTwoFactorStatus() {
  return useQuery({
    queryKey: accountQueryKeys.twoFactor(),
    queryFn: getTwoFactorStatus,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Enable two-factor authentication
 */
export function useEnableTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Enable2FARequest) => enableTwoFactor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.twoFactor() });
    },
  });
}

/**
 * Disable two-factor authentication
 */
export function useDisableTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => disableTwoFactor(password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.twoFactor() });
    },
  });
}

/**
 * Get active sessions
 */
export function useSessions() {
  return useQuery({
    queryKey: accountQueryKeys.sessions(),
    queryFn: getSessions,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Revoke a session
 */
export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.sessions() });
    },
  });
}

/**
 * Revoke all other sessions
 */
export function useRevokeAllOtherSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: revokeAllOtherSessions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.sessions() });
    },
  });
}

// ============================================================================
// Preferences Hooks
// ============================================================================

/**
 * Get user preferences
 */
export function usePreferences() {
  return useQuery({
    queryKey: accountQueryKeys.preferences(),
    queryFn: getPreferences,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Update preferences
 */
export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePreferencesRequest) => updatePreferences(data),
    onSuccess: (updatedPreferences) => {
      queryClient.setQueryData(
        accountQueryKeys.preferences(),
        updatedPreferences
      );
    },
  });
}

/**
 * Reset preferences to defaults
 */
export function useResetPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPreferences,
    onSuccess: (defaultPreferences) => {
      queryClient.setQueryData(
        accountQueryKeys.preferences(),
        defaultPreferences
      );
    },
  });
}

// ============================================================================
// Billing Hooks
// ============================================================================

/**
 * Get current plan
 */
export function usePlan() {
  return useQuery({
    queryKey: accountQueryKeys.plan(),
    queryFn: getPlan,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get billing overview
 */
export function useBillingOverview() {
  return useQuery({
    queryKey: accountQueryKeys.billing(),
    queryFn: getBillingOverview,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get payment methods
 */
export function usePaymentMethods() {
  return useQuery({
    queryKey: accountQueryKeys.paymentMethods(),
    queryFn: getPaymentMethods,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Add payment method
 */
export function useAddPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddPaymentMethodRequest) => addPaymentMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.paymentMethods(),
      });
    },
  });
}

/**
 * Remove payment method
 */
export function useRemovePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.paymentMethods(),
      });
    },
  });
}

/**
 * Set default payment method
 */
export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => setDefaultPaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.paymentMethods(),
      });
    },
  });
}

/**
 * Get invoices
 */
export function useInvoices() {
  return useQuery({
    queryKey: accountQueryKeys.invoices(),
    queryFn: getInvoices,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Cancel subscription
 */
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reason?: string) => cancelSubscription(reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.plan() });
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.billing() });
    },
  });
}

/**
 * Upgrade plan
 */
export function useUpgradePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (planId: string) => upgradePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.plan() });
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.billing() });
    },
  });
}
