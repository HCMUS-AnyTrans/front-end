'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function SidebarLogo() {
  return (
    <div className="flex items-center justify-center gap-3 px-6 py-6">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo/logo-name-mono.svg"
          alt="anytrans icon"
          width={160}
          height={40}
        />
      </Link>
    </div>
  );
}
