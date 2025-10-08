'use client';

import React from 'react';
import { Send, Clock } from 'lucide-react';
import { BaseForm } from '@/src/components/Common';
import { ContactForm } from '@/src/types/support';

interface SupportContactFormProps {
  title: string;
  description: string;
  form: ContactForm;
  onFormChange: (form: ContactForm) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function SupportContactForm({
  title,
  description,
  form,
  onFormChange,
  onSubmit,
}: SupportContactFormProps) {
  const handleInputChange = (field: keyof ContactForm, value: string) => {
    onFormChange({ ...form, [field]: value });
  };

  const submitButton = (
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
  );

  return (
    <BaseForm
      title={title}
      description={description}
      onSubmit={onSubmit}
      submitButton={submitButton}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
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
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
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
          value={form.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
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
          value={form.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="Describe your issue in detail..."
          required
          rows={6}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </BaseForm>
  );
}
