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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((resource) => (
        <div
          key={resource.id}
          className={`${resource.bgGradient} rounded-xl p-6 border ${resource.borderColor}`}
        >
          <div
            className={`w-10 h-10 ${resource.iconBg} rounded-lg flex items-center justify-center mb-3`}
          >
            <resource.icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
          <button
            className={`text-sm ${resource.textColor} font-medium hover:${resource.hoverTextColor} flex items-center gap-1 cursor-pointer`}
          >
            {resource.actionText}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
