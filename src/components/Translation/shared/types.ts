// Shared types for Translation Configure components

export type TranslationMode =
  | 'context-aware'
  | 'literal'
  | 'creative'
  | 'formal';

export type LanguageCode =
  | 'English'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Japanese'
  | 'Chinese'
  | 'Korean'
  | 'Vietnamese'
  | 'Thai'
  | 'Indonesian';

export interface TranslationSettingsProps {
  sourceLanguage: string;
  targetLanguage: string;
  translationMode: string;
  onChangeSource: (value: string) => void;
  onChangeTarget: (value: string) => void;
  onChangeMode: (value: string) => void;
  sourceLanguageOptions?: LanguageCode[];
  targetLanguageOptions?: LanguageCode[];
}

export interface ConfigureActionButtonsProps {
  onBack: () => void;
  onTranslate: () => void;
  isProcessing: boolean;
  disabled?: boolean;
  translateButtonText?: string;
  processingText?: string;
  backButtonText?: string;
}
