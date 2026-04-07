/**
 * A single glossary (terminology set) owned by a user.
 * Maps to backend GlossaryDto response shape.
 */
export interface Glossary {
  id: string;
  userId: string;
  name: string;
  domainId: string;
  srcLang: string;
  tgtLang: string;
  status: 'pending' | 'processing' | 'created' | 'failed';
  termCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * A single term pair within a glossary.
 * Maps to backend TermDto response shape.
 */
export interface Term {
  id: string;
  glossaryId: string;
  srcTerm: string;
  tgtTerm: string;
}

/**
 * Glossary with its first page of terms included.
 * Maps to backend GlossaryDetailDto response shape.
 */
export interface GlossaryDetail extends Glossary {
  terms: Term[];
}

/**
 * A glossary template that can be used to bootstrap a new glossary.
 */
export interface GlossaryTemplate {
  id: string;
  name: string;
  domainId: string;
  termCount: number;
  createdAt: string;
}

/**
 * LLM price information for glossary generation.
 */
export interface GlossaryLlmPrice {
  cost: number;
}
