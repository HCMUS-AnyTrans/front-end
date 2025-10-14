'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, FileVideo, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TranslationSettingsCard, ConfigureActionButtons } from './shared';
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
      {selectedFile && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('fileInfo.title')}
            </h3>
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-sm text-[#4169E1] hover:text-[#1e3a8a] font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('fileInfo.changeFiles')}
            </Button>
          </div>
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-[#4169E1] rounded-lg flex items-center justify-center flex-shrink-0">
              <FileVideo className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 mb-1">
                {selectedFile.fileName}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>{selectedFile.fileType}</span>
                <span>•</span>
                <span>{selectedFile.fileSize}</span>
                <span>•</span>
                <span>
                  {selectedFile.subtitleCount} {t('fileInfo.subtitles')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('subtitlePreview.title')}
          </h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
            {originalSubtitles.length > 0 ? (
              <div className="space-y-2">
                {originalSubtitles.slice(0, 8).map((subtitle) => (
                  <div
                    key={subtitle.id}
                    className="p-3 border border-gray-200 rounded-lg bg-white"
                  >
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {subtitle.startTime} → {subtitle.endTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">
                      {subtitle.originalText}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-sm text-gray-600">
                {t('subtitlePreview.noSubtitles')}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfigureActionButtons
        onBack={onBack}
        onTranslate={onTranslate}
        isProcessing={isProcessing}
        disabled={!selectedFile}
        translateButtonText={t('actions.startTranslation')}
        processingText={t('actions.processing')}
      />
    </div>
  );
}
