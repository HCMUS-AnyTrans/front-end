import type { DocTone } from '../types';

type SupportedToneLocale = 'en' | 'vi';

export function getDocToneLocale(locale: string): SupportedToneLocale {
  return locale === 'vi' ? 'vi' : 'en';
}

export function getDocToneByValue(
  docTones: DocTone[],
  value: string | null | undefined,
): DocTone | null {
  if (!value) return null;
  return docTones.find((tone) => tone.value === value) ?? null;
}

export function getDocToneLabel(
  docTones: DocTone[],
  value: string | null | undefined,
  locale: string,
): string {
  if (!value) return '-';
  const tone = getDocToneByValue(docTones, value);
  if (!tone) return value;
  return tone.name[getDocToneLocale(locale)] || tone.name.en || value;
}

export function getDocToneDescription(
  tone: DocTone,
  locale: string,
): string {
  return tone.description[getDocToneLocale(locale)] || tone.description.en;
}

export function getDefaultDocToneValue(docTones: DocTone[]): string | null {
  if (docTones.length === 0) return null;

  const professionalTone = docTones.find((tone) => {
    const normalizedValue = tone.value.trim().toLowerCase();
    const normalizedId = tone.id.trim().toLowerCase();
    const normalizedName = tone.name.en.trim().toLowerCase();

    return (
      normalizedValue === 'professional' ||
      normalizedId === 'professional' ||
      normalizedName === 'professional'
    );
  });

  return professionalTone?.value ?? docTones[0]?.value ?? null;
}
