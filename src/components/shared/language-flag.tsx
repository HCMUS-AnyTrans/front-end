'use client';

import type { ComponentType } from 'react';
import * as FlagIcons from 'country-flag-icons/react/3x2';
import { cn } from '@/lib/utils';

type FlagIcon = ComponentType<{ className?: string }>;

const flagIcons = FlagIcons as Record<string, FlagIcon>;

const LANGUAGE_FLAG_CODES: Record<string, string> = {
  en: 'GB',
  english: 'GB',
  vi: 'VN',
  vietnamese: 'VN',
  ja: 'JP',
  japanese: 'JP',
  ko: 'KR',
  korean: 'KR',
  zh: 'CN',
  chinese: 'CN',
  fr: 'FR',
  french: 'FR',
  de: 'DE',
  german: 'DE',
  es: 'ES',
  spanish: 'ES',
  ru: 'RU',
  russian: 'RU',
  ar: 'SA',
  arabic: 'SA',
  th: 'TH',
  thai: 'TH',
  hi: 'IN',
  hindi: 'IN',
};

export interface LanguageFlagProps {
  value: string;
  className?: string;
  fallbackClassName?: string;
}

function getLanguageFlagCode(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  return LANGUAGE_FLAG_CODES[normalized] ?? null;
}

export function LanguageFlag({
  value,
  className,
  fallbackClassName,
}: LanguageFlagProps) {
  const flagCode = getLanguageFlagCode(value);
  const Flag = flagCode ? flagIcons[flagCode] : null;

  return Flag ? (
    <Flag className={className} />
  ) : (
    <span
      className={cn('inline-block shrink-0', fallbackClassName ?? className)}
      aria-hidden="true"
    />
  );
}
