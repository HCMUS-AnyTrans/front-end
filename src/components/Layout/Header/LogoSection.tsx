'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ROUTES } from '@/config';

interface LogoSectionProps {
  onClick?: () => void;
}

export function LogoSection({ onClick }: LogoSectionProps) {
  return (
    <Link
      href={ROUTES.PUBLIC.HOME}
      className="flex items-center hover:scale-102 transition-all duration-300 delay-0"
      onClick={onClick}
    >
      <Image
        src="/logo/logo-name-mono.svg"
        alt="anytrans"
        width={200}
        height={40}
        priority
        className="w-50 h-10"
      />
    </Link>
  );
}
