'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { TranslationSettingsProps, LanguageCode } from './types';

const DEFAULT_SOURCE_LANGUAGES: LanguageCode[] = [
  'English',
  'Spanish',
  'French',
  'German',
  'Japanese',
  'Chinese',
  'Korean',
  'Vietnamese',
];

const DEFAULT_TARGET_LANGUAGES: LanguageCode[] = [
  'Vietnamese',
  'Chinese',
  'Korean',
  'Thai',
  'Indonesian',
  'Japanese',
  'English',
];

interface TranslationSettingsTexts {
  title?: string;
  sourceLanguageLabel?: string;
  targetLanguageLabel?: string;
  translationModeLabel?: string;
  sourceLanguagePlaceholder?: string;
  targetLanguagePlaceholder?: string;
  translationModePlaceholder?: string;
  modeLabels?: {
    contextAware?: string;
    literal?: string;
    creative?: string;
    formal?: string;
  };
}

interface ExtendedTranslationSettingsProps extends TranslationSettingsProps {
  showNote?: boolean;
  noteText?: string;
  texts?: TranslationSettingsTexts;
}

export default function TranslationSettingsCard({
  sourceLanguage,
  targetLanguage,
  translationMode,
  onChangeSource,
  onChangeTarget,
  onChangeMode,
  sourceLanguageOptions = DEFAULT_SOURCE_LANGUAGES,
  targetLanguageOptions = DEFAULT_TARGET_LANGUAGES,
  showNote = true,
  noteText = "Context-aware mode provides better accuracy by understanding the document's context and terminology.",
  texts = {},
}: ExtendedTranslationSettingsProps) {
  // Default texts (fallback)
  const {
    title = 'Translation Settings',
    sourceLanguageLabel = 'Source Language',
    targetLanguageLabel = 'Target Language',
    translationModeLabel = 'Translation Mode',
    sourceLanguagePlaceholder = 'Select source language',
    targetLanguagePlaceholder = 'Select target language',
    translationModePlaceholder = 'Select translation mode',
    modeLabels = {
      contextAware: 'Context-Aware (Recommended)',
      literal: 'Literal Translation',
      creative: 'Creative Adaptation',
      formal: 'Formal/Documentary',
    },
  } = texts;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </CardHeader>
      <CardContent className="px-6 pb-6   ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label
              htmlFor="source-lang"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              {sourceLanguageLabel}
            </Label>
            <Select value={sourceLanguage} onValueChange={onChangeSource}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={sourceLanguagePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {sourceLanguageOptions.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="target-lang"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              {targetLanguageLabel}
            </Label>
            <Select value={targetLanguage} onValueChange={onChangeTarget}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={targetLanguagePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {targetLanguageOptions.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="translation-mode"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              {translationModeLabel}
            </Label>
            <Select value={translationMode} onValueChange={onChangeMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={translationModePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="context-aware">
                  {modeLabels.contextAware}
                </SelectItem>
                <SelectItem value="literal">{modeLabels.literal}</SelectItem>
                <SelectItem value="creative">{modeLabels.creative}</SelectItem>
                <SelectItem value="formal">{modeLabels.formal}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showNote && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> {noteText}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
