"use client";

import React from "react";
import { Users, Download, Film } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  bgColor: string;
  iconColor: string;
}

function StatItem({ icon, number, label, bgColor, iconColor }: StatItemProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-9 text-center lg:text-left">
      <div className="flex items-center gap-9">
        <div className={`${bgColor} rounded-[40px] w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center relative`}>
          <div className={`${iconColor} w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center`}>
            {icon}
          </div>
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
    <section className="w-full py-12 lg:py-16 bg-gray-50 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-0 lg:flex lg:items-center lg:justify-between">
        <StatItem
          icon={<Users size={48} stroke="#ad55e9" strokeWidth={2} />}
          number="100+"
          label="Active user"
          bgColor="bg-[#c06ef3] bg-opacity-20"
          iconColor="text-[#ad55e9]"
        />
        
        <StatItem
          icon={<Download size={48} stroke="#fdba09" strokeWidth={2} />}
          number="100+"
          label="File translation"
          bgColor="bg-[#fdba09] bg-opacity-20"
          iconColor="text-[#fdba09]"
        />
        
        <StatItem
          icon={<Film size={48} stroke="#6dedc3" strokeWidth={2} />}
          number="100+"
          label="Subtitle Translation"
          bgColor="bg-[#6dedc3] bg-opacity-20"
          iconColor="text-[#6dedc3]"
        />
        </div>
      </div>
    </section>
  );
}
