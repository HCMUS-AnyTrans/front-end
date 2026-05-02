'use client';

import { useCallback, useMemo, useState } from 'react';
import type { FileTTL } from '../types';
import {
  isPresetFileTtl,
  MAX_FILE_TTL_HOURS,
  normalizeFileTtl,
} from '../utils/preferences';

interface UsePreferencesFileTtlOptions {
  savedFileTtl: FileTTL | null | undefined;
  isUpdating: boolean;
  onSave: (value: FileTTL, options?: { onSuccess?: () => void }) => void;
}

export function usePreferencesFileTtl({
  savedFileTtl: rawSavedFileTtl,
  isUpdating,
  onSave,
}: UsePreferencesFileTtlOptions) {
  const [selectedFileTtl, setSelectedFileTtl] = useState<FileTTL | null>(null);
  const [customFileTtlInput, setCustomFileTtlInput] = useState<string | null>(
    null,
  );
  const [fileTtlMode, setFileTtlMode] = useState<'preset' | 'custom' | null>(
    null,
  );

  const savedFileTtl = useMemo(
    () => normalizeFileTtl(rawSavedFileTtl),
    [rawSavedFileTtl],
  );

  const draftFileTtl = selectedFileTtl ?? savedFileTtl;
  const savedMode = isPresetFileTtl(savedFileTtl) ? 'preset' : 'custom';
  const activeFileTtlMode = fileTtlMode ?? savedMode;
  const selectedPresetValue = isPresetFileTtl(draftFileTtl)
    ? draftFileTtl
    : null;
  const resolvedCustomFileTtlInput = customFileTtlInput ?? String(draftFileTtl);
  const customFileTtlValue = Number(resolvedCustomFileTtlInput);
  const isCustomFileTtlInvalid =
    activeFileTtlMode === 'custom' &&
    (resolvedCustomFileTtlInput.trim() === '' ||
      !Number.isFinite(customFileTtlValue) ||
      customFileTtlValue <= 0 ||
      customFileTtlValue > MAX_FILE_TTL_HOURS);
  const hasFileTtlChanges = draftFileTtl !== savedFileTtl;
  const needsPresetSelection =
    activeFileTtlMode === 'preset' && selectedPresetValue === null;
  const showFileTtlActions = hasFileTtlChanges || isCustomFileTtlInvalid;
  const isFileTtlSaveDisabled =
    isUpdating ||
    isCustomFileTtlInvalid ||
    needsPresetSelection ||
    !hasFileTtlChanges;

  const handleFileTtlReset = useCallback(() => {
    setSelectedFileTtl(null);
    setCustomFileTtlInput(null);
    setFileTtlMode(null);
  }, []);

  const handleFileTtlChange = useCallback((value: FileTTL) => {
    setSelectedFileTtl(value);
    setCustomFileTtlInput(null);
  }, []);

  const handleFileTtlModeChange = useCallback(
    (mode: 'preset' | 'custom') => {
      setFileTtlMode(mode);

      if (mode === 'custom') {
        setCustomFileTtlInput(String(draftFileTtl));
        return;
      }

      setCustomFileTtlInput(null);
    },
    [draftFileTtl],
  );

  const handleCustomFileTtlChange = useCallback((value: string) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    setCustomFileTtlInput(sanitizedValue);

    if (!sanitizedValue) return;

    const hours = Number(sanitizedValue);
    if (hours > 0 && hours <= MAX_FILE_TTL_HOURS) {
      setSelectedFileTtl(hours);
    }
  }, []);

  const handleSave = useCallback(() => {
    onSave({ fileTtl: draftFileTtl }.fileTtl, {
      onSuccess: () => {
        handleFileTtlReset();
      },
    });
  }, [draftFileTtl, handleFileTtlReset, onSave]);

  return {
    activeFileTtlMode,
    selectedPresetValue,
    resolvedCustomFileTtlInput,
    isCustomFileTtlInvalid,
    needsPresetSelection,
    showFileTtlActions,
    isFileTtlSaveDisabled,
    handleFileTtlChange,
    handleFileTtlModeChange,
    handleCustomFileTtlChange,
    handleFileTtlReset,
    handleSave,
  };
}
