'use client';

import React from 'react';
import { X } from 'lucide-react';

type AccountDialogHeaderProps = {
  onClose: () => void;
};

export default function AccountDialogHeader({
  onClose,
}: AccountDialogHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your profile, billing and preferences
        </p>
      </div>
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
