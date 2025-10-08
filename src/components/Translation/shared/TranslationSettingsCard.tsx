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

interface ExtendedTranslationSettingsProps extends TranslationSettingsProps {
  showNote?: boolean;
  noteText?: string;
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
}: ExtendedTranslationSettingsProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="p-6 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Translation Settings
        </h3>
      </CardHeader>
      <CardContent className="px-6 pb-6   ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label
              htmlFor="source-lang"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Source Language
            </Label>
            <Select value={sourceLanguage} onValueChange={onChangeSource}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source language" />
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
              Target Language
            </Label>
            <Select value={targetLanguage} onValueChange={onChangeTarget}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target language" />
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
              Translation Mode
            </Label>
            <Select value={translationMode} onValueChange={onChangeMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select translation mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="context-aware">
                  Context-Aware (Recommended)
                </SelectItem>
                <SelectItem value="literal">Literal Translation</SelectItem>
                <SelectItem value="creative">Creative Adaptation</SelectItem>
                <SelectItem value="formal">Formal/Documentary</SelectItem>
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
