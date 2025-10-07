'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Change Password
        </h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={show.current ? 'text' : 'password'}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => onToggle('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {show.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={show.new ? 'text' : 'password'}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => onToggle('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={show.confirm ? 'text' : 'password'}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => onToggle('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
