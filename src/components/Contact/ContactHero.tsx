'use client';

import React, { memo } from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquare } from 'lucide-react';
import { PageHero } from '@/components/Common';

const ContactHero = memo(function ContactHero() {
  const t = useTranslations('contact.hero');

  return (
    <PageHero
      badge={{
        text: t('badge'),
        icon: MessageSquare,
      }}
      title={t('title')}
      description={t('description')}
      variant="gradient"
      gradientDirection="r"
    />
  );
});

export default ContactHero;
