import { appLanguages } from '@/shared/constants';
import type { LanguageCode } from '@/features/documents/types';
import type {
  TranslationTemplate,
  TranslationTemplateFormValues,
  TranslationTemplatePayload,
} from '../types';

export const TEMPLATE_NONE_VALUE = 'none';
export const TEMPLATE_CUSTOM_VALUE = 'custom';

export function languageCodeToApiName(value: string): string {
  return (
    appLanguages.find((language) => language.code === value)?.apiName ?? value
  );
}

export function apiLanguageToCode(
  value: string | null | undefined,
): LanguageCode | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  const language = appLanguages.find(
    (item) =>
      item.code.toLowerCase() === normalized ||
      item.apiName.toLowerCase() === normalized ||
      item.name.toLowerCase() === normalized,
  );

  return (language?.code as LanguageCode | undefined) ?? null;
}

export function getLanguageDisplayName(
  value: string | null | undefined,
): string {
  if (!value) return '-';
  const code = apiLanguageToCode(value);
  if (!code) return value;
  return (
    appLanguages.find((language) => language.code === code)?.apiName ?? value
  );
}

export function getTemplateDomainLabel(
  template: Pick<TranslationTemplate, 'domainId' | 'customizedDomain'>,
  getDomainLabelById: (domainId: string) => string | null,
): string {
  const domainLabel = getDomainLabelById(template.domainId);
  if (domainLabel) return domainLabel;

  const customizedDomain = template.customizedDomain?.trim();
  if (customizedDomain) return customizedDomain;

  return template.domainId || '-';
}

export function templateToFormValues(
  template?: TranslationTemplate | null,
): TranslationTemplateFormValues {
  return {
    name: template?.name ?? '',
    srcLang: apiLanguageToCode(template?.srcLang) ?? 'en',
    tgtLang: apiLanguageToCode(template?.tgtLang) ?? 'vi',
    domainId: template?.domainId ?? '',
    customizedDomain: template?.customizedDomain ?? '',
    docToneId: template?.docToneId ?? 'professional',
    pdfTranslationFlow: template?.pdfTranslationFlow ?? 'format_preserved',
    keepOriginalFontSize: template?.keepOriginalFontSize ?? true,
    useSystemGlossary: template?.useSystemGlossary ?? true,
    customInstruction: template?.customInstruction ?? '',
    globalContext: template?.globalContext ?? '',
  };
}

export function formValuesToTemplatePayload(
  values: TranslationTemplateFormValues,
): TranslationTemplatePayload {
  return {
    name: values.name.trim(),
    srcLang: languageCodeToApiName(values.srcLang),
    tgtLang: languageCodeToApiName(values.tgtLang),
    domainId: values.domainId,
    customizedDomain: values.customizedDomain.trim(),
    docToneId: values.docToneId,
    pdfTranslationFlow: values.pdfTranslationFlow,
    keepOriginalFontSize: values.keepOriginalFontSize,
    useSystemGlossary: values.useSystemGlossary,
    customInstruction: values.customInstruction.trim() || undefined,
    globalContext: values.globalContext.trim() || undefined,
  };
}
