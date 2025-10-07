'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Phone,
  Search,
  Book,
  HelpCircle,
  FileText,
  Zap,
  Shield,
  CreditCard,
  Settings,
  ChevronRight,
  Send,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const categories = [
    { id: 'all', label: 'All Topics', icon: Book },
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'translation', label: 'Translation', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const faqs = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6 mt-16 lg:mt-0">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Support Center
            </h1>
            <p className="text-sm text-gray-600">
              Get help with your translation projects and find answers to common
              questions
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles, FAQs, and guides..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group text-left">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-all">
                  <MessageCircle className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get instant help from our support team
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <span>Start chat</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              <button className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group text-left">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-all">
                  <Mail className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Email Support
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Response within 24 hours
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <span>Send email</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              <button className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group text-left">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-all">
                  <Book className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Documentation
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Guides and tutorials
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                  <span>View docs</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* Category Filter */}
              <div className="px-6 py-4 border-b border-gray-200 overflow-x-auto">
                <div className="flex gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
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
                  <div className="space-y-4">
                    {searchedFaqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                      >
                        <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-100 transition-all">
                          <div className="flex items-center gap-3 flex-1">
                            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="font-semibold text-gray-900">
                              {faq.question}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                        </summary>
                        <div className="px-5 pb-4 pt-2">
                          <p className="text-sm text-gray-700 leading-relaxed pl-8">
                            {faq.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
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

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Still need help?
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Send us a message and we'll get back to you within 24 hours
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        subject: e.target.value,
                      })
                    }
                    placeholder="What do you need help with?"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Describe your issue in detail..."
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Typical response time: 24 hours</span>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Status Page
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Check the current status of our services
                </p>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                  View status
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  API Documentation
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Integrate AnyTrans into your applications
                </p>
                <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                  View API docs
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
