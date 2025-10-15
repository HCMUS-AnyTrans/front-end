import React from 'react';
import { Link } from '@/i18n/routing';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinkSectionProps {
  title: string;
  links: FooterLink[];
}

export default function FooterLinkSection({
  title,
  links,
}: FooterLinkSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-lg text-white relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full" />
      </h3>
      <div className="flex flex-col gap-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 text-[15px] font-medium group flex items-center gap-2"
          >
            <span className="w-0 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] group-hover:w-4 transition-all duration-300 rounded-full" />
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
