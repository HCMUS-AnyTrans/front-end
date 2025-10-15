import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // All supported locales
  locales: ['en', 'vi'],

  // Default locale
  defaultLocale: 'en',

  // Locale prefix strategy
  localePrefix: 'always',
});

// Create typed navigation helpers
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
