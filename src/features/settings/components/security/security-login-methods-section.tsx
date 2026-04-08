'use client';

import { useTranslations } from 'next-intl';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import { authProviderOptions } from '../../data';
import { SecurityProviderRow } from './security-provider-row';
import type { AuthIdentity, AuthProvider } from '../../types';

interface SecurityLoginMethodsSectionProps {
  identities: AuthIdentity[];
  isLinking: boolean;
  isUnlinking: boolean;
  onLink: (provider: AuthProvider) => void;
  onUnlink: (identityId: string) => void;
}

export function SecurityLoginMethodsSection({
  identities,
  isLinking,
  isUnlinking,
  onLink,
  onUnlink,
}: SecurityLoginMethodsSectionProps) {
  const t = useTranslations('settings.security');

  return (
    <SettingsSection
      title={t('loginMethods')}
      description={t('loginMethodsDescription')}
    >
      <div className="space-y-1">
        {authProviderOptions.map((provider, idx) => {
          const identity = identities.find((i) => i.provider === provider.id);

          return (
            <div key={provider.id}>
              {idx > 0 && <SettingsDivider />}
              <SecurityProviderRow
                provider={provider}
                identity={identity}
                isLinking={isLinking}
                isUnlinking={isUnlinking}
                onLink={onLink}
                onUnlink={onUnlink}
              />
            </div>
          );
        })}
      </div>
    </SettingsSection>
  );
}
