"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sun, Moon, Monitor, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SettingsSection,
  SettingsRow,
  SettingsDivider,
} from "./settings-section";
import { cn } from "@/lib/utils";
import { uiLanguageOptions } from "../data";
import { usePreferences, useUpdatePreferences } from "../hooks/use-preferences";
import { useThemeSync } from "../hooks/use-theme-sync";
import { useLanguageSync } from "../hooks/use-language-sync";
import type { UILanguage, Theme, FileTTL } from "../types";

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

// Hours options for fileTtl
const FILE_TTL_OPTIONS: { value: FileTTL; hours: number }[] = [
  { value: 1, hours: 1 },
  { value: 6, hours: 6 },
  { value: 12, hours: 12 },
  { value: 24, hours: 24 },
];

const DEFAULT_FILE_TTL: FileTTL = 6;
const MAX_FILE_TTL_HOURS = 8760;

function isPresetFileTtl(value: FileTTL) {
  return FILE_TTL_OPTIONS.some((option) => option.value === value);
}

function normalizeFileTtl(value: number | null | undefined): FileTTL {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return Math.floor(value);
  }

  return DEFAULT_FILE_TTL;
}

// ============================================================================
// Skeleton Loading State
// ============================================================================

function PreferencesTabSkeleton() {
  return (
    <div className="space-y-6">
      {/* Display Settings Skeleton */}
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-1 h-5 w-24" />
        <Skeleton className="mb-4 h-4 w-48" />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-9 w-48" />
          </div>
          <div className="border-t" />
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-36" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* File Settings Skeleton */}
      <div className="rounded-lg border bg-card p-6">
        <Skeleton className="mb-4 h-5 w-32" />
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-44" />
            </div>
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function PreferencesTab() {
  const t = useTranslations("settings.preferences");
  const tCommon = useTranslations("common");

  // Data hooks
  const { preferences, isLoading } = usePreferences();
  const { updatePreferences, isUpdating } = useUpdatePreferences();

  // Theme hook — instant apply + backend sync
  const { theme: activeTheme, changeTheme } = useThemeSync();

  // Language hook — instant apply + backend sync
  const { locale, changeLanguage } = useLanguageSync();

  // Local state (fileTtl only — theme and language are handled instantly)
  const [selectedFileTtl, setSelectedFileTtl] = useState<FileTTL | null>(null);
  const [customFileTtlInput, setCustomFileTtlInput] = useState<string | null>(null);
  const [fileTtlMode, setFileTtlMode] = useState<"preset" | "custom" | null>(null);

  // Show skeleton while loading
  if (isLoading || !preferences) {
    return <PreferencesTabSkeleton />;
  }

  const savedFileTtl = normalizeFileTtl(preferences.fileTtl);
  const draftFileTtl = selectedFileTtl ?? savedFileTtl;
  const savedMode = isPresetFileTtl(savedFileTtl) ? "preset" : "custom";
  const activeFileTtlMode = fileTtlMode ?? savedMode;
  const selectedPresetValue = isPresetFileTtl(draftFileTtl) ? draftFileTtl : null;
  const resolvedCustomFileTtlInput = customFileTtlInput ?? String(draftFileTtl);
  const customFileTtlValue = Number(resolvedCustomFileTtlInput);
  const isCustomFileTtlInvalid =
    activeFileTtlMode === "custom" &&
    (resolvedCustomFileTtlInput.trim() === "" ||
      !Number.isFinite(customFileTtlValue) ||
      customFileTtlValue <= 0 ||
      customFileTtlValue > MAX_FILE_TTL_HOURS);
  const hasFileTtlChanges = draftFileTtl !== savedFileTtl;
  const needsPresetSelection =
    activeFileTtlMode === "preset" && selectedPresetValue === null;
  const showFileTtlActions = hasFileTtlChanges || isCustomFileTtlInvalid;
  const isFileTtlSaveDisabled =
    isUpdating || isCustomFileTtlInvalid || needsPresetSelection || !hasFileTtlChanges;

  const handleFileTtlChange = (value: FileTTL) => {
    setSelectedFileTtl(value);
    setCustomFileTtlInput(null);
  };

  const handleFileTtlModeChange = (mode: "preset" | "custom") => {
    setFileTtlMode(mode);

    if (mode === "custom") {
      setCustomFileTtlInput(String(draftFileTtl));
      return;
    }

    setCustomFileTtlInput(null);
  };

  const handleCustomFileTtlChange = (value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");

    setCustomFileTtlInput(sanitizedValue);

    if (!sanitizedValue) return;

    const hours = Number(sanitizedValue);
    if (hours > 0 && hours <= MAX_FILE_TTL_HOURS) {
      setSelectedFileTtl(hours);
    }
  };

  const handleFileTtlReset = () => {
    setSelectedFileTtl(null);
    setCustomFileTtlInput(null);
    setFileTtlMode(null);
  };

  const handleSave = () => {
    updatePreferences(
      { fileTtl: draftFileTtl },
      {
        onSuccess: () => {
          handleFileTtlReset();
        },
      },
    );
  };

  const themeOptions = [
    { value: "light", labelKey: "themeLight" },
    { value: "dark", labelKey: "themeDark" },
    { value: "system", labelKey: "themeSystem" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Display Settings */}
      <SettingsSection title={t("title")} description={t("description")}>
        <div className="space-y-1">
          <SettingsRow
            label={t("language")}
            description={t("languageDescription")}
          >
            <div className="flex gap-1">
              {uiLanguageOptions.map((lang) => {
                const isActive = locale === lang.value;
                return (
                  <button
                    key={lang.value}
                    onClick={() => changeLanguage(lang.value as UILanguage)}
                    className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-foreground hover:bg-muted/50"
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

          <SettingsRow label={t("theme")} description={t("themeDescription")}>
            <div className="flex gap-1">
              {themeOptions.map((opt) => {
                const Icon = themeIcons[opt.value as keyof typeof themeIcons];
                const isActive = activeTheme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => changeTheme(opt.value as Theme)}
                    className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-foreground hover:bg-muted/50"
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

      {/* File Settings */}
      <SettingsSection title={t("fileTtl")} description={t("fileTtlDescription")}>
        <div className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
            <div className="flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => handleFileTtlModeChange("preset")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                  activeFileTtlMode === "preset"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-foreground hover:bg-muted/50",
                )}
              >
                {t("fileTtlPresetMode")}
              </button>
              <button
                type="button"
                onClick={() => handleFileTtlModeChange("custom")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                  activeFileTtlMode === "custom"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-foreground hover:bg-muted/50",
                )}
              >
                {t("fileTtlCustomMode")}
              </button>
            </div>

            {activeFileTtlMode === "preset" ? (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {FILE_TTL_OPTIONS.map((option) => {
                    const isActive = selectedPresetValue === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleFileTtlChange(option.value)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                          isActive
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-card text-foreground hover:bg-muted/50",
                        )}
                      >
                        {t("hours", { count: option.hours })}
                      </button>
                    );
                  })}
                </div>

                {needsPresetSelection ? (
                  <p className="text-sm text-amber-600">
                    {t("fileTtlSelectPresetPrompt")}
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={resolvedCustomFileTtlInput}
                    onChange={(e) => handleCustomFileTtlChange(e.target.value)}
                    className="w-full sm:w-40"
                    placeholder={t("customHoursPlaceholder")}
                    aria-invalid={isCustomFileTtlInvalid}
                  />
                  <span className="text-sm text-muted-foreground">
                    {t("hourUnit")}
                  </span>
                </div>

                {isCustomFileTtlInvalid ? (
                  <p className="text-sm text-destructive">
                    {t("fileTtlCustomValidation", { max: MAX_FILE_TTL_HOURS })}
                  </p>
                ) : null}
              </div>
            )}

            {showFileTtlActions ? (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFileTtlReset}
                  disabled={isUpdating}
                >
                  {tCommon("cancel")}
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isFileTtlSaveDisabled}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {tCommon("save")}
                    </>
                  ) : (
                    tCommon("save")
                  )}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
