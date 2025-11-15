import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      common: (await import(`../../locales/${locale}/common.json`)).default,
      header: (await import(`../../locales/${locale}/layout/header.json`))
        .default,
      footer: (await import(`../../locales/${locale}/layout/footer.json`))
        .default,
      home: (await import(`../../locales/${locale}/pages/home.json`)).default,
      pricing: (await import(`../../locales/${locale}/pages/pricing.json`))
        .default,
      features: (await import(`../../locales/${locale}/pages/features.json`))
        .default,
      about: (await import(`../../locales/${locale}/pages/about.json`)).default,
      contact: (await import(`../../locales/${locale}/pages/contact.json`))
        .default,
      dashboard: (
        await import(`../../locales/${locale}/features/dashboard.json`)
      ).default,
      documentTranslation: (
        await import(
          `../../locales/${locale}/features/documentTranslation.json`
        )
      ).default,
      subtitleTranslation: (
        await import(
          `../../locales/${locale}/features/subtitleTranslation.json`
        )
      ).default,
      translationHistory: (
        await import(`../../locales/${locale}/features/translationHistory.json`)
      ).default,
      notifications: (
        await import(`../../locales/${locale}/features/notifications.json`)
      ).default,
      support: (await import(`../../locales/${locale}/pages/support.json`))
        .default,
      terms: (await import(`../../locales/${locale}/pages/terms.json`))
        .default,
      privacy: (await import(`../../locales/${locale}/pages/privacy.json`))
        .default,
      sidebar: (await import(`../../locales/${locale}/layout/sidebar.json`))
        .default,
      notFound: (await import(`../../locales/${locale}/pages/notFound.json`))
        .default,
      auth: (await import(`../../locales/${locale}/features/auth.json`))
        .default,
    },
  };
});
