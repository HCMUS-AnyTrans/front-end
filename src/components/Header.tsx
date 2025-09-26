"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="relative flex items-center justify-between w-full max-w-[1180px] mx-auto px-4 py-10">
      <div className="flex items-center">
        <h1 className="font-bold text-[50px] leading-[30px] text-[#19398f] font-['Hero_Light'] tracking-tight">
          anytrans
        </h1>
      </div>
      
      <nav className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="px-4 py-2 rounded-md font-semibold text-base text-slate-900 hover:bg-gray-50 transition-colors"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors outline-none focus:bg-gray-50">
              Features
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link 
                  href="/features/document-translation"
                  className="w-full cursor-pointer"
                >
                  Document Translation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  href="/features/subtitle-translation"
                  className="w-full cursor-pointer"
                >
                  Subtitle Translation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            href="/pricing" 
            className="px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors"
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className="px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors"
          >
            About Us
          </Link>
          <Link 
            href="/contact" 
            className="px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            href="/login" 
            className="px-4 py-2 rounded-md font-semibold text-base text-[#717680] hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-[#19398f] text-white px-4 py-2 rounded-md font-semibold text-base hover:bg-[#142457] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
