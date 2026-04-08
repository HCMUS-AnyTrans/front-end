'use client';

import { useCallback } from 'react';
import type {
  NotificationPreference,
  NotificationType,
  UpdateNotificationPreferencesDto,
} from '../types';

interface UseNotificationPreferencesFormOptions {
  preferences: NotificationPreference[];
  updatePreferences: (dto: UpdateNotificationPreferencesDto) => void;
}

export function useNotificationPreferencesForm({
  preferences,
  updatePreferences,
}: UseNotificationPreferencesFormOptions) {
  const handleUpdatePref = useCallback(
    (
      type: NotificationType,
      field: 'emailEnabled' | 'pushEnabled',
      value: boolean,
    ) => {
      const updated = preferences.map((p) =>
        p.type === type ? { ...p, [field]: value } : p,
      );

      updatePreferences({
        preferences: updated.map((p) => ({
          type: p.type,
          emailEnabled: p.emailEnabled,
          pushEnabled: p.pushEnabled,
        })),
      });
    },
    [preferences, updatePreferences],
  );

  return { handleUpdatePref };
}
