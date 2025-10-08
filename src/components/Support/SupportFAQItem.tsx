import React from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';

interface SupportFAQItemProps {
  question: string;
  answer: string;
}

export default function SupportFAQItem({
  question,
  answer,
}: SupportFAQItemProps) {
  return (
    <details className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-100 transition-all">
        <div className="flex items-center gap-3 flex-1">
          <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span className="font-semibold text-gray-900">{question}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
      </summary>
      <div className="px-5 pb-4 pt-2">
        <p className="text-sm text-gray-700 leading-relaxed pl-8">{answer}</p>
      </div>
    </details>
  );
}
