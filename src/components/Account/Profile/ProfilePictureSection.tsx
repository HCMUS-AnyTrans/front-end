'use client';

import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UserData } from '@/types/account';
import { Button } from '@/components/ui/button';

type ProfilePictureSectionProps = {
  user: UserData;
  onUploadClick?: () => void;
};

export default function ProfilePictureSection({
  user,
  onUploadClick,
}: ProfilePictureSectionProps) {
  const t = useTranslations('common.profile.profilePicture');

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('title')}</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border-2 border-blue-600 text-primary rounded-full hover:bg-blue-50 shadow-lg"
          >
            <Camera className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-gray-600 mb-3">{t('uploadDescription')}</p>
          <Button variant="outline" onClick={onUploadClick} className="gap-2">
            <Upload className="w-4 h-4" />
            {t('uploadNewPhoto')}
          </Button>
        </div>
      </div>
    </div>
  );
}
