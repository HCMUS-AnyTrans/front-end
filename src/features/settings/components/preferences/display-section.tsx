'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  SettingsDivider,
  SettingsRow,
  SettingsSection,
} from '../shared/settings-section';
import { uiLanguageOptions } from '../../data';
import { themeOptions } from '../../data';
import type { Theme, UILanguage } from '../../types';

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

interface PreferencesDisplaySectionProps {
  locale: UILanguage;
  activeTheme: string | undefined;
  onLanguageChange: (language: UILanguage) => void;
  onThemeChange: (theme: Theme) => void;
}

export function PreferencesDisplaySection({
  locale,
  activeTheme,
  onLanguageChange,
  onThemeChange,
}: PreferencesDisplaySectionProps) {
  const t = useTranslations('settings.preferences');

  return (
    <SettingsSection title={t('title')} description={t('description')}>
      <div className="space-y-1">
        <SettingsRow
          label={t('language')}
          description={t('languageDescription')}
        >
          <div className="flex gap-1">
            {uiLanguageOptions.map((lang) => {
              const isActive = locale === lang.value;

              return (
                <button
                  key={lang.value}
                  onClick={() => onLanguageChange(lang.value as UILanguage)}
                  className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>
        </SettingsRow>

        <SettingsDivider />

        <SettingsRow label={t('theme')} description={t('themeDescription')}>
          <div className="flex gap-1">
            {themeOptions.map((opt) => {
              const Icon = themeIcons[opt.value];
              const isActive = activeTheme === opt.value;

              return (
                <button
                  key={opt.value}
                  onClick={() => onThemeChange(opt.value)}
                  className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{t(opt.labelKey)}</span>
                </button>
              );
            })}
          </div>
        </SettingsRow>
      </div>
    </SettingsSection>
  );
}
