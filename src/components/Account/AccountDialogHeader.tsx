'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BaseHeader } from '@/components/Common';

type AccountDialogHeaderProps = {
  onClose: () => void;
};

export default function AccountDialogHeader({
  onClose,
}: AccountDialogHeaderProps) {
  const t = useTranslations('common.account');

  return (
    <div className="flex items-center justify-between border-b pb-6 border-gray-200">
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
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
