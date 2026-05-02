export function formatActivityDateTime(
  dateStr: string,
  locale: string,
): string {
  return new Date(dateStr).toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isMobileActivityDevice(device?: string) {
  return Boolean(device?.toLowerCase().includes('mobile'));
}
