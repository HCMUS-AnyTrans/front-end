'use client';

import Image from 'next/image';
import { LanguageFlag } from '@/components/shared';
import { cn } from '@/lib/utils';

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
  size = 256,
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
      quality={100}
      sizes={`${size}px`}
      className={cn('shrink-0 object-contain', className)}
    />
  );
}
