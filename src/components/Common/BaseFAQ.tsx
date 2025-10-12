import React from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface BaseFAQProps {
  variant?: 'accordion' | 'details';
  faqs: FAQItem[];
  openIndex?: number | null;
  onToggle?: (index: number | null) => void;
  className?: string;
}

export default function BaseFAQ({
  variant = 'accordion',
  faqs,
  openIndex,
  onToggle,
  className = '',
}: BaseFAQProps) {
  if (variant === 'details') {
    return (
      <div className={`space-y-4 ${className}`}>
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
          >
            <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-100 transition-all">
              <div className="flex items-center gap-3 flex-1">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
            </summary>
            <div className="px-5 pb-4 pt-2">
              <p className="text-sm text-gray-700 leading-relaxed pl-8">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >
          <button
            onClick={() => onToggle?.(openIndex === idx ? null : idx)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 pr-4">
              <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-gray-900">
                {faq.question}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                openIndex === idx ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-5">
              <p className="text-gray-600 leading-relaxed pl-8">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
