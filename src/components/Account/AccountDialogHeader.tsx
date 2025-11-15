'use client';

import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BaseHeader } from '@/components/Common';
import { useMediaQuery } from '@/hooks';

type AccountDialogHeaderProps = {
  onClose: () => void;
};

export default function AccountDialogHeader({
  onClose,
}: AccountDialogHeaderProps) {
  const t = useTranslations('common.account');
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <div className="flex items-center justify-end gap-4 lg:justify-between border-b pb-6 border-gray-200 flex-row-reverse lg:flex-row">
      <BaseHeader
        title={t('title')}
        description={t('description')}
        variant="dialog"
        className="!p-0 !border-0"
      />
      <button
        onClick={onClose}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
        aria-label={t('closeDialog')}
      >
        {isMobile ? (
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        ) : (
          <X className="w-5 h-5 text-gray-500" />
        )}
      </button>
    </div>
  );
}
