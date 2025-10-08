'use client';

import React, { useState } from 'react';
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
import Sidebar from '@/src/components/Layout/Sidebar/Sidebar';
import SupportHeader from '@/src/components/Support/SupportHeader';
import SupportSearchBar from '@/src/components/Support/SupportSearchBar';
import SupportQuickActions from '@/src/components/Support/SupportQuickActions';
import SupportFAQSection from '@/src/components/Support/SupportFAQSection';
import SupportContactForm from '@/src/components/Support/SupportContactForm';
import SupportAdditionalResources from '@/src/components/Support/SupportAdditionalResources';
import {
  FAQ,
  Category,
  ContactForm,
  AdditionalResource,
} from '@/src/types/support';

export default function SupportClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const categories: Category[] = [
    { id: 'all', label: 'All Topics', icon: Book },
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'translation', label: 'Translation', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const faqs: FAQ[] = [
    {
      category: 'getting-started',
      question: 'How do I upload a document for translation?',
      answer:
        'Navigate to the Document Translator page, click "Choose File" or drag and drop your document. We support DOCX, PDF, XLSX, PPTX, and TXT formats up to 50MB.',
    },
    {
      category: 'translation',
      question: 'What languages are supported?',
      answer:
        'We support over 100 languages including English, Vietnamese, Chinese, Japanese, Korean, Spanish, French, German, and many more.',
    },
    {
      category: 'translation',
      question: 'How accurate are the translations?',
      answer:
        'Our AI-powered translation engine provides 95%+ accuracy. For professional translation mode, we achieve 98%+ accuracy with context-aware translation.',
    },
    {
      category: 'billing',
      question: 'How does the credit system work?',
      answer:
        'Each word translated costs 1 credit. Free users get 1,000 credits per month. Pro users get unlimited translations with advanced features.',
    },
    {
      category: 'billing',
      question: 'Can I get a refund?',
      answer:
        'Yes, we offer a 30-day money-back guarantee for Pro subscriptions. Contact our support team to process your refund.',
    },
    {
      category: 'account',
      question: 'How do I change my account settings?',
      answer:
        'Click on your profile in the sidebar, then select "Settings" to manage your account preferences, password, and notifications.',
    },
    {
      category: 'security',
      question: 'Is my data secure?',
      answer:
        'Yes, we use bank-level encryption (AES-256) for all data. Documents are automatically deleted after 24 hours unless you save them.',
    },
    {
      category: 'getting-started',
      question: 'What file formats are supported?',
      answer:
        'We support DOCX, PDF, XLSX, PPTX, TXT, and SRT (for subtitles). Maximum file size is 50MB per document.',
    },
  ];

  const additionalResources: AdditionalResource[] = [
    {
      id: 'status',
      title: 'Status Page',
      description: 'Check the current status of our services',
      icon: CheckCircle,
      bgGradient: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-100',
      iconBg: 'bg-blue-600',
      textColor: 'text-blue-600',
      hoverTextColor: 'text-blue-700',
      actionText: 'View status',
      onClick: () => console.log('View status'),
    },
    {
      id: 'api',
      title: 'API Documentation',
      description: 'Integrate AnyTrans into your applications',
      icon: Book,
      bgGradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-100',
      iconBg: 'bg-green-600',
      textColor: 'text-green-600',
      hoverTextColor: 'text-green-700',
      actionText: 'View API docs',
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
          title="Support Center"
          description="Get help with your translation projects and find answers to common questions"
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
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
              title="Frequently Asked Questions"
              categories={categories}
              faqs={faqs}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
            />

            <SupportContactForm
              title="Still need help?"
              description="Send us a message and we'll get back to you within 24 hours"
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
