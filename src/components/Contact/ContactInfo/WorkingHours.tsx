'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';

interface WorkingHoursProps {
  isVisible: boolean;
}

export function WorkingHours({ isVisible }: WorkingHoursProps) {
  const t = useTranslations('contact.info');

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 delay-100 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#1e3a8a]/20">
          <Clock className="w-6 h-6 text-[#1e3a8a]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {t('workingHours.title')}
          </h3>
          <p className="text-sm text-gray-600">{t('workingHours.subtitle')}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
          <span className="text-gray-600">
            {t('workingHours.schedule.weekdays.label')}
          </span>
          <span className="font-semibold text-gray-900">
            {t('workingHours.schedule.weekdays.hours')}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
          <span className="text-gray-600">
            {t('workingHours.schedule.saturday.label')}
          </span>
          <span className="font-semibold text-gray-900">
            {t('workingHours.schedule.saturday.hours')}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
          <span className="text-gray-600">
            {t('workingHours.schedule.sunday.label')}
          </span>
          <span className="font-semibold text-gray-900">
            {t('workingHours.schedule.sunday.hours')}
          </span>
        </div>
      </div>

      <div className="relative mt-4 p-3 bg-brand-primary-light/10 rounded-lg border border-brand-primary-light/20 hover:bg-brand-primary-light/15 transition-all duration-300">
        <span className="absolute flex size-3 -top-1 -right-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
        </span>
        <p className="text-sm text-[#1e3a8a]">{t('workingHours.support247')}</p>
      </div>
    </div>
  );
}
