'use client';

import React from 'react';
import { Send, Clock } from 'lucide-react';
import { BaseForm } from '@/components/Common';
import { ContactForm } from '@/types/support';
import { Button } from '@/components/ui/button';

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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-4">
      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-gray-600">
        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>Typical response time: 24 hours</span>
      </div>
      <Button
        type="submit"
        variant="gradient-primary"
        size="default"
        className="rounded-lg p-6 shadow-lg hover:scale-100 hover:translate-y-0 text-sm sm:text-base"
      >
        <Send className="w-4 h-4" />
        Send Message
      </Button>
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent"
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent"
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
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent"
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
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent resize-none"
        />
      </div>
    </BaseForm>
  );
}
