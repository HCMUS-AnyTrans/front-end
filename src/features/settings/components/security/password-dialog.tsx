'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ChangePasswordDto } from '../../types';

interface SecurityPasswordDialogProps {
  passwordForm: ChangePasswordDto;
  isChanging: boolean;
  isPasswordError: boolean;
  passwordError: unknown;
  onFormChange: (next: ChangePasswordDto) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function SecurityPasswordDialog({
  passwordForm,
  isChanging,
  isPasswordError,
  passwordError,
  onFormChange,
  onClose,
  onSubmit,
}: SecurityPasswordDialogProps) {
  const t = useTranslations('settings.security');
  const tCommon = useTranslations('common');

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t('changePassword')}</DialogTitle>
        <DialogDescription>{t('enterCurrentAndNew')}</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="current">{t('currentPassword')}</Label>
          <Input
            id="current"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              onFormChange({ ...passwordForm, currentPassword: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new">{t('newPassword')}</Label>
          <Input
            id="new"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              onFormChange({ ...passwordForm, newPassword: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">{t('confirmPassword')}</Label>
          <Input
            id="confirm"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              onFormChange({ ...passwordForm, confirmPassword: e.target.value })
            }
          />
        </div>
        {isPasswordError && (
          <p className="text-sm text-destructive">
            {(passwordError as Error)?.message || t('changePasswordError')}
          </p>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          {tCommon('cancel')}
        </Button>
        <Button onClick={onSubmit} disabled={isChanging}>
          {isChanging ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {t('changePassword')}
            </>
          ) : (
            t('changePassword')
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
