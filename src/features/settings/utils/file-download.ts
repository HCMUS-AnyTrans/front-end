import { getFileDownloadUrl } from '@/features/documents/api/documents.api';

export async function triggerFileDownload(fileId: string, fileName: string) {
  const { download_url } = await getFileDownloadUrl(fileId);
  const anchor = document.createElement('a');
  anchor.href = download_url;
  anchor.download = fileName;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
