'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ContactFormProps, ContactFormData } from '@/types/contact';
import { ContactFormFields } from './ContactFormFields';
import { ContactFormSuccess } from './ContactFormSuccess';
import Image from 'next/image';

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

  const handleSubjectChange = (value: string) => {
    setFormData({ ...formData, subject: value });
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
        <ContactFormSuccess
          onReset={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
        />
      ) : (
        <>
          <ContactFormFields
            formData={formData}
            onChange={handleChange}
            onSubjectChange={handleSubjectChange}
            onSubmit={handleSubmit}
          />

          <div className="mt-4 flex justify-center relative items-stretch">
            <Image
              src="/banner/contact-illustration.jpg"
              alt="Contact Support Illustration"
              className="w-full max-w-md h-auto rounded-2xl opacity-90 hover:opacity-100 transition-opacity duration-300"
              width={400}
              height={300}
            />
          </div>
        </>
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
