'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { UserData } from '@/types/account';

type PersonalInfoFormProps = {
  user: UserData;
  onChange?: (partial: Partial<UserData>) => void;
};

export default function PersonalInfoForm({
  user,
  onChange,
}: PersonalInfoFormProps) {
  const t = useTranslations('common.profile.personalInfo');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('title')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('fullName')}
          </label>
          <input
            type="text"
            defaultValue={user.fullName}
            onChange={(e) => onChange?.({ fullName: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('emailAddress')}
          </label>
          <input
            type="email"
            defaultValue={user.email}
            disabled
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('phoneNumber')}
          </label>
          <input
            type="tel"
            defaultValue={user.phone}
            onChange={(e) => onChange?.({ phone: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t('company')}
          </label>
          <input
            type="text"
            defaultValue={user.company}
            onChange={(e) => onChange?.({ company: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
