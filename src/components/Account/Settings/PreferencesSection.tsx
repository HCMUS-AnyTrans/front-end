'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Preferences } from '@/types/account';
import { Bell, Smartphone, Globe, Save, Info } from 'lucide-react';
import { SelectSettingRow } from './SelectSettingRow';
import { ToggleSettingRow } from './ToggleSettingRow';

type PreferencesSectionProps = {
  preferences: Preferences;
  onChange: (partial: Partial<Preferences>) => void;
  onReset: () => void;
  onSave: () => void;
};

export default function PreferencesSection({
  preferences,
  onChange,
  onReset,
  onSave,
}: PreferencesSectionProps) {
  const t = useTranslations('common.settings.preferences');
  const tActions = useTranslations('common.settings.actions');

  const selectSettings = useMemo(
    () => [
      {
        key: 'theme',
        label: t('theme.label'),
        description: t('theme.description'),
        value: preferences.theme,
        options: [
          { value: 'light', label: t('theme.light') },
          { value: 'dark', label: t('theme.dark') },
          { value: 'auto', label: t('theme.auto') },
        ],
        onChange: (value: string) =>
          onChange({ theme: value as Preferences['theme'] }),
        width: 'w-full sm:w-[140px]',
      },
      {
        key: 'language',
        label: t('language.label'),
        description: t('language.description'),
        value: preferences.language,
        options: [
          { value: 'en', label: t('language.english') },
          { value: 'vi', label: t('language.vietnamese') },
          { value: 'es', label: t('language.spanish') },
          { value: 'fr', label: t('language.french') },
        ],
        onChange: (value: string) =>
          onChange({ language: value as Preferences['language'] }),
        width: 'w-full sm:w-[140px]',
      },
      {
        key: 'dateFormat',
        label: t('dateFormat.label'),
        description: t('dateFormat.description'),
        value: preferences.dateFormat,
        options: [
          { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
          { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
          { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
        ],
        onChange: (value: string) =>
          onChange({ dateFormat: value as Preferences['dateFormat'] }),
        width: 'w-full sm:w-[160px]',
      },
      {
        key: 'timeFormat',
        label: t('timeFormat.label'),
        description: t('timeFormat.description'),
        value: preferences.timeFormat,
        options: [
          { value: '12h', label: t('timeFormat.12hour') },
          { value: '24h', label: t('timeFormat.24hour') },
        ],
        onChange: (value: string) =>
          onChange({ timeFormat: value as Preferences['timeFormat'] }),
        width: 'w-full sm:w-[140px]',
      },
      {
        key: 'defaultSourceLanguage',
        label: t('defaultSourceLanguage.label'),
        description: t('defaultSourceLanguage.description'),
        value: preferences.defaultSourceLanguage,
        options: [
          { value: 'en', label: t('defaultSourceLanguage.english') },
          { value: 'vi', label: t('defaultSourceLanguage.vietnamese') },
          { value: 'es', label: t('defaultSourceLanguage.spanish') },
          { value: 'fr', label: t('defaultSourceLanguage.french') },
          { value: 'de', label: t('defaultSourceLanguage.german') },
          { value: 'ja', label: t('defaultSourceLanguage.japanese') },
          { value: 'ko', label: t('defaultSourceLanguage.korean') },
          { value: 'zh', label: t('defaultSourceLanguage.chinese') },
        ],
        onChange: (value: string) => onChange({ defaultSourceLanguage: value }),
        width: 'w-full sm:w-[140px]',
      },
      {
        key: 'defaultTargetLanguage',
        label: t('defaultTargetLanguage.label'),
        description: t('defaultTargetLanguage.description'),
        value: preferences.defaultTargetLanguage,
        options: [
          { value: 'en', label: t('defaultTargetLanguage.english') },
          { value: 'vi', label: t('defaultTargetLanguage.vietnamese') },
          { value: 'es', label: t('defaultTargetLanguage.spanish') },
          { value: 'fr', label: t('defaultTargetLanguage.french') },
          { value: 'de', label: t('defaultTargetLanguage.german') },
          { value: 'ja', label: t('defaultTargetLanguage.japanese') },
          { value: 'ko', label: t('defaultTargetLanguage.korean') },
          { value: 'zh', label: t('defaultTargetLanguage.chinese') },
        ],
        onChange: (value: string) => onChange({ defaultTargetLanguage: value }),
        width: 'w-full sm:w-[140px]',
      },
    ],
    [t, preferences, onChange]
  );

  const toggleSettings = useMemo(
    () => [
      {
        key: 'emailNotifications',
        label: t('emailNotifications.label'),
        description: t('emailNotifications.description'),
        checked: preferences.emailNotifications,
        onChange: (checked: boolean) =>
          onChange({ emailNotifications: checked }),
        icon: <Bell className="w-5 h-5 text-primary" />,
      },
      {
        key: 'pushNotifications',
        label: t('pushNotifications.label'),
        description: t('pushNotifications.description'),
        checked: preferences.pushNotifications,
        onChange: (checked: boolean) =>
          onChange({ pushNotifications: checked }),
        icon: <Smartphone className="w-5 h-5 text-green-600" />,
      },
      {
        key: 'translationAlerts',
        label: t('translationAlerts.label'),
        description: t('translationAlerts.description'),
        checked: preferences.translationAlerts,
        onChange: (checked: boolean) =>
          onChange({ translationAlerts: checked }),
        icon: <Globe className="w-5 h-5 text-orange-600" />,
      },
      {
        key: 'autoSaveDrafts',
        label: t('autoSaveDrafts.label'),
        description: t('autoSaveDrafts.description'),
        checked: preferences.autoSaveDrafts,
        onChange: (checked: boolean) => onChange({ autoSaveDrafts: checked }),
        icon: <Save className="w-5 h-5 text-indigo-600" />,
      },
      {
        key: 'showTooltips',
        label: t('showTooltips.label'),
        description: t('showTooltips.description'),
        checked: preferences.showTooltips,
        onChange: (checked: boolean) => onChange({ showTooltips: checked }),
        icon: <Info className="w-5 h-5 text-amber-600" />,
      },
    ],
    [t, preferences, onChange]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('title')}
        </h3>

        <div className="space-y-4">
          {selectSettings.map((setting) => (
            <SelectSettingRow
              key={setting.key}
              label={setting.label}
              description={setting.description}
              value={setting.value}
              options={setting.options}
              onChange={setting.onChange}
              width={setting.width}
            />
          ))}

          {toggleSettings.map((setting) => (
            <ToggleSettingRow
              key={setting.key}
              label={setting.label}
              description={setting.description}
              checked={setting.checked}
              onChange={setting.onChange}
              icon={setting.icon}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
        >
          {tActions('resetToDefaults')}
        </button>
        <button
          onClick={onSave}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all cursor-pointer"
        >
          {tActions('saveSettings')}
        </button>
      </div>
    </div>
  );
}
