'use client';

import {
  usePreferences,
  useUpdatePreferences,
} from '../../hooks/use-preferences';
import { useThemeSync } from '../../hooks/use-theme-sync';
import { useLanguageSync } from '../../hooks/use-language-sync';
import { PreferencesDisplaySection } from './display-section';
import { PreferencesFileTtlSection } from './file-ttl-section';
import { PreferencesTabFallback } from './tab.fallback';
import { usePreferencesFileTtl } from '../../hooks/use-preferences-file-ttl';

// ============================================================================
// Main Component
// ============================================================================

export function PreferencesTab() {
  const { preferences, isLoading } = usePreferences();
  const { updatePreferences, isUpdating } = useUpdatePreferences();
  const { theme: activeTheme, changeTheme } = useThemeSync();
  const { locale, changeLanguage } = useLanguageSync();

  const fileTtl = usePreferencesFileTtl({
    savedFileTtl: preferences?.fileTtl,
    isUpdating,
    onSave: (value, options) =>
      updatePreferences(
        { fileTtl: value },
        {
          onSuccess: () => {
            options?.onSuccess?.();
          },
        },
      ),
  });

  if (isLoading || !preferences) {
    return <PreferencesTabFallback />;
  }

  return (
    <div className="space-y-6">
      <PreferencesDisplaySection
        locale={locale}
        activeTheme={activeTheme}
        onLanguageChange={changeLanguage}
        onThemeChange={changeTheme}
      />

      <PreferencesFileTtlSection
        activeFileTtlMode={fileTtl.activeFileTtlMode}
        selectedPresetValue={fileTtl.selectedPresetValue}
        resolvedCustomFileTtlInput={fileTtl.resolvedCustomFileTtlInput}
        isCustomFileTtlInvalid={fileTtl.isCustomFileTtlInvalid}
        needsPresetSelection={fileTtl.needsPresetSelection}
        showFileTtlActions={fileTtl.showFileTtlActions}
        isFileTtlSaveDisabled={fileTtl.isFileTtlSaveDisabled}
        isUpdating={isUpdating}
        onModeChange={fileTtl.handleFileTtlModeChange}
        onPresetChange={fileTtl.handleFileTtlChange}
        onCustomInputChange={fileTtl.handleCustomFileTtlChange}
        onReset={fileTtl.handleFileTtlReset}
        onSave={fileTtl.handleSave}
      />
    </div>
  );
}
