'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { TranslationSettingsCard, ConfigureActionButtons } from '../shared';
import { SubtitleFileInfo } from './SubtitleFileInfo';
import { SubtitlePreview } from './SubtitlePreview';
import type {
  SubtitleFile,
  MovieContext,
  SubtitleEntry,
} from '@/types/translation';

type StepConfigureProps = {
  selectedFile: SubtitleFile | null;
  movieContext: MovieContext | null;
  sourceLanguage: string;
  targetLanguage: string;
  translationMode: string;
  onChangeSource: (v: string) => void;
  onChangeTarget: (v: string) => void;
  onChangeMode: (v: string) => void;
  originalSubtitles: SubtitleEntry[];
  onBack: () => void;
  onTranslate: () => void;
  isProcessing: boolean;
};

export default function StepConfigure({
  selectedFile,
  movieContext,
  sourceLanguage,
  targetLanguage,
  translationMode,
  onChangeSource,
  onChangeTarget,
  onChangeMode,
  originalSubtitles,
  onBack,
  onTranslate,
  isProcessing,
}: StepConfigureProps) {
  const t = useTranslations('subtitleTranslation.configure');

  return (
    <div className="space-y-6">
      <SubtitleFileInfo selectedFile={selectedFile} onBack={onBack} />

      <TranslationSettingsCard
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        translationMode={translationMode}
        onChangeSource={onChangeSource}
        onChangeTarget={onChangeTarget}
        onChangeMode={onChangeMode}
        sourceLanguageOptions={[
          'English',
          'Spanish',
          'French',
          'German',
          'Japanese',
        ]}
        targetLanguageOptions={[
          'Vietnamese',
          'Chinese',
          'Korean',
          'Thai',
          'Indonesian',
        ]}
        showNote={false}
        texts={{
          title: t('translationSettings.title'),
          sourceLanguageLabel: t('translationSettings.sourceLanguage'),
          targetLanguageLabel: t('translationSettings.targetLanguage'),
          translationModeLabel: t('translationSettings.translationMode'),
          sourceLanguagePlaceholder: t(
            'translationSettings.selectSourceLanguage'
          ),
          targetLanguagePlaceholder: t(
            'translationSettings.selectTargetLanguage'
          ),
          translationModePlaceholder: t(
            'translationSettings.selectTranslationMode'
          ),
          modeLabels: {
            contextAware: t('translationSettings.modes.contextAware'),
            literal: t('translationSettings.modes.literal'),
            creative: t('translationSettings.modes.creative'),
            formal: t('translationSettings.modes.formal'),
          },
        }}
      />

      {movieContext && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>{t('contextDetected')}</strong> {movieContext.title} •{' '}
              {movieContext.year} • {movieContext.genre.join(', ')}
            </p>
          </div>
        </div>
      )}

      <SubtitlePreview subtitles={originalSubtitles} />

      <ConfigureActionButtons
        onBack={onBack}
        onTranslate={onTranslate}
        isProcessing={isProcessing}
        disabled={!selectedFile}
        backButtonText={t('actions.back')}
        translateButtonText={t('actions.startTranslation')}
        processingText={t('actions.processing')}
      />
    </div>
  );
}
