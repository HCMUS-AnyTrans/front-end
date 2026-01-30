'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Switch } from '@/components/ui/switch';
import { IconContainer } from '@/components/ui/icon-container';

type TwoFactorToggleProps = {
  enabled: boolean;
  onToggle: (next: boolean) => void;
};

export default function TwoFactorToggle({
  enabled,
  onToggle,
}: TwoFactorToggleProps) {
  const t = useTranslations('common.profile.twoFactor');

  return (
    <div className="flex items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <IconContainer variant="success" size="sm">
          <Shield className="w-5 h-5" />
        </IconContainer>
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{t('title')}</p>
          <p className="text-xs text-gray-600 truncate">{t('description')}</p>
        </div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
}
