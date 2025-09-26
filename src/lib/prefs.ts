// Preferences management utilities

export type Language = 'en' | 'vi';
export type Theme = 'light' | 'dark' | 'system';

// Language preferences
export const getLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const stored = localStorage.getItem('ui.language');
    if (stored && (stored === 'en' || stored === 'vi')) {
      return stored as Language;
    }
  } catch (error) {
    console.warn('Failed to read language preference:', error);
  }
  
  return 'en';
};

export const setLanguage = (language: Language): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('ui.language', language);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
  } catch (error) {
    console.warn('Failed to save language preference:', error);
  }
};

// Theme preferences (delegates to next-themes for runtime)
export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  
  try {
    const stored = localStorage.getItem('theme');
    if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme preference:', error);
  }
  
  return 'system';
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('theme', theme);
    // next-themes will handle the actual theme application
    // This is just for persistence backup
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
};

// Default values
export const DEFAULT_LANGUAGE: Language = 'en';
export const DEFAULT_THEME: Theme = 'system';

// Reset to defaults
export const resetToDefaults = (): void => {
  setLanguage(DEFAULT_LANGUAGE);
  setTheme(DEFAULT_THEME);
};
