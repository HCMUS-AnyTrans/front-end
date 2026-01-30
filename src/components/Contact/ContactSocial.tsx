'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { SocialLinksSection } from '@/components/Common';
import { ContactSocialProps } from '@/types/contact';

export default function ContactSocial({ socialLinks }: ContactSocialProps) {
  const t = useTranslations('contact.social');

  return (
    <SocialLinksSection
      title={t('title')}
      subtitle={t('subtitle')}
      socialLinks={socialLinks}
      variant="default"
    />
  );
}
