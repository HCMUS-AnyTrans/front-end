'use client';

import React from 'react';
import { FileText, Languages, Clock } from 'lucide-react';
import type { SubtitleEntry } from '@/types/translation';
import { ReviewHeader } from './ReviewHeader';
import { ReviewStats } from './ReviewStats';
import {
  ReviewContentPanel,
  DocumentContent,
  SubtitleContent,
} from './ReviewContent';

type ReviewVariant = 'document' | 'subtitle';

type DocumentReviewProps = {
  variant: 'document';
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  onDownload: () => void;
  onTranslateAnother: () => void;
  translationNamespace?: 'documentTranslation' | 'subtitleTranslation';
};

type SubtitleReviewProps = {
  variant: 'subtitle';
  sourceLanguage: string;
  targetLanguage: string;
  originalSubtitles: SubtitleEntry[];
  translatedSubtitles: SubtitleEntry[];
  onExport: () => void;
  onTranslateAnother: () => void;
  translationNamespace?: 'documentTranslation' | 'subtitleTranslation';
};

type StepReviewProps = DocumentReviewProps | SubtitleReviewProps;

export default function StepReview(props: StepReviewProps) {
  const isDocument = props.variant === 'document';
  const namespace =
    props.translationNamespace ||
    (isDocument ? 'documentTranslation' : 'subtitleTranslation');

  const handleDownload = isDocument ? props.onDownload : props.onExport;

  return (
    <div className="space-y-4 sm:space-y-6">
      <ReviewHeader
        isDocument={isDocument}
        translationNamespace={namespace}
        onDownload={handleDownload}
        onExport={handleDownload}
        onTranslateAnother={props.onTranslateAnother}
      />

      <ReviewStats translationNamespace={namespace} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ReviewContentPanel
          title="Original"
          language={props.sourceLanguage}
          icon={<FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#4169E1]" />}
          bgColor="bg-gray-50"
          borderColor="border-gray-200"
          headerBg="bg-gray-50"
        >
          {isDocument ? (
            <DocumentContent
              sourceLanguage={props.sourceLanguage}
              text={props.originalText}
            />
          ) : (
            <SubtitleContent subtitles={props.originalSubtitles} />
          )}
        </ReviewContentPanel>

        <ReviewContentPanel
          title="Translation"
          language={props.targetLanguage}
          icon={<Languages className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
          bgColor="bg-green-50"
          borderColor="border-green-200"
          headerBg="bg-green-50"
        >
          {isDocument ? (
            <DocumentContent
              sourceLanguage={props.targetLanguage}
              text={props.translatedText}
            />
          ) : (
            <SubtitleContent subtitles={props.translatedSubtitles} />
          )}
        </ReviewContentPanel>
      </div>
    </div>
  );
}
