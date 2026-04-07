'use client';

import { useQuery } from '@tanstack/react-query';
import { glossaryKeys } from '@/lib/query-client';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';
import { listGlossaryTemplatesApi } from '../api/glossary.api';

export function useGlossaryTemplates(domainId?: string, enabled = true) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: glossaryKeys.templates(domainId),
    queryFn: () => listGlossaryTemplatesApi(domainId),
    enabled: enabled && isAuthenticated && !!accessToken,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    templates: result.data?.items ?? [],
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}
