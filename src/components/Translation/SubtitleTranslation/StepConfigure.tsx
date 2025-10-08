'use client';

import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileVideo,
  Clock,
  Sparkles,
  Zap,
  RefreshCw,
} from 'lucide-react';
import type {
  SubtitleFile,
  MovieContext,
  SubtitleEntry,
} from '@/src/types/translation';

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
  return (
    <div className="space-y-6">
      {selectedFile && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              File Information
            </h3>
            <button
              onClick={onBack}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Change files
            </button>
          </div>
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                <span>{selectedFile.subtitleCount} subtitles</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Translation Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Source language
            </label>
            <select
              value={sourceLanguage}
              onChange={(e) => onChangeSource(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Japanese</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Target language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => onChangeTarget(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Vietnamese</option>
              <option>Chinese</option>
              <option>Korean</option>
              <option>Thai</option>
              <option>Indonesian</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Translation Mode
            </label>
            <select
              value={translationMode}
              onChange={(e) => onChangeMode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="context-aware">Context-Aware (Recommended)</option>
              <option value="literal">Literal Translation</option>
              <option value="creative">Creative Adaptation</option>
              <option value="formal">Formal/Documentary</option>
            </select>
          </div>
        </div>

        {movieContext && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>Detected context:</strong> {movieContext.title} •{' '}
              {movieContext.year} • {movieContext.genre.join(', ')}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Subtitle Preview
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
                No subtitles loaded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onTranslate}
          disabled={!selectedFile || isProcessing}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Start Translation
            </>
          )}
        </button>
      </div>
    </div>
  );
}
