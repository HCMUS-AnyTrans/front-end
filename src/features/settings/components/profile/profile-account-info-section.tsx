'use client';

import { useTranslations } from 'next-intl';
import {
  SettingsDivider,
  SettingsRow,
  SettingsSection,
} from '../shared/settings-section';

interface ProfileAccountInfoSectionProps {
  profileId: string;
  memberSinceText: string;
  lastLoginText: string;
}

export function ProfileAccountInfoSection({
  profileId,
  memberSinceText,
  lastLoginText,
}: ProfileAccountInfoSectionProps) {
  const t = useTranslations('settings.profile');

  return (
    <SettingsSection title={t('memberSince')}>
      <div className="space-y-1">
        <SettingsRow label="ID">
          <code className="rounded bg-muted px-2 py-1 text-xs">
            {profileId}
          </code>
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow label={t('memberSince')}>
          <span className="text-sm text-foreground">{memberSinceText}</span>
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow label={t('lastLogin')}>
          <span className="text-sm text-foreground">{lastLoginText}</span>
        </SettingsRow>
      </div>
    </SettingsSection>
  );
}
