import type { Language, Tone, TranslationConfig } from '../types';
import { appLanguages } from '@/shared/constants';

// =============== LANGUAGES ===============

export const languages: Language[] = appLanguages as Language[];

export const sourceLanguages = languages;
export const targetLanguages = languages;

// =============== TONES ===============

export const tones: Tone[] = [
  {
    id: 'formal',
    name: 'Trang trọng',
    description: 'Phù hợp văn bản chính thức',
  },
  {
    id: 'casual',
    name: 'Thân mật',
    description: 'Phù hợp giao tiếp hàng ngày',
  },
  {
    id: 'professional',
    name: 'Chuyên nghiệp',
    description: 'Phù hợp môi trường công việc',
  },
  { id: 'friendly', name: 'Thân thiện', description: 'Gần gũi, dễ hiểu' },
];

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
