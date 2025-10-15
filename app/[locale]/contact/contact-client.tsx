'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  ContactHero,
  ContactMethods,
  ContactForm,
  ContactInfo,
  ContactSocial,
  ContactCTA,
} from '@/components/Contact';
import { socialLinks } from '@/lib/contact-data';
import { ContactFormData } from '@/types/contact';
import {
  Mail,
  Phone,
  MessageSquare,
  Headphones,
  Users,
  Globe,
} from 'lucide-react';

export default function ContactPageClient() {
  const t = useTranslations('contact');

  const contactMethods = [
    {
      icon: Mail,
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      contact: t('methods.email.contact'),
      color: 'blue' as const,
    },
    {
      icon: Phone,
      title: t('methods.phone.title'),
      description: t('methods.phone.description'),
      contact: t('methods.phone.contact'),
      color: 'green' as const,
    },
    {
      icon: MessageSquare,
      title: t('methods.chat.title'),
      description: t('methods.chat.description'),
      contact: t('methods.chat.contact'),
      color: 'purple' as const,
    },
  ];

  const offices = [
    {
      city: t('info.offices.sanFrancisco.city'),
      country: t('info.offices.sanFrancisco.country'),
      address: t('info.offices.sanFrancisco.address'),
      zipcode: t('info.offices.sanFrancisco.zipcode'),
    },
    {
      city: t('info.offices.london.city'),
      country: t('info.offices.london.country'),
      address: t('info.offices.london.address'),
      zipcode: t('info.offices.london.zipcode'),
    },
    {
      city: t('info.offices.singapore.city'),
      country: t('info.offices.singapore.country'),
      address: t('info.offices.singapore.address'),
      zipcode: t('info.offices.singapore.zipcode'),
    },
  ];

  const reasons = [
    {
      icon: Headphones,
      title: t('info.reasons.support.title'),
      description: t('info.reasons.support.description'),
    },
    {
      icon: Users,
      title: t('info.reasons.team.title'),
      description: t('info.reasons.team.description'),
    },
    {
      icon: Globe,
      title: t('info.reasons.reach.title'),
      description: t('info.reasons.reach.description'),
    },
  ];

  const handleFormSubmit = (formData: ContactFormData) => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Contact Methods */}
          <ContactMethods methods={contactMethods} />

          {/* Main Content Grid */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <ContactForm onSubmit={handleFormSubmit} />

              {/* Contact Information */}
              <ContactInfo offices={offices} reasons={reasons} />
            </div>
          </section>

          {/* Social Media */}
          <ContactSocial socialLinks={socialLinks} />

          {/* FAQ CTA */}
          <ContactCTA />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
