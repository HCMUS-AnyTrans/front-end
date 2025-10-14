import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      common: (await import(`../../locales/${locale}/common.json`)).default,
      header: (await import(`../../locales/${locale}/header.json`)).default,
      footer: (await import(`../../locales/${locale}/footer.json`)).default,
      home: (await import(`../../locales/${locale}/home.json`)).default,
      pricing: (await import(`../../locales/${locale}/pricing.json`)).default,
      pricingPage: (await import(`../../locales/${locale}/pricingPage.json`))
        .default,
      about: (await import(`../../locales/${locale}/about.json`)).default,
      contact: (await import(`../../locales/${locale}/contact.json`)).default,
      dashboard: (await import(`../../locales/${locale}/dashboard.json`))
        .default,
      documentTranslation: (
        await import(`../../locales/${locale}/documentTranslation.json`)
      ).default,
      subtitleTranslation: (
        await import(`../../locales/${locale}/subtitleTranslation.json`)
      ).default,
      translationHistory: (
        await import(`../../locales/${locale}/translationHistory.json`)
      ).default,
      notifications: (
        await import(`../../locales/${locale}/notifications.json`)
      ).default,
      support: (await import(`../../locales/${locale}/support.json`)).default,
      sidebar: (await import(`../../locales/${locale}/sidebar.json`)).default,
      notFound: (await import(`../../locales/${locale}/notFound.json`)).default,
      auth: (await import(`../../locales/${locale}/auth.json`)).default,
    },
  };
});
