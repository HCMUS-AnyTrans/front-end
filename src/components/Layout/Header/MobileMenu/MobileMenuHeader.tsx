'use client';

import React from 'react';
import { X } from 'lucide-react';
import LocaleSwitcher from '../LocaleSwitcher';
import { useTranslations } from 'next-intl';

interface MobileMenuHeaderProps {
  onClose: () => void;
}

export function MobileMenuHeader({ onClose }: MobileMenuHeaderProps) {
  const t = useTranslations('header');

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a]">
      <h2 className="font-bold text-xl text-white">{t('mobileMenu.title')}</h2>
      <div className="flex items-center gap-2">
        <div className="[&_button]:text-white hover:bg-white/20 rounded-xl [&_button]:hover:text-white transition-all duration-300">
          <LocaleSwitcher />
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label={t('mobileMenu.closeMenu')}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
