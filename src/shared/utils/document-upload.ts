export const DOCUMENT_ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
] as const;

export const DOCUMENT_ALLOWED_EXTENSIONS = [
  '.pdf',
  '.docx',
  '.doc',
  '.pptx',
  '.ppt',
] as const;

export const DOCUMENT_FILE_TYPE_LABELS = [
  'PDF',
  'DOCX',
  'DOC',
  'PPTX',
  'PPT',
] as const;

export const DOCUMENT_INPUT_ACCEPT = DOCUMENT_ALLOWED_EXTENSIONS.join(',');

export const DOCUMENT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFileExtension(fileName: string): string {
  const extension = fileName.split('.').pop();
  return extension ? `.${extension.toLowerCase()}` : '';
}

export function isAllowedDocumentExtension(fileName: string): boolean {
  return DOCUMENT_ALLOWED_EXTENSIONS.includes(
    getFileExtension(fileName) as (typeof DOCUMENT_ALLOWED_EXTENSIONS)[number],
  );
}

export function isAllowedDocumentMimeType(fileType: string): boolean {
  return DOCUMENT_ALLOWED_MIME_TYPES.includes(
    fileType as (typeof DOCUMENT_ALLOWED_MIME_TYPES)[number],
  );
}

export function validateDocumentFile(
  file: File,
  options: {
    maxFileSizeBytes: number;
    checkMimeType?: boolean;
    checkExtension?: boolean;
  },
): 'invalidType' | 'tooLarge' | null {
  const {
    maxFileSizeBytes,
    checkMimeType = true,
    checkExtension = true,
  } = options;

  const hasValidMimeType = checkMimeType
    ? isAllowedDocumentMimeType(file.type)
    : false;
  const hasValidExtension = checkExtension
    ? isAllowedDocumentExtension(file.name)
    : false;

  if (
    (checkMimeType || checkExtension) &&
    !hasValidMimeType &&
    !hasValidExtension
  ) {
    return 'invalidType';
  }

  if (file.size > maxFileSizeBytes) {
    return 'tooLarge';
  }

  return null;
}
