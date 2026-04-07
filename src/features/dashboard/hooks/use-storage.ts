'use client';

import { useQuery } from '@tanstack/react-query';
import { getStorageApi } from '../api/dashboard.api';
import { dashboardKeys } from '@/lib/query-client';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';

/**
 * Hook to fetch storage usage information
 */
export function useStorage() {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: dashboardKeys.storage(),
    queryFn: getStorageApi,
    enabled: isAuthenticated && !!accessToken,
    staleTime: 2 * 60 * 1000, // 2 minutes (storage changes less frequently)
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    storage: result.data,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}
