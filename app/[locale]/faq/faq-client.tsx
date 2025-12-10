'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Book,
  FileText,
  Zap,
  Shield,
  CreditCard,
  Settings,
  HelpCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQ, Category } from '@/types/support';
import { BaseFAQ } from '@/components/Common';

export default function FAQClient() {
  const t = useTranslations('support');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: Category[] = [
    { id: 'all', label: t('categories.all'), icon: Book },
    { id: 'getting-started', label: t('categories.gettingStarted'), icon: Zap },
    { id: 'translation', label: t('categories.translation'), icon: FileText },
    { id: 'billing', label: t('categories.billing'), icon: CreditCard },
    { id: 'account', label: t('categories.account'), icon: Settings },
    { id: 'security', label: t('categories.security'), icon: Shield },
  ];

  const faqs: FAQ[] = [
    {
      category: 'getting-started',
      question: t('faq.questions.howToUpload.question'),
      answer: t('faq.questions.howToUpload.answer'),
    },
    {
      category: 'translation',
      question: t('faq.questions.supportedLanguages.question'),
      answer: t('faq.questions.supportedLanguages.answer'),
    },
    {
      category: 'translation',
      question: t('faq.questions.translationAccuracy.question'),
      answer: t('faq.questions.translationAccuracy.answer'),
    },
    {
      category: 'billing',
      question: t('faq.questions.creditSystem.question'),
      answer: t('faq.questions.creditSystem.answer'),
    },
    {
      category: 'billing',
      question: t('faq.questions.refundPolicy.question'),
      answer: t('faq.questions.refundPolicy.answer'),
    },
    {
      category: 'account',
      question: t('faq.questions.accountSettings.question'),
      answer: t('faq.questions.accountSettings.answer'),
    },
    {
      category: 'security',
      question: t('faq.questions.dataSecurity.question'),
      answer: t('faq.questions.dataSecurity.answer'),
    },
    {
      category: 'getting-started',
      question: t('faq.questions.fileFormats.question'),
      answer: t('faq.questions.fileFormats.answer'),
    },
  ];

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t('faq.title')}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                {t('header.description')}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus:border-white focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all text-base"
                />
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Category Filter */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                          selectedCategory === category.id
                            ? 'bg-[#4169E1] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div className="p-4 sm:p-6 lg:p-8">
                {searchedFaqs.length > 0 ? (
                  <BaseFAQ variant="details" faqs={searchedFaqs} />
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-base sm:text-lg text-gray-600 font-medium">
                      {t('search.noResults')} &quot;{searchQuery}&quot;
                    </p>
                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                      {t('search.tryDifferent')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
