'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTranslationTemplateApi } from '../api';
import { translationTemplateKeys } from '@/lib/query-client';
import { getErrorMessage } from '@/lib/api-error';
import type { TranslationTemplate, TranslationTemplatePayload } from '../types';

interface UseCreateTranslationTemplateOptions {
  onSuccess?: (template: TranslationTemplate) => void;
  onError?: (error: string) => void;
}

export function useCreateTranslationTemplate(
  options?: UseCreateTranslationTemplateOptions,
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: TranslationTemplatePayload) =>
      createTranslationTemplateApi(payload),
    onSuccess: (template) => {
      queryClient.invalidateQueries({ queryKey: translationTemplateKeys.all });
      options?.onSuccess?.(template);
    },
    onError: (error) => options?.onError?.(getErrorMessage(error)),
  });

  return {
    createTemplate: mutation.mutate,
    createTemplateAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  };
}
