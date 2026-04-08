import { apiClient } from '@/lib/api-client';
import type { AuthIdentity, ChangePasswordDto } from '../types';

export async function changePasswordApi(dto: ChangePasswordDto): Promise<void> {
  await apiClient.post('/auth/change-password', {
    currentPassword: dto.currentPassword,
    newPassword: dto.newPassword,
  });
}

export async function linkIdentityApi(
  provider: string,
  returnUrl?: string,
): Promise<{ redirectUrl: string }> {
  const response = await apiClient.post<{ redirectUrl: string }>(
    `/settings/security/identities/${provider}/link`,
    undefined,
    { params: returnUrl ? { returnUrl } : undefined },
  );
  return response.data;
}

export async function getIdentitiesApi(): Promise<AuthIdentity[]> {
  const response = await apiClient.get<AuthIdentity[]>(
    '/settings/security/identities',
  );
  return response.data;
}

export async function unlinkIdentityApi(identityId: string): Promise<void> {
  await apiClient.delete(`/settings/security/identities/${identityId}`);
}
