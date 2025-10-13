import React from 'react';
import { Check } from 'lucide-react';

interface FeatureListItemProps {
  text: string;
  gradient: string;
  variant?: 'default' | 'compact';
}

export default function FeatureListItem({
  text,
  gradient,
  variant = 'default',
}: FeatureListItemProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-gray-700">
        <div
          className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-6 h-6 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}
      >
        <Check className="w-4 h-4 text-white" strokeWidth={3} />
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
}
