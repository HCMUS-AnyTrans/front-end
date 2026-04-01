'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/features/auth';
import { domainKeys } from '@/lib/query-client';
import {
  DEFAULT_DOMAIN_ICON,
  DOMAIN_METADATA,
} from '@/shared/constants/domains';
import { getDomainsApi } from '../api/domains.api';
import type { DomainWithIcon } from '../types';

const DOMAINS_CACHE_TIME = 24 * 60 * 60 * 1000;

export function useDomains() {
  const { isAuthenticated, accessToken } = useAuthStore();

  const query = useQuery({
    queryKey: domainKeys.list(),
    queryFn: getDomainsApi,
    enabled: isAuthenticated && !!accessToken,
    staleTime: DOMAINS_CACHE_TIME,
    gcTime: DOMAINS_CACHE_TIME,
  });

  const domains = useMemo<DomainWithIcon[]>(
    () =>
      (query.data ?? []).map((domain) => ({
        ...domain,
        icon: DOMAIN_METADATA[domain.key]?.icon ?? DEFAULT_DOMAIN_ICON,
      })),
    [query.data],
  );

  const domainsById = useMemo(
    () => new Map(domains.map((domain) => [domain.id, domain])),
    [domains],
  );

  const domainsByKey = useMemo(
    () => new Map(domains.map((domain) => [domain.key, domain])),
    [domains],
  );

  const getDomainById = (id: string | null | undefined): DomainWithIcon | null => {
    if (!id) {
      return null;
    }

    return domainsById.get(id) ?? null;
  };

  const getDomainByKey = (
    key: string | null | undefined,
  ): DomainWithIcon | null => {
    if (!key) {
      return null;
    }

    return domainsByKey.get(key) ?? null;
  };

  const getDomainWithIcon = (idOrKey: string): DomainWithIcon | null => {
    return getDomainById(idOrKey) ?? getDomainByKey(idOrKey);
  };

  return {
    ...query,
    domains,
    domainsById,
    domainsByKey,
    getDomainById,
    getDomainByKey,
    getDomainWithIcon,
  };
}
