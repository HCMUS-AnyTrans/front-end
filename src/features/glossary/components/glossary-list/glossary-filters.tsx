'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { getDomainLabel, useDomains } from '@/features/domains';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { glossaryLanguages } from '../../data';

interface GlossaryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  domainFilter: string;
  onDomainChange: (value: string) => void;
  srcLangFilter: string;
  onSrcLangChange: (value: string) => void;
}

export function GlossaryFilters({
  search,
  onSearchChange,
  domainFilter,
  onDomainChange,
  srcLangFilter,
  onSrcLangChange,
}: GlossaryFiltersProps) {
  const locale = useLocale();
  const t = useTranslations('glossary');
  const { domains } = useDomains();
  const glossaryDomains = domains.filter((domain) => domain.key !== 'auto');

  return (
    <div className="flex flex-1 flex-col gap-3 lg:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 rounded-xl bg-background pl-9"
        />
      </div>
      <Select value={domainFilter} onValueChange={onDomainChange}>
        <SelectTrigger className="h-10 min-h-10 w-full rounded-xl bg-background px-3 py-0 hover:bg-background lg:w-[220px]">
          <SelectValue placeholder={t('allDomains')} />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all" className="py-2">
            {t('allDomains')}
          </SelectItem>
          {glossaryDomains.map((domain) => (
            <SelectItem key={domain.id} value={domain.key} className="py-2">
              {getDomainLabel(domain, locale)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={srcLangFilter} onValueChange={onSrcLangChange}>
        <SelectTrigger className="h-10 min-h-10 w-full rounded-xl bg-background px-3 py-0 hover:bg-background lg:w-[200px]">
          <SelectValue placeholder={t('allLanguages')} />
        </SelectTrigger>
        <SelectContent className="bg-popover">
          <SelectItem value="all" className="py-2">
            {t('allLanguages')}
          </SelectItem>
          {glossaryLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="py-2">
              {t(`languages.${lang.code}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
