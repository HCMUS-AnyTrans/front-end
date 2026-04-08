import { apiClient } from '@/lib/api-client';
import type { ActivityQuery, AuditLog, PaginatedResponse } from '../types';

export async function getActivityApi(
  query?: ActivityQuery,
): Promise<PaginatedResponse<AuditLog>> {
  const response = await apiClient.get<PaginatedResponse<AuditLog>>(
    '/settings/activity',
    { params: query },
  );
  return response.data;
}
