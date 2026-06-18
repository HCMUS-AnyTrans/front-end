'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTranslationTemplateApi } from '../api';
import { translationTemplateKeys } from '@/lib/query-client';
import { getErrorMessage } from '@/lib/api-error';
import type { TranslationTemplate, TranslationTemplatePayload } from '../types';

interface UpdateTemplateParams {
  templateId: string;
  payload: TranslationTemplatePayload;
}

interface UseUpdateTranslationTemplateOptions {
  onSuccess?: (template: TranslationTemplate) => void;
  onError?: (error: string) => void;
}

export function useUpdateTranslationTemplate(
  options?: UseUpdateTranslationTemplateOptions,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ templateId, payload }: UpdateTemplateParams) =>
      updateTranslationTemplateApi(templateId, payload),
    onSuccess: (template, variables) => {
      queryClient.invalidateQueries({ queryKey: translationTemplateKeys.all });
      queryClient.invalidateQueries({
        queryKey: translationTemplateKeys.detail(variables.templateId),
      });
      options?.onSuccess?.(template);
    },
    onError: (error) => options?.onError?.(getErrorMessage(error)),
  });

  return {
    updateTemplate: mutation.mutate,
    updateTemplateAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  };
}
