'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type ShowPasswords = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

type ChangePasswordSectionProps = {
  show: ShowPasswords;
  onToggle: (field: keyof ShowPasswords) => void;
};

export default function ChangePasswordSection({
  show,
  onToggle,
}: ChangePasswordSectionProps) {
  const t = useTranslations('common.profile.changePassword');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('title')}</h3>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {t('changePassword')}
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('currentPassword')}
            </label>
            <div className="relative">
              <input
                type={show.current ? 'text' : 'password'}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => onToggle('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {show.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('newPassword')}
              </label>
              <div className="relative">
                <input
                  type={show.new ? 'text' : 'password'}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => onToggle('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {show.new ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={show.confirm ? 'text' : 'password'}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => onToggle('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {show.confirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
