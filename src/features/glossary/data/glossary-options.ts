import {
  NON_AUTO_DOMAIN_OPTIONS_WITH_ICONS,
  appLanguages,
  type AppLanguage,
  type DomainOption as SharedDomainOption,
} from '@/shared/constants';

/** Re-export for backward compatibility. Glossary uses id + icon; name comes from i18n. */
export type DomainOption = SharedDomainOption & { name?: string };

/**
 * Available domain options for glossary creation and filtering.
 */
export const glossaryDomains: DomainOption[] =
  NON_AUTO_DOMAIN_OPTIONS_WITH_ICONS.map((d) => ({ id: d.id, icon: d.icon }));

export type LanguageOption = Pick<AppLanguage, 'code' | 'name'>;

/**
 * Supported language options for glossary source and target language.
 */
export const glossaryLanguages: LanguageOption[] = appLanguages.map(
  ({ code, name }) => ({ code, name }),
);
