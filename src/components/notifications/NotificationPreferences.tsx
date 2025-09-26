"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NotificationPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PreferenceSettings {
  emailAlerts: {
    system: boolean;
    billing: boolean;
    projects: boolean;
    errors: boolean;
  };
  pushAlerts: {
    system: boolean;
    billing: boolean;
    projects: boolean;
    errors: boolean;
  };
  dailyDigest: {
    enabled: boolean;
    time: string;
  };
}

export function NotificationPreferences({ isOpen, onClose }: NotificationPreferencesProps) {
  const [settings, setSettings] = useState<PreferenceSettings>({
    emailAlerts: {
      system: true,
      billing: true,
      projects: false,
      errors: true,
    },
    pushAlerts: {
      system: true,
      billing: true,
      projects: true,
      errors: true,
    },
    dailyDigest: {
      enabled: true,
      time: "09:00",
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateEmailAlert = (category: keyof PreferenceSettings['emailAlerts'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      emailAlerts: {
        ...prev.emailAlerts,
        [category]: value,
      },
    }));
    setHasChanges(true);
  };

  const updatePushAlert = (category: keyof PreferenceSettings['pushAlerts'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      pushAlerts: {
        ...prev.pushAlerts,
        [category]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateDailyDigest = (field: keyof PreferenceSettings['dailyDigest'], value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      dailyDigest: {
        ...prev.dailyDigest,
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving notification preferences:", settings);
    setHasChanges(false);
    onClose();
    
    // Show success toast (would use a toast library in real app)
    alert("Notification preferences saved successfully!");
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmDiscard = window.confirm("You have unsaved changes. Are you sure you want to discard them?");
      if (!confirmDiscard) return;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#19398f] font-nunito">
            Notification Preferences
          </DialogTitle>
          <DialogDescription className="text-sm text-[#717680] font-nunito">
            Customize how and when you receive notifications about your translations and account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Email Alerts Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-4">
              Email Alerts
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    System Notifications
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Maintenance, updates, and system announcements
                  </p>
                </div>
                <Switch
                  checked={settings.emailAlerts.system}
                  onCheckedChange={(checked) => updateEmailAlert('system', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Billing & Account
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Payment confirmations, credit updates, subscription changes
                  </p>
                </div>
                <Switch
                  checked={settings.emailAlerts.billing}
                  onCheckedChange={(checked) => updateEmailAlert('billing', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Project Updates
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Translation completion, processing status updates
                  </p>
                </div>
                <Switch
                  checked={settings.emailAlerts.projects}
                  onCheckedChange={(checked) => updateEmailAlert('projects', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Errors & Issues
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Failed translations, processing errors, urgent issues
                  </p>
                </div>
                <Switch
                  checked={settings.emailAlerts.errors}
                  onCheckedChange={(checked) => updateEmailAlert('errors', checked)}
                />
              </div>
            </div>
          </div>

          {/* Push Notifications Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-4">
              In-App Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    System Notifications
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Show system updates in the notification center
                  </p>
                </div>
                <Switch
                  checked={settings.pushAlerts.system}
                  onCheckedChange={(checked) => updatePushAlert('system', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Billing & Account
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Show billing updates in the notification center
                  </p>
                </div>
                <Switch
                  checked={settings.pushAlerts.billing}
                  onCheckedChange={(checked) => updatePushAlert('billing', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Project Updates
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Show project status in the notification center
                  </p>
                </div>
                <Switch
                  checked={settings.pushAlerts.projects}
                  onCheckedChange={(checked) => updatePushAlert('projects', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Errors & Issues
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Show error notifications immediately
                  </p>
                </div>
                <Switch
                  checked={settings.pushAlerts.errors}
                  onCheckedChange={(checked) => updatePushAlert('errors', checked)}
                />
              </div>
            </div>
          </div>

          {/* Daily Digest Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#414651] font-nunito mb-4">
              Daily Digest
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-900 font-nunito">
                    Enable Daily Summary
                  </Label>
                  <p className="text-xs text-gray-600 font-nunito">
                    Receive a daily email with a summary of your activity
                  </p>
                </div>
                <Switch
                  checked={settings.dailyDigest.enabled}
                  onCheckedChange={(checked) => updateDailyDigest('enabled', checked)}
                />
              </div>

              {settings.dailyDigest.enabled && (
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-gray-900 font-nunito">
                      Delivery Time
                    </Label>
                    <p className="text-xs text-gray-600 font-nunito">
                      When would you like to receive your daily digest?
                    </p>
                  </div>
                  <select
                    value={settings.dailyDigest.time}
                    onChange={(e) => updateDailyDigest('time', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#19398f] focus:border-transparent"
                  >
                    <option value="06:00">6:00 AM</option>
                    <option value="07:00">7:00 AM</option>
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="font-nunito"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#19398f] hover:bg-[#142457] text-white font-nunito"
            disabled={!hasChanges}
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
