'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, ChevronDown, FileText, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageHeader() {
  const t = useTranslations('dashboard.header');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('title')}
            </h1>
            <p className="text-sm text-gray-600">{t('subtitle')}</p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setShowDropdown(!showDropdown)}
              variant="gradient-primary"
              size="default"
              className="px-7 py-7 rounded-xl text-md"
            >
              <Upload className="w-5 h-5 " />
              {t('newTranslation')}
              <ChevronDown className="w-4 h-4" />
            </Button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <a
                  href="/features/document-translation"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#4169E1]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t('dropdown.document.title')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('dropdown.document.description')}
                    </p>
                  </div>
                </a>
                <a
                  href="/features/subtitle-translation"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Film className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t('dropdown.subtitle.title')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('dropdown.subtitle.description')}
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
