'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface TopicSelectorProps {
  topic: string;
  onChange: (value: string) => void;
  topics: { value: string; label: string; icon: string }[];
}

export function TopicSelector({ topic, onChange, topics }: TopicSelectorProps) {
  const t = useTranslations('documentTranslation.configure.topic');

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
        </div>
        <p className="text-sm text-gray-600 mt-2">{t('description')}</p>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-3">
          <Label
            htmlFor="topic"
            className="block text-sm font-semibold text-gray-900 mb-2"
          >
            {t('label')}
          </Label>
          <Select value={topic} onValueChange={onChange}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder={t('placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {topics.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.icon} {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {topic === 'auto-detect' && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Sparkles className="w-4 h-4 text-[#4169E1] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#1e3a8a]">{t('autoDetectInfo')}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
