'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FAQ, Category } from '@/src/types/support';
import { BaseFAQ } from '@/src/components/Common';

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
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Category Filter */}
      <div className="px-6 py-4 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ List */}
      <div className="p-6">
        {searchedFaqs.length > 0 ? (
          <BaseFAQ variant="details" faqs={searchedFaqs} />
        ) : (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">
              No results found for "{searchQuery}"
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Try different keywords or contact support
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
