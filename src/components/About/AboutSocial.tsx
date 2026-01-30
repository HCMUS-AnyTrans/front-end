'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SocialLinksSection } from '@/components/Common';
import { AboutSocialProps } from '@/types/about';

export default function AboutSocial({ socialLinks }: AboutSocialProps) {
  const t = useTranslations('about.sections.social');

  return (
    <SocialLinksSection
      title={t('title')}
      subtitle={t('subtitle')}
      socialLinks={socialLinks}
      variant="compact"
    />
  );
}
