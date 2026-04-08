'use client';

import { useTranslations } from 'next-intl';
import { Progress } from '@/components/ui/progress';
import { SettingsSection } from '../shared/settings-section';

interface FilesStorageSectionProps {
  usedText: string;
  usagePercent: number;
  fileCount: number;
}

export function FilesStorageSection({
  usedText,
  usagePercent,
  fileCount,
}: FilesStorageSectionProps) {
  const t = useTranslations('settings.files');

  return (
    <SettingsSection title={t('storageUsage')}>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{usedText}</span>
          <span className="font-medium text-foreground">
            {usagePercent.toFixed(1)}%
          </span>
        </div>
        <Progress value={usagePercent} className="h-2" />
        <p className="text-sm text-muted-foreground">
          {t('filesStored', { count: fileCount })}
        </p>
      </div>
    </SettingsSection>
  );
}
