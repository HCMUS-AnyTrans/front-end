'use client';

import React from 'react';
import { FileText, Clock } from 'lucide-react';
import type { SubtitleEntry } from '@/types/translation';

interface DocumentContentProps {
  sourceLanguage: string;
  text: string;
}

export function DocumentContent({
  sourceLanguage,
  text,
}: DocumentContentProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 max-h-96 overflow-y-auto">
      <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line font-mono">
        {text}
      </div>
    </div>
  );
}

interface SubtitleItemProps {
  subtitle: {
    id: string;
    startTime: string;
    endTime: string;
    originalText: string;
  };
}

function SubtitleItem({ subtitle }: SubtitleItemProps) {
  return (
    <div className="p-2.5 sm:p-3 border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600 mb-1">
        <Clock className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">
          {subtitle.startTime} → {subtitle.endTime}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
        {subtitle.originalText}
      </p>
    </div>
  );
}

interface SubtitleContentProps {
  subtitles: SubtitleEntry[];
}

export function SubtitleContent({ subtitles }: SubtitleContentProps) {
  return (
    <div className="space-y-2">
      {subtitles.map((s) => (
        <SubtitleItem key={s.id} subtitle={s} />
      ))}
    </div>
  );
}

interface ReviewContentPanelProps {
  title: string;
  language: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  headerBg: string;
  children: React.ReactNode;
}

export function ReviewContentPanel({
  title,
  language,
  icon,
  bgColor,
  borderColor,
  headerBg,
  children,
}: ReviewContentPanelProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${borderColor}`}>
      <div
        className={`px-4 sm:px-6 py-3 sm:py-4 border-b ${borderColor} ${headerBg} rounded-t-2xl`}
      >
        <div className="flex items-center gap-2">{icon}</div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
          {title} ({language})
        </h3>
      </div>
      <div className="p-4 sm:p-6">
        <div
          className={`${bgColor} rounded-xl p-4 sm:p-6 max-h-96 overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
