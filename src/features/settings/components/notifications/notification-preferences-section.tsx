'use client';

import { Mail, Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import type { NotificationPreference, NotificationType } from '../../types';

interface NotificationPreferencesSectionProps {
  preferences: NotificationPreference[];
  isUpdating: boolean;
  onUpdatePref: (
    type: NotificationType,
    field: 'emailEnabled' | 'pushEnabled',
    value: boolean,
  ) => void;
}

export function NotificationPreferencesSection({
  preferences,
  isUpdating,
  onUpdatePref,
}: NotificationPreferencesSectionProps) {
  const t = useTranslations('settings.notifications');

  return (
    <SettingsSection
      title={t('preferences')}
      description={t('preferencesDescription')}
    >
      <div className="space-y-1">
        <div className="mb-4 flex items-center justify-end gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="size-4" />
            <span>{t('email')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Smartphone className="size-4" />
            <span>{t('push')}</span>
          </div>
        </div>

        {preferences.map((pref, idx) => (
          <div key={pref.type}>
            {idx > 0 && <SettingsDivider />}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-foreground">
                  {t(`types.${pref.type}.label`)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(`types.${pref.type}.description`)}
                </p>
              </div>
              <div className="flex items-center gap-8">
                <Switch
                  checked={pref.emailEnabled}
                  onCheckedChange={(v) =>
                    onUpdatePref(pref.type, 'emailEnabled', v)
                  }
                  disabled={isUpdating}
                />
                <Switch
                  checked={pref.pushEnabled}
                  onCheckedChange={(v) =>
                    onUpdatePref(pref.type, 'pushEnabled', v)
                  }
                  disabled={isUpdating}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
