import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anytrans.me';
  const locales = ['en', 'vi'];
  const currentDate = new Date();

  // Define all public pages
  const pages = [
    '',
    '/about',
    '/contact',
    '/features',
    '/pricing',
    '/faq',
    '/privacy',
    '/terms',
  ];

  // Generate sitemap entries for all locales and pages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            vi: `${baseUrl}/vi${page}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
