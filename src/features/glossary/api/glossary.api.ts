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
} from '../types';
import type { MessageResponse } from '@/types/api.types';

type GlossaryDto = Glossary;

type GlossaryDetailDto = GlossaryDetail;

type GlossaryTemplateDto = GlossaryTemplateListResponse['items'][number];

interface GlossaryListResponseDto {
  items: GlossaryDto[];
  pagination: GlossaryListResponse['pagination'];
  summary: GlossaryListResponse['summary'];
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

/**
 * Create a new glossary.
 * POST /glossaries
 */
export async function createGlossaryApi(
  dto: CreateGlossaryDto,
): Promise<Glossary> {
  const response = await apiClient.post<GlossaryDto>('/glossaries', dto);
  return mapGlossaryDto(response.data);
}

/**
 * List glossaries for the current user.
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

/**
 * List glossary templates available for a domain.
 * GET /glossaries/templates
 */
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

/**
 * Get the current LLM glossary generation price.
 * GET /glossaries/pricing/llm-generation
 */
export async function getGlossaryLlmPriceApi(): Promise<GlossaryLlmPrice> {
  const response = await apiClient.get<GlossaryLlmPrice>(
    '/glossaries/pricing/llm-generation',
  );
  return response.data;
}

/**
 * Get a glossary with its first page of terms.
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
 * Update glossary metadata.
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
 * Delete a glossary and all its terms.
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
