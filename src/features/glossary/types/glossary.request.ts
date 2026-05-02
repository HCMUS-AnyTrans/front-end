/**
 * Request body for creating a glossary.
 * Maps to backend CreateGlossaryDto.
 */
export interface CreateGlossaryDto {
  name: string;
  domainId: string;
  srcLang: string;
  tgtLang: string;
  customized_domain?: string;
  mode?: 'manual' | 'template' | 'llm';
  templateId?: string;
  files?: Array<{
    storageKey: string;
    fileName?: string;
  }>;
}

/**
 * Request body for updating a glossary.
 * Maps to backend UpdateGlossaryDto. All fields optional.
 */
export interface UpdateGlossaryDto {
  name?: string;
  domainId?: string;
  srcLang?: string;
  tgtLang?: string;
}

/**
 * Query parameters for listing glossaries.
 * Maps to backend GlossaryQueryDto.
 */
export interface GlossaryQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  domainId?: string;
  srcLang?: string;
  tgtLang?: string;
}

/**
 * Query parameters for listing terms within a glossary.
 * Maps to backend TermQueryDto.
 */
export interface TermQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

/**
 * Request body for creating a single term.
 * Maps to backend CreateTermDto.
 */
export interface CreateTermDto {
  srcTerm: string;
  tgtTerm: string;
}

/**
 * Request body for updating a single term.
 * Maps to backend UpdateTermDto. All fields optional.
 */
export interface UpdateTermDto {
  srcTerm?: string;
  tgtTerm?: string;
}

/**
 * Request body for bulk importing terms.
 * Maps to backend BulkCreateTermsDto.
 */
export interface BulkCreateTermsDto {
  terms: CreateTermDto[];
}
