import { appLanguages, type AppLanguage } from '@/shared/constants';

export interface SharedLanguageOption {
  code: string;
  name: string;
  flag: string;
}

export interface UiLanguageOption {
  value: string;
  label: string;
  flag: string;
}

const languageFlags: Record<string, string> = {
  vi: '🇻🇳',
  en: '🇺🇸',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  ru: '🇷🇺',
  ar: '🇸🇦',
  th: '🇹🇭',
  hi: '🇮🇳',
};

function toLanguageOption(language: AppLanguage): SharedLanguageOption {
  return {
    code: language.code,
    name: language.name,
    flag: languageFlags[language.code] ?? '🌐',
  };
}

function pickLanguages(codes: string[]) {
  const codeSet = new Set(codes);
  return appLanguages.filter((language) => codeSet.has(language.code));
}

export const uiLanguageOptions = pickLanguages(['vi', 'en']).map(
  toLanguageOption,
);

export const settingsUiLanguageOptions: UiLanguageOption[] =
  uiLanguageOptions.map(({ code, name, flag }) => ({
    value: code,
    label: name,
    flag,
  }));

export const supportedLanguages = pickLanguages([
  'vi',
  'en',
  'ja',
  'ko',
  'zh',
  'fr',
  'de',
]).map(toLanguageOption);

export const languageCodeMap: Record<string, string> = {
  vi: 'VN',
  en: 'EN',
  ja: 'JP',
  ko: 'KR',
  zh: 'CN',
  fr: 'FR',
  de: 'DE',
};
