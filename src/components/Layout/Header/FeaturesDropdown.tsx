import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FeaturesDropdownProps {
  isActive: boolean;
  isOpen: boolean;
  pathname: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const features = [
  {
    href: '/features/document-translation',
    title: 'Document Translation',
    description: 'Translate documents instantly',
  },
  {
    href: '/features/subtitle-translation',
    title: 'Subtitle Translation',
    description: 'Perfect timing & sync',
  },
];

export default function FeaturesDropdown({
  isActive,
  isOpen,
  pathname,
  onMouseEnter,
  onMouseLeave,
}: FeaturesDropdownProps) {
  return (
    <div className="relative">
      <button
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`relative flex items-center gap-1.5 px-3 xl:px-5 py-2.5 rounded-lg font-medium text-sm xl:text-[15px] transition-all duration-300 cursor-pointer ${
          isActive
            ? 'text-[#4169E1]'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        Features
        <ChevronDown
          className={`h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full transition-all duration-300 ${
            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="p-2">
          {features.map((feature) => (
            <a
              key={feature.href}
              href={feature.href}
              className={`flex flex-col px-4 py-3 rounded-lg transition-colors duration-200 group ${
                pathname === feature.href ? 'bg-blue-50' : 'hover:bg-blue-50'
              }`}
            >
              <span className="font-semibold text-[15px] text-gray-900 group-hover:text-[#4169E1] transition-colors">
                {feature.title}
              </span>
              <span className="text-sm text-gray-500 mt-0.5">
                {feature.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
