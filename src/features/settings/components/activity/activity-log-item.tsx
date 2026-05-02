'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Monitor, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { createActivityActionConfig } from '../../data';
import {
  formatActivityDateTime,
  isMobileActivityDevice,
} from '../../utils/activity-display';
import type { AuditAction, AuditLog } from '../../types';

interface ActivityLogItemProps {
  log: AuditLog;
}

export function ActivityLogItem({ log }: ActivityLogItemProps) {
  const t = useTranslations('settings.activity');
  const locale = useLocale();
  const config = createActivityActionConfig((key) => t(key))[
    log.action as AuditAction
  ] || {
    label: log.action,
    color: 'bg-muted text-muted-foreground',
  };
  const isMobile = isMobileActivityDevice(log.device);

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          {isMobile ? (
            <Smartphone className="size-4 text-muted-foreground" />
          ) : (
            <Monitor className="size-4 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={cn('text-xs', config.color)} variant="secondary">
              {config.label}
            </Badge>
            <span className="text-sm text-foreground">{log.description}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{formatActivityDateTime(log.createdAt, locale)}</span>
            {log.browser && (
              <>
                <span>&bull;</span>
                <span>{log.browser}</span>
              </>
            )}
            <span>&bull;</span>
            <span>{log.ip}</span>
            {log.location && (
              <>
                <span>&bull;</span>
                <span>{log.location}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
