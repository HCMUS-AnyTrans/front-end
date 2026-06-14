'use client';

import Image from 'next/image';
import type { ComponentType } from 'react';
import * as FlagIcons from 'country-flag-icons/react/3x2';
import { cn } from '@/lib/utils';

type FlagIcon = ComponentType<{ className?: string }>;

const LANGUAGE_FLAG_CODES: Record<string, string> = {
  en: 'GB',
  vi: 'VN',
  ja: 'JP',
  ko: 'KR',
  zh: 'CN',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
  ru: 'RU',
  ar: 'SA',
  th: 'TH',
  hi: 'IN',
};

const DOMAIN_ICON_PATHS: Record<string, string> = {
  administrative: '/glossary/administrative.png',
  auto: '/glossary/auto.png',
  commerce: '/glossary/comerce.png',
  engineering: '/glossary/engineering.png',
  finance: '/glossary/finance.png',
  general: '/glossary/general.png',
  it_software: '/glossary/it-software.png',
  legal: '/glossary/legal.png',
  marketing_advertising: '/glossary/marketing-advertising.png',
  media_entertainment: '/glossary/media-entertainment.png',
  medical: '/glossary/medical.png',
  other: '/glossary/other.png',
  science_academic: '/glossary/science-academic.png',
  tourism: '/glossary/tourism.png',
};

const flagIcons = FlagIcons as Record<string, FlagIcon>;

export function GlossaryLanguageFlag({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const flagCode = LANGUAGE_FLAG_CODES[code];
  const Flag = flagCode ? flagIcons[flagCode] : null;

  return Flag ? (
    <Flag className={cn('h-4 w-5 shrink-0', className)} />
  ) : (
    <span className={cn('size-4 shrink-0', className)} aria-hidden="true" />
  );
}

export function GlossaryDomainIcon({
  domainKey,
  className,
  size = 32,
}: {
  domainKey?: string | null;
  className?: string;
  size?: number;
}) {
  const src = DOMAIN_ICON_PATHS[domainKey ?? ''] ?? DOMAIN_ICON_PATHS.other;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn('shrink-0 object-contain', className)}
    />
  );
}
