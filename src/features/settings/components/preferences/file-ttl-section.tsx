'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FILE_TTL_OPTIONS } from '../../data';
import type { FileTTL } from '../../types';
import { SettingsSection } from '../shared/settings-section';

interface PreferencesFileTtlSectionProps {
  activeFileTtlMode: 'preset' | 'custom';
  selectedPresetValue: FileTTL | null;
  resolvedCustomFileTtlInput: string;
  isCustomFileTtlInvalid: boolean;
  needsPresetSelection: boolean;
  showFileTtlActions: boolean;
  isFileTtlSaveDisabled: boolean;
  isUpdating: boolean;
  onModeChange: (mode: 'preset' | 'custom') => void;
  onPresetChange: (value: FileTTL) => void;
  onCustomInputChange: (value: string) => void;
  onReset: () => void;
  onSave: () => void;
}

export function PreferencesFileTtlSection({
  activeFileTtlMode,
  selectedPresetValue,
  resolvedCustomFileTtlInput,
  isCustomFileTtlInvalid,
  needsPresetSelection,
  showFileTtlActions,
  isFileTtlSaveDisabled,
  isUpdating,
  onModeChange,
  onPresetChange,
  onCustomInputChange,
  onReset,
  onSave,
}: PreferencesFileTtlSectionProps) {
  const t = useTranslations('settings.preferences');
  const tCommon = useTranslations('common');

  return (
    <SettingsSection title={t('fileTtl')} description={t('fileTtlDescription')}>
      <div className="space-y-4">
        <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => onModeChange('preset')}
              className={cn(
                'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors',
                activeFileTtlMode === 'preset'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-foreground hover:bg-muted/50',
              )}
            >
              {t('fileTtlPresetMode')}
            </button>
            <button
              type="button"
              onClick={() => onModeChange('custom')}
              className={cn(
                'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors',
                activeFileTtlMode === 'custom'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-foreground hover:bg-muted/50',
              )}
            >
              {t('fileTtlCustomMode')}
            </button>
          </div>

          {activeFileTtlMode === 'preset' ? (
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {FILE_TTL_OPTIONS.map((option) => {
                  const isActive = selectedPresetValue === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onPresetChange(option.value)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors',
                        isActive
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-card text-foreground hover:bg-muted/50',
                      )}
                    >
                      {t('hours', { count: option.hours })}
                    </button>
                  );
                })}
              </div>

              {needsPresetSelection ? (
                <p className="text-sm text-amber-600">
                  {t('fileTtlSelectPresetPrompt')}
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
                  onChange={(e) => onCustomInputChange(e.target.value)}
                  className="w-full sm:w-40"
                  placeholder={t('customHoursPlaceholder')}
                  aria-invalid={isCustomFileTtlInvalid}
                />
                <span className="text-sm text-muted-foreground">
                  {t('hourUnit')}
                </span>
              </div>

              {isCustomFileTtlInvalid ? (
                <p className="text-sm text-destructive">
                  {t('fileTtlCustomValidation', { max: 8760 })}
                </p>
              ) : null}
            </div>
          )}

          {showFileTtlActions ? (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onReset}
                disabled={isUpdating}
              >
                {tCommon('cancel')}
              </Button>
              <Button
                type="button"
                onClick={onSave}
                disabled={isFileTtlSaveDisabled}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {tCommon('save')}
                  </>
                ) : (
                  tCommon('save')
                )}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </SettingsSection>
  );
}
