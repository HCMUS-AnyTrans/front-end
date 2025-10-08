import React, { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface BaseActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  actionText: string;
  onClick: () => void;
  className?: string;
}

export default function BaseActionCard({
  title,
  description,
  icon,
  color,
  bgColor,
  hoverBgColor,
  textColor,
  actionText,
  onClick,
  className = '',
}: BaseActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-${color}-500 hover:shadow-lg transition-all group text-left ${className}`}
    >
      <div
        className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:${hoverBgColor} transition-all`}
      >
        <div className={`w-6 h-6 ${textColor} group-hover:text-white`}>
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div
        className={`flex items-center gap-2 text-sm ${textColor} font-medium`}
      >
        <span>{actionText}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
}
