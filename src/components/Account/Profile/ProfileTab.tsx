import React from 'react';
import { useTranslations } from 'next-intl';

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  avatar?: string;
}

interface ProfileTabProps {
  userData: UserData;
}

export default function ProfileTab({ userData }: ProfileTabProps) {
  const t = useTranslations('common.profile.personalInfo');
  const tActions = useTranslations('common.profile.actions');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('fullName')}
            </label>
            <input
              type="text"
              value={userData.fullName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('emailAddress')}
            </label>
            <input
              type="email"
              value={userData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('phoneNumber')}
            </label>
            <input
              type="tel"
              value={userData.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('company')}
            </label>
            <input
              type="text"
              value={userData.company}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            {tActions('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
}
