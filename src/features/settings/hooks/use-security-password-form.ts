'use client';

import { useCallback, useState } from 'react';
import type { ChangePasswordDto } from '../types';

interface UseSecurityPasswordFormOptions {
  changePassword: (
    dto: ChangePasswordDto,
    options?: { onSuccess?: () => void },
  ) => void;
  resetPassword: () => void;
}

export function useSecurityPasswordForm({
  changePassword,
  resetPassword,
}: UseSecurityPasswordFormOptions) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState<ChangePasswordDto>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const resetForm = useCallback(() => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, []);

  const handleChangePassword = useCallback(() => {
    changePassword(passwordForm, {
      onSuccess: () => {
        setShowPasswordDialog(false);
        resetForm();
        resetPassword();
      },
    });
  }, [changePassword, passwordForm, resetForm, resetPassword]);

  const handleOpenPasswordDialog = useCallback(
    (open: boolean) => {
      setShowPasswordDialog(open);
      if (!open) {
        resetForm();
        resetPassword();
      }
    },
    [resetForm, resetPassword],
  );

  return {
    showPasswordDialog,
    passwordForm,
    setPasswordForm,
    handleChangePassword,
    handleOpenPasswordDialog,
  };
}
