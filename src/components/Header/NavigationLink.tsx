import React from 'react';

interface NavigationLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function NavigationLink({
  href,
  label,
  isActive,
  onClick,
}: NavigationLinkProps) {
  return (
    <a
      href={href}
      className={`relative px-3 xl:px-5 py-2.5 rounded-lg font-semibold text-sm xl:text-[15px] transition-all duration-300 ${
        isActive
          ? 'text-[#4169E1]'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {label}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#1e3a8a] rounded-full transition-all duration-300 ${
          isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      />
    </a>
  );
}
