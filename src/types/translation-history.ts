export interface TranslationItem {
  id: string;
  fileName: string;
  fileType: string;
  category: 'document' | 'subtitle';
  sourceLanguage: string;
  targetLanguage: string;
  status: 'completed' | 'processing' | 'failed';
  translatedAt: string;
  fileSize: string;
  wordCount: number;
  credits: number;
}

export interface StatusConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  label: string;
}

export interface TranslationHistoryStats {
  totalProjects: number;
  totalCompleted: number;
  totalWords: number;
  totalCredits: number;
}
