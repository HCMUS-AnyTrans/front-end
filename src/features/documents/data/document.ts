import type { Language, TranslationConfig } from '../types';
import { appLanguages } from '@/shared/constants';

// =============== LANGUAGES ===============

export const languages: Language[] = appLanguages as Language[];

export const sourceLanguages = languages;
export const targetLanguages = languages;

// =============== DEFAULT CONFIG ===============

export const defaultConfig: TranslationConfig = {
  templateId: null,
  srcLang: 'en',
  tgtLang: 'vi',
  domainId: '',
  customDomain: '',
  tone: 'professional',
  customInstruction: '',
  globalContext: '',
  saveAsTemplate: false,
  templateName: '',
  glossaryInputMode: 'none',
  selectedGlossaryId: null,
  manualTerms: [],
  useSystemGlossary: true,
  keepOriginalFontSize: true,
  fontConfigEnabled: true,
  fontEnabledMap: {},
  fontSelections: {},
  pdfTranslationFlow: 'format_preserved',
};
