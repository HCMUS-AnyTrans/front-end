'use client';

import Image from 'next/image';
import { LanguageFlag } from '@/components/shared';
import { cn } from '@/lib/utils';

const DOMAIN_ICON_PATHS: Record<string, string> = {
  administrative: '/glossary/administrative.svg',
  auto: '/glossary/auto.svg',
  commerce: '/glossary/comerce.svg',
  engineering: '/glossary/engineering.svg',
  finance: '/glossary/finance.svg',
  general: '/glossary/general.svg',
  it_software: '/glossary/it-software.svg',
  legal: '/glossary/legal.svg',
  marketing_advertising: '/glossary/marketing-advertising.svg',
  media_entertainment: '/glossary/media-entertainment.svg',
  medical: '/glossary/medical.svg',
  other: '/glossary/other.svg',
  science_academic: '/glossary/science-academic.svg',
  tourism: '/glossary/tourism.svg',
};

export function GlossaryLanguageFlag({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <LanguageFlag
      value={code}
      className={cn('h-6 w-8 shrink-0', className)}
      fallbackClassName={cn('size-4 shrink-0', className)}
    />
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
