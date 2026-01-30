import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/config';

export default function FooterBottom() {
  const t = useTranslations('footer.bottom');

  // Memoize legalLinks to avoid recreation on every render
  const legalLinks = useMemo(
    () => [
      { name: t('terms'), href: ROUTES.PUBLIC.TERMS },
      { name: t('privacy'), href: ROUTES.PUBLIC.PRIVACY },
    ],
    [t]
  );

  return (
    <>
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p
          className="text-gray-400 text-sm"
          dangerouslySetInnerHTML={{ __html: t.raw('copyright') }}
        />

        <div className="flex items-center gap-6">
          {legalLinks.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && (
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
              )}
              <Link
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
