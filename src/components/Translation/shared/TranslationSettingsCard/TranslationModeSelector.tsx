'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TranslationModeSelectorProps {
  label: string;
  placeholder: string;
  value: string;
  modeLabels: {
    contextAware?: string;
    literal?: string;
    creative?: string;
    formal?: string;
  };
  onChange: (value: string) => void;
}

export function TranslationModeSelector({
  label,
  placeholder,
  value,
  modeLabels,
  onChange,
}: TranslationModeSelectorProps) {
  const labels = {
    contextAware: modeLabels.contextAware || 'Context-Aware (Recommended)',
    literal: modeLabels.literal || 'Literal Translation',
    creative: modeLabels.creative || 'Creative Adaptation',
    formal: modeLabels.formal || 'Formal/Documentary',
  };

  return (
    <div>
      <Label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="context-aware">{labels.contextAware}</SelectItem>
          <SelectItem value="literal">{labels.literal}</SelectItem>
          <SelectItem value="creative">{labels.creative}</SelectItem>
          <SelectItem value="formal">{labels.formal}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
