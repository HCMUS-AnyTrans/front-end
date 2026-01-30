'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

interface ContactFormSuccessProps {
  onReset: () => void;
}

export function ContactFormSuccess({ onReset }: ContactFormSuccessProps) {
  const t = useTranslations('contact.form');

  return (
    <div
      className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in-scale"
      onClick={onReset}
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {t('successMessage.title')}
      </h3>
      <p className="text-gray-600">{t('successMessage.description')}</p>
    </div>
  );
}
