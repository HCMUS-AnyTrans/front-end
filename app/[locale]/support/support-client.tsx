'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Book,
  HelpCircle,
  FileText,
  Zap,
  Shield,
  CreditCard,
  Settings,
  CheckCircle,
} from 'lucide-react';
import { Sidebar } from '@/components/Layout';
import {
  SupportHeader,
  SupportSearchBar,
  SupportQuickActions,
  SupportFAQSection,
  SupportContactForm,
  SupportAdditionalResources,
} from '@/components/Support';
import {
  FAQ,
  Category,
  ContactForm,
  AdditionalResource,
} from '@/types/support';

export default function SupportClient() {
  const t = useTranslations('support');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

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

  const additionalResources: AdditionalResource[] = [
    {
      id: 'status',
      title: t('additionalResources.statusPage.title'),
      description: t('additionalResources.statusPage.description'),
      icon: CheckCircle,
      bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-100',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-600',
      hoverTextColor: 'text-blue-700',
      actionText: t('additionalResources.statusPage.action'),
      onClick: () => console.log('View status'),
    },
    {
      id: 'api',
      title: t('additionalResources.apiDocs.title'),
      description: t('additionalResources.apiDocs.description'),
      icon: Book,
      bgGradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-100',
      iconBg: 'bg-green-600',
      textColor: 'text-green-600',
      hoverTextColor: 'text-green-700',
      actionText: t('additionalResources.apiDocs.action'),
      onClick: () => console.log('View API docs'),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleLiveChat = () => {
    console.log('Start live chat');
  };

  const handleEmailSupport = () => {
    console.log('Send email support');
  };

  const handleDocumentation = () => {
    console.log('View documentation');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <SupportHeader
          title={t('header.title')}
          description={t('header.description')}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            <SupportSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <SupportQuickActions
              onLiveChat={handleLiveChat}
              onEmailSupport={handleEmailSupport}
              onDocumentation={handleDocumentation}
            />

            <SupportFAQSection
              title={t('faq.title')}
              categories={categories}
              faqs={faqs}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
            />

            <SupportContactForm
              title={t('contactForm.title')}
              description={t('contactForm.description')}
              form={contactForm}
              onFormChange={setContactForm}
              onSubmit={handleSubmit}
            />

            <SupportAdditionalResources resources={additionalResources} />
          </div>
        </div>
      </div>
    </div>
  );
}
