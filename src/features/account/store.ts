/**
 * Account Feature - Zustand Store
 *
 * UI state management for account dialog and forms.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AccountState, AccountActions, AccountTab } from './types';

// ============================================================================
// Store Types
// ============================================================================

type AccountStore = AccountState & AccountActions;

// ============================================================================
// Initial State
// ============================================================================

const initialState: AccountState = {
  isDialogOpen: false,
  activeTab: 'profile',
  isProfileDirty: false,
  isPreferencesDirty: false,
  isSaving: false,
};

// ============================================================================
// Store
// ============================================================================

export const useAccountStore = create<AccountStore>()(
  devtools(
    (set) => ({
      ...initialState,

      // Dialog actions
      openDialog: (tab: AccountTab = 'profile') => {
        set({
          isDialogOpen: true,
          activeTab: tab,
        });
      },

      closeDialog: () => {
        set({
          isDialogOpen: false,
          // Reset form states on close
          isProfileDirty: false,
          isPreferencesDirty: false,
        });
      },

      setActiveTab: (tab: AccountTab) => {
        set({ activeTab: tab });
      },

      // Form actions
      setProfileDirty: (dirty: boolean) => {
        set({ isProfileDirty: dirty });
      },

      setPreferencesDirty: (dirty: boolean) => {
        set({ isPreferencesDirty: dirty });
      },

      // Loading actions
      setSaving: (saving: boolean) => {
        set({ isSaving: saving });
      },

      // Reset
      reset: () => {
        set(initialState);
      },
    }),
    { name: 'account-store' }
  )
);

// ============================================================================
// Selectors
// ============================================================================

/**
 * Check if any form has unsaved changes
 */
export const selectHasUnsavedChanges = (state: AccountState) =>
  state.isProfileDirty || state.isPreferencesDirty;

/**
 * Check if dialog can be closed safely
 */
export const selectCanCloseDialog = (state: AccountState) =>
  !state.isSaving && !selectHasUnsavedChanges(state);

// ============================================================================
// Hook Selectors
// ============================================================================

/**
 * Use dialog state
 */
export function useAccountDialog() {
  return useAccountStore((state) => ({
    isOpen: state.isDialogOpen,
    activeTab: state.activeTab,
    openDialog: state.openDialog,
    closeDialog: state.closeDialog,
    setActiveTab: state.setActiveTab,
  }));
}

/**
 * Use form state
 */
export function useAccountFormState() {
  return useAccountStore((state) => ({
    isProfileDirty: state.isProfileDirty,
    isPreferencesDirty: state.isPreferencesDirty,
    isSaving: state.isSaving,
    setProfileDirty: state.setProfileDirty,
    setPreferencesDirty: state.setPreferencesDirty,
    setSaving: state.setSaving,
    hasUnsavedChanges: state.isProfileDirty || state.isPreferencesDirty,
  }));
}
