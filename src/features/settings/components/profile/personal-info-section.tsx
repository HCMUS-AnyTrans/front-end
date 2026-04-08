'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/features/auth/components/phone-input';
import {
  SettingsDivider,
  SettingsRow,
  SettingsSection,
} from '../shared/settings-section';
import type { UserProfile } from '../../types';

interface ProfilePersonalInfoSectionProps {
  profile: UserProfile;
  isEditing: boolean;
  isUpdating: boolean;
  formData: {
    fullName: string;
    phone: string;
  };
  formattedPhone: string | null;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onFormChange: (next: { fullName: string; phone: string }) => void;
}

export function ProfilePersonalInfoSection({
  profile,
  isEditing,
  isUpdating,
  formData,
  formattedPhone,
  onStartEdit,
  onCancel,
  onSave,
  onFormChange,
}: ProfilePersonalInfoSectionProps) {
  const t = useTranslations('settings.profile');
  const tCommon = useTranslations('common');

  return (
    <SettingsSection
      title={t('title')}
      action={
        !isEditing ? (
          <Button variant="outline" size="sm" onClick={onStartEdit}>
            {tCommon('edit')}
          </Button>
        ) : null
      }
    >
      <div className="space-y-1">
        <SettingsRow label={t('fullName')}>
          {isEditing ? (
            <Input
              value={formData.fullName}
              onChange={(e) =>
                onFormChange({ ...formData, fullName: e.target.value })
              }
              className="w-64"
            />
          ) : (
            <span className="text-sm text-foreground">{profile.fullName}</span>
          )}
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow label={t('email')}>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">{profile.email}</span>
          </div>
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow label={t('phone')}>
          {isEditing ? (
            <div className="w-72">
              <PhoneInput
                value={formData.phone}
                onChange={(value) =>
                  onFormChange({ ...formData, phone: value || '' })
                }
                label={t('phone')}
                disabled={isUpdating}
                defaultCountry="VN"
              />
            </div>
          ) : (
            <span className="text-sm text-foreground">
              {formattedPhone || (
                <span className="text-muted-foreground">&mdash;</span>
              )}
            </span>
          )}
        </SettingsRow>

        {isEditing && (
          <>
            <SettingsDivider />
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isUpdating}
              >
                {tCommon('cancel')}
              </Button>
              <Button onClick={onSave} disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t('saveChanges')}
                  </>
                ) : (
                  t('saveChanges')
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </SettingsSection>
  );
}
