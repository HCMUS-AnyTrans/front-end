'use client';

import React from 'react';
import { FileText, Download, Languages, Clock } from 'lucide-react';
import type { SubtitleEntry } from '@/types/translation';

type ReviewVariant = 'document' | 'subtitle';

type DocumentReviewProps = {
  variant: 'document';
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  onDownload: () => void;
  onTranslateAnother: () => void;
};

type SubtitleReviewProps = {
  variant: 'subtitle';
  sourceLanguage: string;
  targetLanguage: string;
  originalSubtitles: SubtitleEntry[];
  translatedSubtitles: SubtitleEntry[];
  onExport: () => void;
  onTranslateAnother: () => void;
};

type StepReviewProps = DocumentReviewProps | SubtitleReviewProps;

export default function StepReview(props: StepReviewProps) {
  const isDocument = props.variant === 'document';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              Translation Complete!
            </h3>
            <p className="text-sm sm:text-base text-green-50">
              Your {isDocument ? 'document' : 'subtitles'} have been
              successfully translated and are ready for review.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={isDocument ? props.onDownload : props.onExport}
              className="bg-white hover:bg-green-50 text-green-700 px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={props.onTranslateAnother}
              className="bg-white/20 hover:bg-white/30 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all border border-white/30 cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              Translate Another
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">
            Words Translated
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">2,847</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Time Taken</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">3.2s</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Accuracy</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">98%</p>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Credits Used</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">28</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Original Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Original ({props.sourceLanguage})
              </h3>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 max-h-96 overflow-y-auto">
              {isDocument ? (
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono">
                  {props.originalText}
                </div>
              ) : (
                <div className="space-y-2">
                  {props.originalSubtitles.map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 sm:p-3 border border-gray-200 rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600 mb-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">
                          {s.startTime} → {s.endTime}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                        {s.originalText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Translated Content */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-green-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-green-200 bg-green-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Translation ({props.targetLanguage})
              </h3>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="bg-green-50 rounded-xl p-4 sm:p-6 max-h-96 overflow-y-auto">
              {isDocument ? (
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono">
                  {props.translatedText}
                </div>
              ) : (
                <div className="space-y-2">
                  {props.translatedSubtitles.map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 sm:p-3 border border-gray-200 rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600 mb-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">
                          {s.startTime} → {s.endTime}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                        {s.translatedText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
