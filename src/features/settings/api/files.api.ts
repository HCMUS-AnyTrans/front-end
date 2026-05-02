import { apiClient } from '@/lib/api-client';
import type {
  FileDownloadResponse,
  FilesQuery,
  PaginatedResponse,
  StorageUsage,
  UserFile,
} from '../types';

export async function getFilesApi(
  query?: FilesQuery,
): Promise<PaginatedResponse<UserFile>> {
  const response = await apiClient.get<PaginatedResponse<UserFile>>('/files', {
    params: query,
  });
  return response.data;
}

export async function getFileDownloadApi(
  fileId: string,
): Promise<FileDownloadResponse> {
  const response = await apiClient.get<FileDownloadResponse>(
    `/files/${fileId}/download`,
    {
      params: {
        pdf: false,
      },
    },
  );
  return response.data;
}

export async function deleteFileApi(fileId: string): Promise<void> {
  await apiClient.delete(`/files/${fileId}`);
}

export async function deleteFilesByJobApi(jobId: string): Promise<void> {
  await apiClient.delete(`/files/by-job/${jobId}`);
}

export async function getStorageUsageApi(): Promise<StorageUsage> {
  const response = await apiClient.get<StorageUsage>('/dashboard/storage');
  return response.data;
}
