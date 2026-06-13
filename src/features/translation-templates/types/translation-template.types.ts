import type { PdfTranslationFlow } from '@/features/documents/types';

export interface TranslationTemplate {
  id: string;
  userId: string;
  name: string;
  customInstruction?: string;
  globalContext?: string;
  srcLang: string;
  tgtLang: string;
  domainId: string;
  customizedDomain?: string;
  docTone: string;
  pdfTranslationFlow: PdfTranslationFlow;
  keepOriginalFontSize?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TranslationTemplatePayload {
  name: string;
  customInstruction?: string;
  globalContext?: string;
  srcLang: string;
  tgtLang: string;
  domainId: string;
  customizedDomain?: string;
  docTone: string;
  pdfTranslationFlow: PdfTranslationFlow;
  keepOriginalFontSize?: boolean;
}

export interface TranslationTemplateQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  domainId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TranslationTemplateListResponse {
  items: TranslationTemplate[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface TranslationTemplateFormValues {
  name: string;
  srcLang: string;
  tgtLang: string;
  domainId: string;
  customizedDomain: string;
  docTone: string;
  pdfTranslationFlow: PdfTranslationFlow;
  keepOriginalFontSize: boolean;
  customInstruction: string;
  globalContext: string;
}
