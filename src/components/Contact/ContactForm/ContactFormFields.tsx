'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ContactFormData } from '@/types/contact';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ContactFormFieldsProps {
  formData: ContactFormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubjectChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactFormFields({
  formData,
  onChange,
  onSubjectChange,
  onSubmit,
}: ContactFormFieldsProps) {
  const t = useTranslations('contact.form');

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t('fields.name.label')}
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          placeholder={t('fields.name.placeholder')}
          className="h-11 px-4 focus-visible:ring-[#4169E1]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t('fields.email.label')}
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          placeholder={t('fields.email.placeholder')}
          className="h-11 px-4 focus-visible:ring-[#4169E1]"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t('fields.subject.label')}
        </label>
        <Select
          value={formData.subject}
          onValueChange={onSubjectChange}
          required
        >
          <SelectTrigger className="w-full h-16 px-4 py-5 focus:ring-[#4169E1]">
            <SelectValue placeholder={t('fields.subject.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">
              {t('fields.subject.options.general')}
            </SelectItem>
            <SelectItem value="support">
              {t('fields.subject.options.support')}
            </SelectItem>
            <SelectItem value="sales">
              {t('fields.subject.options.sales')}
            </SelectItem>
            <SelectItem value="partnership">
              {t('fields.subject.options.partnership')}
            </SelectItem>
            <SelectItem value="feedback">
              {t('fields.subject.options.feedback')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t('fields.message.label')}
        </label>

        <Textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          rows={10}
          placeholder={t('fields.message.placeholder')}
          className="px-4 py-3 focus-visible:ring-[#4169E1]"
        />
      </div>

      <Button
        type="submit"
        variant="gradient-primary"
        size="lg"
        className="w-full py-6 rounded-md"
      >
        <Send className="w-5 h-5" />
        {t('submitButton')}
      </Button>
    </form>
  );
}
