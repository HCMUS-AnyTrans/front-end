import { apiClient } from '@/lib/api-client';
import type {
  Term,
  TermListResponse,
  TermQueryParams,
  CreateTermDto,
  UpdateTermDto,
  BulkCreateTermsDto,
  BulkImportResult,
} from '../types';
import type { MessageResponse } from '@/types/api.types';

/**
 * Add a single term to a glossary.
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
 * List terms within a glossary.
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
 * Bulk import terms into a glossary.
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
 * Update a single term.
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
 * Delete a single term.
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
