'use client';

import { useState, useCallback, useDeferredValue } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDomains } from '@/features/domains';
import { useRecentJobs } from '@/features/dashboard/hooks';
import type { RecentJobsQuery } from '@/features/dashboard/types';
import { ITEMS_PER_PAGE } from '../data';

/**
 * Encapsulates all history page state: search (debounced), status filter,
 * job type filter, pagination, and the underlying data-fetching via useRecentJobs.
 * Reads the initial `search` value from the URL `?search=` query param so that
 * navigating from the command palette pre-fills the search field.
 */
export function useHistoryJobs() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(() => searchParams.get('search') ?? '');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const deferredSearch = useDeferredValue(search);
  const { getDomainByKey, isLoading: isLoadingDomains } = useDomains();
  const selectedDomain =
    domainFilter !== 'all' ? getDomainByKey(domainFilter) : null;
  const effectiveDomainFilter =
    domainFilter !== 'all' && !isLoadingDomains && !selectedDomain
      ? 'all'
      : domainFilter;

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const handleDomainChange = useCallback((value: string) => {
    setDomainFilter(value);
    setPage(1);
  }, []);

  // Build query params
  const queryParams: RecentJobsQuery = {
    page,
    limit: ITEMS_PER_PAGE,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...(deferredSearch ? { search: deferredSearch } : {}),
    ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
    ...(selectedDomain ? { domain_id: selectedDomain.id } : {}),
  };

  const { jobsData, isLoading, isFetching, isError } =
    useRecentJobs(queryParams);

  const jobs = jobsData?.data ?? [];
  const meta = jobsData?.meta;
  const hasFilters =
    !!search || statusFilter !== 'all' || effectiveDomainFilter !== 'all';

  return {
    // Data
    jobs,
    meta,
    isLoading,
    isFetching,
    isError,
    // Filter state
    search,
    statusFilter,
    domainFilter: effectiveDomainFilter,
    hasFilters,
    // Actions
    handleSearchChange,
    handleStatusChange,
    handleDomainChange,
    setPage,
  };
}
