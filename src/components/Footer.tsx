'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#142457] text-white mt-auto relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#19398F] to-[#59A7FF] rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col gap-[31px]">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Left section - Logo and newsletter */}
            <div className="flex flex-col gap-[37px] w-full lg:w-[384px]">
              {/* Logo */}
              <div className="w-[356px] h-[135px] relative">
                <Image
                  src="/LogoName.svg"
                  alt="AnyTrans Logo"
                  width={356}
                  height={135}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Newsletter signup */}
              <div className="flex flex-col gap-[6px]">
                <label className="font-medium text-[14px] leading-[20px] text-white font-inter">
                  Email
                </label>
                <div className="flex items-center gap-[8px]">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white border border-slate-300 rounded-[6px] px-[12px] py-[8px] text-[16px] text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
                    />
                  </div>
                  <button className="bg-slate-900 text-white px-[16px] py-[8px] rounded-[6px] font-medium text-[14px] hover:bg-slate-800 transition-colors font-inter cursor-pointer">
                    Submit
                  </button>
                </div>
                <p className="font-normal text-[14px] leading-[20px] text-slate-400 font-inter">
                  Enter your email address
                </p>
              </div>
            </div>

            {/* Right section - Links */}
            <div className="flex items-start justify-between w-full lg:w-[510px] gap-8">
              {/* Our Link */}
              <div className="flex flex-col gap-[30px]">
                <h3 className="font-semibold text-[20px] leading-[1.4] text-white font-nunito">
                  Our Link
                </h3>
                <div className="flex flex-col gap-[20px]">
                  <Link
                    href="/"
                    className="font-semibold text-[16px] leading-[1.5] text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer"
                  >
                    Home
                  </Link>
                  <Link
                    href="/features"
                    className="font-semibold text-[16px] leading-[1.5] text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer"
                  >
                    Features
                  </Link>
                  <Link
                    href="/pricing"
                    className="font-semibold text-[16px] leading-[1.5] text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/about"
                    className="font-semibold text-[16px] leading-[1.5] text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer"
                  >
                    About Us
                  </Link>
                </div>
              </div>

              {/* Our Service */}
              <div className="flex flex-col gap-[30px]">
                <h3 className="font-semibold text-[20px] leading-[1.4] text-white font-nunito">
                  Our Service
                </h3>
                <div className="flex flex-col gap-[20px]">
                  <Link
                    href="/features/document-translation"
                    className="font-semibold text-[16px] leading-[1.5] text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer"
                  >
                    Document Translation
                  </Link>
                  <Link
                    href="/features/subtitle-translation"
                    className="font-semibold text-[16px] leading-[1.5] text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer"
                  >
                    Subtitle Translation
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col gap-[27px] w-[148px]">
                <h3 className="font-semibold text-[20px] leading-[1.4] text-white font-nunito">
                  Other
                </h3>
                <div className="grid grid-cols-2 gap-[27px] w-[71px] h-[71px]">
                  <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Facebook size={16} className="text-white" />
                  </div>
                  <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Twitter size={16} className="text-white" />
                  </div>
                  <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Instagram size={16} className="text-white" />
                  </div>
                  <div className="w-[22px] h-[22px] flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Linkedin size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-medium text-[18px] leading-[30px] text-white font-inter">
              © 2025 AnyTrans Inc. Copyright and rights reserved
            </p>

            <div className="flex items-center gap-2">
              <Link
                href="/terms"
                className="font-semibold text-[16px] leading-[1.5] text-white hover:text-gray-300 transition-colors px-[16px] py-[8px] font-nunito cursor-pointer"
              >
                Terms and Conditions
              </Link>
              <div className="w-[4px] h-[4px] bg-white rounded-full"></div>
              <Link
                href="/privacy"
                className="font-semibold text-[16px] leading-[1.5] text-white hover:text-gray-300 transition-colors px-[16px] py-[8px] font-nunito cursor-pointer"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
