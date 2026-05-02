import type { Domain } from '../types';

export function getDomainLabel(domain: Domain, locale: string): string {
  if (locale === 'vi') {
    return domain.name.vi || domain.name.en;
  }

  return domain.name.en || domain.name.vi;
}
