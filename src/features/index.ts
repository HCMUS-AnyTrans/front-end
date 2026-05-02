// Authentication (renamed from 'authentication' to 'auth')
export * from './auth';

// Marketing features
export * from './landing';
export * from './about';
export * from './pricing';
export * from './contact';

// App features
// Note: auth and documents have conflicting type exports (TranslationJobResponse)
// Note: dashboard and documents have conflicting type exports (JobStatus, LanguageCode)
// Import document types directly from '@/features/documents' when needed
export { DocumentTranslationWizard, useDownloadFile } from './documents';
// Dashboard exports: use `import { ... } from '@/features/dashboard'` directly
// Settings exports: use `import { ... } from '@/features/settings'` directly
// History exports: use `import { ... } from '@/features/history'` directly
