import React from 'react';

// Unified step types
export type TranslationStep = 'upload' | 'configure' | 'review';

export type StepDef = {
  number: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Document Translation Types
export type DocumentFile = {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  wordCount: number;
  pageCount: number;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
};

// Subtitle Translation Types
export type SubtitleFile = {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  duration: string;
  language: string;
  subtitleCount: number;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
};

export type MovieContext = {
  title: string;
  year: string;
  season?: string;
  episode?: string;
  genre: string[];
  director?: string;
  cast: string[];
  plot: string;
  confidence: number;
  sourceType: 'movie' | 'tv_show' | 'documentary' | 'other';
};

export type SubtitleEntry = {
  id: string;
  startTime: string;
  endTime: string;
  originalText: string;
  translatedText: string;
  speaker?: string;
  context?: string;
  isEdited: boolean;
};
