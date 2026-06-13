import { apiClient } from '@/lib/api-client';
import type { MessageResponse } from '@/types/api.types';
import type {
  TranslationTemplate,
  TranslationTemplateListResponse,
  TranslationTemplatePayload,
  TranslationTemplateQueryParams,
} from '../types';

interface TranslationTemplateDto {
  id: string;
  user_id: string;
  name: string;
  custom_instruction?: string;
  global_context?: string;
  src_lang: string;
  tgt_lang: string;
  domain_id: string;
  customized_domain?: string;
  doc_tone_id: string;
  pdf_translation_flow: TranslationTemplate['pdfTranslationFlow'];
  keep_original_font_size?: boolean;
  use_system_glossary?: boolean;
  created_at: string;
  updated_at: string;
}

interface PaginatedTemplateDto {
  items?: TranslationTemplateDto[];
  data?: TranslationTemplateDto[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  pagination?: TranslationTemplateListResponse['pagination'];
  meta?: TranslationTemplateListResponse['pagination'];
}

function mapTemplateDto(dto: TranslationTemplateDto): TranslationTemplate {
  return {
    id: dto.id,
    userId: dto.user_id,
    name: dto.name,
    customInstruction: dto.custom_instruction,
    globalContext: dto.global_context,
    srcLang: dto.src_lang,
    tgtLang: dto.tgt_lang,
    domainId: dto.domain_id,
    customizedDomain: dto.customized_domain,
    docToneId: dto.doc_tone_id,
    pdfTranslationFlow: dto.pdf_translation_flow,
    keepOriginalFontSize: dto.keep_original_font_size,
    useSystemGlossary: dto.use_system_glossary,
    createdAt: dto.created_at,
    updatedAt: dto.updated_at,
  };
}

function mapPayload(payload: TranslationTemplatePayload) {
  return {
    name: payload.name,
    custom_instruction: payload.customInstruction,
    global_context: payload.globalContext,
    src_lang: payload.srcLang,
    tgt_lang: payload.tgtLang,
    domain_id: payload.domainId,
    customized_domain: payload.customizedDomain,
    doc_tone_id: payload.docToneId,
    pdf_translation_flow: payload.pdfTranslationFlow,
    keep_original_font_size: payload.keepOriginalFontSize,
    use_system_glossary: payload.useSystemGlossary,
  };
}

export async function listTranslationTemplatesApi(
  params?: TranslationTemplateQueryParams,
): Promise<TranslationTemplateListResponse> {
  const response = await apiClient.get<
    TranslationTemplateDto[] | PaginatedTemplateDto
  >('/translation-templates', { params });
  const data = response.data;

  if (Array.isArray(data)) {
    return { items: data.map(mapTemplateDto) };
  }

  const items = data.items ?? data.data ?? [];
  const pagination =
    data.pagination ??
    data.meta ??
    (typeof data.total === 'number' &&
    data.page &&
    data.limit &&
    data.totalPages
      ? {
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
          hasNext: data.page < data.totalPages,
          hasPrev: data.page > 1,
        }
      : undefined);

  return {
    items: items.map(mapTemplateDto),
    pagination,
  };
}

export async function getTranslationTemplateApi(
  templateId: string,
): Promise<TranslationTemplate> {
  const response = await apiClient.get<TranslationTemplateDto>(
    `/translation-templates/${templateId}`,
  );
  return mapTemplateDto(response.data);
}

export async function createTranslationTemplateApi(
  payload: TranslationTemplatePayload,
): Promise<TranslationTemplate> {
  const response = await apiClient.post<TranslationTemplateDto>(
    '/translation-templates',
    mapPayload(payload),
  );
  return mapTemplateDto(response.data);
}

export async function updateTranslationTemplateApi(
  templateId: string,
  payload: TranslationTemplatePayload,
): Promise<TranslationTemplate> {
  const response = await apiClient.patch<TranslationTemplateDto>(
    `/translation-templates/${templateId}`,
    mapPayload(payload),
  );
  return mapTemplateDto(response.data);
}

export async function deleteTranslationTemplateApi(
  templateId: string,
): Promise<MessageResponse | { success: boolean }> {
  const response = await apiClient.delete<
    MessageResponse | { success: boolean }
  >(`/translation-templates/${templateId}`);
  return response.data;
}
