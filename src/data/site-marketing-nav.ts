// Public marketing site: section anchors (landing), header nav, footer link defs.
// Keep hrefs in sync with section `id` on the landing page.

export const LANDING_SECTION_IDS = {
  features: 'features',
  howItWorks: 'how-it-works',
  pricing: 'pricing',
  faq: 'faq',
} as const;

export const MARKETING_SECTION_IDS = [
  LANDING_SECTION_IDS.features,
  LANDING_SECTION_IDS.howItWorks,
  LANDING_SECTION_IDS.pricing,
  LANDING_SECTION_IDS.faq,
] as const;

export type MarketingSectionId = (typeof MARKETING_SECTION_IDS)[number];

export function marketingSectionHref(
  id: MarketingSectionId,
): `/#${MarketingSectionId}` {
  return `/#${id}`;
}

export type MarketingNavItem = {
  labelKey: 'homepage' | 'about' | 'pricing' | 'contact';
  href: `/#${MarketingSectionId}`;
};

export const MARKETING_NAV_ITEMS: MarketingNavItem[] = [
  { labelKey: 'homepage', href: '/#features' },
  { labelKey: 'about', href: '/#how-it-works' },
  { labelKey: 'pricing', href: '/#pricing' },
  { labelKey: 'contact', href: '/#faq' },
];

/** Keys under `marketing.footer.links` in messages */
export type FooterNavLinkLabelKey =
  | 'features'
  | 'pricing'
  | 'api'
  | 'integrations'
  | 'changelog'
  | 'about'
  | 'blog'
  | 'careers'
  | 'contact'
  | 'partners'
  | 'documentation'
  | 'guides'
  | 'tutorials'
  | 'caseStudies'
  | 'support'
  | 'terms'
  | 'privacy'
  | 'cookies'
  | 'dmca';

export type FooterNavSectionId = 'product' | 'company' | 'resources' | 'legal';

export type FooterNavLinkDef = {
  labelKey: FooterNavLinkLabelKey;
  href: string;
};

export type FooterNavSectionDef = {
  id: FooterNavSectionId;
  links: FooterNavLinkDef[];
};

export const FOOTER_NAV_SECTION_DEFS: FooterNavSectionDef[] = [
  {
    id: 'product',
    links: [
      {
        labelKey: 'features',
        href: marketingSectionHref('features'),
      },
      {
        labelKey: 'pricing',
        href: marketingSectionHref('pricing'),
      },
      { labelKey: 'api', href: '/api' },
      { labelKey: 'integrations', href: '/integrations' },
      { labelKey: 'changelog', href: '/changelog' },
    ],
  },
  {
    id: 'company',
    links: [
      {
        labelKey: 'about',
        href: marketingSectionHref('how-it-works'),
      },
      { labelKey: 'blog', href: '/blog' },
      { labelKey: 'careers', href: '/careers' },
      {
        labelKey: 'contact',
        href: marketingSectionHref('faq'),
      },
      { labelKey: 'partners', href: '/partners' },
    ],
  },
  {
    id: 'resources',
    links: [
      { labelKey: 'documentation', href: '/docs' },
      { labelKey: 'guides', href: '/guides' },
      { labelKey: 'tutorials', href: '/tutorials' },
      { labelKey: 'caseStudies', href: '/case-studies' },
      { labelKey: 'support', href: '/support' },
    ],
  },
  {
    id: 'legal',
    links: [
      { labelKey: 'terms', href: '/terms' },
      { labelKey: 'privacy', href: '/privacy' },
      { labelKey: 'cookies', href: '/cookies' },
      { labelKey: 'dmca', href: '/dmca' },
    ],
  },
];

export const FOOTER_BOTTOM_LINK_DEFS: FooterNavLinkDef[] = [
  { labelKey: 'terms', href: '/terms' },
  { labelKey: 'privacy', href: '/privacy' },
  { labelKey: 'cookies', href: '/cookies' },
];
