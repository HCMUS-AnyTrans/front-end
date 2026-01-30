'use client';

import React from 'react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { LegalPageHero, LegalPageContent } from '@/components/Common';
import { FileText } from 'lucide-react';

export default function TermsPageClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <LegalPageHero 
        namespace="terms" 
        icon={FileText} 
        gradientColors="bg-gradient-to-r from-[#4169E1] via-[#1e3a8a] to-[#4169E1]"
      />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <LegalPageContent namespace="terms" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
