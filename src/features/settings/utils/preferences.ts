import type { FileTTL } from '../types';
import { FILE_TTL_OPTIONS } from '../data';

export const DEFAULT_FILE_TTL: FileTTL = 6;
export const MAX_FILE_TTL_HOURS = 8760;

export function isPresetFileTtl(value: FileTTL) {
  return FILE_TTL_OPTIONS.some((option) => option.value === value);
}

export function normalizeFileTtl(value: number | null | undefined): FileTTL {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return Math.floor(value);
  }

  return DEFAULT_FILE_TTL;
}
