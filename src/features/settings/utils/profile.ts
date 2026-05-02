import { formatPhoneNumberIntl } from 'react-phone-number-input';

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatPhoneNumber(phone: string | null | undefined) {
  if (!phone) return null;

  return formatPhoneNumberIntl(phone) ?? phone;
}
