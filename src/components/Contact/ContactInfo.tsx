'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Clock } from 'lucide-react';
import { ContactInfoProps } from '@/types/contact';

export default function ContactInfo({ offices, reasons }: ContactInfoProps) {
  const t = useTranslations('contact.info');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Office Locations */}
      <div
        className={`bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#4169E1]/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#4169E1]/20">
            <MapPin className="w-6 h-6 text-[#4169E1]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {t('officeLocations.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('officeLocations.subtitle')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#4169E1]/30 hover:bg-[#4169E1]/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              <h4 className="font-bold text-gray-900 mb-1">
                {office.city}, {office.country}
              </h4>
              <p className="text-sm text-gray-600">{office.address}</p>
              <p className="text-sm text-gray-600">{office.zipcode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours */}
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
            <p className="text-sm text-gray-600">
              {t('workingHours.subtitle')}
            </p>
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

        <div className="relative mt-4 p-3 bg-[#4169E1]/10 rounded-lg border border-[#4169E1]/20 hover:bg-[#4169E1]/15 transition-all duration-300">
          <span className="absolute flex size-3 -top-1 -right-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
          </span>
          <p className="text-sm text-[#1e3a8a]">
            {t('workingHours.support247')}
          </p>
        </div>
      </div>

      {/* Why Contact Us */}
      <div
        className={`bg-gradient-to-br from-[#1e3a8a]  to-[#173FB6] rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}
      >
        <h3 className="text-xl font-bold mb-4">{t('whyContactUs.title')}</h3>
        <div className="space-y-3">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                style={{
                  animation: `fade-in-right 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{reason.title}</h4>
                  <p className="text-sm text-blue-100">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
