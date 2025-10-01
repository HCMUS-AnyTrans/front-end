'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Subtitles, Zap } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

function FeatureCard({
  title,
  description,
  href,
  icon,
  isHovered = false,
  onHover,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="block group h-[420px] w-[265px]"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <div className="relative h-full w-full rounded-[10px] overflow-hidden bg-white border border-[#d9ebff] transition-all duration-500 ease-in-out hover:shadow-lg">
        {/* Background gradient overlay for hover state - only bottom half */}
        <div
          className={`absolute bottom-0 left-0 right-0 top-[40%] bg-gradient-to-br from-[#59A7FF]/80 to-[#19398F]/80 transition-all duration-500 ease-in-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Icon container */}
        <div className="absolute inset-[9.52%_21.89%_54.76%_21.51%] flex items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center text-[#19398F]">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-[50%_9.81%_20%_9.81%] flex flex-col gap-5 items-start text-center">
          <h3
            className={`font-bold text-[20px] leading-[1.4] w-full font-nunito transition-colors duration-500 ease-in-out ${
              isHovered ? 'text-white' : 'text-[#142457]'
            }`}
          >
            {title}
          </h3>
          <p
            className={`font-normal text-[16px] leading-[1.5] w-full font-nunito transition-colors duration-500 ease-in-out ${
              isHovered ? 'text-white' : 'text-[#19398F]'
            }`}
          >
            {description}
          </p>
        </div>

        {/* Button */}
        <div className="absolute bottom-[6.91%] left-[42.26%] right-[42.26%] top-[85%]">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full transition-all duration-500 ease-in-out ${
              isHovered
                ? 'bg-white/30 hover:bg-white/40 text-white border border-white/40'
                : 'bg-white hover:bg-gray-50 text-[#19398F] border border-slate-200'
            }`}
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default function FeatureGrid() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-9">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-[1.3] text-black text-center max-w-[657px] font-inter">
            We provides best Feature for customer
          </h2>

          <div className="flex items-center justify-between w-full max-w-4xl">
            <FeatureCard
              title="Document Translation"
              description="Lorem ipsum dolor sit amet ecte adipiscing elitIpsum."
              href="/features/document-translation"
              icon={<FileText size={48} />}
              isHovered={hoveredCard === 'document'}
              onHover={(hovered) => setHoveredCard(hovered ? 'document' : null)}
            />

            <FeatureCard
              title="Subtitle Translation"
              description="Lorem ipsum dolor sit amet ecte adipiscing elitIpsum."
              href="/features/subtitle-translation"
              icon={<Subtitles size={48} />}
              isHovered={hoveredCard === 'subtitle'}
              onHover={(hovered) => setHoveredCard(hovered ? 'subtitle' : null)}
            />

            <FeatureCard
              title="Real-time Translation"
              description="Lorem ipsum dolor sit amet ecte adipiscing elitIpsum."
              href="#"
              icon={<Zap size={48} />}
              isHovered={hoveredCard === 'realtime'}
              onHover={(hovered) => setHoveredCard(hovered ? 'realtime' : null)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
