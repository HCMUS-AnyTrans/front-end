import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ROUTES } from '@/config';

export default function FooterLogo() {
  const t = useTranslations('footer.logo');

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={ROUTES.PUBLIC.HOME}
        className="group inline-flex items-center gap-3 w-fit transition-all duration-300 hover:shadow-2xl hover:scale-102"
        aria-label="Anytrans - Go to homepage"
      >
        {/* Logo Icon */}
        <div className="relative flex-shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4169E1] to-[#1e3a8a] rounded-xl shadow-lg group-hover:rotate-45 transition-all duration-300">
            <Image
              src="/logo/logo.svg"
              alt=""
              width={28}
              height={28}
              className="w-7 h-7 group-hover:-rotate-45 transition-all duration-300"
            />
          </div>
        </div>

        {/* Logo Text */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white tracking-tight">
            {t('companyName')}
          </span>
          <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
            {t('tagline')}
          </span>
        </div>
      </Link>

      <p className="text-gray-400 text-sm leading-relaxed max-w-md">
        {t('description')}
      </p>
    </div>
  );
}
