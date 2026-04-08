'use client';

import { useEffect } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';

interface UseSecurityOauthCallbackOptions {
  searchParams: ReadonlyURLSearchParams;
}

export function useSecurityOauthCallback({
  searchParams,
}: UseSecurityOauthCallbackOptions) {
  const linkSuccess = searchParams.get('linked');

  useEffect(() => {
    if (!linkSuccess) return;

    const url = new URL(window.location.href);
    url.searchParams.delete('linked');
    window.history.replaceState({}, '', url.toString());
  }, [linkSuccess]);

  return { linkSuccess };
}
