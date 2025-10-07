'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundDecorations from './Common/BackgroundDecorations';

export default function Hero() {
  return (
    <section className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackgroundDecorations />
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left side - Content */}
        <div className="flex flex-col gap-7 max-w-[625px] relative z-10">
          <div className="relative">
            {/* Decorative vector element */}
            <div className="absolute -left-14 top-44 w-[530px] h-[106px] opacity-20">
              <svg viewBox="0 0 530 106" className="w-full h-full">
                <path
                  d="M10 50 Q265 20 520 50"
                  stroke="#19398f"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                />
              </svg>
            </div>

            <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-[80px] leading-tight lg:leading-[1.1] xl:leading-[90px] text-black font-inter">
              We&apos;re here to
              <br />
              enhance your <span className="text-[#173fb6]">Translation</span>
            </h1>
          </div>

          <p className="font-semibold text-base sm:text-lg leading-6 sm:leading-7 text-[#414651] max-w-[448px] font-nunito">
            Translate smarter, not harder. AnyTrans gives you speed, accuracy,
            and the latest features to manage all your content with ease.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <Button
              variant="default"
              size="lg"
              className="bg-[#19398f] text-white hover:bg-[#142457] rounded-[32px] h-[50px] w-[150px] font-semibold text-base font-nunito cursor-pointer"
            >
              Free Trial
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-[#19398f] text-[#19398f] hover:bg-[#19398f] hover:text-white rounded-[32px] h-[50px] w-[150px] font-semibold text-base font-nunito cursor-pointer"
            >
              <Play size={20} className="fill-current mr-2" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Right side - Banner Image */}
        <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-[500px] xl:max-w-[600px]">
          <img
            src="/Banner-Homepage.svg"
            alt="AnyTrans Translation Services Banner"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
