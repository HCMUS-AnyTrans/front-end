'use client';

import React from 'react';
import { Switch } from '@/components/ui/switch';
import { IconContainer } from '@/components/ui/icon-container';

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
          <IconContainer variant="secondary" size="sm">
            {icon}
          </IconContainer>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
