'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';
import { translationTemplateKeys } from '@/lib/query-client';
import { listTranslationTemplatesApi } from '../api';
import type { TranslationTemplateQueryParams } from '../types';

export function useTranslationTemplates(params?: TranslationTemplateQueryParams) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: translationTemplateKeys.list(params),
    queryFn: () => listTranslationTemplatesApi(params),
    enabled: isAuthenticated && !!accessToken,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    templates: result.data?.items,
    pagination: result.data?.pagination,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}
