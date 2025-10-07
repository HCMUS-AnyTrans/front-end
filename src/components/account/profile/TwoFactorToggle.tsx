'use client';

import React from 'react';
import { Shield } from 'lucide-react';

type TwoFactorToggleProps = {
  enabled: boolean;
  onToggle: (next: boolean) => void;
};

export default function TwoFactorToggle({
  enabled,
  onToggle,
}: TwoFactorToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            Two-Factor Authentication
          </p>
          <p className="text-xs text-gray-600">
            Add extra security to your account
          </p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onToggle(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
