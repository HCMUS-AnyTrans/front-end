'use client';

import { useWallet } from '@/features/dashboard';
import { useGlossaryLlmPrice } from './use-glossary-llm-price';

type UseDocumentCreditStateParams = {
  enabled: boolean;
};

export function useDocumentCreditState({
  enabled,
}: UseDocumentCreditStateParams) {
  const {
    price,
    isLoading: isPriceLoading,
    isFetching: isPriceFetching,
    isError: isPriceError,
  } = useGlossaryLlmPrice(enabled);
  const {
    wallet,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useWallet();

  const requiredCredits = typeof price?.cost === 'number' ? price.cost : null;
  const currentBalance =
    typeof wallet?.balance === 'number' ? wallet.balance : null;
  const isPricePending =
    enabled && requiredCredits === null && (isPriceLoading || isPriceFetching);
  const isPriceUnavailable =
    enabled && requiredCredits === null && isPriceError;
  const isInsufficientCredits =
    enabled &&
    requiredCredits !== null &&
    currentBalance !== null &&
    currentBalance < requiredCredits;
  const missingCredits =
    isInsufficientCredits && requiredCredits !== null && currentBalance !== null
      ? requiredCredits - currentBalance
      : 0;

  return {
    requiredCredits,
    currentBalance,
    missingCredits,
    isPricePending,
    isPriceUnavailable,
    isInsufficientCredits,
    isWalletLoading,
    isWalletError,
  };
}
