import type { PaginatedResponse, WalletLedger } from './settings.types';
import type { LedgerSummary } from './settings.types';

export interface GeneralUploadResponse {
  upload_url: string;
  storage_key: string;
  expires_in: number;
}

export interface ProcessAvatarResponse {
  avatarUrl: string;
}

export interface WalletLedgerResponse extends PaginatedResponse<WalletLedger> {
  summary: LedgerSummary;
}

export interface CreateVnpayPaymentResponse {
  paymentId: string;
  paymentUrl: string;
  expiresAt: string;
}

export interface FileDownloadResponse {
  downloadUrl: string;
  expiresAt: string;
  fileName: string;
}
