'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useTransition } from 'react';

const locales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
] as const;

export default function LocaleSwitcher() {
  const t = useTranslations('common.locale');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    const nextLocale = newLocale as 'en' | 'vi';

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });

    setIsOpen(false);
  };

  const currentLocale = locales.find((l) => l.code === locale);

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        disabled={isPending}
        className="relative flex items-center gap-1.5 px-3 xl:px-5 py-2.5 rounded-lg font-medium text-sm xl:text-[15px] transition-all duration-300 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-50 disabled:opacity-50"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLocale?.name}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown
          className={`h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="p-2 flex flex-col gap-2">
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => handleLocaleChange(loc.code)}
              disabled={isPending}
              className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-left group ${
                locale === loc.code
                  ? 'bg-blue-50 text-[#4169E1]'
                  : 'hover:bg-blue-50  text-gray-700'
              }`}
            >
              <span
                className={`font-semibold text-[15px] transition-colors ${
                  locale === loc.code
                    ? 'text-[#4169E1]'
                    : 'text-gray-900 group-hover:text-[#4169E1]'
                }`}
              >
                {t(loc.code)}
              </span>
              {locale === loc.code && (
                <span className="ml-auto text-[#4169E1] font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
