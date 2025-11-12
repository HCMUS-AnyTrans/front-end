'use client';

import React from 'react';
import { Link } from '@/i18n/routing';

export default function SidebarLogo() {
  return (
    <div className="flex items-center justify-center gap-3 px-6 py-6">
      <Link href="/" className="flex items-center">
        <img
          src="/logo/logo-name-mono.svg"
          alt="anytrans"
          className="w-40 h-10"
        />
      </Link>
    </div>
  );
}
