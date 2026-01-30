'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { Office } from '@/types/contact';

interface OfficeLocationsProps {
  offices: Office[];
  isVisible: boolean;
}

export function OfficeLocations({ offices, isVisible }: OfficeLocationsProps) {
  const t = useTranslations('contact.info');

  return (
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
  );
}
