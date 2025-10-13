import React from 'react';
import { CheckCircle, Book, ChevronRight } from 'lucide-react';
import { AdditionalResource } from '@/types/support';

interface SupportAdditionalResourcesProps {
  resources: AdditionalResource[];
}

export default function SupportAdditionalResources({
  resources,
}: SupportAdditionalResourcesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className={`${resource.bgGradient} rounded-xl p-4 sm:p-6 border ${resource.borderColor}`}
        >
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 ${resource.iconBg} rounded-lg flex items-center justify-center mb-2 sm:mb-3`}
          >
            <resource.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
            {resource.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            {resource.description}
          </p>
          <button
            className={`text-xs sm:text-sm ${resource.textColor} font-medium hover:${resource.hoverTextColor} flex items-center gap-1 cursor-pointer`}
          >
            {resource.actionText}
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
