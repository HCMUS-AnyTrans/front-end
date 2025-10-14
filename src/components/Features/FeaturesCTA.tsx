'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FeaturesCTA() {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#4169E1] to-[#1e3a8a] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of users who trust Anytrans for their translation
              needs. Start your free trial today—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                size="hero"
                className="bg-white text-[#4169E1] hover:bg-blue-50 border-2 border-white shadow-lg group"
                asChild
              >
                <a href="/signup">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="hero"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10"
                asChild
              >
                <a href="/contact">Contact Sales</a>
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-sm text-blue-100 mt-8">
              ✓ 14-day free trial &nbsp;•&nbsp; ✓ No credit card required
              &nbsp;•&nbsp; ✓ Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
