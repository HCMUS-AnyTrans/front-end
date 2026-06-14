export function extractErrorMessage(
  err: unknown,
  fallback = 'An unexpected error occurred',
): string {
  if (typeof err === 'string') {
    return normalizeDocumentErrorMessage(err, fallback);
  }
  if (!err || typeof err !== 'object') return fallback;

  if ('message' in err) {
    const message = (err as { message?: unknown }).message;
    if (Array.isArray(message)) {
      return normalizeDocumentErrorMessage(message.join(', '), fallback);
    }
    if (typeof message === 'string' && message.length > 0) {
      return normalizeDocumentErrorMessage(message, fallback);
    }
  }

  return fallback;
}

export function normalizeDocumentErrorMessage(
  message: string | null | undefined,
  fallback = 'An unexpected error occurred',
): string {
  if (!message?.trim()) return fallback;

  const normalized = message.trim();
  const lower = normalized.toLowerCase();
  const isRawInternalError =
    lower.includes('internal error') ||
    lower.includes('500 internal') ||
    lower.includes("'status': 'internal'") ||
    lower.includes('"status":"internal"') ||
    lower.includes('internal error encountered');

  if (isRawInternalError) {
    return 'The translation service is temporarily unavailable. Please try again in a few minutes.';
  }

  return normalized;
}
