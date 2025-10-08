'use client';

import React from 'react';

type BaseFeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgClass: string;
};

export default function BaseFeatureCard({
  icon,
  title,
  description,
  iconBgClass,
}: BaseFeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div
        className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center mb-3`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
