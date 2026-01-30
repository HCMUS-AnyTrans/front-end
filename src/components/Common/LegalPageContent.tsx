'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface LegalPageContentProps {
  namespace: string;
}

export default function LegalPageContent({ namespace }: LegalPageContentProps) {
  const t = useTranslations(namespace);
  const content = t('content');

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8 bg-white shadow-sm">
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h2: ({ ...props }) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="text-gray-600 leading-relaxed mb-4" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc pl-6 my-4 space-y-2 text-gray-600" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-6 my-4 space-y-2 text-gray-600" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="leading-relaxed" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="font-semibold text-gray-900" {...props} />
              ),
              a: ({ ...props }) => (
                <a className="text-primary hover:text-blue-700 hover:underline" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}
