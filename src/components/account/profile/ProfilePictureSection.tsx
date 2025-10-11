'use client';

import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { UserData } from '@/src/types/account';

type ProfilePictureSectionProps = {
  user: UserData;
  onUploadClick?: () => void;
};

export default function ProfilePictureSection({
  user,
  onUploadClick,
}: ProfilePictureSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Profile Picture
      </h3>
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border-2 border-blue-600 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors shadow-lg cursor-pointer">
            <Camera className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-3">
            Upload a profile picture (JPG, PNG or GIF, max 5MB)
          </p>
          <button
            onClick={onUploadClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload New Photo
          </button>
        </div>
      </div>
    </div>
  );
}
