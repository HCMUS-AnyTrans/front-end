import type { PaginationMeta } from '@/types';
import type { Glossary, GlossaryTemplate, Term } from './glossary.types';

/**
 * Paginated list of glossaries.
 * Maps to backend GlossaryListResponseDto.
 */
export interface GlossaryListResponse {
  items: Glossary[];
  pagination: PaginationMeta;
}

/**
 * Paginated list of terms.
 * Maps to backend TermListResponseDto.
 */
export interface TermListResponse {
  items: Term[];
  pagination: PaginationMeta;
}

/**
 * List of glossary templates available for glossary creation flows.
 */
export interface GlossaryTemplateListResponse {
  items: GlossaryTemplate[];
}

/**
 * Result of a bulk import operation.
 * Maps to backend BulkImportResultDto.
 */
export interface BulkImportResult {
  created: number;
  skipped: number;
}
