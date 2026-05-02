export const DEFAULT_GLOSSARY_QUERY = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc' as const,
};

export const DEFAULT_TERM_QUERY = {
  page: 1,
  limit: 20,
  sortBy: 'srcTerm',
  sortOrder: 'asc' as const,
};

/** Maximum terms allowed per bulk import request */
export const MAX_BULK_IMPORT_SIZE = 500;

/** Maximum manual terms in inline glossary (document wizard) */
export const MAX_INLINE_TERMS = 20;
