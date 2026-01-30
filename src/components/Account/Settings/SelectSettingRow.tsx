'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectSettingRowProps {
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  width?: string;
}

export function SelectSettingRow({
  label,
  description,
  value,
  options,
  onChange,
  width = 'w-full sm:w-[140px]',
}: SelectSettingRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm">{label}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={width}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
