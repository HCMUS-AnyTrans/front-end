'use client';

import React from 'react';

type ProfileSaveBarProps = {
  onCancel: () => void;
  onSave: () => void;
};

export default function ProfileSaveBar({
  onCancel,
  onSave,
}: ProfileSaveBarProps) {
  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={onCancel}
        className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all"
      >
        Save Changes
      </button>
    </div>
  );
}
