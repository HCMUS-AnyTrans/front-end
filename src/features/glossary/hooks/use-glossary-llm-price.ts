'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth';
import { glossaryKeys } from '@/lib/query-client';
import { getGlossaryLlmPriceApi } from '../api/glossary.api';

export function useGlossaryLlmPrice(enabled = true) {
  const { isAuthenticated, accessToken } = useAuthStore();

  const result = useQuery({
    queryKey: glossaryKeys.llmPricing(),
    queryFn: getGlossaryLlmPriceApi,
    enabled: enabled && isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    price: result.data ?? null,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    refetch: result.refetch,
  };
}
