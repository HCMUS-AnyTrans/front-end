'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTranslationTemplateApi } from '../api';
import { translationTemplateKeys } from '@/lib/query-client';
import { getErrorMessage } from '@/lib/api-error';

interface UseDeleteTranslationTemplateOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useDeleteTranslationTemplate(
  options?: UseDeleteTranslationTemplateOptions,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (templateId: string) =>
      deleteTranslationTemplateApi(templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: translationTemplateKeys.all });
      options?.onSuccess?.();
    },
    onError: (error) => options?.onError?.(getErrorMessage(error)),
  });

  return {
    deleteTemplate: mutation.mutate,
    isDeleting: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  };
}
