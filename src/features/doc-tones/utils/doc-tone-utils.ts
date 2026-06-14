import type { DocTone } from '../types';

type SupportedToneLocale = 'en' | 'vi';

export function getDocToneLocale(locale: string): SupportedToneLocale {
  return locale === 'vi' ? 'vi' : 'en';
}

export function getDocToneById(
  docTones: DocTone[],
  id: string | null | undefined,
): DocTone | null {
  if (!id) return null;
  return docTones.find((tone) => tone.id === id) ?? null;
}

export function getDocToneLabel(
  docTones: DocTone[],
  id: string | null | undefined,
  locale: string,
): string {
  if (!id) return '-';
  const tone = getDocToneById(docTones, id);
  if (!tone) return id;
  return tone.name[getDocToneLocale(locale)] || tone.name.en || id;
}

export function getDocToneDescription(tone: DocTone, locale: string): string {
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

  return professionalTone?.id ?? docTones[0]?.id ?? null;
}
