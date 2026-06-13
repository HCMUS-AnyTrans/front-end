'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';
import { translationTemplateKeys } from '@/lib/query-client';
import { getTranslationTemplateApi } from '../api';

export function useTranslationTemplateDetail(templateId: string | null | undefined) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: translationTemplateKeys.detail(templateId ?? ''),
    queryFn: () => getTranslationTemplateApi(templateId!),
    enabled: isAuthenticated && !!accessToken && !!templateId,
  });

  return {
    template: result.data,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}
