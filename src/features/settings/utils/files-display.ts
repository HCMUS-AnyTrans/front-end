export function formatSettingsFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getDaysUntilFileExpiry(storeUntil: string): number {
  return Math.ceil(
    (new Date(storeUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
}
