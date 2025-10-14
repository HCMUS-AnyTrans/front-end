'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';
import { ContactFormData, ContactFormProps } from '@/types/contact';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('title')}</h2>
      <p className="text-gray-600 mb-6">{t('subtitle')}</p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in-scale">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t('successMessage.title')}
          </h3>
          <p className="text-gray-600">{t('successMessage.description')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t('fields.name.label')}
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onValueChange={(value) =>
                setFormData({ ...formData, subject: value })
              }
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
              onChange={handleChange}
              required
              rows={10}
              placeholder={t('fields.message.placeholder')}
              className=" px-4 py-3 focus-visible:ring-[#4169E1]"
            />
          </div>

          <Button
            type="submit"
            variant="gradient-primary"
            size="lg"
            className="w-full py-6 rounded-md "
          >
            <Send className="w-5 h-5" />
            {t('submitButton')}
          </Button>

          {/* Contact Illustration */}
          <div className="mt-4 flex justify-center">
            <img
              src="/contact-illustration.jpg"
              alt="Contact Support Illustration"
              className="w-full max-w-md h-auto rounded-2xl opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </form>
      )}

      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        :global(.animate-fade-in-scale) {
          animation: fade-in-scale 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
