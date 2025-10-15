'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Preferences } from '@/types/account';
import {
  Bell,
  Smartphone,
  Globe,
  Calendar,
  Clock,
  Languages,
  Save,
  Info,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('title')}
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {t('theme.label')}
              </p>
              <p className="text-xs text-gray-600">{t('theme.description')}</p>
            </div>
            <Select
              value={preferences.theme}
              onValueChange={(value) =>
                onChange({ theme: value as Preferences['theme'] })
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('theme.light')}</SelectItem>
                <SelectItem value="dark">{t('theme.dark')}</SelectItem>
                <SelectItem value="auto">{t('theme.auto')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {t('language.label')}
              </p>
              <p className="text-xs text-gray-600">
                {t('language.description')}
              </p>
            </div>
            <Select
              value={preferences.language}
              onValueChange={(value) =>
                onChange({ language: value as Preferences['language'] })
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('language.english')}</SelectItem>
                <SelectItem value="vi">{t('language.vietnamese')}</SelectItem>
                <SelectItem value="es">{t('language.spanish')}</SelectItem>
                <SelectItem value="fr">{t('language.french')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('dateFormat.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('dateFormat.description')}
                </p>
              </div>
            </div>
            <Select
              value={preferences.dateFormat}
              onValueChange={(value) =>
                onChange({ dateFormat: value as Preferences['dateFormat'] })
              }
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('timeFormat.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('timeFormat.description')}
                </p>
              </div>
            </div>
            <Select
              value={preferences.timeFormat}
              onValueChange={(value) =>
                onChange({ timeFormat: value as Preferences['timeFormat'] })
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">{t('timeFormat.12hour')}</SelectItem>
                <SelectItem value="24h">{t('timeFormat.24hour')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Languages className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('defaultSourceLanguage.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('defaultSourceLanguage.description')}
                </p>
              </div>
            </div>
            <Select
              value={preferences.defaultSourceLanguage}
              onValueChange={(value) =>
                onChange({ defaultSourceLanguage: value })
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  {t('defaultSourceLanguage.english')}
                </SelectItem>
                <SelectItem value="vi">
                  {t('defaultSourceLanguage.vietnamese')}
                </SelectItem>
                <SelectItem value="es">
                  {t('defaultSourceLanguage.spanish')}
                </SelectItem>
                <SelectItem value="fr">
                  {t('defaultSourceLanguage.french')}
                </SelectItem>
                <SelectItem value="de">
                  {t('defaultSourceLanguage.german')}
                </SelectItem>
                <SelectItem value="ja">
                  {t('defaultSourceLanguage.japanese')}
                </SelectItem>
                <SelectItem value="ko">
                  {t('defaultSourceLanguage.korean')}
                </SelectItem>
                <SelectItem value="zh">
                  {t('defaultSourceLanguage.chinese')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Languages className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('defaultTargetLanguage.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('defaultTargetLanguage.description')}
                </p>
              </div>
            </div>
            <Select
              value={preferences.defaultTargetLanguage}
              onValueChange={(value) =>
                onChange({ defaultTargetLanguage: value })
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  {t('defaultTargetLanguage.english')}
                </SelectItem>
                <SelectItem value="vi">
                  {t('defaultTargetLanguage.vietnamese')}
                </SelectItem>
                <SelectItem value="es">
                  {t('defaultTargetLanguage.spanish')}
                </SelectItem>
                <SelectItem value="fr">
                  {t('defaultTargetLanguage.french')}
                </SelectItem>
                <SelectItem value="de">
                  {t('defaultTargetLanguage.german')}
                </SelectItem>
                <SelectItem value="ja">
                  {t('defaultTargetLanguage.japanese')}
                </SelectItem>
                <SelectItem value="ko">
                  {t('defaultTargetLanguage.korean')}
                </SelectItem>
                <SelectItem value="zh">
                  {t('defaultTargetLanguage.chinese')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('emailNotifications.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('emailNotifications.description')}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) =>
                  onChange({ emailNotifications: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('pushNotifications.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('pushNotifications.description')}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.pushNotifications}
                onChange={(e) =>
                  onChange({ pushNotifications: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('translationAlerts.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('translationAlerts.description')}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.translationAlerts}
                onChange={(e) =>
                  onChange({ translationAlerts: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Save className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('autoSaveDrafts.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('autoSaveDrafts.description')}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoSaveDrafts}
                onChange={(e) => onChange({ autoSaveDrafts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {t('showTooltips.label')}
                </p>
                <p className="text-xs text-gray-600">
                  {t('showTooltips.description')}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.showTooltips}
                onChange={(e) => onChange({ showTooltips: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onReset}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
        >
          {tActions('resetToDefaults')}
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all cursor-pointer"
        >
          {tActions('saveSettings')}
        </button>
      </div>
    </div>
  );
}
