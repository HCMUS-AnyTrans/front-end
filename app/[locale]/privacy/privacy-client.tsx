'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LegalPageHero, LegalPageContent } from '@/components/Common';
import { Shield } from 'lucide-react';

export default function PrivacyPageClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <LegalPageHero 
        namespace="privacy" 
        icon={Shield} 
        gradientColors="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700"
      />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <LegalPageContent namespace="privacy" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
