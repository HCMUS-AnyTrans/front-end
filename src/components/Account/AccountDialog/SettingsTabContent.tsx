'use client';

import React from 'react';
import { Preferences } from '@/types/account';
import { PreferencesSection } from '@/components/Account/Settings';

interface SettingsTabContentProps {
  preferences: Preferences;
  onUpdatePreferences: (prefs: Partial<Preferences>) => void;
  onResetPreferences: () => void;
}

export function SettingsTabContent({
  preferences,
  onUpdatePreferences,
  onResetPreferences,
}: SettingsTabContentProps) {
  return (
    <PreferencesSection
      preferences={preferences}
      onChange={onUpdatePreferences}
      onReset={onResetPreferences}
      onSave={() => {}}
    />
  );
}
