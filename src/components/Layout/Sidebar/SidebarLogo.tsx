'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ROUTES } from '@/config';

interface SidebarLogoProps {
  isCollapsed?: boolean;
}

export default function SidebarLogo({ isCollapsed }: SidebarLogoProps) {
  return (
    <div className="flex items-center justify-center gap-3 h-10">
      <Link href={ROUTES.PUBLIC.HOME} className="flex items-center">
        {isCollapsed ? (
          <Image src="/logo/logo.svg" alt="anytrans" width={40} height={40} />
        ) : (
          <Image
            src="/logo/logo-name-mono.svg"
            alt="anytrans"
            width={160}
            height={40}
          />
        )}
      </Link>
    </div>
  );
}
