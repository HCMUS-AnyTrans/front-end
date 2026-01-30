'use client';

import React from 'react';

interface ToggleSettingRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
}

export function ToggleSettingRow({
  label,
  description,
  checked,
  onChange,
  icon,
}: ToggleSettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && (
          <div className="w-10 h-10 shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
