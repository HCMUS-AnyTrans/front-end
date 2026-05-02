'use client';

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  getWalletApi,
  getWalletLedgerApi,
  getCreditPackagesApi,
  getPaymentsApi,
  createPaymentApi,
  markPaymentCancelledApi,
} from '../api';
import { walletKeys, billingKeys } from '@/lib/query-client';
import { useAccessToken, useIsAuthenticated } from '@/features/auth';
import type {
  LedgerQuery,
  PaymentsQuery,
  CreatePaymentDto,
  MarkPaymentCancelledDto,
} from '../types';

/**
 * Hook to fetch wallet balance
 */
export function useWallet() {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: walletKeys.balance(),
    queryFn: getWalletApi,
    enabled: isAuthenticated && !!accessToken,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    wallet: result.data,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}

/**
 * Hook to fetch wallet ledger (transaction history)
 */
export function useWalletLedger(query?: LedgerQuery) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: billingKeys.ledger(query),
    queryFn: () => getWalletLedgerApi(query),
    enabled: isAuthenticated && !!accessToken,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    ledger: result.data?.items,
    pagination: result.data?.pagination,
    summary: result.data?.summary,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}

/**
 * Hook to fetch credit packages
 */
export function useCreditPackages() {
  const result = useQuery({
    queryKey: billingKeys.creditPackages(),
    queryFn: getCreditPackagesApi,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return {
    packages: result.data,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}

/**
 * Hook to fetch payment history
 */
export function usePayments(query?: PaymentsQuery) {
  const isAuthenticated = useIsAuthenticated();
  const accessToken = useAccessToken();

  const result = useQuery({
    queryKey: billingKeys.payments(query),
    queryFn: () => getPaymentsApi(query),
    enabled: isAuthenticated && !!accessToken,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    payments: result.data?.items,
    pagination: result.data?.pagination,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    isError: result.isError,
    error: result.error,
    refetch: result.refetch,
  };
}

/**
 * Hook to create a payment link
 */
export function useCreatePayment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: CreatePaymentDto) => createPaymentApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.payments() });
    },
  });

  return {
    createPayment: mutation.mutate,
    createPaymentAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}

/**
 * Hook to mark a payment as cancelled by gateway order code
 */
export function useMarkPaymentCancelled() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: MarkPaymentCancelledDto) => markPaymentCancelledApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.payments() });
      queryClient.invalidateQueries({ queryKey: billingKeys.all });
    },
  });

  return {
    markPaymentCancelled: mutation.mutate,
    markPaymentCancelledAsync: mutation.mutateAsync,
    isMarkingCancelled: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
