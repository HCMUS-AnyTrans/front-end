'use client';

import React from 'react';
import Link from 'next/link';

export default function SidebarLogo() {
  return (
    <div className="flex items-center justify-center gap-3 px-6 py-6">
      <Link href="/" className="flex items-center">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] tracking-tight">
          anytrans
        </h1>
      </Link>
    </div>
  );
}
