'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TemplateFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function TemplateFilters({
  search,
  onSearchChange,
}: TemplateFiltersProps) {
  const t = useTranslations('templates');

  return (
    <div className="flex flex-1">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="bg-background pl-9"
        />
      </div>
    </div>
  );
}
