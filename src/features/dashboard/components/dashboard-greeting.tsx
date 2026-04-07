'use client';

import { useTranslations } from 'next-intl';
import { useUser } from '@/features/auth';

export function DashboardGreeting() {
  const t = useTranslations('dashboard.welcome');
  const user = useUser();

  return (
    <div>
      <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl">
        {t('greeting', { name: user?.fullName || '' })}
      </h2>
      <p className="text-sm text-muted-foreground">{t('description')}</p>
    </div>
  );
}
