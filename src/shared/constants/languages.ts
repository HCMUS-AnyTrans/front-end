export interface AppLanguage {
  code: string;
  name: string;
  apiName: string;
}

export const appLanguages: AppLanguage[] = [
  { code: 'en', name: 'English', apiName: 'English' },
  { code: 'vi', name: 'Tiếng Việt', apiName: 'Vietnamese' },
  { code: 'ja', name: '日本語', apiName: 'Japanese' },
  { code: 'ko', name: '한국어', apiName: 'Korean' },
  { code: 'zh', name: '中文', apiName: 'Chinese' },
  { code: 'fr', name: 'Français', apiName: 'French' },
  { code: 'de', name: 'Deutsch', apiName: 'German' },
  { code: 'es', name: 'Español', apiName: 'Spanish' },
  { code: 'ru', name: 'Русский', apiName: 'Russian' },
  { code: 'ar', name: 'العربية', apiName: 'Arabic' },
  { code: 'th', name: 'ภาษาไทย', apiName: 'Thai' },
  { code: 'hi', name: 'हिन्दी', apiName: 'Hindi' },
];
