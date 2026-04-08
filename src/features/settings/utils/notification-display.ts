export function formatRelativeNotificationDate(
  dateStr: string,
  locale: string,
  tCommon: (key: string, values?: Record<string, number>) => string,
): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return tCommon('justNow');
  if (diffMins < 60) return tCommon('minutesAgo', { count: diffMins });
  if (diffHours < 24) return tCommon('hoursAgo', { count: diffHours });
  if (diffDays < 7) return tCommon('daysAgo', { count: diffDays });

  return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US');
}
