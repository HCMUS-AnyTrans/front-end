'use client';

import React from 'react';
import { X } from 'lucide-react';
import { BaseHeader } from '@/src/components/Common';

type AccountDialogHeaderProps = {
  onClose: () => void;
};

export default function AccountDialogHeader({
  onClose,
}: AccountDialogHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
      <BaseHeader
        title="Account Settings"
        description="Manage your profile, billing and preferences"
        variant="dialog"
        className="!p-0 !border-0"
      />
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
