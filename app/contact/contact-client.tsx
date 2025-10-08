'use client';

import React from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import {
  ContactHero,
  ContactMethods,
  ContactForm,
  ContactInfo,
  ContactSocial,
  ContactCTA,
} from '@/src/components/Contact';
import {
  contactMethods,
  offices,
  socialLinks,
  reasons,
} from '@/src/lib/contact-data';
import { ContactFormData } from '@/src/types/contact';

export default function ContactPageClient() {
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
