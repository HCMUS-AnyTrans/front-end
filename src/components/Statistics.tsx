'use client';

import React from 'react';
import Image from 'next/image';

interface StatItemProps {
  iconSrc: string;
  number: string;
  label: string;
  bgColor: string;
}

function StatItem({ iconSrc, number, label, bgColor }: StatItemProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-9 text-center lg:text-left">
      <div className="flex items-center gap-9">
        <div
          className={`${bgColor} rounded-[40px] w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center relative`}
        >
          <Image
            src={iconSrc}
            alt={label}
            width={48}
            height={48}
            className="w-8 h-8 lg:w-12 lg:h-12"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:gap-6 w-full lg:w-[165px]">
        <div className="font-semibold text-2xl lg:text-[40px] leading-[1.3] text-[#142457] font-inter capitalize">
          {number}
        </div>
        <div className="font-bold text-sm lg:text-base leading-6 text-[#535862] font-nunito">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="w-full py-12 lg:py-16 bg-white flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-0 lg:flex lg:items-center lg:justify-between">
          <StatItem
            iconSrc="/user-icon.svg"
            number="100+"
            label="Active user"
            bgColor="bg-[#ecdffc]"
          />

          <StatItem
            iconSrc="/download-icon.svg"
            number="100+"
            label="File translation"
            bgColor="bg-[#f9ecca]"
          />

          <StatItem
            iconSrc="/film-icon.svg"
            number="100+"
            label="Subtitle Translation"
            bgColor="bg-[#d5f3f1]"
          />
        </div>
      </div>
    </section>
  );
}
