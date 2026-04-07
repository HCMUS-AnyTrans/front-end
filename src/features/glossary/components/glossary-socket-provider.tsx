'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io, type Socket } from 'socket.io-client';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { glossaryKeys, notificationKeys, walletKeys } from '@/lib/query-client';
import { getAccessToken, useAccessToken } from '@/features/auth/store';
import type { Glossary, GlossaryDetail, GlossaryListResponse } from '../types';

interface GlossaryStatusSocketEvent {
  glossary: Glossary;
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export function GlossarySocketProvider() {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const t = useTranslations('glossary.socket');

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const socket: Socket = io(API_BASE_URL, {
      path: '/ws',
      transports: ['websocket'],
      autoConnect: true,
      auth: (cb: (data: { token: string | null }) => void) => {
        cb({ token: getAccessToken() });
      },
    });

    const handleGlossaryStatus = (event: GlossaryStatusSocketEvent) => {
      const glossaryId = event.glossary.id;
      const glossaryStatus = event.glossary.status;
      let matchedInListCache = false;

      queryClient.setQueriesData(
        { queryKey: glossaryKeys.list() },
        (current: GlossaryListResponse | undefined) => {
          if (!current) {
            return current;
          }

          const nextItems = current.items.map((item) =>
            item.id === glossaryId ? event.glossary : item,
          );

          if (nextItems !== current.items && nextItems.some((item) => item.id === glossaryId)) {
            matchedInListCache = true;
          }

          return {
            ...current,
            items: nextItems,
          };
        },
      );

      queryClient.setQueryData(glossaryKeys.detail(glossaryId), (current: GlossaryDetail | undefined) =>
        current ? { ...current, ...event.glossary } : current,
      );

      if (!matchedInListCache || glossaryStatus === 'created' || glossaryStatus === 'failed') {
        void queryClient.invalidateQueries({ queryKey: glossaryKeys.list() });
      }

      if (glossaryStatus === 'created' || glossaryStatus === 'failed') {
        void queryClient.invalidateQueries({ queryKey: glossaryKeys.detail(glossaryId) });
      }

      void queryClient.invalidateQueries({ queryKey: notificationKeys.all });

      if (glossaryStatus === 'created') {
        toast.success(t('successTitle'), {
          description: t('successDescription', {
            name: event.glossary.name,
            count: event.glossary.termCount,
          }),
        });
      }

      if (glossaryStatus === 'failed') {
        toast.error(t('failedTitle'), {
          description: event.error ?? t('failedDescription', { name: event.glossary.name }),
        });
      }

      if (glossaryStatus === 'failed') {
        void queryClient.invalidateQueries({ queryKey: walletKeys.all });
      }
    };

    socket.on('glossary:status', handleGlossaryStatus);

    return () => {
      socket.off('glossary:status', handleGlossaryStatus);
      socket.disconnect();
    };
  }, [accessToken, queryClient, t]);

  return null;
}
