import { apiClient } from '@/lib/api-client';
import type {
  Glossary,
  GlossaryDetail,
  GlossaryListResponse,
  GlossaryTemplateListResponse,
  GlossaryLlmPrice,
  GlossaryQueryParams,
  CreateGlossaryDto,
  UpdateGlossaryDto,
  Term,
  TermListResponse,
  TermQueryParams,
  CreateTermDto,
  UpdateTermDto,
  BulkCreateTermsDto,
  BulkImportResult,
} from '../types';
import type { MessageResponse } from '@/types/api.types';

type GlossaryDto = Glossary;

type GlossaryDetailDto = GlossaryDetail;

type GlossaryTemplateDto = GlossaryTemplateListResponse['items'][number];

interface GlossaryListResponseDto {
  items: GlossaryDto[];
  pagination: GlossaryListResponse['pagination'];
}

function mapGlossaryDto(dto: GlossaryDto): Glossary {
  return dto;
}

function mapGlossaryDetailDto(dto: GlossaryDetailDto): GlossaryDetail {
  return dto;
}

function mapGlossaryTemplateDto(
  dto: GlossaryTemplateDto,
): GlossaryTemplateListResponse['items'][number] {
  return dto;
}

// ============================================================================
// Glossary CRUD
// ============================================================================

/**
 * Create a new glossary
 * POST /glossaries
 */
export async function createGlossaryApi(
  dto: CreateGlossaryDto,
): Promise<Glossary> {
  const response = await apiClient.post<GlossaryDto>('/glossaries', dto);
  return mapGlossaryDto(response.data);
}

/**
 * List glossaries for the current user (paginated, filterable)
 * GET /glossaries
 */
export async function listGlossariesApi(
  params?: GlossaryQueryParams,
): Promise<GlossaryListResponse> {
  const response = await apiClient.get<GlossaryListResponseDto>('/glossaries', {
    params,
  });
  return {
    ...response.data,
    items: response.data.items.map(mapGlossaryDto),
  };
}

export async function listGlossaryTemplatesApi(
  domainId?: string,
): Promise<GlossaryTemplateListResponse> {
  const response = await apiClient.get<{ items: GlossaryTemplateDto[] }>(
    '/glossaries/templates',
    {
      params: domainId ? { domain_id: domainId } : undefined,
    },
  );
  return {
    items: response.data.items.map(mapGlossaryTemplateDto),
  };
}

export async function getGlossaryLlmPriceApi(): Promise<GlossaryLlmPrice> {
  const response = await apiClient.get<GlossaryLlmPrice>(
    '/glossaries/pricing/llm-generation',
  );
  return response.data;
}

/**
 * Get a single glossary with its first 50 terms
 * GET /glossaries/:glossaryId
 */
export async function getGlossaryApi(
  glossaryId: string,
): Promise<GlossaryDetail> {
  const response = await apiClient.get<GlossaryDetailDto>(
    `/glossaries/${glossaryId}`,
  );
  return mapGlossaryDetailDto(response.data);
}

/**
 * Update glossary metadata (domain, srcLang, tgtLang)
 * PATCH /glossaries/:glossaryId
 */
export async function updateGlossaryApi(
  glossaryId: string,
  dto: UpdateGlossaryDto,
): Promise<Glossary> {
  const response = await apiClient.patch<GlossaryDto>(
    `/glossaries/${glossaryId}`,
    dto,
  );
  return mapGlossaryDto(response.data);
}

/**
 * Delete a glossary and all its terms (cascade)
 * DELETE /glossaries/:glossaryId
 */
export async function deleteGlossaryApi(
  glossaryId: string,
): Promise<MessageResponse> {
  const response = await apiClient.delete<MessageResponse>(
    `/glossaries/${glossaryId}`,
  );
  return response.data;
}

// ============================================================================
// Term CRUD
// ============================================================================

/**
 * Add a single term to a glossary
 * POST /glossaries/:glossaryId/terms
 */
export async function addTermApi(
  glossaryId: string,
  dto: CreateTermDto,
): Promise<Term> {
  const response = await apiClient.post<Term>(
    `/glossaries/${glossaryId}/terms`,
    dto,
  );
  return response.data;
}

/**
 * List terms within a glossary (paginated, searchable)
 * GET /glossaries/:glossaryId/terms
 */
export async function listTermsApi(
  glossaryId: string,
  params?: TermQueryParams,
): Promise<TermListResponse> {
  const response = await apiClient.get<TermListResponse>(
    `/glossaries/${glossaryId}/terms`,
    { params },
  );
  return response.data;
}

/**
 * Bulk import terms into a glossary (max 500 per request)
 * POST /glossaries/:glossaryId/terms/bulk
 */
export async function bulkImportTermsApi(
  glossaryId: string,
  dto: BulkCreateTermsDto,
): Promise<BulkImportResult> {
  const response = await apiClient.post<BulkImportResult>(
    `/glossaries/${glossaryId}/terms/bulk`,
    dto,
  );
  return response.data;
}

/**
 * Update a single term
 * PATCH /glossaries/:glossaryId/terms/:termId
 */
export async function updateTermApi(
  glossaryId: string,
  termId: string,
  dto: UpdateTermDto,
): Promise<Term> {
  const response = await apiClient.patch<Term>(
    `/glossaries/${glossaryId}/terms/${termId}`,
    dto,
  );
  return response.data;
}

/**
 * Delete a single term
 * DELETE /glossaries/:glossaryId/terms/:termId
 */
export async function deleteTermApi(
  glossaryId: string,
  termId: string,
): Promise<MessageResponse> {
  const response = await apiClient.delete<MessageResponse>(
    `/glossaries/${glossaryId}/terms/${termId}`,
  );
  return response.data;
}
