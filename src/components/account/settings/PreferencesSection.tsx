'use client';

import React from 'react';
import { Preferences } from '@/src/types/account';
import { Bell, Smartphone, Globe } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Theme</p>
              <p className="text-xs text-gray-600">
                Choose your preferred theme
              </p>
            </div>
            <select
              value={preferences.theme}
              onChange={(e) =>
                onChange({ theme: e.target.value as Preferences['theme'] })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Language</p>
              <p className="text-xs text-gray-600">
                Select your preferred language
              </p>
            </div>
            <select
              value={preferences.language}
              onChange={(e) =>
                onChange({
                  language: e.target.value as Preferences['language'],
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-600">
                  Receive updates via email
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
                  Push Notifications
                </p>
                <p className="text-xs text-gray-600">
                  Receive push notifications
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
                  Translation Alerts
                </p>
                <p className="text-xs text-gray-600">
                  Get notified when translations complete
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
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onReset}
          className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
        >
          Reset to Defaults
        </button>
        <button
          onClick={onSave}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
