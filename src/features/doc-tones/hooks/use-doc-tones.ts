'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';
import { docToneKeys } from '@/lib/query-client';
import { getDocTonesApi } from '../api/doc-tones.api';

const DOC_TONES_CACHE_TIME = 24 * 60 * 60 * 1000;

export function useDocTones() {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: docToneKeys.list(),
    queryFn: getDocTonesApi,
    enabled: isAuthenticated && !!accessToken,
    staleTime: DOC_TONES_CACHE_TIME,
    gcTime: DOC_TONES_CACHE_TIME,
  });
}
