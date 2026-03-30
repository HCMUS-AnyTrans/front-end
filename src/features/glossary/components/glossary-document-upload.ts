const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_FILE_COUNT = 10;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'ppt', 'pptx'] as const;
const FILE_INPUT_ACCEPT = '.pdf,.doc,.docx,.ppt,.pptx';
const FILE_PREVIEW_LIMIT = 3;

export type RejectionGroup =
  | 'invalidType'
  | 'tooLarge'
  | 'duplicate'
  | 'limitExceeded';

export type FileRejections = Record<RejectionGroup, File[]>;

export interface FileValidationResult {
  acceptedFiles: File[];
  rejected: FileRejections;
}

export function createEmptyRejections(): FileRejections {
  return {
    invalidType: [],
    tooLarge: [],
    duplicate: [],
    limitExceeded: [],
  };
}

export function getFileExtension(fileName: string) {
  const extension = fileName.split('.').pop();

  return extension ? extension.toLowerCase() : '';
}

export function isSameFile(a: File, b: File) {
  return (
    a.name === b.name &&
    a.size === b.size &&
    a.lastModified === b.lastModified
  );
}

export function validateIncomingFiles(
  existingFiles: File[],
  incomingFiles: File[],
): FileValidationResult {
  const acceptedFiles: File[] = [];
  const rejected = createEmptyRejections();

  for (const file of incomingFiles) {
    const extension = getFileExtension(file.name);
    const isDuplicate = [...existingFiles, ...acceptedFiles].some(
      (currentFile) => isSameFile(currentFile, file),
    );

    if (
      !ALLOWED_EXTENSIONS.includes(
        extension as (typeof ALLOWED_EXTENSIONS)[number],
      )
    ) {
      rejected.invalidType.push(file);
      continue;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      rejected.tooLarge.push(file);
      continue;
    }

    if (isDuplicate) {
      rejected.duplicate.push(file);
      continue;
    }

    if (existingFiles.length + acceptedFiles.length >= MAX_FILE_COUNT) {
      rejected.limitExceeded.push(file);
      continue;
    }

    acceptedFiles.push(file);
  }

  return { acceptedFiles, rejected };
}

export function formatFilePreview(files: File[]) {
  if (files.length === 0) {
    return '';
  }

  const previewNames = files
    .slice(0, FILE_PREVIEW_LIMIT)
    .map((file) => file.name);

  if (files.length <= FILE_PREVIEW_LIMIT) {
    return previewNames.join(', ');
  }

  return `${previewNames.join(', ')}, ...`;
}

export function getValidationMessages(
  rejections: FileRejections,
  t: (key: string, values?: Record<string, string | number>) => string,
) {
  return [
    {
      id: 'invalidType' as const,
      text: t('stepTwo.documentInvalidType', {
        count: rejections.invalidType.length,
        files: formatFilePreview(rejections.invalidType),
      }),
    },
    {
      id: 'tooLarge' as const,
      text: t('stepTwo.documentTooLarge', {
        count: rejections.tooLarge.length,
        files: formatFilePreview(rejections.tooLarge),
      }),
    },
    {
      id: 'duplicate' as const,
      text: t('stepTwo.documentDuplicate', {
        count: rejections.duplicate.length,
        files: formatFilePreview(rejections.duplicate),
      }),
    },
    {
      id: 'limitExceeded' as const,
      text: t('stepTwo.documentLimitExceeded', {
        count: rejections.limitExceeded.length,
        files: formatFilePreview(rejections.limitExceeded),
        max: MAX_FILE_COUNT,
      }),
    },
  ].filter(({ id }) => rejections[id].length > 0);
}

export {
  ALLOWED_EXTENSIONS,
  FILE_INPUT_ACCEPT,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE_BYTES,
};
