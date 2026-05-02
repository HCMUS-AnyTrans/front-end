'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SecurityOauthBannerProps {
  linkSuccess: string | null;
}

export function SecurityOauthBanner({ linkSuccess }: SecurityOauthBannerProps) {
  const t = useTranslations('settings.security');

  if (!linkSuccess) return null;

  return (
    <Alert className="border-success bg-success/10 text-success [&>svg]:text-success">
      <CheckCircle className="size-4" />
      <AlertDescription>
        {t('linkSuccess', {
          provider: linkSuccess.charAt(0).toUpperCase() + linkSuccess.slice(1),
        })}
      </AlertDescription>
    </Alert>
  );
}
