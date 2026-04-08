'use client';

import { useQuery } from '@tanstack/react-query';
import { getActivityApi } from '../api';
import { settingsKeys } from '@/lib/query-client';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';
import type { ActivityQuery } from '../types';

/**
 * Hook to fetch user activity / audit log
 */
export function useActivity(query?: ActivityQuery) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: settingsKeys.activity(query),
    queryFn: () => getActivityApi(query),
    enabled: isAuthenticated && !!accessToken,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    logs: result.data?.items,
    pagination: result.data?.pagination,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}
