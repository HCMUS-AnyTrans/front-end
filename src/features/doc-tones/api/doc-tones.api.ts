import { apiClient } from '@/lib/api-client';
import type { DocTone } from '../types';

export async function getDocTonesApi(): Promise<DocTone[]> {
  const response = await apiClient.get<DocTone[]>('/doc-tones');
  return response.data;
}
