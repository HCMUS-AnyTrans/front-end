'use client';

import React from 'react';
import { Users, FileText, Video, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  bgColor: string;
  position: string;
}

function FloatingCard({
  icon,
  category,
  title,
  bgColor,
  position,
}: FloatingCardProps) {
  return (
    <div
      className={`${position} bg-white rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] p-[10px] w-[285px] h-[83px] flex items-center gap-[10px] hover:shadow-xl transition-shadow duration-200`}
    >
      <div
        className={`${bgColor} rounded-[29.5px] w-[59px] h-[59px] flex items-center justify-center flex-shrink-0 p-[17px]`}
      >
        {icon}
      </div>
      <div className="flex flex-col text-[#142457] flex-1 text-[14px] leading-[1.5]">
        <div className="font-normal font-nunito">{category}</div>
        <div className="font-bold font-nunito leading-tight">{title}</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-r from-white to-[#DDEBFF]">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[34px]">
          {/* Left content */}
          <div className="flex flex-col gap-6 text-center lg:text-left w-full lg:w-[524px]">
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-normal text-black font-inter">
              Everything You Need to Translate Better
            </h2>

            <p className="font-normal text-[16px] leading-[1.5] text-[#414651] font-nunito w-full lg:w-[508px]">
              Our platform empowers you to translate documents, subtitles, and
              videos effortlessly. Upload DOCX, PDF, or PPTX files and get
              instant Vietnamese translations without losing formatting.
              Translate SRT, VTT, or MP4 content with perfectly synchronized
              timing, and manage your own terminology glossary to keep every
              translation accurate and consistent.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button
                variant="default"
                size="sm"
                className="bg-[#19398f] text-white hover:bg-[#142457] font-semibold text-[16px] font-nunito cursor-pointer px-[16px] py-[8px] rounded-[6px]"
              >
                Read More
              </Button>
            </div>
          </div>

          {/* Right floating cards section */}
          <div className="relative w-full lg:w-auto">
            {/* Floating cards with absolute positioning */}
            <div className="relative w-full lg:w-[387px] h-[387px]">
              {/* Card 1 - Top left */}
              <div className="absolute top-[43px] left-0 lg:left-10">
                <FloatingCard
                  icon={<FileText size={24} stroke="white" strokeWidth={2} />}
                  category="Translation"
                  title="Document Translation & Management"
                  bgColor="bg-[#80eac2]"
                  position="relative"
                />
              </div>

              {/* Card 2 - Middle left */}
              <div className="absolute top-[149px] left-0 lg:left-[110px]">
                <FloatingCard
                  icon={<Video size={24} stroke="white" strokeWidth={2} />}
                  category="Media"
                  title="Subtitle & Video Translation"
                  bgColor="bg-[#7d87ff]"
                  position="relative"
                />
              </div>

              {/* Card 3 - Bottom left */}
              <div className="absolute top-[255px] left-0 lg:left-0">
                <FloatingCard
                  icon={<BookOpen size={24} stroke="white" strokeWidth={2} />}
                  category="Productivity"
                  title="Glossary & Consistency Tools"
                  bgColor="bg-[#f3aa01]"
                  position="relative"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
