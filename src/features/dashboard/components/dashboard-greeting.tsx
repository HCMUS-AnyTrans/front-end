'use client';

import { useTranslations } from 'next-intl';
import { useUser } from '@/features/auth';

export function DashboardGreeting() {
  const t = useTranslations('dashboard.welcome');
  const user = useUser();

  return (
    <div className="max-w-xl space-y-2">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
        {t('greeting', { name: user?.fullName || '' })}
      </h2>
      <p className="text-sm leading-6 text-slate-600 sm:text-base">
        {t('description')}
      </p>
    </div>
  );
}
