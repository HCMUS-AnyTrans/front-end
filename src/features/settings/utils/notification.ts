export function normalizeNotifField(
  field: Record<string, string> | string,
): Record<string, string> | string {
  if (typeof field !== 'string') return field;

  try {
    const parsed = JSON.parse(field) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
  } catch {
    // Keep plain string fallback for legacy payloads.
  }

  return field;
}

export function getNotifText(
  field: Record<string, string> | string,
  locale: string,
): string {
  const normalized = normalizeNotifField(field);
  if (typeof normalized === 'string') return normalized;
  return normalized[locale] ?? normalized.en ?? '';
}
