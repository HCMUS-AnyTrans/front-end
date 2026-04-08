import { apiClient } from '@/lib/api-client';
import type {
  CreateVnpayPaymentDto,
  CreateVnpayPaymentResponse,
  CreditPackage,
  LedgerQuery,
  PaginatedResponse,
  Payment,
  PaymentsQuery,
  Wallet,
  WalletLedgerResponse,
} from '../types';

export async function getWalletApi(): Promise<Wallet> {
  const response = await apiClient.get<Wallet>('/wallet');
  return response.data;
}

export async function getWalletLedgerApi(
  query?: LedgerQuery,
): Promise<WalletLedgerResponse> {
  const response = await apiClient.get<WalletLedgerResponse>('/wallet/ledger', {
    params: query,
  });
  return response.data;
}

export async function getCreditPackagesApi(): Promise<CreditPackage[]> {
  const response = await apiClient.get<CreditPackage[]>('/credit-packages');
  return response.data;
}

export async function createVnpayPaymentApi(
  dto: CreateVnpayPaymentDto,
): Promise<CreateVnpayPaymentResponse> {
  const response = await apiClient.post<CreateVnpayPaymentResponse>(
    '/payments/vnpay/create',
    dto,
  );
  return response.data;
}

export async function getPaymentsApi(
  query?: PaymentsQuery,
): Promise<PaginatedResponse<Payment>> {
  const response = await apiClient.get<PaginatedResponse<Payment>>(
    '/payments',
    { params: query },
  );
  return response.data;
}
