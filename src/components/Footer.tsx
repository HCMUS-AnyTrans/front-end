"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#142457] text-white mt-auto">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Left section - Logo and newsletter */}
            <div className="flex flex-col gap-9 w-full lg:w-[384px]">
              {/* Logo */}
              <div className="w-[356px] h-[135px] relative">
                <h1 className="font-bold text-[50px] leading-[30px] text-white font-['Hero_Light'] tracking-tight">
                  anytrans
                </h1>
                <p className="text-sm text-gray-300 mt-4 font-nunito">
                  Translate smarter, not harder
                </p>
              </div>
              
              {/* Newsletter signup */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm leading-5 text-white font-inter">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter"
                    />
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-slate-800 transition-colors font-inter cursor-pointer">
                    Submit
                  </button>
                </div>
                <p className="font-normal text-sm leading-5 text-slate-400 font-inter">
                  Enter your email address
                </p>
              </div>
            </div>
            
            {/* Right section - Links */}
            <div className="flex flex-col sm:flex-row items-start justify-between w-full lg:w-[510px] gap-8 sm:gap-4">
              {/* Our Link */}
              <div className="flex flex-col gap-8">
                <h3 className="font-semibold text-xl leading-[1.4] text-white font-nunito">
                  Our Link
                </h3>
                <div className="flex flex-col gap-5">
                  <Link href="/" className="font-semibold text-base leading-6 text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer">
                    Home
                  </Link>
                  <Link href="/features" className="font-semibold text-base leading-6 text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer">
                    Features
                  </Link>
                  <Link href="/pricing" className="font-semibold text-base leading-6 text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer">
                    Pricing
                  </Link>
                  <Link href="/about" className="font-semibold text-base leading-6 text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer">
                    About Us
                  </Link>
                </div>
              </div>
              
              {/* Our Service */}
              <div className="flex flex-col gap-8">
                <h3 className="font-semibold text-xl leading-[1.4] text-white font-nunito">
                  Our Service
                </h3>
                <div className="flex flex-col gap-5">
                  <Link href="/features/document-translation" className="font-semibold text-base leading-6 text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer">
                    Document Translation
                  </Link>
                  <Link href="/features/subtitle-translation" className="font-semibold text-base leading-6 text-[#a4a7ae] hover:text-white transition-colors font-nunito cursor-pointer">
                    Subtitle Translation
                  </Link>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex flex-col gap-6">
                <h3 className="font-semibold text-xl leading-[1.4] text-white font-nunito">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Facebook size={20} className="text-white" />
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Twitter size={20} className="text-white" />
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Instagram size={20} className="text-white" />
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#19398f] transition-colors cursor-pointer">
                    <Linkedin size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-600 pt-6 gap-4">
            <p className="font-medium text-lg leading-8 text-white font-inter">
              © 2025 AnyTrans Inc. Copyright and rights reserved
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
              <Link href="/terms" className="font-semibold text-base leading-6 text-white hover:text-gray-300 transition-colors px-4 py-2 font-nunito cursor-pointer">
                Terms and Conditions
              </Link>
              <div className="hidden sm:block w-1 h-1 bg-white rounded-full mx-2"></div>
              <Link href="/privacy" className="font-semibold text-base leading-6 text-white hover:text-gray-300 transition-colors px-4 py-2 font-nunito cursor-pointer">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
