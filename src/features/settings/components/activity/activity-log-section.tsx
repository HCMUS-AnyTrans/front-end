'use client';

import { useTranslations } from 'next-intl';
import { History } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { SettingsDivider, SettingsSection } from '../shared/settings-section';
import { ActivityLogItem } from './activity-log-item';
import type { AuditLog } from '../../types';

interface ActivityLogSectionProps {
  logs: AuditLog[];
  pagination?: {
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

export function ActivityLogSection({
  logs,
  pagination,
  isFetching,
  onPageChange,
}: ActivityLogSectionProps) {
  const t = useTranslations('settings.activity');

  return (
    <SettingsSection title={t('title')} description={t('description')}>
      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <History className="mb-2 size-8" />
          <p>{t('noActivity')}</p>
        </div>
      ) : (
        <div className="space-y-1">
          {logs.map((log, idx) => (
            <div key={log.id}>
              {idx > 0 && <SettingsDivider />}
              <ActivityLogItem log={log} />
            </div>
          ))}
        </div>
      )}

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          onPageChange={onPageChange}
          isFetching={isFetching}
        />
      )}
    </SettingsSection>
  );
}
