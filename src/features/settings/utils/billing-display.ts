export function formatBillingCurrency(
  amount: number,
  locale: string,
  currency?: string,
): string {
  const resolvedCurrency = currency ?? (locale === 'vi' ? 'VND' : 'USD');

  return new Intl.NumberFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: resolvedCurrency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatBillingDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === 'vi' ? 'vi-VN' : 'en-US',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  );
}
