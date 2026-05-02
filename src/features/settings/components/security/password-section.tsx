'use client';

import { useTranslations } from 'next-intl';
import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { SettingsSection } from '../shared/settings-section';
import { SecurityPasswordDialog } from './password-dialog';
import type { ChangePasswordDto } from '../../types';

interface SecurityPasswordSectionProps {
  showPasswordDialog: boolean;
  passwordForm: ChangePasswordDto;
  isChanging: boolean;
  isPasswordError: boolean;
  passwordError: unknown;
  onOpenChange: (open: boolean) => void;
  onFormChange: (next: ChangePasswordDto) => void;
  onSubmit: () => void;
}

export function SecurityPasswordSection({
  showPasswordDialog,
  passwordForm,
  isChanging,
  isPasswordError,
  passwordError,
  onOpenChange,
  onFormChange,
  onSubmit,
}: SecurityPasswordSectionProps) {
  const t = useTranslations('settings.security');

  return (
    <SettingsSection
      title={t('password')}
      description={t('passwordDescription')}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <Key className="size-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">••••••••••</p>
            <p className="text-sm text-muted-foreground">
              {t('lastChanged', { time: t('daysAgo', { count: 30 }) })}
            </p>
          </div>
        </div>

        <Dialog open={showPasswordDialog} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button variant="outline">{t('changePassword')}</Button>
          </DialogTrigger>
          <SecurityPasswordDialog
            passwordForm={passwordForm}
            isChanging={isChanging}
            isPasswordError={isPasswordError}
            passwordError={passwordError}
            onFormChange={onFormChange}
            onClose={() => onOpenChange(false)}
            onSubmit={onSubmit}
          />
        </Dialog>
      </div>
    </SettingsSection>
  );
}
