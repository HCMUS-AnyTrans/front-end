'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { glossaryKeys, walletKeys } from '@/lib/query-client';
import { getErrorMessage } from '@/lib/api-error';
import { useDomains } from '@/features/domains';
import {
  requestTempUploadUrl,
  uploadFileToPresignedUrl,
} from '@/features/documents/api/documents.api';
import { createGlossaryApi } from '../api';
import type { CreateGlossaryFormValues } from '../data';
import type {
  Glossary,
  GlossaryListResponse,
  CreateGlossaryDto,
} from '../types';
import type { GlossarySourceType } from '../data';

interface CreateGlossaryBySourcePayload {
  values: CreateGlossaryFormValues;
  sourceType: GlossarySourceType;
  selectedTemplateId: string | null;
  documentFiles: File[];
}

interface UseCreateGlossaryBySourceOptions {
  onSuccess?: (data: Glossary) => void;
  onError?: (error: string) => void;
}

export function useCreateGlossaryBySource(
  options?: UseCreateGlossaryBySourceOptions,
) {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};
  const { getDomainByKey } = useDomains();

  const mutation = useMutation({
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
    },
    mutationFn: async ({
      values,
      sourceType,
      selectedTemplateId,
      documentFiles,
    }: CreateGlossaryBySourcePayload) => {
      const selectedDomain = getDomainByKey(values.domain);

      if (!selectedDomain) {
        throw new Error('Selected glossary domain is invalid');
      }

      const dto: CreateGlossaryDto = {
        name: values.name,
        domainId: selectedDomain.id,
        srcLang: values.srcLang,
        tgtLang: values.tgtLang,
      };

      if (sourceType === 'manual') {
        dto.mode = 'manual';
      } else if (sourceType === 'template') {
        if (!selectedTemplateId) {
          throw new Error('Template selection is required');
        }

        dto.mode = 'template';
        dto.templateId = selectedTemplateId;
      } else if (sourceType === 'document') {
        if (documentFiles.length === 0) {
          throw new Error('At least one document is required');
        }

        if (selectedDomain.key === 'other') {
          const customizedDomain = values.customizedDomain?.trim();

          if (!customizedDomain) {
            throw new Error(
              'Custom domain is required for other glossary domain',
            );
          }

          dto.customized_domain = customizedDomain;
        }

        const uploadedFiles = await Promise.all(
          documentFiles.map(async (file) => {
            const { upload_url, storage_key } = await requestTempUploadUrl({
              file_name: file.name,
              mime_type: file.type,
              file_size: file.size,
            });

            await uploadFileToPresignedUrl(upload_url, file);

            return {
              storageKey: storage_key,
              fileName: file.name,
            };
          }),
        );

        dto.mode = 'llm';
        dto.files = uploadedFiles;
      } else {
        throw new Error('Glossary source selection is required');
      }

      return createGlossaryApi(dto);
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(
        { queryKey: glossaryKeys.list() },
        (current: GlossaryListResponse | undefined) => {
          if (!current) {
            return current;
          }

          const existingItems = current.items.filter(
            (item) => item.id !== data.id,
          );

          return {
            ...current,
            items: [data, ...existingItems],
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: glossaryKeys.list() });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(getErrorMessage(error));
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: walletKeys.all });
    },
  });

  return {
    createGlossaryBySource: mutation.mutate,
    createGlossaryBySourceAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  };
}
