'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Send, Clock } from 'lucide-react';
import { BaseForm } from '@/components/Common';
import { ContactForm } from '@/types/support';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  const t = useTranslations('support.contactForm');

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
        {t('submit')}
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
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
            {t('fields.name.label')}
          </Label>
          <Input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder={t('fields.name.placeholder')}
            required
            className="focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-gray-900"
          >
            {t('fields.email.label')}
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t('fields.email.placeholder')}
            required
            className="focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="subject"
          className="text-sm font-semibold text-gray-900"
        >
          {t('fields.subject.label')}
        </Label>
        <Input
          id="subject"
          type="text"
          value={form.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          placeholder={t('fields.subject.placeholder')}
          required
          className="focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="message"
          className="text-sm font-semibold text-gray-900"
        >
          {t('fields.message.label')}
        </Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder={t('fields.message.placeholder')}
          required
          rows={6}
          className="focus-visible:ring-primary resize-none"
        />
      </div>
    </BaseForm>
  );
}
