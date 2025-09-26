"use client";

import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingCardProps {
  icon: React.ReactNode;
  category: string;
  title: string;
  bgColor: string;
  position: string;
}

function FloatingCard({ icon, category, title, bgColor, position }: FloatingCardProps) {
  return (
    <div className={`${position} bg-white rounded-xl shadow-lg p-4 w-full max-w-[320px] flex items-center gap-4 hover:shadow-xl transition-shadow duration-200`}>
      <div className={`${bgColor} rounded-full w-[60px] h-[60px] flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col text-[#142457] flex-1">
        <div className="font-normal text-sm font-nunito text-gray-600">
          {category}
        </div>
        <div className="font-bold text-sm sm:text-base font-nunito leading-tight">
          {title}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="w-full py-16 lg:py-24 bg-white overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-[50px] leading-tight lg:leading-[1.1] text-black font-inter">
              Everything You Need to Translate Better
            </h2>
            
            <p className="font-normal text-base sm:text-lg leading-6 sm:leading-7 text-[#414651] font-nunito">
              Our platform empowers you to translate documents, subtitles, and videos effortlessly. Upload DOCX, PDF, or PPTX files and get instant Vietnamese translations without losing formatting. Translate SRT, VTT, or MP4 content with perfectly synchronized timing, and manage your own terminology glossary to keep every translation accurate and consistent.
            </p>
            
            <div className="flex justify-center lg:justify-start">
              <Button 
                variant="default"
                size="lg"
                className="bg-[#19398f] text-white hover:bg-[#142457] font-semibold text-base font-nunito cursor-pointer"
              >
                Read More
              </Button>
            </div>
          </div>
          
          {/* Right feature cards section */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="relative">
              <FloatingCard
                icon={<Users size={24} stroke="white" strokeWidth={2} />}
                category="Translation"
                title="Document Translation & Management"
                bgColor="bg-[#80eac2]"
                position="relative"
              />
            </div>
            
            <div className="relative lg:ml-8">
              <FloatingCard
                icon={<Users size={24} stroke="white" strokeWidth={2} />}
                category="Media"
                title="Subtitle & Video Translation"
                bgColor="bg-[#7d87ff]"
                position="relative"
              />
            </div>
            
            <div className="relative">
              <FloatingCard
                icon={<Users size={24} stroke="white" strokeWidth={2} />}
                category="Productivity"
                title="Glossary & Consistency Tools"
                bgColor="bg-[#f3aa01]"
                position="relative"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
