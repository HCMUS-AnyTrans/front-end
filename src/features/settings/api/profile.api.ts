import axios from 'axios';
import { apiClient } from '@/lib/api-client';
import type {
  GeneralUploadRequest,
  GeneralUploadResponse,
  ProcessAvatarRequest,
  ProcessAvatarResponse,
  UpdateProfileDto,
  UserProfile,
} from '../types';

export async function getProfileApi(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>('/settings/profile');
  return response.data;
}

export async function updateProfileApi(
  dto: UpdateProfileDto,
): Promise<UserProfile> {
  const response = await apiClient.patch<UserProfile>('/settings/profile', dto);
  return response.data;
}

export async function requestGeneralUploadApi(
  dto: GeneralUploadRequest,
): Promise<GeneralUploadResponse> {
  const response = await apiClient.post<GeneralUploadResponse>(
    '/files/upload/public',
    dto,
  );
  return response.data;
}

export async function uploadFileToPresignedUrl(
  uploadUrl: string,
  file: File,
): Promise<void> {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
}

export async function processAvatarApi(
  dto: ProcessAvatarRequest,
): Promise<ProcessAvatarResponse> {
  const response = await apiClient.post<ProcessAvatarResponse>(
    '/settings/avatar/process',
    dto,
  );
  return response.data;
}

export function buildStorageUrl(storageKey: string): string {
  const storageBase =
    process.env.NEXT_PUBLIC_STORAGE_URL ||
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/storage`;
  return `${storageBase}/${storageKey}`;
}
