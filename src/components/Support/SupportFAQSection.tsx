'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';
import { FAQ, Category } from '@/types/support';
import { BaseFAQ } from '@/components/Common';

interface SupportFAQSectionProps {
  title: string;
  categories: Category[];
  faqs: FAQ[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
}

export default function SupportFAQSection({
  title,
  categories,
  faqs,
  selectedCategory,
  onCategoryChange,
  searchQuery,
}: SupportFAQSectionProps) {
  const t = useTranslations('support.search');

  const filteredFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const searchedFaqs = searchQuery
    ? filteredFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredFaqs;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Category Filter */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-[#4169E1] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">
                  {category.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ List */}
      <div className="p-4 sm:p-6">
        {searchedFaqs.length > 0 ? (
          <BaseFAQ variant="details" faqs={searchedFaqs} />
        ) : (
          <div className="text-center py-8 sm:py-12">
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
            <p className="text-sm sm:text-base text-gray-600">
              {t('noResults')} "{searchQuery}"
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {t('tryDifferent')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
