import { apiClient } from '@/lib/api-client';
import type { UpdatePreferencesDto, UserPreferences } from '../types';

export async function getPreferencesApi(): Promise<UserPreferences> {
  const response = await apiClient.get<UserPreferences>(
    '/settings/preferences',
  );
  return response.data;
}

export async function updatePreferencesApi(
  dto: UpdatePreferencesDto,
): Promise<UserPreferences> {
  const response = await apiClient.patch<UserPreferences>(
    '/settings/preferences',
    dto,
  );
  return response.data;
}
