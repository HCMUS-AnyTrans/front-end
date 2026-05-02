import { apiClient } from '@/lib/api-client';
import type { Domain } from '../types';

export async function getDomainsApi(): Promise<Domain[]> {
  const response = await apiClient.get<Domain[]>('/domains');
  return response.data;
}
