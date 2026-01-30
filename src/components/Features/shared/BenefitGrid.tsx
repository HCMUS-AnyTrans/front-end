import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Benefit {
  icon: LucideIcon;
  text: string;
}

interface BenefitGridProps {
  benefits: Benefit[];
  columns?: 2 | 3;
}

export default function BenefitGrid({
  benefits,
  columns = 3,
}: BenefitGridProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-4 pt-4`}>
      {benefits.map((benefit, idx) => {
        const Icon = benefit.icon;
        return (
          <div key={idx} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-2">
              <Icon className="w-6 h-6 text-brand-primary-light" />
            </div>
            <p className="text-xs font-semibold text-gray-700">
              {benefit.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
